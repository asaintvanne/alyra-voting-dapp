//import { prototype } from "@truffle/hdwallet-provider";
import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import * as WorflowStatus from "../models/WorflowStatus";
import NoActionRequested from "./NoActionRequested";
import Tally from "./Tally";

function VoterAction () {
  const { state: { contract, accounts, workflowStatus } } = useEth();
  const [hasVoted, setHasVoted] = useState(false);
  const [inputProposal, setInputProposal] = useState("");
  const [inputVoteProposalId, setInputVoteProposalId] = useState("");

  const sendProposal = async e => {
    if (inputProposal === '') {
      alert('No empty proposal');
      return;
    }
    
    try {
      await contract.methods.addProposal(inputProposal).call({ from: accounts[0] });
      await contract.methods.addProposal(inputProposal).send({ from: accounts[0] });
      setInputProposal("");
    } catch (error) {
      console.log(error);
    }
  };

  const sendVote = async e => {
    if (inputVoteProposalId === '0') {
      alert('Cannot vote for proposal 0');
      return;
    } else if (inputVoteProposalId === '') {
      return;
    }
    try {
      await contract.methods.setVote(inputVoteProposalId).call({ from: accounts[0] });
      await contract.methods.setVote(inputVoteProposalId).send({ from: accounts[0] });
      setHasVoted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputProposalIdChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputVoteProposalId(e.target.value);
    }
  };

  const hasAlreadyVoted = async () => {
    try {
      const voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
      setHasVoted(voter.hasVoted);
    } catch (error) {
      console.log(error);
    }
  };

  hasAlreadyVoted();

  return (
      <>
        {[WorflowStatus.RegisteringVoters, WorflowStatus.ProposalsRegistrationEnded, WorflowStatus.VotingSessionEnded].includes(workflowStatus) && (<>
          <NoActionRequested />
        </>)}

        {workflowStatus === WorflowStatus.ProposalsRegistrationStarted && (<>
          <input type="text" placeholder="Describe your proposal" value={inputProposal} onChange={(e) => setInputProposal(e.target.value)} />
          <button onClick={sendProposal}>Send proposal</button>
        </>)}

        {workflowStatus === WorflowStatus.VotingSessionStarted && (
          !hasVoted ? (<>
            <input type="number" placeholder="Vote for a proposal" value={inputVoteProposalId} onChange={handleInputProposalIdChange} />
            <button onClick={sendVote}>Send vote</button>
          </>) : (<>
            <div>You already voted</div>
          </>)
        )}

        {workflowStatus === WorflowStatus.VotesTallied && (<>
          <Tally />
        </>)}

      </>
  );
};

export default VoterAction;