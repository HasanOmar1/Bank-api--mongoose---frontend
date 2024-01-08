import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BankDataProvider from "./Context/bankData";
import UserDetails from "./pages/UserDetail/UserDetails";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import CreateUserProvider from "./Context/createUser";

function App() {
  return (
    <>
      <BankDataProvider>
        <CreateUserProvider>
          <Routes>
            <Route path={"/"} exact element={<SignIn />} />
            <Route path={"/sign-up"} element={<SignUp />} />
            <Route path={"/data"} exact element={<Home />} />
            <Route path={"/data/:id"} element={<UserDetails />} />
          </Routes>
        </CreateUserProvider>
      </BankDataProvider>
    </>
  );
}

export default App;
