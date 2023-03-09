import React from "react";
import Die from "./components/Die";
import Confetti from "react-confetti";
export default function App() {
  console.log("This belongs to branch ---New-Features---");
  // const { width, height } = useWindowSize();
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  function allNewDice() {
    const newDice = [];
    for (let i = 1; i <= 10; i++) {
      newDice.push({
        id: i,
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
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
    />
  ));

  function rollDice() {
    if (!tenzies) {
      const holdRoll = dice.map((el) =>
        el.isHeld
          ? el
          : { id: el.id, value: Math.ceil(Math.random() * 6), isHeld: false }
      );
      setDice(holdRoll);
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
  }

  function holdDice(id, isHeld) {
    // event.target.closest("div").classList.toggle("held");
    const changedDice = dice.map((el) =>
      el.id === id ? { ...el, isHeld: !el.isHeld } : el
    );
    setDice(changedDice);
  }

  React.useEffect(
    function () {
      const heldCondition = dice.every((el) => el.isHeld);
      const nr = dice[0].value;
      const nrCondition = dice.every((el) => el.value === nr);
      if (heldCondition && nrCondition) setTenzies(true);
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
            "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."
          )}
        </p>
      </div>
      <div className="dies">{diceElements}</div>
      <button onClick={rollDice} className="roll--btn">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
