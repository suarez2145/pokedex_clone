"use client";
import { useEffect } from "react";
import styles from './header.module.css';
import Link from 'next/link';


export default function header() {

    // added this useEffect and "use client" to allow bootstrapjs functionality on the client side...this component is now client side rendered 
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    
    return (
        <nav className={`${styles.change_color} navbar navbar-expand-lg bg-body-tertiary`}>
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1 text-warning d-flex">
                    Pokedex Clone App
                    <figure className={`${styles.circle_eye}`}></figure>
                    </span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" href="#"> Welcome User</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" href="#"> Pokedex Library</Link>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        <Link className="nav-link active" href="#"> Sign Out</Link>
                    </span>
                </div>
            </div>
        </nav>
    )
}

