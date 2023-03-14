import useEth from "../../contexts/EthContext/useEth";
import VoterAction from "./VoterAction";
import NoRegisteredVoter from "./NoRegisteredVoter";

export const VoterPart = () => {
  const { state: { contract, accounts } } = useEth();

  const isVoterRegistered = async () => {
    let isRegistered = false;
    try {
      const voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
      isRegistered = voter.isRegistered;
    } catch (error) {
      console.log();
    }

    return isRegistered;
  };

  const isRegistered = isVoterRegistered();
   
  return (
    <>
    {
      !isRegistered ? <NoRegisteredVoter /> : <VoterAction />
    }
    </>
  );
}
