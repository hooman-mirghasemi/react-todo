import StopWatch from "./components/StopWatch";
import Todos from "./components/Todos";
import { UserContext } from "./contexts/UserContext";

function App() {

  let user = {name: 'hooman'};
  
  return (
    <div className="bg-gray-100">
      <UserContext.Provider value={user}>
        <Todos />
      </UserContext.Provider>
      {/* <StopWatch /> */}
    </div>
  )
}

export default App
