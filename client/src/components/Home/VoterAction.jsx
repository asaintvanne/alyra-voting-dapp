import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

export const  VotingAdminAction = () => {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  useEffect(() => {
    console.log(contract);
    read();
  },[]);

  const read = async () => {
    const proposals = await contract.methods.getProposals().call({ from: accounts[0] });
    console.log(proposals);

  //   contract.methods.get().call((err, data) => {
  //     console.log(data);
  //  });
    // setValue(value);
  };


  // const vote = async () => {
  //   const value = await contract.methods.read().call({ from: accounts[0] });
  //   setValue(value);
  // };

  // const getProposals = () => {
  //   const proposals = contract.methods.proposalsArray().call({ from: accounts[0] });
  //   console.log(proposals);
  // }


  const vote = async e => {
   
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };

  return (
    <div className="btns">


      <button onClick={vote}>
        Voter ! 
      </button>

        <input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />
        <select name="cars" id="cars">
          {/* {contract.proposalsArray.call({ from: accounts[0] }).map((proposal, index) => {
            return <option value={index}>{proposal}</option>
          })} */}
        </select>
        <button type="submit" onClick={vote}>Voter</button>


    </div>
  );
}


