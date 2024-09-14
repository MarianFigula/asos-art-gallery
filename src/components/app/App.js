import './App.css';
import {Route, Routes} from "react-router-dom";
import {Login} from "../login/Login";
import {MainSite} from "../mainSite/MainSite";
import {Register} from "../register/Register";
import {Header} from "../header/Header";
import {AdminSite} from "../adminSite/AdminSite";
import {UserProfile} from "../userProfile/UserProfile";
import {Footer} from "../footer/Footer";
import {AdminEditUser} from "../adminEditUser/AdminEditUser";
import {UserArts} from "../userArts/UserArts";
import {UserReviews} from "../userReviews/UserReviews";
import {ForgotPassword} from "../forgotPassword/ForgotPassword";
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path={"/"} element={<MainSite/>}/>
                <Route path={"/user-profile"} element={<UserProfile/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/forgot-password"} element={<ForgotPassword/>}/>
                <Route path={"/admin"} element={<AdminSite/>}/>
                <Route path={"/admin-edit-user/:id"} element={<AdminEditUser/>}/>
                <Route path={"/my-arts"} element={<UserArts/>}/>
                <Route path={"/review-history"} element={<UserReviews/>}/>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
