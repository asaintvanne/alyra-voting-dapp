import { useEth } from "../contexts/EthContext";
import { getWorkflowStatus } from "./models/WorflowStatus";

export default function AccountInfo() {
  const { state: { accounts, workflowStatus , owner} } = useEth();
   
  return(
    <div style={{flexDirection : 'row'}}> 
    <div >Connecté sur {accounts?.length > 0 ? accounts[0] : ""}</div>
    
    <div >Statut : {getWorkflowStatus(workflowStatus)}</div>

    <div>{owner == accounts[0] ? "Admin" :""}</div>
    </div>
     )

};
