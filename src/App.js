import { useEffect, useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src":"/img/helmet-1.png",matched:false},
  {"src":"/img/potion-1.png",matched:false},
  {"src":"/img/ring-1.png",matched:false},
  {"src":"/img/scroll-1.png",matched:false},
  {"src":"/img/shield-1.png",matched:false},
  {"src":"/img/sword-1.png",matched:false},
];

function App() 
{
  const [cards,setCards] = useState([]);
  const [turns,setTurns] = useState(0);

  const [choiceOne,setChoiceOne] = useState(null);
  const [choiceTwo,setChoiceTwo] = useState(null);

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
    //////////////////////////
    setChoiceOne(null);
    setChoiceTwo(null);
  }



  const handleChoice = (card) => 
  {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //useEffect hook fires initially when the component mounts
  //and when the values of dependency array changes
  useEffect(() => 
  {
    if(choiceOne && choiceTwo) 
    {
      if (choiceOne.src === choiceTwo.src) 
      {
        setCards(prevCards => (
          prevCards.map(card => {
            if(card.src === choiceOne.src)
            {
              return { ...card , matched:true}
            }
            else 
            {
              return card;
            }
          })
        ));
        resetTurns();
      }
      else
      {
        
        resetTurns();
      }
    }
  },[choiceOne,choiceTwo]);

  console.log(cards)
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns => prevTurns + 1));
  }
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {
          cards.map(card => (
           <SingleCard 
              key={card.id} 
              card={card}
              handleChoice={handleChoice}
           />
          ))
        }
      </div>
    </div>
  );
}

export default App