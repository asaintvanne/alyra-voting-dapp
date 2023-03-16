import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";

function Tally() {
    const { state: { contract, accounts } } = useEth();
    const [winningProposal, setWinningProposal] = useState({description: 'GENESIS2', voteCount: 0});

    const getWinningProposal = async () => {
        try {
            const winningProposalID = await contract.methods.winningProposalID().call({ from: accounts[0] });
            const result = await contract.methods.getOneProposal(winningProposalID).call({ from: accounts[0] });
            setWinningProposal(result);
        } catch (error) {
            console.log(error);
        }
    };

    getWinningProposal();

    return (
      <>
        Proposal "{winningProposal.description}" wins with {winningProposal.voteCount} vote{winningProposal.voteCount > 1 ? 's' : ''} !
      </>
    );
  }
  
  export default Tally;