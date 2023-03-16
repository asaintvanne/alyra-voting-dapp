import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Vote () {
  const { state: { contract, web3, txhash, accounts } } = useEth();
  const [hasVoted, setHasVoted] = useState(false);
  const [inputProposalDescription, setInputProposalDescription] = useState("");
  const [inputVoteProposalId, setInputVoteProposalId] = useState("");
  const [proposalList, setProposalList] = useState([]);

  const sendVote = async e => {
    if (inputVoteProposalId === '0') {
      alert('Cannot vote for proposal 0');
      return;
    } else if (inputVoteProposalId === '') {
      return;
    }

		contract.methods.setVote(inputVoteProposalId).call({ from: accounts[0] })
			.then(result => {
				return contract.methods.setVote(inputVoteProposalId).send({ from: accounts[0] });
			})
			.then(result => {
				console.log("Vote registered");
				setHasVoted(true);
			})
			.catch(error => {
				console.log(error);
			})
		;
  };

  const handleInputProposalIdChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputVoteProposalId(e.target.value);
      getCurrentProposal(e.target.value);
    }
  };

  const getCurrentProposal = async (proposalId) => {
    if (proposalId !== "") {
        contract.methods.getOneProposal(proposalId).call({ from: accounts[0] })
					.then(result => {
						setInputProposalDescription(result.description);
					})
					.catch(error => {
						console.log(error);
					})
				;
    } else {
      setInputProposalDescription("");
    }
	};

	const hasAlreadyVoted = async () => {
		contract.methods.getVoter(accounts[0]).call({ from: accounts[0] })
			.then(voter => {
				setHasVoted(voter.hasVoted);
			})
			.catch(error => {
				console.log(error);
			})
	};
	
	const getProposalList = async () => {
			const deployTx = await web3.eth.getTransaction(txhash)
			contract.getPastEvents('ProposalRegistered', { fromBlock: deployTx.blockNumber, toBlock: 'latest'})
				.then(proposalRegisteredEvents => {
					setProposalList(proposalRegisteredEvents.map((item) => item.returnValues.proposalId));
				})
				.catch(error => {
					console.log(error);
				})
			;
	}

	hasAlreadyVoted();
	getProposalList();

  return (
      <>
        {!hasVoted ? (<>
            <select onChange={handleInputProposalIdChange}>
              <option value="">Choose a proposal</option>
              {proposalList.map((proposalId) => (
                <option key={proposalId} value={proposalId}>{proposalId}</option>
              ))}
            </select>
            <input type="text" placeholder="Select a proposal" value={inputProposalDescription} disabled="disabled" />
            <button onClick={sendVote}>Send vote</button>
          </>) : (<>
            <div>You already voted</div>
          </>)
        }
      </>
  );
};

export default Vote;