import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BankDataProvider from "./Context/bankData";
import UserDetails from "./pages/UserDetail/UserDetails";

function App() {
  return (
    <>
      <BankDataProvider>
        <Routes>
          <Route path={"/"} exact element={<Home />} />
          <Route path={"/:id"} element={<UserDetails />} />
        </Routes>
      </BankDataProvider>
    </>
  );
}

export default App;
