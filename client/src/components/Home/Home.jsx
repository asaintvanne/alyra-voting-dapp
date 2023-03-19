import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import { VotingAdminAction } from "../Admin/VotingAdminAction";
import { AddVotersEvents } from "./Events/AddVotersEvents";
import { VoterPart } from "../VoterPart";
import AccountInfo from "../AccountInfo";
import * as WorflowStatus from "../models/WorflowStatus";

export const Home = ()  => {
  const { state } = useEth();

  const BaseComponent =() =>{
    return( 
    <>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <AccountInfo />
    </nav>

    <main role="main" class="container">
      <div class="row">
        <div class="col text-center current-status">{WorflowStatus.getWorkflowStatus(state.workflowStatus)}</div>
      </div>
      {state.owner === state.accounts[0] && <VotingAdminAction />}
      <VoterPart />
      <AddVotersEvents />
    </main>

  </>)}
   
  return (
    <div className="">
 
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            <BaseComponent />
      }
    </div>
  );
}
