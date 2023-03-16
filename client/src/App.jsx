import { EthProvider } from "./contexts/EthContext";

import { Home} from "./components/Home/Home";
import AccountInfo from "./components/AccountInfo";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
         
          <AccountInfo />
          <Home />         
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
