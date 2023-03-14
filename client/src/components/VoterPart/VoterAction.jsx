//import { prototype } from "@truffle/hdwallet-provider";
import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

export const RegisteringVoters = 0;
export const ProposalsRegistrationStarted = 1;
export const ProposalsRegistrationEnded = 2;
export const VotingSessionStarted = 3;
export const VotingSessionEnded = 4;

function VoterAction () {
  const { state: { contract, accounts, workflowStatus } } = useEth();
  const [inputProposal, setInputProposal] = useState("");
  const [inputVoteProposalId, setInputVoteProposalId] = useState(0);

  const sendProposal = async e => {
    if (inputProposal === '') {
      alert('No empty proposal');
      return;
    }
    
    const result = await contract.methods.addProposal(inputProposal).send({ from: accounts[0] });
    setInputProposal("");
  };

  const sendVote = async e => {
    if (inputVoteProposalId === 0) {
      alert('Cannot vote for proposal 0');
      return;
    }
    
    const result = await contract.methods.setVote(inputVoteProposalId).send({ from: accounts[0] });
  };

  const handleInputProposalIdChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputVoteProposalId(e.target.value);
    }
  };

  return (
      <>
      {workflowStatus == ProposalsRegistrationStarted && (<>
        <input type="text" placeholder="Describe your proposal" value={inputProposal} onChange={(e) => setInputProposal(e.target.value)} />
        <button onClick={sendProposal}>Send proposal</button>
      </>)}

      {workflowStatus == VotingSessionStarted && (<>
        <input type="number" placeholder="Vote for a proposal" value={inputVoteProposalId} onChange={handleInputProposalIdChange} />
        <button onClick={sendVote}>Send vote</button>
      </>)}
      </>
  );
};

export default VoterAction;