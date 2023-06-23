"use client";
import { useEffect } from "react";
import styles from "./dashboard.module.css";
import CardsSlider from "../components/CardsSlider";
export default function Page() {

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);


    return (
        <div className="container-fluid dash_cont">
            <CardsSlider/>
        </div>
    )
}