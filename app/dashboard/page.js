"use client";
import { useEffect,useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import styles from './dashboard.module.scss';
import CardsSlider from "../components/CardsSlider";
import StarterPokemon from "../components/StarterPokemon"
import Pokedex from 'pokedex-promise-v2';

export default function Page() {


        useEffect(() => {
            require("bootstrap/dist/js/bootstrap.bundle.min.js");
        }, []);

        const [starterList, setStartList] = useState([]);

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
                    console.log(poke);
                    const pokeDataObj = await pokeData.json();
                    const pokeDataSpecies = await fetch(pokeDataObj.species.url);
                    const pokeDataSpeciesObj = await pokeDataSpecies.json();
                    console.log(pokeDataSpeciesObj);
                    let pokeDescription = pokeDataSpeciesObj.flavor_text_entries;
                    let pokeEngDisc;
                    console.log(pokeDescription);
    
                    // looping over the fetch call to pokemon species flavor text which returns array of descriptions in many languages...then only returning english text  
                    for (let i = 0; i < pokeDescription.length; i++) {
                        if (pokeDescription[i].language.name == "en") {
                            console.log(pokeDescription[i].flavor_text);
                            pokeEngDisc = pokeDescription[i].flavor_text
                            break;
                        }
                    }
    
                    let pokeDataDreamImg;
                    console.log(pokeDataObj.sprites.versions["generation-vii"].icons.front_default);
                    // conditional to check for dream_world image and if not found than set "pokeDataDreamImg" to the default sprite
                    pokeDataObj.sprites.other.dream_world.front_default ? pokeDataDreamImg = pokeDataObj.sprites.other.dream_world.front_default : pokeDataDreamImg = pokeDataObj.sprites.front_default;
                    console.log(pokeDataObj);
    
                    // creating a new object with the fields i want to display parsed out from the api call information sent back 
                    let newObj = {
                        name: pokeDataObj.name, 
                        imgUrl: pokeDataDreamImg,
                        hp: pokeDataObj.stats[0].base_stat,
                        attack: pokeDataObj.stats[1].base_stat,
                        defense: pokeDataObj.stats[2].base_stat,
                        speed: pokeDataObj.stats[5].base_stat,
                        type: pokeDataObj.types[0].type.name,
                        icon: pokeDataObj.sprites.versions["generation-vii"].icons.front_default,
                        description: pokeEngDisc
                    }
    
                    // pushing my new object into my global pokemonList array
                    pokemonList.push(newObj);
    
                    // using the setState method to update my state with the new object inside of my pokemonList 
                    setState({
                        ...state, pokemonList
                    });
                }
            }))()
    
        }, [])

        const getNewPokemon = ((async () => { 

            const setOffset = Math.floor(Math.random() * 1000);
            const pokemonList = [];
    
            const interval = {
                offset: setOffset,
                limit: 10,
            };
            // using the syntax from a pokeApi wrapper for more functionality ( instead of default pokeAPI promise commands and syntax)
            const getList = await P.getPokemonsList(interval);
    
            for(let i = 0; i < getList.results.length; i++) {
                const poke = getList.results[i];
                const pokeData = await fetch(poke.url);
                console.log(poke);
                const pokeDataObj = await pokeData.json();
                const pokeDataSpecies = await fetch(pokeDataObj.species.url);
                const pokeDataSpeciesObj = await pokeDataSpecies.json();
                console.log(pokeDataSpeciesObj);
                let pokeDescription = pokeDataSpeciesObj.flavor_text_entries;
                let pokeEngDisc;
                console.log(pokeDescription);
    
                // looping over the fetch call to pokemon species flavor text which returns array of descriptions in many languages...then only returning english text  
                for (let i = 0; i < pokeDescription.length; i++) {
                    if (pokeDescription[i].language.name == "en") {
                        console.log(pokeDescription[i].flavor_text);
                        pokeEngDisc = pokeDescription[i].flavor_text
                        break;
                    }
                }
    
                let pokeDataDreamImg;
    
                // conditional to check for dream_world image and if not found than set "pokeDataDreamImg" to the default sprite
                pokeDataObj.sprites.other.dream_world.front_default ? pokeDataDreamImg = pokeDataObj.sprites.other.dream_world.front_default : pokeDataDreamImg = pokeDataObj.sprites.front_default;
                console.log(pokeDataObj);
    
                // creating a new object with the fields i want to display parsed out from the api call information sent back 
                let newObj = {
                    name: pokeDataObj.name, 
                    imgUrl: pokeDataDreamImg,
                    hp: pokeDataObj.stats[0].base_stat,
                    attack: pokeDataObj.stats[1].base_stat,
                    defense: pokeDataObj.stats[2].base_stat,
                    speed: pokeDataObj.stats[5].base_stat,
                    type: pokeDataObj.types[0].type.name,
                    icon: pokeDataObj.sprites.versions["generation-vii"].icons.front_default,
                    description: pokeEngDisc
                }
    
                // pushing my new object into my global pokemonList array
                pokemonList.push(newObj);
    
                // using the setState method to update my state with the new object inside of my pokemonList 
                setState({
                    ...state, pokemonList
                });
                
            }
        }));

        // new pokemon Array that we will use as a placholder to later push into our starterList 
        let newAdditionPokeList = [];
        const addToStarter = (pokemonDetails) => {
            let currentPokemon = pokemonDetails;
            let newAdditionPoke;
            for(let i = 0; i < state.pokemonList.length; i++) {
                if(state.pokemonList[i].name == currentPokemon) {
                    newAdditionPoke = state.pokemonList[i]; 
                    let isInArray = starterList.includes(newAdditionPoke);
                    // if the current pokemon is NOT in the starterList then push to newAdditionPokeList and then add to starterList
                    if(!isInArray) {
                        newAdditionPokeList.push(newAdditionPoke);
                        setStartList([
                            ...starterList, ...newAdditionPokeList
                        ]);
                    }
                    // need to ad an else which will notify user that the chosen pokemon is already in thier list or library 

                }
            }

        }




        console.log(starterList);






    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;


    if(user) {
        return (
            <div className={`container-fluid dash_cont row`}>
                <CardsSlider pokemon={state.pokemonList} getNewPokemon={getNewPokemon} addToStarter={addToStarter}/>
                <StarterPokemon addToStarter={addToStarter} starterPokemon={starterList}/>
            </div>
        )
    }

    return (
        <div>
            <h1> PLease Login</h1> <a href="/api/auth/login">Login</a>
        </div>
    )

}