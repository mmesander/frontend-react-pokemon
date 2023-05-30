import React, {useEffect, useState} from "react";
import axios from "axios";
import './PokemonCard.css'

//Deze functie verwacht een endpoint die wordt meegegeven vanuit app.js
function PokemonCard({endpoint}) {
    //de state wordt als eerste geinitialiseerd als een leeg object.
    //'pokemon' maakt het mogelijk om die data ook buiten de scope van de functie te gebruiken (dus in de return)
    //'setpokemon' zorgt ervoor dat de waarde van pokemon verandert kan worden
    const [pokemon, setPokemon] = useState({});

    //Het useEffect is gebruikt om de functie alleen te laten uitvoeren indien de waarde van endpoint veranderd
    //Indien dit niet zou gebeuren dan kan een loop ontstaan
    useEffect(() => {
        async function fetchPokemon() {
            try {
                //De endpoint bevat een URL die is meegegeven vanuit app.js
                //Om de data te kunnen zien en hoe het verwerkt moet worden, is deze console log gebruikt
                // console.log(response.data)
                const response = await axios.get(`${endpoint}`);
                //De data die is opgehaald is via de 'setPokemon' toegevoegd en is nu de waarde van 'pokemon'
                setPokemon(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        //alleen wanneer er een endpoint (dus een URL is), wordt de functie aangeroepen
        //void staat ervoor zodat er geen foutmelding bij komt
        if (endpoint) {
            void fetchPokemon();
        }

        //het endpoint staat hier in om er een update life cycle van te maken
    }, [endpoint]);

    return (
        <div className="pokemon-container">
            {/*Het object wordt getransformeerd naar een array
            indien de array groter is dan 0 (dus er zit een waarde in)
            dan worden de onderstaande elementen geinjecteerd*/}
            {Object.keys(pokemon).length > 0 &&
                <>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} alt="Pokémon picture"/>
                    <p><strong>Moves: </strong>{pokemon.moves.length}</p>
                    <p><strong>Weight: </strong>{pokemon.weight}</p>
                    <p><strong>Abilities:</strong></p>
                    <ul>
                        {/*Om de lijst te maken wordt er door de array heen gemapt
                        elke keer als er een item is dan krijgt die een specifieke key mee
                        en wordt de ability name meegegeven zodat die op de pagina komt te staan
                        er is gebruik gemaakt van de map methode omdat niet alle pokemons evenveel
                        abilities hebben dus de lengte van de lijst kan verschillen.*/}
                        {pokemon.abilities.map((ability) => {
                            return (
                                <li
                                    key={`${pokemon.name} - ${ability.ability.name}}`}
                                >
                                    {ability.ability.name}
                                </li>
                            )
                        })}
                    </ul>
                </>
            }
        </div>
    );
}

export default PokemonCard;