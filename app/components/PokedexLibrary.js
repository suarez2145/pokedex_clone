"use client";
import { useEffect,useState } from "react";
import classNames from "classnames";
export default function StarterPokemon({}) {

    // function to remove pokemon from starter list 
    // should not SET STATE in child component... created this function that calls function on parent component that UPDATES STATE  
    // const rmvStart = (index) =>{
    //     starterPokemon.splice(index,1)
    //     console.log(starterPokemon);
    //     // passing the starterPokemon list to the function in the parent component which will update the STATE with my passed starterPokemon
    //     handleStarterDelete(starterPokemon);

    // }

// need to draw from dashboard page.js file and addToStarter function in order to create and loop through new starterList state object and populate list of starter pokemon


    // retreiving the StarterList pokemon from localStorage in order to set it to map over it 
    const starterLibraryPokemon = JSON.parse(localStorage.getItem('starterLibrary'));



    return (
        <div className="starter-pokemon-wrapper g-4 col">
            <div className="starter-cont">
                <h1>Your Pokedex</h1>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Types</th>
                            <th scope="col">Hp</th>
                            <th scope="col">Atk</th>
                            <th scope="col">Def</th>
                            <th scope="col">Icon</th>
                            <th scope="col"></th>

                            </tr>
                        </thead>
                        <tbody>
                        { starterLibraryPokemon.map((pokemon,i) => {
                            // these are all custom colors i injected into the default BOOTSTRAP SASS... here i am declaring my classname conditional EX: if  type == this then this color background 
                            // I use the classNames PACKAGE to declare here in pass to table rows instead of doing INLINE conditional on each row 
                                const pokemonTypeClasses = classNames({
                                    "table-danger": pokemon.type == "fire",
                                    "table-warning": pokemon.type == "electric",
                                    "table-info": pokemon.type == "water",
                                    "table-success": pokemon.type == "grass",
                                    "table-secondary": pokemon.type == "normal",
                                    "table-primary": pokemon.type == "ice",
                                    "table-dark": pokemon.type == "dark",
                                    "table-bug": pokemon.type == "bug",
                                    "table-dragon": pokemon.type == "dragon",
                                    "table-fairy": pokemon.type == "fairy",
                                    "table-fighting": pokemon.type == "fighting",
                                    "table-flying": pokemon.type == "flying",
                                    "table-ghost": pokemon.type == "ghost",
                                    "table-ground": pokemon.type == "ground",
                                    "table-poison": pokemon.type == "poison",
                                    "table-rock": pokemon.type == "rock",
                                    "table-steel": pokemon.type == "steel",
                                    "table-psychic": pokemon.type == "psychic"
                                });
                                return pokemon.typeTwo ? (
                                    <tr key={i} id={`${pokemon.name}`} className={pokemonTypeClasses}>
                                        <th className="align-middle">{`${pokemon.name}`}</th>
                                        <td className="align-middle">
                                            <img style={{"height" : "22px" , "width" : "auto"}} src={`/${pokemon.type}_type.png`} alt="Pokemon type" />
                                            <img style={{"height" : "22px" , "width" : "auto"}} src={`/${pokemon.typeTwo}_type.png`} alt="Pokemon type" />
                                        </td>
                                        <td className="align-middle">{`${pokemon.hp}`}</td>
                                        <td className="align-middle">{`${pokemon.attack}`}</td>
                                        <td className="align-middle">{`${pokemon.defense}`}</td>
                                        <td className="align-middle" style={{"height" : "50px" , "width" : "30px"}}><img src={`${pokemon.icon}`} style={{"height" : "100%" , "width" : "100%", "objectFit" : "cover"}} /></td>
                                        <td className="align-middle text-center" style={{"height" : "50px"}}><button type="button"  className="bg-transparent border-0 btn-lg"><i className={`bi bi-x-lg ${pokemon.type == "dark" ? "text-white" : ""}`}></i></button></td>
                                    </tr>
                                ): (
                                    <tr key={i} id={`${pokemon.name}`} className={pokemonTypeClasses}>
                                        <th className="align-middle">{`${pokemon.name}`}</th>
                                        <td className="align-middle"><img style={{"height" : "25px" , "width" : "auto"}} src={`/${pokemon.type}_type.png`} alt="Pokemon type" /></td>
                                        <td className="align-middle">{`${pokemon.hp}`}</td>
                                        <td className="align-middle">{`${pokemon.attack}`}</td>
                                        <td className="align-middle">{`${pokemon.defense}`}</td>
                                        <td className="align-middle" style={{"height" : "50px" , "width" : "30px"}}><img src={`${pokemon.icon}`} style={{"height" : "100%" , "width" : "100%", "objectFit" : "cover"}} /></td>
                                        <td className="align-middle text-center" style={{"height" : "50px"}}><button type="button" className="bg-transparent border-0 btn-lg"><i className={`bi bi-x-lg ${pokemon.type == "dark" ? "text-white" : ""}`}></i></button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
            </div>
        </div>
    )

}