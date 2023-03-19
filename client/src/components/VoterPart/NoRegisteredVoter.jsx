import useEth from "../../contexts/EthContext/useEth";
import * as WorflowStatus from "../models/WorflowStatus";

function NoRegisteredVoter() {
  const { state: { workflowStatus } } = useEth();

  return (
    <>
      Vous n'êtes pas enregistré.
      { workflowStatus === WorflowStatus.RegisteringVoters ? " Vous pouvez demander à l'administrateur de vous enregistrer." : " Il n'est plus possible de participer au vote." }
    </>
  );
}
  
export default NoRegisteredVoter;