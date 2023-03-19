import useEth from "../../contexts/EthContext/useEth";
import * as WorflowStatus from "../models/WorflowStatus";
import NoActionRequested from "./NoActionRequested";
import Proposal from "./Proposal";
import Vote from "./Vote";
import Tally from "./Tally";

function VoterAction () {
  const { state: { workflowStatus } } = useEth();

  return (
      <div style={{marginTop :10}}>
      <h3>Partie Votant</h3>
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
      </div>
  );
};

export default VoterAction;