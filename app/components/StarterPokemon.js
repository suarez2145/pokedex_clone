"use client";
import { useEffect,useState,useContext } from "react";
import PokedexContext from '../components/context/PokedexContext';
import classNames from "classnames";
export default function StarterPokemon() {
    const context = useContext(PokedexContext);
    const { reloadStarters } = useContext(PokedexContext);
    const { handleStarterDelete } = useContext(PokedexContext);


    // retreiving the StarterList pokemon from localStorage in order to set it to map over it 
    // const starterListPokemon = context.starterList;
    useEffect(() => {
        reloadStarters()
        const starterListPokemon  = JSON.parse(localStorage.getItem('starterList'));
        console.log("******************** starterPokemon COmponent ****************")
        console.log(starterListPokemon)
        console.log("******************** starterPokemon COmponent ****************")
        localStorage.setItem('starterList', JSON.stringify(starterListPokemon));
        console.log("****** set was called ********8")

    }, []);

    const starterListPokemon  = JSON.parse(localStorage.getItem('starterList'));


    return (
        <div className="starter-pokemon-wrapper g-4 col">
            <div className="starter-cont">
                <h1>Your Starter Team</h1>
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
                        { starterListPokemon.map((pokemon,i) => {
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
                                        <td className="align-middle text-center" style={{"height" : "50px"}}><button type="button" onClick={() => handleStarterDelete(i)} className="bg-transparent border-0 btn-lg"><i className={`bi bi-x-lg ${pokemon.type == "dark" ? "text-white" : ""}`}></i></button></td>
                                    </tr>
                                ): (
                                    <tr key={i} id={`${pokemon.name}`} className={pokemonTypeClasses}>
                                        <th className="align-middle">{`${pokemon.name}`}</th>
                                        <td className="align-middle"><img style={{"height" : "25px" , "width" : "auto"}} src={`/${pokemon.type}_type.png`} alt="Pokemon type" /></td>
                                        <td className="align-middle">{`${pokemon.hp}`}</td>
                                        <td className="align-middle">{`${pokemon.attack}`}</td>
                                        <td className="align-middle">{`${pokemon.defense}`}</td>
                                        <td className="align-middle" style={{"height" : "50px" , "width" : "30px"}}><img src={`${pokemon.icon}`} style={{"height" : "100%" , "width" : "100%", "objectFit" : "cover"}} /></td>
                                        <td className="align-middle text-center" style={{"height" : "50px"}}><button type="button" className="bg-transparent border-0 btn-lg" onClick={() => handleStarterDelete(i)}><i className={`bi bi-x-lg ${pokemon.type == "dark" ? "text-white" : ""}`}></i></button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
            </div>
        </div>
    )

}