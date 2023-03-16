import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";

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
        Proposal "{winningProposal.description}" wins with {winningProposal.voteCount} vote{winningProposal.voteCount > 1 ? 's' : ''} !
      </>
    );
  }
  
  export default Tally;