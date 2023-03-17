import { EthProvider } from "./contexts/EthContext";

import { Home} from "./components/Home/Home";
import AccountInfo from "./components/AccountInfo";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <EthProvider>
      <div id="App">
     
      <ToastContainer />
    
         
          <Home />         
        </div>
   
    </EthProvider>
  );
}

export default App;
