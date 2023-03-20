import { useEffect, useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";
import { addressCut } from "../../../libs/address_cut.js"

export const AddVotersEvents= () => {
  const { state: { contract , web3, txhash} } = useEth();
  const [oldEvents, setOldEvents] = useState([]);
  const [newEvents, setNewEvents] = useState([]);

  useEffect(() => {
    (async function () {
      const deployTx = await web3.eth.getTransaction(txhash);
      let oldEvents = await contract.getPastEvents("VoterRegistered", {
        fromBlock: deployTx.blockNumber,
        toBlock: "latest",
      });

      setOldEvents(oldEvents);

      await contract.events
        .VoterRegistered({ fromBlock: "latest" })
        .on("data", (event) => {
          setNewEvents([...newEvents, event]);
        })
        .on("error", (err) => console.log(err));
    })();
  }, []);

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
