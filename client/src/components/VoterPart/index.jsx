import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
import VoterAction from "./VoterAction";
import NoRegisteredVoter from "./NoRegisteredVoter";

export const VoterPart = () => {
  const { state: { contract, accounts } } = useEth();
  const [isRegistered, setIsRegistered] = useState(false);

  const isVoterRegistered = async () => {
    try {
      const voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
      setIsRegistered(voter.isRegistered);
    } catch (error) {
      console.log(error);
    }

    return isRegistered;
  };

  isVoterRegistered();
   
  return (
    <>
    {
      !isRegistered ? <NoRegisteredVoter /> : <VoterAction />
    }
    </>
  );
}
