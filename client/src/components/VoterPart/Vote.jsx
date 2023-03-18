import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { toast } from 'react-toastify';

function Vote () {
  const { state: { contract, web3, txhash, accounts } } = useEth();
  const [hasVoted, setHasVoted] = useState(false);
  const [inputProposalDescription, setInputProposalDescription] = useState("");
  const [inputVoteProposalId, setInputVoteProposalId] = useState("");
  const [proposalList, setProposalList] = useState([]);

  const sendVote = async e => {
    if (inputVoteProposalId === '0') {
      toast.error("Impossible de voter pour la proposition 0", {
        position: toast.POSITION.TOP_LEFT
      });
      return;
    } else if (inputVoteProposalId === '') {
      return;
    }

		contract.methods.setVote(inputVoteProposalId).call({ from: accounts[0] })
			.then(result => {
				return contract.methods.setVote(inputVoteProposalId).send({ from: accounts[0] });
			})
			.then(result => {
        toast.success("Le vote pour la proposition " + inputVoteProposalId + " est enregistré", {
          position: toast.POSITION.TOP_LEFT
        });
				setHasVoted(true);
			})
			.catch(error => {
        toast.error("Impossible d'enregistrer le vote", {
          position: toast.POSITION.TOP_LEFT
        });
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
            toast.error("Impossible de récupérer le libellé de la proposition", {
              position: toast.POSITION.TOP_LEFT
            });
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
        toast.error("Impossible de récupérer l'état du votant", {
          position: toast.POSITION.TOP_LEFT
        });
			})
	};
	
	const getProposalList = async () => {
			const deployTx = await web3.eth.getTransaction(txhash)
			contract.getPastEvents('ProposalRegistered', { fromBlock: deployTx.blockNumber, toBlock: 'latest'})
				.then(proposalRegisteredEvents => {
					setProposalList(proposalRegisteredEvents.map((item) => item.returnValues.proposalId));
				})
				.catch(error => {
          toast.error("Impossible de récupérer la liste des propositions", {
            position: toast.POSITION.TOP_LEFT
          });
				})
			;
	}

	hasAlreadyVoted();
	getProposalList();

  return (
      <>
        {!hasVoted ? (<>
            <select onChange={handleInputProposalIdChange}>
              <option value="">Choisir une proposition</option>
              {proposalList.map((proposalId) => (
                <option key={proposalId} value={proposalId}>{proposalId}</option>
              ))}
            </select>
            <input type="text" placeholder="Selectionnez une proposition" value={inputProposalDescription} disabled="disabled" />
            <button onClick={sendVote}>Voter</button>
          </>) : (<>
            <div>Vous avez déjà voté.</div>
          </>)
        }
      </>
  );
};

export default Vote;