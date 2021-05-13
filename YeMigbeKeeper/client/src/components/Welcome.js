import React from "react";
import "./Welcome.css"

export default function Welcome() {
    return (
        <div className="welcomeUserText">
            <span style={{
                position: "fixed",
                left: 0,
                right: 0,
                top: "50%",
                marginTop: "-0.5rem",
                textAlign: "center",

            }}><strog><em>Welcome to Ye Migbe Keeper </em>😃</strog></span>
        </div>
    );
}