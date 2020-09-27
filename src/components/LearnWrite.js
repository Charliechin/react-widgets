import React, { useEffect, useState } from 'react';
import './learnWrite.css'


const LearnWrite = () => {
  const sentence = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Etiam at mauris ante.Cras enim ipsum, volutpat in augue non, imperdiet dignissim urna.Aenean semper sit amet enim laoreet maximus.Ut suscipit quis tortor vitae congue.Curabitur volutpat, diam id pharetra vestibulum, justo erat faucibus erat, et sodales nunc orci finibus sem.Duis id neque tempus, sagittis mi ac, aliquet mauris.Phasellus quis ante libero.Pellentesque venenatis, justo sed efficitur varius, augue lectus pretium quam, nec tempus ligula magna a est.Proin lectus lectus, sagittis vitae dignissim a, ullamcorper tempus quam.In vulputate, sem id venenatis ultricies, risus arcu convallis lectus, eget gravida odio mi quis purus.Donec eget accumsan ipsum.Duis tristique sit amet massa eu aliquet.Quisque rutrum sapien vel purus rutrum, sit amet dignissim enim volutpat.Praesent neque urna, aliquam non blandit tristique, lacinia eu erat.Donec non metus eu ex tristique pulvinar.Nullam et dignissim felis.';

  const [currentInput, setCurrentInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const [matchedInput, setMatchedInput] = useState('');
  const [score, setScore] = useState(100);
  const [lives, setLives] = useState(3);


  const inputMatch = () => {
    if (currentInput === "") return;
    if (currentInput.charAt(currentInput.length - 1) === sentence[currentIndex]) {
      return true;
    } else {
      return false;
    }
  }


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


  useEffect(() => {

    if (inputMatch()) {
      console.log("MATCH");
      setCurrentIndex(currentIndex + 1);
      setMatchedInput(input => input.concat(currentInput.charAt(currentInput.length - 1)))
      setScore(score + 1)
    } else {
      setCurrentInput(matchedInput);
      // setMatchedInput(input => input.concat(currentInput.charAt(currentInput.length - 1)))
      console.log("DONT MATCH");
    }


    // const interval = setInterval(() => {
    //   console.log('This will run every second!');
    // }, 1000);
    // return () => clearInterval(interval);





  }, [currentInput])

  return (
    <div className="ui container">
      <div className="sentences">
        <h3 className="sentence">{sentence}</h3>
        <h3 className="userInput">{currentInput}</h3>
      </div>
      <div className="ui form">


        <div className="field">
          {/* <h2>Sentence: {sentence}</h2> */}
          <hr />
          {/* <p> Matched input: {matchedInput}</p>
          <p>Current Index: {currentIndex}</p> */}

          {/* <p>Last Input Letter: {currentInput.charAt(currentInput.length - 1)}</p> */}
          <p>Char at Current Index: {sentence[currentIndex]}</p>
          {/* <p> Matched input: {matchedInput}</p> */}
          <hr />
          <p>Score: {score}</p>
          <p>Lives: {lives}</p>
        </div>
        <div className="field">
          <label>Write here:</label>
          <input
            autoFocus
            className="input"
            value={currentInput}
            onChange={(e) => {
              // console.log(e.target.value)
              setCurrentInput(e.target.value)
            }}
          // onKeyDown={(e) => { handleBackspace(e) }}

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

