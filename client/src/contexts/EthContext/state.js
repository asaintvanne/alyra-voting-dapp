const actions = {
  init: "INIT",
  SET_WORKFLOW_STATUS: "SET_WORKFLOW_STATUS",
  ADD_VOTERS: "ADD_VOTERS",
};

const initialState = {
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    case actions.SET_WORKFLOW_STATUS:
      return { ...state, workflowStatus: data };
    case actions.ADD_VOTERS:
      return { ...state, isRegistered: data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
