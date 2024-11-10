import './App.css';
import {Route, Routes} from "react-router-dom";
import {LoginSite} from "../../sites/loginSite/LoginSite";
import {MainSite} from "../../sites/mainSite/MainSite";
import {RegisterSite} from "../../sites/registerSite/RegisterSite";
import {Header} from "../header/Header";
import {AdminSite} from "../../sites/adminSite/AdminSite";
import {UserProfileSite} from "../../sites/userProfileSite/UserProfileSite";
import {Footer} from "../footer/Footer";
import {AdminEditUserSite} from "../../sites/adminEditUserSite/AdminEditUserSite";
import {UserArtsSite} from "../../sites/userArtsSite/UserArtsSite";
import {UserReviewsSite} from "../../sites/userReviewsSite/UserReviewsSite";
import {ForgotPasswordSite} from "../../sites/forgotPasswordSite/ForgotPasswordSite";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {CreateArtSite} from "../../sites/createArtSite/CreateArtSite";
import CartSite from "../../sites/cartSite/CartSite";
import PaymentSite from "../../sites/paymentSite/PaymentSite";


function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path={"/"} element={<MainSite/>}/>
                <Route path={"/user-profile"} element={<UserProfileSite/>}/>
                <Route path={"/loginSite"} element={<LoginSite/>}/>
                <Route path={"/registerSite"} element={<RegisterSite/>}/>
                <Route path={"/forgot-password"} element={<ForgotPasswordSite/>}/>
                <Route path={"/admin"} element={<AdminSite/>}/>
                <Route path={"/admin-edit-user/:id"} element={<AdminEditUserSite/>}/>
                <Route path={"/my-arts"} element={<UserArtsSite/>}/>
                <Route path={"/review-history"} element={<UserReviewsSite/>}/>
                <Route path={"/upload-art"} element={<CreateArtSite/>}/>
                <Route path={"/cart"} element={<CartSite/>}/>
                <Route path={"/payment"} element={<PaymentSite/>}/>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
