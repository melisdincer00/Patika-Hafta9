import React from 'react';
import '../App.css';

function Dice({ number, isShaking }) {
  return (
    <img
      className={`dice ${isShaking ? 'shaking' : ''}`}
      src={require(`../images/dice${number}.png`)}
      alt={`Zar ${number}`}
    />
  );
}

export default Dice;
