import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
import { toast } from 'react-toastify';

function Tally() {
    const { state: { contract, accounts } } = useEth();
    const [winningProposal, setWinningProposal] = useState({description: 'GENESIS', voteCount: 0});

    const getWinningProposal = async () => {
      contract.methods.winningProposalID().call({ from: accounts[0] })
        .then(winningProposalId => {
          return contract.methods.getOneProposal(winningProposalId).call({ from: accounts[0] });
        })
        .then(proposal => {
          setWinningProposal(proposal);
        })
        .catch(error => {
          console.log(error);
        })
      ;
    };

    getWinningProposal();

    return (
      <>
      {winningProposal.description == 'GENESIS' ? 
        "Aucune proposition n'a remporté de voix." :
        "La proposition gagnante est \"" + winningProposal.description + "\" avec " + winningProposal.voteCount + " voix."
      }
      </>
    );
  }
  
  export default Tally;