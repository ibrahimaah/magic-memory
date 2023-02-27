import { useState } from 'react';
import './App.css'

const cardImages = [
  {"src":"/img/helmet-1.png"},
  {"src":"/img/potion-1.png"},
  {"src":"/img/ring-1.png"},
  {"src":"/img/scroll-1.png"},
  {"src":"/img/shield-1.png"},
  {"src":"/img/sword-1.png"},
];

function App() 
{
  const [cards,setCards] = useState([]);
  const [turns,setTurns] = useState(0);

  const random_shuffle = () => Math.random() - 0.5;
  const generate_random_id = () => (Math.floor(Math.random() * 1000));
  
  // console.log(cards)

  //This function do three things :
  /*
    1- double the cards 
    2- shuffle them
    3- give each card an id
  */
  const shuffleCards = () => 
  {
    const shuffledCards = [...cardImages,...cardImages] //we need 12 cards 
    .sort(() => random_shuffle())
    .map(card => ({...card,id:generate_random_id()}))

    setCards(shuffledCards);
    setTurns(0);
  }


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
    </div>
  );
}

export default App