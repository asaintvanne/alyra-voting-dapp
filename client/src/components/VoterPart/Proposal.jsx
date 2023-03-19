import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { toast } from 'react-toastify';

function Proposal () {
  const { state: { contract, accounts } } = useEth();
  const [inputProposal, setInputProposal] = useState("");

  const sendProposal = async e => {
    if (inputProposal === '') {
      toast.error("Impossible d'enregistrer une proposition vide", {
        position: toast.POSITION.TOP_LEFT
      });
      return;
    }

		contract.methods.addProposal(inputProposal).call({ from: accounts[0] })
			.then(result => {
				return contract.methods.addProposal(inputProposal).send({ from: accounts[0] });
			})
			.then(result => {
        toast.success("Proposition enregistrée avec l'ID " + result.events.ProposalRegistered.returnValues.proposalId, {
          position: toast.POSITION.TOP_LEFT
        });
				setInputProposal("");
			})
			.catch(error => {
        toast.error("Impossible d'enregistrer la proposition", {
          position: toast.POSITION.TOP_LEFT
        });
			})
    ;
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <input id="input_proposal" type="text" placeholder="Description de la proposition" value={inputProposal} onChange={(e) => setInputProposal(e.target.value)} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button onClick={sendProposal} className="btn btn-primary mt-1">Soumettre la proposition</button>
        </div>
      </div>
    </>
  );
};

export default Proposal;