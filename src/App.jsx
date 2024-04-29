import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokemon from "./pages/Pokemon";
import PokemonDetails from "./pages/PokemonDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
