import { useEffect, useState } from "react";
import { actions } from "../../../contexts/EthContext";
import useEth from "../../../contexts/EthContext/useEth";
import { addressCut } from "../../../libs/address_cut.js"

export const AddVotersEvents= () => {
  const { state: { contract , accounts} ,dispatch } = useEth();
  const [oldEvents, setOldEvents] = useState([]);
  const [newEvents, setNewEvents] = useState([]);


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
   <>
    <h4>Votants</h4>
    <ul>
      {oldEvents && oldEvents.map((event, i) => {return <li key={i}>{addressCut(event.returnValues.voterAddress)}</li>})}
      {newEvents && newEvents.map((event, i) => {return <li key={i}>{addressCut(event.returnValues.voterAddress)}</li>})}
    </ul>

   </>
  );
};
