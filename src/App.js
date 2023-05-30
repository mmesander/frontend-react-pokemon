//Functions
import React, {useEffect, useState} from 'react';
import './App.css';

//Components
import PokemonCard from "./components/PokemonCard/PokemonCard";
import Button from "./components/Button/Button";

//Assets
import logo from './assets/logo.png'
import axios from "axios";

//Omdat ik vast nog weleens in dit document ga terugkijken, ga ik er veel tekst bijzetten!
//Om te veel dubbele stukken tekst te voorkomen, heb ik als eerstre informatie in pokemoncard.js gezet
//Hier zal ik de asynchrone functie dan ook niet meer bespreken

function App() {
    //Als eerste wordt de state geinitialiseerd als een link met de 'basis' api
    //'endpoint' maakt het mogelijk om dit stukje informatie overal te gebruiken in dit document
    //'setEndpoint' maakt het mogelijk om de link te veranderen (bijv. met de buttons)
    const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon');
    //de state wordt als eerste geinitialiseerd als een leeg object.
    //'pokemons' maakt het mogelijk om die data ook buiten de scope van de functie te gebruiken (dus in de return)
    //'setpokemons' zorgt ervoor dat de waarde van pokemon verandert kan worden
    const [pokemons, setPokemons] = useState([]);
    //
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    //Er wordt gebruik gemaakt van een useEffect om het ophalen van data te triggeren
    //indien het endpoint wordt veranderd (zoals te zien in regel 43)
    useEffect(() => {
        async function fetchData() {
            //Zodra deze functie wordt aangeroepen dan wordt de waarde van loading naar true gezet
            setLoading(true);
            try {
                const response = await axios.get(`${endpoint}`)
               //Indien de functie data ophaalt dan wordt de error op false gezet
                //Dit is een extra maatregel om het netjes af te vangen
                if (response.data) {
                    setError(false);
                }
                //Om de data te bekijken die binnengekomen is:
                // console.log(response.data)
                setPokemons(response.data)

            } catch (e) {
                //Indien er een error is wordt de seterror naar true gezet!
                setError(true);
                console.error(e);
            }
            //Als de functie is doorgelopen tot hier en er is data binnengehaald,
            //Dan kan de loading weer op false gezet worden omdat het niet meer nodig is.
            setLoading(false);
        }

        void fetchData();

    },[endpoint]);

    return (
        <>
            <section className="header-section">
                <img src={logo} alt="Pokemon Logo"/>
                <div className="button-section">
                    <Button
                        buttonType="button"
                        children="Vorige"
                        //De API maakt het mogelijk om naar een vorige pagina te gaan
                        clickHandler={() => setEndpoint(pokemons.previous)}
                        //De button wordt disabled indien je niet naar de vorige meer kan
                        disabled={!pokemons.previous}
                    />
                    <Button
                        buttonType="button"
                        children="Volgende"
                        clickHandler={() => setEndpoint(pokemons.next)}
                        disabled={!pokemons.next}
                    />
                </div>
            </section>
            <div className="message-section">
                {/*als loading true is dan komt de tekst loading... er te staan*/}
                {loading && <h3>Loading... </h3>}
                {/*Als error true is dan komt de tekst error er te staan*/}
                {error && <h2>Error: Could not fetch data!</h2>}
            </div>


            <div className="pokemon-deck">
                {/*De functie werkt alleen indien er ook een waarde is voor pokemons.results
                Daarom wordt de && operator gebruikt. Pas als er waarde dan gaat hij er doorheen mappen*/}
                {pokemons.results && pokemons.results.map((pokemon) => {
                    return <PokemonCard key={pokemon.name} endpoint={pokemon.url}/>
                })}
            </div>
        </>
    );
}

export default App;
