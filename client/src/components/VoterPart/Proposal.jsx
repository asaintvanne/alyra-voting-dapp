import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Proposal () {
  const { state: { contract, accounts } } = useEth();
  const [inputProposal, setInputProposal] = useState("");

  const sendProposal = async e => {
    if (inputProposal === '') {
      alert('No empty proposal');
      return;
    }

		contract.methods.addProposal(inputProposal).call({ from: accounts[0] })
			.then(result => {
				return contract.methods.addProposal(inputProposal).send({ from: accounts[0] });
			})
			.then(result => {
				console.log("Proposal registered with ID " + result.events.ProposalRegistered.returnValues.proposalId);
				setInputProposal("");
			})
			.catch(error => {
				console.log(error);
			})
    ;
  };

  return (
    <>
			<input type="text" placeholder="Describe your proposal" value={inputProposal} onChange={(e) => setInputProposal(e.target.value)} />
			<button onClick={sendProposal}>Send proposal</button>
    </>
  );
};

export default Proposal;