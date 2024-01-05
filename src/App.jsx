import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BankDataProvider from "./Context/bankData";

function App() {
  return (
    <>
      <BankDataProvider>
        <Routes>
          <Route path={"/"} exact element={<Home />} />
        </Routes>
      </BankDataProvider>
    </>
  );
}

export default App;
