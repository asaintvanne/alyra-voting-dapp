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
      <h3>Ajouter une  proposition</h3>
      <div class="row">
        <div class="col">
          <input id="input_proposal" type="text" placeholder="Description" value={inputProposal} onChange={(e) => setInputProposal(e.target.value)} />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button onClick={sendProposal} className="btn btn-primary mt-1">Envoyer la proposition</button>
        </div>
      </div>
    </>
  );
};

export default Proposal;