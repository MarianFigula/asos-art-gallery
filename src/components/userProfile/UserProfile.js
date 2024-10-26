import React from "react";
import "./UserProfile.css"
import "../form/form.css"
import UserPhoto from "../../assets/user-pictures/22.png"
import AdminPhoto from "../../assets/user-pictures/21.png"
import {useNavigate} from "react-router-dom";

// TODO: pozriet ci to je admin a ked hej podla
//  toho menit fotku a zobrazit button pre administratora


// TODO: nacitat data podla idecka
//  ktore pride alebo ktore je niekde ulozene,
//  alebo cez token to spravim, treba porozmyslat

// TODO: pridat dalsim buttonom logiku - redirect
//  na dalsiu stranku

export function UserProfile() {

    const navigate = useNavigate();
    const email = "alicebobova@gmail.com"


    // TODO mozno osdtranit tie states ked budem checkovat email cez ls
    const handleMyPostsClick = () => {
        navigate(`/my-arts`, { state: { email: email } });
    };

    // TODO mozno osdtranit tie states ked budem checkovat email cez ls
    const handleReviewHistoryClick = () => {
        navigate(`/review-history`, { state: { email: email } });
    };
    return (
        <>
            <div className="profile-wrapper mb-5 mt-7">
                <div className="profile-picture">
                    <img src={UserPhoto} alt="ProfilePicture"/>
                </div>
                <div className="profile-details mb-1">
                    <div className="">
                        <h2 className="text-center">Your profile</h2>
                        <form action="" className="mb-3">
                            <div className="info">
                                <label className="label mb-0-25">Username</label>
                                <input type="text"
                                       defaultValue="alice"
                                       className="input"/>
                            </div>
                            <div className="info mb-1">
                                <label className="label mb-0-25">Email</label>
                                <input type="text"
                                       defaultValue="alicebobova@gmail.com"
                                       className="input"/>
                            </div>
                            <div className="submit-button-wrapper">
                                <button className="button-confirm">Apply changes</button>
                            </div>
                        </form>
                        <div className="buttons">
                            {/*<button className="button-dark">order history</button>*/}
                            <button
                                className="button-dark"
                                onClick={handleMyPostsClick}
                            >
                                My posts
                            </button>
                            <button
                                className="button-dark"
                                onClick={handleReviewHistoryClick}
                            >
                                Review history
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}