import { useEffect, useState } from "react";
import { actions } from "../../../contexts/EthContext";
import useEth from "../../../contexts/EthContext/useEth";

export const ProposalsEvents = () => {
  const { state: { contract } } = useEth();
  const [oldEvents, setOldEvents] = useState([]);
  const [newEvents, setNewEvents] = useState([]);

  useEffect(() => {
    (async function () {
      let oldEvents = await contract.getPastEvents("ProposalRegistered", {
        fromBlock: 0,
        toBlock: "latest",
      });

      setOldEvents(oldEvents);

      contract.events
        .ProposalRegistered({ fromBlock: "latest" })
        .on("data", (event) => {
          setNewEvents((currentEvents) => [...currentEvents,event]);
        })
        .on("changed", (changed) => console.log(changed))
        .on("error", (err) => console.log(err))
        .on("connected", (str) => console.log(str));
    })();
  }, []);

  return (
   <>
    <h4>Propositions</h4>
    <ul>
      {oldEvents && oldEvents.map((event, i) => { return <li key={event.returnValues.proposalId}>{event.returnValues.proposalId}</li>})}
      {newEvents && newEvents.map((event, i) => { return <li key={event.returnValues.proposalId}>{event.returnValues.proposalId}</li>})}
    </ul>
   </>
  );
};
