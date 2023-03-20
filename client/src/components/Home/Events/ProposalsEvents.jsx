import { useEffect, useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";

export const ProposalsEvents = () => {
  const { state: { contract , web3, txhash} } = useEth();
  const [oldEvents, setOldEvents] = useState([]);
  const [newEvents, setNewEvents] = useState([]);

  useEffect(() => {
    (async function () {
      const deployTx = await web3.eth.getTransaction(txhash);
      let oldEvents = await contract.getPastEvents("ProposalRegistered", {
        fromBlock: deployTx.blockNumber,
        toBlock: "latest",
      });

      setOldEvents(oldEvents);

      contract.events
        .ProposalRegistered({ fromBlock: "latest" })
        .on("data", (event) => {
          setNewEvents([...newEvents, event]);
        })
        .on("error", (err) => console.log(err));
    })();
  }, []);

  return (
   <>
    <h4>Propositions</h4>
    <ul>
      {oldEvents && oldEvents.map((event, i) => { return <li key={i}>{event.returnValues.proposalId}</li>})}
      {newEvents && newEvents.map((event, i) => { return <li key={i}>{event.returnValues.proposalId}</li>})}
    </ul>
   </>
  );
};
