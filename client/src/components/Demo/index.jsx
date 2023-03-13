import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import { VotingAdminAction } from "./VotingAdminAction";
import { AddVotersEvents } from "./Events/AddVotersEvents";

export const  Demo = ()  => {
  const { state } = useEth();

  const Demo =() =>{
    return( 
    <>
    <AddVotersEvents />
 
    {state.owner == state.accounts[0] && <VotingAdminAction />}
  </>)}
   
  return (
    <div className="demo">
 
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            <Demo />
      }
    </div>
  );
}
