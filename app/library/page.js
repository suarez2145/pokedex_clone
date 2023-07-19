"use client";
import { useEffect,useState,useContext } from "react";
import PokedexContext from '../components/context/PokedexContext';
import { useUser } from '@auth0/nextjs-auth0/client';
import PokedexLibrary from '../components/PokedexLibrary';
import StarterPokemon from "../components/StarterPokemon"
import Button from 'react-bootstrap/Button';

export default function Page() {
    const context = useContext(PokedexContext);
    const { handleNewPokedexEntry } = useContext(PokedexContext);
    let index = 5;
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    const showLibraryCons = () => {
        const getStarterLibrary = JSON.parse(localStorage.getItem('starterLibrary'));
        console.log(getStarterLibrary);
    }

    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;


    if(user) {
        return (
            <div className={`container-fluid dash_cont g-0 row`}>
                <Button className="rounded-0 me-1" onClick={() => handleNewPokedexEntry(index)}>Console Log Local Storage</Button>
                <PokedexLibrary></PokedexLibrary>
                <p> {context.userName}</p>
            </div>
        )
    }

    return (
        <div>
            <h1> PLease Login</h1> <a href="/api/auth/login">Login</a>
        </div>
    )

}

