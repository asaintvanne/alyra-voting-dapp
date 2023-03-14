import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import {Demo} from "./components/Demo";
import {VoterPart} from "./components/VoterPart";
import Footer from "./components/Footer";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
         
         
          <Demo />
          <VoterPart />
         
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
