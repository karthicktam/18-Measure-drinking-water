import React, { useState } from "react";
import "./styles.css";

let glassesArr = new Array(8).fill({
  active: false,
  text: "250 ml"
});

export default function App() {
  const [glasses, setGlasses] = useState(
    new Array(8).fill({
      active: false,
      text: "250 ml"
    })
  );

  const [percent, setPercent] = useState(20);
  const [liter, setLiter] = useState(`2.00`);
  const [percentStyle, setPerStyle] = useState({
    visibility: "hidden",
    height: 0
  });
  const [literStyle, setLitStyle] = useState({
    visibility: "visible",
    height: "100%"
  });

  const updateBigCup = () => {
    const filledGlasses = glassesArr.filter((glass) => glass.active === true)
      .length;
    const totalGlasses = glassesArr.length;

    if (filledGlasses === 0) {
      setPerStyle((state) => ({ ...state, visibility: "hidden", height: 0 }));
    } else {
      setPerStyle((state) => ({
        ...state,
        visibility: "visible",
        height: `${(filledGlasses / totalGlasses) * 330}px`
      }));
      setPercent(`${(filledGlasses / totalGlasses) * 100}`);
    }

    if (filledGlasses === totalGlasses) {
      setLitStyle((state) => ({ ...state, visibility: "hidden", height: 0 }));
    } else {
      setLitStyle((state) => ({
        ...state,
        visibility: "visible",
        height: "100%"
      }));
      setLiter(`${(2 - (250 * filledGlasses) / 1000).toFixed(2)}`);
    }
  };

  const highlightCups = (idx) => {
    if (glassesArr[idx].active === true && glassesArr[idx + 1] === undefined) {
      idx--;
    } else if (
      glassesArr[idx].active === true &&
      glassesArr[idx + 1].active === false
    ) {
      idx--;
    }

    let currentArr = glassesArr.map((cup, index) => {
      if (index <= idx) {
        return { ...cup, active: true };
      } else if (index > idx) {
        return { ...cup, active: false };
      }
      return cup;
    });

    glassesArr = currentArr;

    setGlasses(currentArr);
    updateBigCup();
  };

  return (
    <div className="app">
      <h1>Measure Drinking Water</h1>
      <h3>Goal: 2 Liters</h3>
      <div className="cup">
        <div
          className="remained"
          style={{
            visibility: literStyle.visibility,
            height: literStyle.height
          }}
        >
          <span>{liter}L</span>
          <small>Remained</small>
        </div>
        <div
          className="percentage"
          style={{
            visibility: percentStyle.visibility,
            height: percentStyle.height
          }}
        >
          {percent}%
        </div>
      </div>

      <p className="text">Select how many glass water you had</p>

      <div className="cups">
        {glasses.map((glass, idx) => (
          <div
            key={idx}
            className={
              glass.active === true ? "cup cup-small full" : "cup cup-small"
            }
            onClick={() => highlightCups(idx)}
          >
            {glass.text}
          </div>
        ))}
      </div>
    </div>
  );
}
