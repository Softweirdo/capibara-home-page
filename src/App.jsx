import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Home from './Home';
import Dashboard from './Dashboard';
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </HashRouter>
    </>
  );
}

        export default App;
