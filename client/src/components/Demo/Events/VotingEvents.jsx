import { useEffect, useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";

export const VotingEvents = () => {
  const {
    state: { contract, accounts },
  } = useEth();
  const [oldEvents, setOldEvents] = useState([]);
  const [newEvents, setNewEvents] = useState([]);


  // event VoterRegistered(address voterAddress); 
  // event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
  // event ProposalRegistered(uint proposalId);
  // event Voted (address voter, uint proposalId);
  

  useEffect(() => {
    (async function () {
    
      await contract.events
        .Voted({ fromBlock: "earliest" })
        .on("data", (event) => {
          console.log("ici",event)
          console.log(event.returnValues);
          // setEventValue(lesevents);
          // setNewEvents([...newEvents, event]);
        })
        .on("changed", (changed) => console.log(changed))
        .on("error", (err) => console.log(err))
        .on("connected", (str) => console.log(str));
    })();
  }, [contract]);

  return (
   <div>
    <div>Historique des vots</div>
      {oldEvents && oldEvents.map((event) => {return <p>a{event.returnValues.voterAddress}</p>})}
      {newEvents && newEvents.map((event) => {return <p>b{event.returnValues.voterAddress}</p>})}

      {/* {EventValue && <p>{EventValue}</p>} */}
   </div>
  );
};
