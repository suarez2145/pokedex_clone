import {useState,useEffect} from 'react';
import Carousel from "react-bootstrap/Carousel";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Pokedex from 'pokedex-promise-v2';

// ****************************  need to add addToStarter function to each carousel card ********************
export default function cardSlider({pokemon, getNewPokemon, addToStarter}) {
    // setting my state to empty array 
    // const [state, setState] = useState([]);
    // // creating a new instance of Pokedex according to the pokeAPI wrapper package 
    // const P = new Pokedex();

    // // this useEffect method allows me to make an API call after the page renders and runs only once since i passed no parameters 
    // useEffect(() =>{
    //     // variable to set random offset for my API call to pokeApi so i get random list of pokemon on each refresh
    //     const setOffset = Math.floor(Math.random() * 1000);
    //     const pokemonList = [];

    //     const getPokemon = ((async () => { 
    //         const interval = {
    //             offset: setOffset,
    //             limit: 10,
    //         };
    //         // using the syntax from a pokeApi wrapper for more functionality ( instead of default pokeAPI promise commands and syntax)
    //         const getList = await P.getPokemonsList(interval);

    //         for(let i = 0; i < getList.results.length; i++) {
    //             const poke = getList.results[i];
    //             const pokeData = await fetch(poke.url);
    //             console.log(poke);
    //             const pokeDataObj = await pokeData.json();
    //             const pokeDataSpecies = await fetch(pokeDataObj.species.url);
    //             const pokeDataSpeciesObj = await pokeDataSpecies.json();
    //             console.log(pokeDataSpeciesObj);
    //             let pokeDescription = pokeDataSpeciesObj.flavor_text_entries;
    //             let pokeEngDisc;
    //             console.log(pokeDescription);

    //             // looping over the fetch call to pokemon species flavor text which returns array of descriptions in many languages...then only returning english text  
    //             for (let i = 0; i < pokeDescription.length; i++) {
    //                 if (pokeDescription[i].language.name == "en") {
    //                     console.log(pokeDescription[i].flavor_text);
    //                     pokeEngDisc = pokeDescription[i].flavor_text
    //                     break;
    //                 }
    //             }

    //             let pokeDataDreamImg;

    //             // conditional to check for dream_world image and if not found than set "pokeDataDreamImg" to the default sprite
    //             pokeDataObj.sprites.other.dream_world.front_default ? pokeDataDreamImg = pokeDataObj.sprites.other.dream_world.front_default : pokeDataDreamImg = pokeDataObj.sprites.front_default;
    //             console.log(pokeDataObj);

    //             // creating a new object with the fields i want to display parsed out from the api call information sent back 
    //             let newObj = {
    //                 name: pokeDataObj.name, 
    //                 imgUrl: pokeDataDreamImg,
    //                 hp: pokeDataObj.stats[0].base_stat,
    //                 attack: pokeDataObj.stats[1].base_stat,
    //                 defense: pokeDataObj.stats[2].base_stat,
    //                 speed: pokeDataObj.stats[5].base_stat,
    //                 type: pokeDataObj.types[0].type.name,
    //                 description: pokeEngDisc
    //             }

    //             // pushing my new object into my global pokemonList array
    //             pokemonList.push(newObj);

    //             // using the setState method to update my state with the new object inside of my pokemonList 
    //             setState({
    //                 ...state, pokemonList
    //             });
    //         }
    //     }))()

    // }, [])

    // const getNewPokemon = ((async () => { 

    //     const setOffset = Math.floor(Math.random() * 1000);
    //     const pokemonList = [];

    //     const interval = {
    //         offset: setOffset,
    //         limit: 10,
    //     };
    //     // using the syntax from a pokeApi wrapper for more functionality ( instead of default pokeAPI promise commands and syntax)
    //     const getList = await P.getPokemonsList(interval);

    //     for(let i = 0; i < getList.results.length; i++) {
    //         const poke = getList.results[i];
    //         const pokeData = await fetch(poke.url);
    //         console.log(poke);
    //         const pokeDataObj = await pokeData.json();
    //         const pokeDataSpecies = await fetch(pokeDataObj.species.url);
    //         const pokeDataSpeciesObj = await pokeDataSpecies.json();
    //         console.log(pokeDataSpeciesObj);
    //         let pokeDescription = pokeDataSpeciesObj.flavor_text_entries;
    //         let pokeEngDisc;
    //         console.log(pokeDescription);

    //         // looping over the fetch call to pokemon species flavor text which returns array of descriptions in many languages...then only returning english text  
    //         for (let i = 0; i < pokeDescription.length; i++) {
    //             if (pokeDescription[i].language.name == "en") {
    //                 console.log(pokeDescription[i].flavor_text);
    //                 pokeEngDisc = pokeDescription[i].flavor_text
    //                 break;
    //             }
    //         }

    //         let pokeDataDreamImg;

    //         // conditional to check for dream_world image and if not found than set "pokeDataDreamImg" to the default sprite
    //         pokeDataObj.sprites.other.dream_world.front_default ? pokeDataDreamImg = pokeDataObj.sprites.other.dream_world.front_default : pokeDataDreamImg = pokeDataObj.sprites.front_default;
    //         console.log(pokeDataObj);

    //         // creating a new object with the fields i want to display parsed out from the api call information sent back 
    //         let newObj = {
    //             name: pokeDataObj.name, 
    //             imgUrl: pokeDataDreamImg,
    //             hp: pokeDataObj.stats[0].base_stat,
    //             attack: pokeDataObj.stats[1].base_stat,
    //             defense: pokeDataObj.stats[2].base_stat,
    //             speed: pokeDataObj.stats[5].base_stat,
    //             type: pokeDataObj.types[0].type.name,
    //             description: pokeEngDisc
    //         }

    //         // pushing my new object into my global pokemonList array
    //         pokemonList.push(newObj);

    //         // using the setState method to update my state with the new object inside of my pokemonList 
    //         setState({
    //             ...state, pokemonList
    //         });
    //     }
    // }));

    console.log(pokemon);
    // **** very important since STATE is UNDEFINED when page renders i checked for empty state if TRUE than i render a <DIV>...LOADING <DIV> 
    // *** ONLY UNTIL API CALL RESOLVES AND STATE IS UPDATED WITH RETURNED DATA WILL MY CARD DIVS BE RENDERD 
    if (pokemon) {
        return (
            <div className="container-fluid g-0 flex-column carousel_wrapper align-items-center align-items-md-start  mt-5 d-flex col">
                <div className="carousel-header-wrapper"style={{"width" : "20rem"}} >
                    <h3 className="carousel-header">
                        Explore New Pokemon?
                    </h3>
                </div>
                <Carousel interval={null} style={{"width" : "20rem", "height":"100%"}}>
                { pokemon.map((pokemon,i) => {
                    return (
                        <Carousel.Item key={i} id={`${pokemon.name}`}>
                            <Card className="w-100 h-100 rounded-0">
                                <span className="d-flex justify-content-end">
                                    <p className="p-2">{`${pokemon.hp}`}HP</p>
                                </span>
                                <Card.Img variant="top" style={{"height" : "200px" , "width" : "auto"}} src={`${pokemon.imgUrl}`} />
                                <Card.Body>
                                    <Card.Title className="d-flex justify-content-between align-items-center">
                                        <span>{`${pokemon.name}`}</span>
                                        <img style={{"height" : "35px" , "width" : "auto"}} src={`/${pokemon.type}_type.png`} alt="Pokemon type" />
                                    </Card.Title>
                                    <Card.Text>
                                        {`${pokemon.description}`}
                                    </Card.Text>
                                    <ListGroup horizontal className="text-center">
                                        <ListGroup.Item className="border-0">{`${pokemon.attack}`} Attack</ListGroup.Item>
                                        <ListGroup.Item className="border-0">{`${pokemon.defense}`} Defense</ListGroup.Item>
                                        <ListGroup.Item className="border-0">{`${pokemon.speed}`} Speed</ListGroup.Item>
                                    </ListGroup>
                                    <Button className="rounded-0" onClick={() => addToStarter(pokemon.name)}>Add To Starter</Button>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                        
                    );
                })}
                </Carousel>
                <div className="new-pokemon-wrapper mt-2 d-flex justify-content-end"style={{"width" : "20rem"}}>
                    <Button className="rounded-0" onClick={getNewPokemon}>New Batch</Button>
                    {/* <Button className="rounded-0" onClick={addToStarter(`${pokemon.name}`)}>SEE ID</Button> */}
                </div>
            </div>
        )
    } else {
        return <div className="d-flex justify-content-center align-items-center" style={{"marginTop" : "15vh"}}>
                    ... <img style={{"height" : "85px" , "width" : "auto"}} src="/lucas_with_dragonite_by_liftedwing_d2sdg2i.gif" alt="my-gif...Loading" />
                </div>
    }
}