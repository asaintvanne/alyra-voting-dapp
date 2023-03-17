import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import { VotingAdminAction } from "../Admin/VotingAdminAction";
import { AddVotersEvents } from "./Events/AddVotersEvents";
import { VoterPart } from "../VoterPart";
import AccountInfo from "../AccountInfo";

export const Home = ()  => {
  const { state } = useEth();

  const BaseComponent =() =>{
    return( 
    <>
    <div className="topBar">
        <div className="title">Votery</div>
        <AccountInfo />
    </div>
  <div className="container">

    <div style={{width :'70%'}}>

    {state.owner === state.accounts[0] && <VotingAdminAction />}
    <VoterPart />

    </div>
 
    <div style={{width :'30%'}}>
    <AddVotersEvents />
    </div>

    </div>
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
