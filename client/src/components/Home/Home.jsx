import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import { VotingAdminAction } from "../Admin/VotingAdminAction";
import { AddVotersEvents } from "./Events/AddVotersEvents";
import { VoterPart } from "../VoterPart";

export const Home = ()  => {
  const { state } = useEth();

  const BaseComponent =() =>{
    return( 
    <>
    <AddVotersEvents />
 
    {state.owner === state.accounts[0] && <VotingAdminAction />}
    <VoterPart />
  </>)}
   
  return (
    <div className="demo">
 
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            <BaseComponent />
      }
    </div>
  );
}
