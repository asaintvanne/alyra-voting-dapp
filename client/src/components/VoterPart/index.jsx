import useEth from "../../contexts/EthContext/useEth";
import { useEffect, useState } from "react";
import VoterAction from "./VoterAction";
import NoRegisteredVoter from "./NoRegisteredVoter";

export const VoterPart = () => {
  const { state: { contract, accounts, isRegistered } } = useEth();



   
  return (
    <>
    {
      !isRegistered ? <NoRegisteredVoter /> : <VoterAction />
    }
    </>
  );
}
