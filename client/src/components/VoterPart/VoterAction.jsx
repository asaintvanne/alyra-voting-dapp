import useEth from "../../contexts/EthContext/useEth";
import * as WorflowStatus from "../models/WorflowStatus";
import NoActionRequested from "./NoActionRequested";
import Proposal from "./Proposal";
import Vote from "./Vote";
import Tally from "./Tally";

function VoterAction () {
  const { state: { workflowStatus } } = useEth();

  return (
      <>
        {[WorflowStatus.RegisteringVoters, WorflowStatus.ProposalsRegistrationEnded, WorflowStatus.VotingSessionEnded].includes(workflowStatus) && (<>
          <NoActionRequested />
        </>)}

        {workflowStatus === WorflowStatus.ProposalsRegistrationStarted && (<>
          <Proposal />
        </>)}

        {workflowStatus === WorflowStatus.VotingSessionStarted && (
          <Vote />
        )}

        {workflowStatus === WorflowStatus.VotesTallied && (<>
          <Tally />
        </>)}
      </>
  );
};

export default VoterAction;