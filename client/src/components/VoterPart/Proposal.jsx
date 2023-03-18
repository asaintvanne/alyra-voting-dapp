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
			<input type="text" placeholder="Description" value={inputProposal} onChange={(e) => setInputProposal(e.target.value)} />
			<button onClick={sendProposal}>Envoyer la proposition</button>
    </>
  );
};

export default Proposal;