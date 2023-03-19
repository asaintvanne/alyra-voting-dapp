import { useEffect, useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";
import { addressCut } from "../../../libs/address_cut.js"

export const VotingEvents = () => {
  const {
    state: { contract, web3, txhash },
  } = useEth();
  const [oldEvents, setOldEvents] = useState([]);
  const [newEvents, setNewEvents] = useState([]);
  

  useEffect(() => {
    (async function () {
      const deployTx = await web3.eth.getTransaction(txhash);
      contract.getPastEvents("Voted", {
        fromBlock: deployTx.blockNumber,
        toBlock: "latest",
      }).then(results => {
        setOldEvents(results);
      });

    setOldEvents(oldEvents);

      await contract.events
        .Voted({ fromBlock: "earliest" })
        .on("data", (event) => {
          setNewEvents([...newEvents, event]);
        })
        .on("changed", (changed) => console.log(changed))
        .on("error", (err) => console.log(err))
        .on("connected", (str) => console.log(str));
    })();
  }, [contract]);

  return (
    <>
      <h4>Votes</h4>
      <ul>
        {oldEvents && oldEvents.map((event, i) => {return <li key={i}>{addressCut(event.returnValues.voter)} a voté pour la proposition {event.returnValues.proposalId}</li>})}
        {newEvents && newEvents.map((event, i) => {return <li key={i}>{addressCut(event.returnValues.voter)} a voté pour la proposition {event.returnValues.proposalId}</li>})}
      </ul>
    </>
  );
};
