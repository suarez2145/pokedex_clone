import { useEffect,useState } from "react";
import classNames from "classnames";
export default function StarterPokemon({starterPokemon}) {

// need to draw from dashboard page.js file and addToStarter function in order to create and loop through new starterList state object and populate list of starter pokemon
    console.log(starterPokemon);
    return (
        <div className="starter-pokemon-wrapper col">
            <div className="starter-cont">
                <h1>Your Starter Team</h1>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Hp</th>
                            <th scope="col">Atk</th>
                            <th scope="col">Def</th>
                            <th scope="col">Icon</th>
                            </tr>
                        </thead>
                        <tbody>
                        { starterPokemon.map((pokemon,i) => {
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
                                return (
                                    <tr key={i} id={`${pokemon.name}`} className={pokemonTypeClasses}>
                                        <th>{`${pokemon.name}`}</th>
                                        <td>{`${pokemon.hp}`}</td>
                                        <td>{`${pokemon.attack}`}</td>
                                        <td>{`${pokemon.defense}`}</td>
                                        <td><img src={`${pokemon.icon}`}/></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
            </div>
        </div>
    )

}