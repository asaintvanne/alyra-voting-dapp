import { useEffect, useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";

export const ProposalsEvents = () => {
  const { state: { contract , web3, accounts, txhash} } = useEth();
  const [oldEvents, setOldEvents] = useState([]);
  const [newEvents, setNewEvents] = useState([]);

  useEffect(() => {
    (async function () {
      const deployTx = await web3.eth.getTransaction(txhash);
      let oldEvents = await contract.getPastEvents("ProposalRegistered", {
        fromBlock: deployTx.blockNumber,
        toBlock: "latest",
      });

      const proposalList = [];
      oldEvents.forEach(async (item) => {
        proposalList.push(await getProposal({id: item.returnValues.proposalId}));
        setOldEvents(proposalList);
      });
      
      contract.events
        .ProposalRegistered({ fromBlock: "latest" })
        .on("data", async (event) => {
          setNewEvents([...newEvents, await getProposal({id: event.returnValues.proposalId})]);
        })
        .on("error", (err) => console.log(err));
    })();
  }, []);

  async function getProposal(prop) {
    const proposal = await contract.methods.getOneProposal(prop.id).call({ from: accounts[0] });
    prop.description = proposal.description;
    return prop;
  }

  return (
   <>
    <h4>Propositions</h4>
    <ol>
      {oldEvents && oldEvents.map((item, i) => { return <li key={item.id}>{item.description}</li>})}
      {newEvents && newEvents.map((item, i) => { return <li key={item.id}>{item.description}</li>})}
    </ol>
   </>
  );
};
