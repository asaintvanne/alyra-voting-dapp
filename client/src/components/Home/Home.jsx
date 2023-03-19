import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import { VotingAdminAction } from "../Admin/VotingAdminAction";
import { AddVotersEvents } from "./Events/AddVotersEvents";
import { ProposalsEvents } from "./Events/ProposalsEvents";
import { VotingEvents } from "./Events/VotingEvents";
import { VoterPart } from "../VoterPart";
import AccountInfo from "../AccountInfo";
import * as WorflowStatus from "../models/WorflowStatus";

export const Home = ()  => {
  const { state } = useEth();

  const BaseComponent =() =>{
    return( 
    <>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <AccountInfo />
    </nav>

    <main role="main" className="container">
      <div className="row">
        <div className="col text-center current-status">{WorflowStatus.getWorkflowStatus(state.workflowStatus)}</div>
      </div>
      {state.owner === state.accounts[0] && <VotingAdminAction />}
      <VoterPart />

      {state.isRegistered &&
        <div className="jumbotron">
          <div className="row">
            <div className="col-sm">
              <AddVotersEvents />
            </div>
            <div className="col-sm">
              <ProposalsEvents />
            </div>
            <div className="col-sm">
              <VotingEvents />
            </div>
          </div>
        </div>
      }
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
