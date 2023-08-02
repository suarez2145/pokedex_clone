"use client";
import { useEffect, useContext } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import styles from './header.module.scss';
import PokedexContext from '../components/context/PokedexContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function header() {
    
    const context = useContext(PokedexContext);
    const { user, error, isLoading } = useUser();
    // using usePAthname to get current route and conditionally render certain links based on current path
    const pathname = usePathname()

    // added this useEffect and "use client" to allow bootstrapjs functionality on the client side...this component is now client side rendered 
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    if (user) {
        return (
            <nav className={`${styles.change_color} navbar navbar-expand-lg bg-body-tertiary`}>
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 text-warning d-flex align-items-center">
                    <p>Pokedex Clone App</p>
                        <figure className={`${styles.circle_eye}`}></figure>
                        </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" href="#"> Welcome {user.name}</Link>
                            </li>
                            { pathname == "/dashboard" ?
                                <li className="nav-item">
                                    <Link className="nav-link active" href="/library"> Library </Link>
                                </li> : ""
                            }
                            { pathname == "/library" ?
                                <li className="nav-item">
                                    <Link className="nav-link active" href="/dashboard"> Dashboard </Link>
                                </li> : ""
                            }
                        </ul>
                        <span className="navbar-text">
                            <Link className="nav-link active" href="/api/auth/logout"> Sign Out?</Link>
                        </span>
                    </div>
                </div>
            </nav>
        );
    }
    
    return (
        <nav className={`${styles.change_color} navbar navbar-expand-lg bg-body-tertiary`}>
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1 text-warning d-flex align-items-center">
                    <p>Pokedex Clone App</p>
                    <figure className={`${styles.circle_eye}`}></figure>
                    </span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" href="#"> Welcome Guest</Link>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        <Link className="nav-link active" href="/api/auth/login">Please Signin</Link>
                    </span>
                </div>
            </div>
        </nav>
    )

}

