import { useEffect, useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";

export const AddVotersEvents= () => {
  const { state: { contract } } = useEth();
  const [oldEvents, setOldEvents] = useState([]);
  const [newEvents, setNewEvents] = useState([]);


  // event VoterRegistered(address voterAddress); 
  // event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
  // event ProposalRegistered(uint proposalId);
  // event Voted (address voter, uint proposalId);
  

  useEffect(() => {
    (async function () {
      let oldEvents = await contract.getPastEvents("VoterRegistered", {
        fromBlock: 0,
        toBlock: "latest",
      });

      setOldEvents(oldEvents);

      await contract.events
        .VoterRegistered({ fromBlock: "earliest" })
        .on("data", (event) => {
          setNewEvents((currentEvents) => [...currentEvents,event]);
        })
        .on("changed", (changed) => console.log(changed))
        .on("error", (err) => console.log(err))
        .on("connected", (str) => console.log(str));
    })();
  }, [contract]);

  return (
   <div>
    <div>Voters</div>
      {oldEvents && oldEvents.map((event) => {return <p>a{event.returnValues.voterAddress}</p>})}
      {newEvents && newEvents.map((event) => {return <p>b{event.returnValues.voterAddress}</p>})}
   </div>
  );
};
