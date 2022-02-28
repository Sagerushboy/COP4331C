import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardPage from "./pages/CardPage";
// import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" element={<LoginPage />} />
          <Route path="cards" element={<CardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
