import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoRegisteredVoter from "./NoRegisteredVoter";

export const VoterPart = ()  => {
  const { contract, accounts, state } = useEth();
  const [voter, setVoter] = useState({isRegistered: false, hasVoted: false, votedProposalId: 0});

  useEffect(async () => {
    const voter = await contract.methods.getVoter(accounts[0]).send({ from: accounts[0] });
    console.log(voter);
    setVoter();
  },[]);

  const VoterPart =() => {
    return(<>
        

    </>)
  }
   
  return (
    <div>
    {
      !voter.isRegistered ? <NoRegisteredVoter /> : <VoterPart />
    }
    </div>
  );
}
