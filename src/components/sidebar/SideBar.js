import React from "react";
import "./SideBar.css"
import {useAuth} from "../auth/AuthContext";

export function SideBar({show}){

    const {logout} = useAuth()

    return(
        <>
            <section className={`sidebar ${show ? "show" : ""}`} id="sidebar-id">
                <h1 className="text-center sidebar-title">
                    FEI Art Gallery
                </h1>
                <hr className="mb-2"/>
                <div className="sidebar-content">
                    <p>Login</p>
                    {
                    //TODO alebo account do loginSite
                    }
                    <p onClick={() => logout()} style={{cursor: "pointer", textDecoration: "underline"}}>Logout</p>
                </div>

            </section>
        </>
    )
}