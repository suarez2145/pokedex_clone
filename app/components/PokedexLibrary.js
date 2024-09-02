"use client";
import { useEffect,useState, useContext } from "react";
import PokedexContext from '../components/context/PokedexContext';
import classNames from "classnames";
import styles from './pokedexlibrary.module.scss';

export default function StarterPokemon() {
    const context = useContext(PokedexContext);
    const { handleLibraryDelete } = useContext(PokedexContext);
    const [staredList, setStaredList] = useState([]);
    // retrieving starters pokemon so i can check the library and if the library pokemon is in the starters array 
    
    const Starters = JSON.parse(localStorage.getItem('starterList'));
    console.log(Starters);
    
    const starterLibraryPokemon = JSON.parse(localStorage.getItem('starterLibrary'));
    console.log("********************* pokedexLibrary component  ****************")
    console.log(starterLibraryPokemon)
    console.log("********************* pokedexLibrary component ****************")

    const staredPoke = [];
    // useEffect to run calcStared only when Starters variable is changed ( a starter is removed from the startersList in local Storage)
    useEffect(() => {
        
        for(let i = 0; i < starterLibraryPokemon.length; i++) {
            if (Starters[i] && Starters[i][name] == starterLibraryPokemon[i][name]) {
                staredPoke.push(Starters[i].name)
            }
        };
        setStaredList([
            ...staredPoke
        ]);   
        
    }, [context.starterList]);
    

    console.log(staredList);
    console.log(staredList.length);

    return (
        <div className={`g-4 col`}>
            <h1>Your Pokedex</h1>
            <div className={`mb-3 table-responsive`}>
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
                        { starterLibraryPokemon.map((pokemon) => {
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
                                    <tr key={pokemon.name} id={`${pokemon.name}`} className={pokemonTypeClasses}>
                                        <th className="align-middle">{`${pokemon.name}`} {staredList.includes(pokemon.name )? (<img className="ms-3" src={`/star-16.png`}></img>) : ""} </th>
                                        <td className="align-middle">
                                            <img style={{"height" : "22px" , "width" : "auto"}} src={`/${pokemon.type}_type.png`} alt="Pokemon type" />
                                            <img style={{"height" : "22px" , "width" : "auto"}} src={`/${pokemon.typeTwo}_type.png`} alt="Pokemon type" />
                                        </td>
                                        <td className="align-middle">{`${pokemon.hp}`}</td>
                                        <td className="align-middle">{`${pokemon.attack}`}</td>
                                        <td className="align-middle">{`${pokemon.defense}`}</td>
                                        {/* {staredList.includes(pokemon.name )? (<td className="align-middle">HHHHH</td>) :  (<td className="align-middle">HHHHHHHH</td>)} */}
                                        <td className="align-middle" style={{"height" : "50px" , "width" : "30px"}}> <img src={`${pokemon.icon}`} style={{"height" : "100%" , "width" : "100%", "objectFit" : "cover"}} /></td>
                                        <td className="align-middle text-center" style={{"height" : "50px"}}><button type="button"  className="bg-transparent border-0 btn-lg" onClick={() => handleLibraryDelete(pokemon.name)}><i className={`bi bi-x-lg ${pokemon.type == "dark" ? "text-white" : ""}`}></i></button></td>
                                    </tr>
                                ): (
                                    <tr key={pokemon.name} id={`${pokemon.name}`} className={pokemonTypeClasses}>
                                        <th className="align-middle">{`${pokemon.name}`} {staredList.includes(pokemon.name )? (<img src={`/star-16.png`}></img>) : ""} </th>
                                        <td className="align-middle"><img style={{"height" : "25px" , "width" : "auto"}} src={`/${pokemon.type}_type.png`} alt="Pokemon type" /></td>
                                        <td className="align-middle">{`${pokemon.hp}`}</td>
                                        <td className="align-middle">{`${pokemon.attack}`}</td>
                                        <td className="align-middle">{`${pokemon.defense}`}</td>
                                        <td className="align-middle" style={{"height" : "50px" , "width" : "30px"}}><img src={`${pokemon.icon}`} style={{"height" : "100%" , "width" : "100%", "objectFit" : "cover"}} /></td>
                                        <td className="align-middle text-center" style={{"height" : "50px"}}><button type="button" className="bg-transparent border-0 btn-lg"onClick={() => handleLibraryDelete(pokemon.name)}><i className={`bi bi-x-lg ${pokemon.name} ${pokemon.type == "dark" ? "text-white" : ""}`}></i></button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
            </div>
        </div>
    )

}
