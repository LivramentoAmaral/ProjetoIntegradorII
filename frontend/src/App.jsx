import TestApiConnection from "./api/test";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <br />

      <TestApiConnection/>
    </div>
  );
}

export default App;
