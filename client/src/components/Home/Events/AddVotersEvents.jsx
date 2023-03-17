import { useEffect, useState } from "react";
import { actions } from "../../../contexts/EthContext";
import useEth from "../../../contexts/EthContext/useEth";

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
           //on gere le cas où l'admin s'ajoute lui même pour que la partie voter s'affiche de suite
           //et aussi le cas ou le voter est sur le site et que l'admin l'ajoute en meme temps : pas besoin de rafraichir la page pour le user

          dispatch({ type:  actions.ADD_VOTERS, data: accounts[0] == event.returnValues.voterAddress})
          setNewEvents([...newEvents, event]);
        })
        .on("changed", (changed) => console.log(changed))
        .on("error", (err) => console.log(err))
        .on("connected", (str) => console.log(str));
    })();
  }, [contract]);

  return (
   <div>
    <div>Voters</div>
      {oldEvents && oldEvents.map((event) => {return <p>{event.returnValues.voterAddress}</p>})}
      {newEvents && newEvents.map((event) => {return <p>{event.returnValues.voterAddress}</p>})}
   </div>
  );
};
