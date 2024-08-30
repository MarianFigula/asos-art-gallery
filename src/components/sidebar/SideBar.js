import React from "react";
import "./SideBar.css"

export function SideBar({show}){
    return(
        <>
            <section className={`text-center sidebar ${show ? "show" : ""}`} id="sidebar-id">
                <h1 className="sidebar-title">
                    FEI Art Gallery
                </h1>
            </section>
        </>
    )
}