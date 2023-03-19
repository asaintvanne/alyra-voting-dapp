import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import * as WorflowStatus from "../models/WorflowStatus";
import { toast } from 'react-toastify';
import { actions } from "../../contexts/EthContext";


export const  VotingAdminAction = () => {
  const { state: { contract, accounts,workflowStatus, isRegistered } , dispatch} = useEth();
  const [voterAddress, setVoteAddress] = useState("");
  const [currentStatus, setCurrentStatus] = useState(workflowStatus);

  useEffect(() => {
    (async function () {
      await contract.events
        .WorkflowStatusChange({ fromBlock: "earliest" })
        .on("data", (event) => {
          dispatch({ type:  actions.SET_WORKFLOW_STATUS, data:  event.returnValues.newStatus });
          setCurrentStatus(event.returnValues.newStatus);
        })
        .on("changed", (changed) => console.log(changed))
        .on("error", (err) => console.log(err))
        .on("connected", (str) => console.log(str));
    })();
  }, [contract]);

 

  const addVoter = async () => {
    contract.methods.addVoter(voterAddress).call({ from: accounts[0] })
      .then(result => {
        return contract.methods.addVoter(voterAddress).send({ from: accounts[0] });
      })
      .then(result => {
        setVoteAddress("");
        dispatch({ type: actions.ADD_VOTERS, data: isRegistered || (accounts[0] == voterAddress) });
        toast.success("La participation du votant est enregistrée", {
          position: toast.POSITION.TOP_LEFT
        });
      })
      .catch(error => {
        toast.error("Impossible d'ajouter un votant", {
          position: toast.POSITION.TOP_LEFT
        });
      })
    ;
 
  };

  const startProposalsRegistering = async () => {
    contract.methods.startProposalsRegistering().call({ from: accounts[0] })
      .then(result => {
        return contract.methods.startProposalsRegistering().send({ from: accounts[0] });
      })
      .then(result => {
        toast.success("Transition vers " + WorflowStatus.getWorkflowStatus(result.events.WorkflowStatusChange.returnValues.newStatus) + " effectuée", {
          position: toast.POSITION.TOP_LEFT
        });
      })
      .catch(error => {
        toast.error("Impossible de changer le statut", {
          position: toast.POSITION.TOP_LEFT
        });
      })
    ;
  }
  const endProposalsRegistering = async () => {
    contract.methods.endProposalsRegistering().call({ from: accounts[0] })
      .then(result => {
        return contract.methods.endProposalsRegistering().send({ from: accounts[0] });
      })
      .then(result => {
        toast.success("Transition vers " + WorflowStatus.getWorkflowStatus(result.events.WorkflowStatusChange.returnValues.newStatus) + " effectuée", {
          position: toast.POSITION.TOP_LEFT
        });
      })
      .catch(error => {
        toast.error("Impossible de changer le statut", {
          position: toast.POSITION.TOP_LEFT
        });
      })
    ;
  }
  const startVotingSession = async () => {
    contract.methods.startVotingSession().call({ from: accounts[0] })
      .then(result => {
        return contract.methods.startVotingSession().send({ from: accounts[0] });
      })
      .then(result => {
        toast.success("Transition vers " + WorflowStatus.getWorkflowStatus(result.events.WorkflowStatusChange.returnValues.newStatus) + " effectuée", {
          position: toast.POSITION.TOP_LEFT
        });
      })
      .catch(error => {
        toast.error("Impossible de changer le statut", {
          position: toast.POSITION.TOP_LEFT
        });
      })
    ;
  }

  const endVotingSession = async () => {
    contract.methods.endVotingSession().call({ from: accounts[0] })
      .then(result => {
        return contract.methods.endVotingSession().send({ from: accounts[0] });
      })
      .then(result => {
        toast.success("Transition vers " + WorflowStatus.getWorkflowStatus(result.events.WorkflowStatusChange.returnValues.newStatus) + " effectuée", {
          position: toast.POSITION.TOP_LEFT
        });
      })
      .catch(error => {
        toast.error("Impossible de changer le statut", {
          position: toast.POSITION.TOP_LEFT
        });
      })
    ;
  }

  const tallyVotes = async () => {
    contract.methods.tallyVotes().call({ from: accounts[0] })
      .then(result => {
        return contract.methods.tallyVotes().send({ from: accounts[0] });
      })
      .then(result => {
        toast.success("Transition vers " + WorflowStatus.getWorkflowStatus(result.events.WorkflowStatusChange.returnValues.newStatus) + " effectuée", {
          position: toast.POSITION.TOP_LEFT
        });
      })
      .catch(error => {
        toast.error("Impossible de changer le statut", {
          position: toast.POSITION.TOP_LEFT
        });
      })
    ;
  }

  return (
    <div className="jumbotron text-center">
      {currentStatus === WorflowStatus.RegisteringVoters && (
      <>
        <div className="row">
          <div className="col">
            <input
              id="input_voter"
              type="text"
              placeholder="Adresse du votant 0x..."
              value={voterAddress}
              onChange={(e) => setVoteAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button type="submit" className="btn btn-primary mt-1" onClick={addVoter}>Ajouter</button>
          </div>
        </div>
        <hr />
        <button type="button" className="btn btn-primary" onClick={startProposalsRegistering}>Démarrer la phase de propositions</button>
      </>)}

      {currentStatus === WorflowStatus.ProposalsRegistrationStarted && (
        <button type="button" className="btn btn-primary" onClick={endProposalsRegistering}>Terminer la phase de propositions</button>
      )}

      {currentStatus === WorflowStatus.ProposalsRegistrationEnded && (
        <button type="button" className="btn btn-primary" onClick={startVotingSession}>Démarrer la phase de vote</button>
      )}

      {currentStatus === WorflowStatus.VotingSessionStarted && (
        <button type="button" className="btn btn-primary" onClick={endVotingSession}>Terminer la phase de vote</button>
      )}

      {currentStatus === WorflowStatus.VotingSessionEnded && (
        <button type="button" className="btn btn-primary" onClick={tallyVotes}>Dépouiller le vote</button>
      )}

      {currentStatus === WorflowStatus.VotesTallied && (<>
        Aucune action n'est demandée lors de cette phase.
      </>)}
    </div>
  );
}
