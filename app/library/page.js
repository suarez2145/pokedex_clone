"use client";
import { useEffect,useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import PokedexLibrary from '../components/PokedexLibrary';
import Button from 'react-bootstrap/Button';

export default function Page() {

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
                <Button className="rounded-0 me-1" onClick={() => showLibraryCons()}>Console Log Local Storage</Button>
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