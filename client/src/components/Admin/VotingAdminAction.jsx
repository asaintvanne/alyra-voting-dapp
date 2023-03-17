import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import * as WorflowStatus from "../models/WorflowStatus";
import {  toast } from 'react-toastify';


export const  VotingAdminAction = () => {
  const { state: { contract, accounts,workflowStatus } } = useEth();
  const [voterAddress, setVoteAddress] = useState("");
  const [currentStatus, setCurrentStatus] = useState(workflowStatus);

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
    try{
     await  contract.methods.addVoter(voterAddress).call({ from: accounts[0] })
      await contract.methods.addVoter(voterAddress).send({ from: accounts[0] });

    }
    catch(e)
    {
      console.log(e)
      toast.error(e.code, {
        position: toast.POSITION.TOP_LEFT
      });
    }
 
  };

  const startProposalsRegistering = async () => {
    contract.methods.startProposalsRegistering().call({ from: accounts[0] })
      .then(result => {
        return contract.methods.startProposalsRegistering().send({ from: accounts[0] });
      })
      .then(result => {
        console.log('Transition OK');
      })
      .catch(error => {
        console.error(error);
      })
    ;
  }
  const endProposalsRegistering = async () => {
    contract.methods.endProposalsRegistering().call({ from: accounts[0] })
      .then(result => {
        return contract.methods.endProposalsRegistering().send({ from: accounts[0] });
      })
      .then(result => {
        console.log('Transition OK');
      })
      .catch(error => {
        console.error(error);
      })
    ;
  }
  const startVotingSession = async () => {
    contract.methods.startVotingSession().call({ from: accounts[0] })
      .then(result => {
        return contract.methods.startVotingSession().send({ from: accounts[0] });
      })
      .then(result => {
        console.log('Transition OK');
      })
      .catch(error => {
        console.error(error);
      })
    ;
  }

  const endVotingSession = async () => {
    contract.methods.endVotingSession().call({ from: accounts[0] })
      .then(result => {
        return contract.methods.endVotingSession().send({ from: accounts[0] });
      })
      .then(result => {
        console.log('Transition OK');
      })
      .catch(error => {
        console.error(error);
      })
    ;
  }

  const tallyVotes = async () => {
    contract.methods.tallyVotes().call({ from: accounts[0] })
      .then(result => {
        return contract.methods.tallyVotes().send({ from: accounts[0] });
      })
      .then(result => {
        console.log('Transition OK');
      })
      .catch(error => {
        console.error(error);
      })
    ;
  }

  return (
    <div className="btns">
      {currentStatus === WorflowStatus.RegisteringVoters && (<>
        <div className="btn" onClick={startProposalsRegistering}>Démarrer la phase de propositions</div>
        <div>Ajouter des votants</div>
        <input
          type="text"
          placeholder="Adresse du voteur 0x..."
          value={voterAddress}
          onChange={(e) => setVoteAddress(e.target.value)}
        />

        <button type="submit" onClick={addVoter}>Ajouter</button>

      </>)}

      {currentStatus === WorflowStatus.ProposalsRegistrationStarted && (
        <div className="btn" onClick={endProposalsRegistering}>Terminer la phase de propositions</div>
      )}

      {currentStatus === WorflowStatus.ProposalsRegistrationEnded && (
        <div className="btn" onClick={startVotingSession}>Démarrer la phase de vote</div>
      )}

      {currentStatus === WorflowStatus.VotingSessionStarted && (
        <div className="btn" onClick={endVotingSession}>Terminer la phase de vote</div>
      )}

      {currentStatus === WorflowStatus.VotingSessionEnded && (
        <div className="btn" onClick={tallyVotes}>Dépouiller le vote</div>
      )}
    </div>
  );
}
