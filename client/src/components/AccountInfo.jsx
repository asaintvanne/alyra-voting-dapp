import { useEth } from "../contexts/EthContext";

export default function AccountInfo() {
  const { state: { accounts } } = useEth();
   
  return(
    <> <div >Connecté sur {accounts?.length > 0 ? accounts[0] : ""}</div></>
     )

};
