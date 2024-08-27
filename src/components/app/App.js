import './App.css';
import {Route, Routes} from "react-router-dom";
import {Login} from "../login/Login";
import {MainSite} from "../mainSite/MainSite";
import {Register} from "../register/Register";

function App() {
    return (

        <Routes>
            <Route path={"/"} element={<MainSite/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>
        </Routes>

    );
}

export default App;
