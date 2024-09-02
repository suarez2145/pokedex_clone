"use client";
import { useEffect,useState,useContext } from "react";
import PokedexContext from '../components/context/PokedexContext';
import { useUser } from '@auth0/nextjs-auth0/client';
import PokedexLibrary from '../components/PokedexLibrary';
import StarterPokemon from "../components/StarterPokemon"
import Button from 'react-bootstrap/Button';
import styles from './library.module.scss';

export default function Page() {

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);


    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;


    if(user) {
        return (
            <div className={`container-fluid ${styles.dash_cont} g-0 row`}>
                <PokedexLibrary></PokedexLibrary>
            </div>
        )
    }

    return (
        <div>
            <h1> PLease Login</h1> <a href="/api/auth/login">Login</a>
        </div>
    )

}

