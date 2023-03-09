import React from "react";

export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div
      style={style}
      onClick={() => props.holdDice(props.id, props.isHeld)}
      className="die"
    >
      <img className="diceImage" src={props.imgUrl} />
    </div>
  );
}
