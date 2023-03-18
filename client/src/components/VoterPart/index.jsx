import useEth from "../../contexts/EthContext/useEth";
import VoterAction from "./VoterAction";
import NoRegisteredVoter from "./NoRegisteredVoter";

export const VoterPart = () => {
  const { state: { isRegistered } } = useEth();

  return (
    <>
    {
      !isRegistered ? <NoRegisteredVoter /> : <VoterAction />
    }
    </>
  );
}
