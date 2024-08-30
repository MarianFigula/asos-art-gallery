import React from "react";
import "./SideBar.css"

export function SideBar({show}){
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
                    //TODO alebo account do login
                    }
                    <p>GitHub</p>
                </div>

            </section>
        </>
    )
}