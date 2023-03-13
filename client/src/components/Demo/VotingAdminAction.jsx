import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

export const RegisteringVoters = 0;
export const ProposalsRegistrationStarted = 1;
export const ProposalsRegistrationEnded = 2;
export const VotingSessionStarted = 3;
export const VotingSessionEnded = 4;


export const  VotingAdminAction = () => {
  const { state: { contract, accounts,workflowStatus } } = useEth();
  const [voterAddress, setVoteAddress] = useState("");
  const [currentStatus, setCurrentStatus] = useState(workflowStatus);
  useEffect(() => {
     getStatus();
  },[]);

  useEffect(() => {
    (async function () {
    
      await contract.events
        .WorkflowStatusChange({ fromBlock: "earliest" })
        .on("data", (event) => {
    
          setCurrentStatus(event.returnValues.newStatus);
        })
        .on("changed", (changed) => console.log(changed))
        .on("error", (err) => console.log(err))
        .on("connected", (str) => console.log(str));
    })();
  }, [contract]);

 

  const addVoter = async () => {
    console.log(voterAddress)
    await contract.methods.addVoter(voterAddress).send({ from: accounts[0] });
  };

  const getStatus = async () => {
    console.log(workflowStatus)
  } 

  const startProposalsRegistering = async () => {
    await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
  }
  const endProposalsRegistering = async () => {
    await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
  }
  const startVotingSession = async () => {
    await contract.methods.startVotingSession().send({ from: accounts[0] });
  }

  const endVotingSession = async () => {
    await contract.methods.endVotingSession().send({ from: accounts[0] });
  }

  return (
    <div className="btns">
      {currentStatus == RegisteringVoters && (
    
      <div className="btn" onClick={() =>  startProposalsRegistering()}>Démarrer la phase de propostions</div>
      )}
      {currentStatus == ProposalsRegistrationStarted && (
      <>
      <div className="btn" onClick={() =>  endProposalsRegistering()}>Terminer la phase de propostions</div>
      </>)}

      {currentStatus == ProposalsRegistrationEnded && (
     
      <div className="btn" onClick={() =>  startVotingSession()}>Démarrer la phase de vote</div>
      )}

    {currentStatus ==  VotingSessionStarted&& (
    
    <div className="btn" onClick={() =>  endVotingSession()}>Terminer la phase de vote</div>
    )}  

 
      {currentStatus == RegisteringVoters && (<>
        <div>Ajouter des voteurs</div>
        <input
          type="text"
          placeholder="uint"
          value={voterAddress}
          onChange={(e) => setVoteAddress(e.target.value)}
          // onChange={() => setVoteAddress()}
        />
       
        <button type="submit" onClick={addVoter}>Ajouter</button>

        </>)}
    </div>
  );
}


