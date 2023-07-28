"use client";
import { useEffect,useState,useContext } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import styles from './dashboard.module.scss';
import CardsSlider from "../components/CardsSlider";
import PokedexContext from '../components/context/PokedexContext';
import StarterPokemon from "../components/StarterPokemon"
import Pokedex from 'pokedex-promise-v2';
import { Noto_Rashi_Hebrew } from "next/font/google";

export default function Page() {

        useEffect(() => {
            require("bootstrap/dist/js/bootstrap.bundle.min.js");
        }, []);
        const { setInitialPokemonList } = useContext(PokedexContext);

        // setting my state to empty array 
        const [state, setState] = useState([]);
        // creating a new instance of Pokedex according to the pokeAPI wrapper package 
        const P = new Pokedex();
    
        // this useEffect method allows me to make an API call after the page renders and runs only once since i passed no parameters 
        useEffect(() =>{
            // variable to set random offset for my API call to pokeApi so i get random list of pokemon on each refresh
            const setOffset = Math.floor(Math.random() * 1000);
            const pokemonList = [];
    
            const getPokemon = ((async () => { 
                const interval = {
                    offset: setOffset,
                    limit: 10,
                };
                // using the syntax from a pokeApi wrapper for more functionality ( instead of default pokeAPI promise commands and syntax)
                const getList = await P.getPokemonsList(interval);
    
                for(let i = 0; i < getList.results.length; i++) {
                    const poke = getList.results[i];
                    const pokeData = await fetch(poke.url);
                    const pokeDataObj = await pokeData.json();
                    const pokeDataSpecies = await fetch(pokeDataObj.species.url);
                    const pokeDataSpeciesObj = await pokeDataSpecies.json();
                    let pokeDescription = pokeDataSpeciesObj.flavor_text_entries;
                    let pokeEngDisc;
    
                    // looping over the fetch call to pokemon species flavor text which returns array of descriptions in many languages...then only returning english text  
                    for (let i = 0; i < pokeDescription.length; i++) {
                        if (pokeDescription[i].language.name == "en") {
                            pokeEngDisc = pokeDescription[i].flavor_text
                            break;
                        }
                    }
    
                    let pokeDataDreamImg;
                    // conditional to check for dream_world image and if not found than set "pokeDataDreamImg" to the default sprite
                    pokeDataObj.sprites.other.dream_world.front_default ? pokeDataDreamImg = pokeDataObj.sprites.other.dream_world.front_default : pokeDataDreamImg = pokeDataObj.sprites.front_default;
                    let typeOne = pokeDataObj.types[0].type.name;
                    let typeTwo;
                    // if(pokeDataObj.types[1]) {
                    //     typeTwo = pokeDataObj.types[1].type.name;
                    // }
                    pokeDataObj.types[1] ? typeTwo = pokeDataObj.types[1].type.name : typeTwo = null;

                    let pokeSprite;
                    // using ternary to check if there is an icon for "generation VII" if not then use the default sprite but if thre is then use it as the icon
                    pokeDataObj.sprites.versions["generation-vii"].icons.front_default == null ? pokeSprite = pokeDataObj.sprites.front_default : pokeSprite = pokeDataObj.sprites.versions["generation-vii"].icons.front_default;

    
                    // creating a new object with the fields i want to display parsed out from the api call information sent back 
                    let newObj = {
                        name: pokeDataObj.name, 
                        imgUrl: pokeDataDreamImg,
                        hp: pokeDataObj.stats[0].base_stat,
                        attack: pokeDataObj.stats[1].base_stat,
                        defense: pokeDataObj.stats[2].base_stat,
                        speed: pokeDataObj.stats[5].base_stat,
                        type: pokeDataObj.types[0].type.name,
                        ...typeTwo && {typeTwo: typeTwo},
                        icon: pokeSprite,
                        description: pokeEngDisc
                    }
                    // pushing my new object into my global pokemonList array
                    pokemonList.push(newObj);
                    // using the setState method to update my state with the new object inside of my pokemonList 

                    setInitialPokemonList(pokemonList)
                }
            }))()
    
        }, [])

        const { user, error, isLoading } = useUser();

        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>{error.message}</div>;


        if(user) {
            return (
                <div className={`container-fluid dash_cont g-0 row`}>
                    <CardsSlider/>
                    <StarterPokemon/>
                </div>
            )
        }

        return (
            <div>
                <h1> PLease Login</h1> <a href="/api/auth/login">Login</a>
            </div>
        )

}