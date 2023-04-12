import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import List from "./pages/List";
import Designer from "./pages/Designer";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<List />} />
          <Route path="/user/:username/:inputType/:id" element={<Designer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
