import React from "react";
import Die from "./components/Die";
import Confetti from "react-confetti";
import Record from "./components/Record";

export default function App() {
  // const { width, height } = useWindowSize();
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState({ nrRolls: 0, rollsRecord: 0 });

  function allNewDice() {
    const newDice = [];
    for (let i = 1; i <= 10; i++) {
      const imageNumber = Math.ceil(Math.random() * 6);
      newDice.push({
        id: i,
        value: imageNumber,
        isHeld: false,
        imgUrl: `./images/${imageNumber}.png`,
      });
    }
    return newDice;
  }
  const diceElements = dice.map((el) => (
    <Die
      key={el.id}
      holdDice={holdDice}
      id={el.id}
      value={el.value}
      isHeld={el.isHeld}
      imgUrl={el.imgUrl}
    />
  ));

  function rollDice() {
    setRolls(function (prevRolls) {
      return {
        ...prevRolls,
        nrRolls: prevRolls.nrRolls + 1,
      };
    });

    if (!tenzies) {
      const holdRoll = dice.map((el) => {
        if (el.isHeld) {
          return el;
        } else {
          const imageNumber = Math.ceil(Math.random() * 6);
          return {
            id: el.id,
            value: imageNumber,
            isHeld: false,
            imgUrl: `./images/${imageNumber}.png`,
          };
        }
      });
      setDice(holdRoll);
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
  }

  function holdDice(id) {
    // event.target.closest("div").classList.toggle("held");
    const changedDice = dice.map((el) =>
      el.id === id ? { ...el, isHeld: !el.isHeld } : el
    );
    setDice(changedDice);
  }
  // CHECK IF GAME IS WON /////////////////////////////
  React.useEffect(
    function () {
      const heldCondition = dice.every((el) => el.isHeld);
      const nr = dice[0].value;
      const nrCondition = dice.every((el) => el.value === nr);
      if (heldCondition && nrCondition) {
        if (rolls.nrRolls < rolls.rollsRecord || rolls.rollsRecord === 0)
          rolls.rollsRecord = rolls.nrRolls;
        setTenzies(true);
        setRolls((prevRolls) => ({ ...prevRolls, nrRolls: 0 }));
      }
    },
    [dice]
  );

  return (
    <main className="container">
      {tenzies && <Confetti />}
      <div className="text">
        <h1>{tenzies ? "You Won! " : "Tenzies"}</h1>
        <p>
          {tenzies ? (
            <span>
              Press the <b>New Game</b> button to <br /> play another game!
            </span>
          ) : (
            <span>
              Roll until all dice are the same. <br /> Click each die to freeze
              it at its current <br /> value between rolls.
            </span>
          )}
        </p>
      </div>
      <div className="dies">{diceElements}</div>
      <button onClick={rollDice} className="roll--btn">
        {tenzies ? "New Game" : "Roll"}
      </button>
      {rolls.nrRolls != 0 && (
        <p className="nr-rolls">
          Number of rolls: <b>{rolls.nrRolls}</b>
        </p>
      )}
      <p className="record-count">
        {rolls.rollsRecord != 0 && `Record: ${rolls.rollsRecord}`}
      </p>
      <Record startTime={tenzies} />
    </main>
  );
}
