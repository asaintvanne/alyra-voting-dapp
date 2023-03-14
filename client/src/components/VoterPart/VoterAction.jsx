//import { prototype } from "@truffle/hdwallet-provider";
import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import * as WorflowStatus from "../models/WorflowStatus";



function VoterAction () {
  const { state: { contract, accounts, workflowStatus } } = useEth();
  const [inputProposal, setInputProposal] = useState("");
  const [inputVoteProposalId, setInputVoteProposalId] = useState("");

  const sendProposal = async e => {
    if (inputProposal === '') {
      alert('No empty proposal');
      return;
    }
    
    await contract.methods.addProposal(inputProposal).send({ from: accounts[0] });
    setInputProposal("");
  };

  const sendVote = async e => {
    if (inputVoteProposalId === 0) {
      alert('Cannot vote for proposal 0');
      return;
    }
    
    await contract.methods.setVote(inputVoteProposalId).send({ from: accounts[0] });
  };

  const handleInputProposalIdChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputVoteProposalId(e.target.value);
    }
  };

  const hasAlreadyVoted = async () => {
    let hasAlreadyVoted = false;
    try {
      const voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
      hasAlreadyVoted = voter.hasVoted;

    } catch (error) {

    }

    return hasAlreadyVoted;
  };

  const voterHasAlreadyVoted = hasAlreadyVoted();

  return (
      <>
        {workflowStatus == WorflowStatus.ProposalsRegistrationStarted && (<>
          <input type="text" placeholder="Describe your proposal" value={inputProposal} onChange={(e) => setInputProposal(e.target.value)} />
          <button onClick={sendProposal}>Send proposal</button>
        </>)}

        {workflowStatus == WorflowStatus.VotingSessionStarted && (
          !voterHasAlreadyVoted ? (<>
            <input type="number" placeholder="Vote for a proposal" value={inputVoteProposalId} onChange={handleInputProposalIdChange} />
            <button onClick={sendVote}>Send vote</button>
          </>) : (<>
            <div>You already voted</div>
          </>)
        )}
      </>
  );
};

export default VoterAction;