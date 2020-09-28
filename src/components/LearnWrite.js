import React, { useEffect, useState } from 'react';
import './learnWrite.css'
import axios from 'axios';

const LearnWrite = () => {

  const [wikiArticle, setWikiArticle] = useState('Fetching random article...');
  const [wikiTitle, setWikiTitle] = useState('Loading Wikipedia Article...')

  const [currentInput, setCurrentInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const [matchedInput, setMatchedInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);


  const [mistake, setMistake] = useState(false);

  const handleInput = (val) => {
    const lastInputLetter = val.charAt(val.length - 1);

    if (lastInputLetter === wikiArticle[currentIndex]) {
      setCurrentInput(val);
      setMatchedInput(input => input.concat(lastInputLetter));
      setCurrentIndex(currentIndex + 1);
    } else {
      setMistake(true);
      setLives(lives - 1)

    }
  }

  const searchWiki = async () => {
    const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        generator: 'random',
        grnnamespace: 0,
        origin: '*',
        prop: 'extracts',
        exchars: 500,
        format: 'json'
      }
    });
    const pageId = Object.keys(data.query.pages);
    console.log(data.query)
    const pageContent = data.query.pages[pageId].extract;
    const wikiTitle = data.query.pages[pageId].title
    const dataFormatted = pageContent.replace(/(<([^>]+)>)/gi, "");
    setWikiTitle(wikiTitle);
    setWikiArticle(dataFormatted);

  }

  useEffect(() => {
    searchWiki();
  }, [])

  useEffect(() => {
    console.log("Matched Input has changed");
    setScore(score + 1);

  }, [matchedInput])


  useEffect(() => {
    if (lives < 0) {
      alert("Game Over!");
      resetGame();
    }

    return () => {
      setMistake(false)
    }

  }, [lives])




  const resetGame = () => {
    searchWiki();
    setLives(3);
    setCurrentIndex(0);
    setCurrentInput('');
    setMatchedInput('');
    setScore(0);
  }
  // const inputMatch = () => {
  //   if (currentInput === "") return;
  //   if (currentInput.charAt(currentInput.length - 1) === sentence[currentIndex]) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }



  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     console.log("timer")
  //     setScore(score - 1);
  //   }, 200)
  //   // Cleanup Function
  //   return () => {
  //     clearTimeout(timerId);
  //   };
  // }, [score])


  // useEffect(() => {

  //   if (inputMatch()) {
  //     console.log("MATCH");
  //     setCurrentIndex(currentIndex + 1);
  //     setMatchedInput(input => input.concat(currentInput.charAt(currentInput.length - 1)))
  //     setScore(score + 1)
  //   } else {
  //     setCurrentIndex(currentIndex);
  //     // setCurrentInput(matchedInput);
  //     // setMatchedInput(input => input.concat(currentInput.charAt(currentInput.length - 1)))
  //     console.log("DONT MATCH");
  //   }


  //   // const interval = setInterval(() => {
  //   //   console.log('This will run every second!');
  //   // }, 1000);
  //   // return () => clearInterval(interval);





  // }, [currentInput])

  return (
    <div className="ui container">

      <h3 className={`wiki-title ${mistake ? 'shake' : ""}`}> {wikiTitle}</h3>
      {/* <h2 className="wiki-title">{wikiTitle}</h2> */}


      <div className="sentences">
        <h3 className="sentence">{wikiArticle}</h3>
        <h3 className="userInput">{matchedInput}</h3>
      </div>
      <div className="ui form">


        <div className="field">
          {/* <p>Char at Current Index: {wikiArticle[currentIndex]}</p>
          <p>sentence Current Index: {currentIndex}</p> */}
          <hr />
          <p>Score: {score}</p>
          <p>Lives: {lives}</p>
          <button onClick={searchWiki} class="ui inverted red button">Fetch new text</button>

        </div>
        <div className="field">
          <label>Write here:</label>
          <input
            autoFocus
            className="input"
            value={currentInput}
            onChange={(e) => {
              handleInput(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="ui celled list">
        {/* {renderedResults} */}
      </div>
    </div>
  )
}

export default LearnWrite;

