import { prototype } from "@truffle/hdwallet-provider";
import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

export const VoterAction = () => {
  const { state: { contract, accounts } } = useEth();
  const [voter, setVoter] = useState({isRegistered: false, hasVoted: false, votedProposalId: 0});

  useEffect(() => {
    console.log(contract);

  },[]);

  const getVoter = async () => {
    const voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
    console.log(voter);
    setVoter(voter);
  };

  return (
<div>

    {
        voter.isRegistered && (
    
        <div className="btn" onClick={() =>  startProposalsRegistering()}>Démarrer la phase de propostions</div>
        )}

</div>

  );
}


