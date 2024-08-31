import React from "react";
import "./UserProfile.css"
import "../form/form.css"
import UserPhoto from "../../assets/user-pictures/22.png"
import AdminPhoto from "../../assets/user-pictures/21.png"

// TODO: pozriet ci to je admin a ked hej podla
//  toho menit fotku a zobrazit button pre administratora


// TODO: nacitat data podla idecka
//  ktore pride alebo ktore je niekde ulozene,
//  alebo cez token to spravim, treba porozmyslat

// TODO: pridat dalsim buttonom logiku - redirect
//  na dalsiu stranku

export function UserProfile() {
    return (
        <>
            <div className="profile-wrapper mb-5">
                <div className="profile-picture">
                    <img src={UserPhoto} alt="ProfilePicture"/>
                </div>
                <div className="profile-details mb-1">
                    <div className="">
                        <h2 className="text-center">Your profile</h2>
                        <form action="" className="mb-3">
                            <div className="info">
                                <label className="label mb-0-25">Username</label>
                                <input type="text" value="username" className="input"/>
                            </div>
                            <div className="info mb-1">
                                <label className="label mb-0-25">Email</label>
                                <input type="text" value="email@example.com" className="input"/>
                            </div>
                            <div className="submit-button-wrapper">
                                <button className="button-confirm">Apply changes</button>
                            </div>
                        </form>
                        <div className="buttons">
                            {/*<button className="button-dark">order history</button>*/}
                            <button className="button-dark">My posts</button>
                            <button className="button-dark">Review history</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}