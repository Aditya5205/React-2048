import { useEffect, useState } from "react";
import Box from "./components/box";
import FailAnnounce from "./components/FailAnnounce";

const Game = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const arraychunk = (arr) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, 4));
    return chunks;
  };

  const [selected, setSelected] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  ]);
  const [fail, setFail] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // need to make a function which randomly chooses a box out of all empty boxes
  const randomBox = (...board) => {
    let emptyBoxes = [];
    for (let i = 0; i < 16; i++) {
      if (board[i] === 0) emptyBoxes.push(i);
    }

    if (emptyBoxes.length === 0) {
      setFail(true);
      return board;
    } else {
      let ind = Math.floor(Math.random() * emptyBoxes.length);
      board[emptyBoxes[ind]] = 2;
      return board;
    }
  };

  // const addRandom = () => {
  //   let emptyBoxes = [];
  //   for (let i = 0; i < 16; i++) {
  //     if (selected[i] === 0) emptyBoxes.push(i);
  //   }

  //   let ind = Math.floor(Math.random() * emptyBoxes.length);
  //   let board = [...selected];
  //   board[emptyBoxes[ind]] = 2;
  //   setSelected(board);
  // };

  const handleReset = () => {
    setSelected(randomBox(...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]));
    setFail(false);
    setScore(0);
  };

  // if (fail) {
  //   setTimeout(handleReset, 5000);
  // }

  const updateScore = (t) => {
    setScore((prevScore) => prevScore + t * 2);
  };

  const onKeyLeft = () => {
    let finalSelected = [];

    for (let i = 0; i < 4; i++) {
      let j = 4 * i;
      let temp = [...selected];
      let updatedSelect = [];

      for (j; j < 4 * i + 4; j++) {
        if (temp[j] !== 0) {
          if (updatedSelect.length !== 0) {
            let lastElement = updatedSelect.pop();
            if (lastElement === temp[j]) {
              updatedSelect.push(lastElement + temp[j]);
              updateScore(temp[j]);
            } else {
              updatedSelect.push(lastElement);
              updatedSelect.push(temp[j]);
            }
          } else updatedSelect.push(temp[j]);
        }
      }

      while (updatedSelect.length !== 4) {
        updatedSelect.push(0);
      }

      for (let k = 0; k < 4; k++) {
        finalSelected.push(updatedSelect[k]);
      }
    }

    if (!fail) setSelected(randomBox(...finalSelected));
  };

  const onKeyUp = () => {
    let finalSelected = [];

    for (let i = 0; i < 4; i++) {
      let j = i;
      let temp = [...selected];
      let updatedSelect = [];

      for (j; j < 16; j += 4) {
        if (temp[j] !== 0) {
          if (updatedSelect.length !== 0) {
            let lastElement = updatedSelect.pop();
            if (lastElement === temp[j]) {
              updatedSelect.push(lastElement + temp[j]);
              updateScore(temp[j]);
            } else {
              updatedSelect.push(lastElement);
              updatedSelect.push(temp[j]);
            }
          } else updatedSelect.push(temp[j]);
        }
      }

      while (updatedSelect.length !== 4) {
        updatedSelect.push(0);
      }

      for (let k = 0; k < 4; k++) {
        finalSelected[i + k * 4] = updatedSelect[k];
      }
    }
    if (!fail) setSelected(randomBox(...finalSelected));
  };

  const onKeyDown = () => {
    let finalSelected = [];

    for (let i = 12; i < 16; i++) {
      let j = i;
      let temp = [...selected];
      let updatedSelect = [];

      for (j; j >= 0; j -= 4) {
        if (temp[j] !== 0) {
          if (updatedSelect.length !== 0) {
            let lastElement = updatedSelect.pop();
            if (lastElement === temp[j]) {
              updatedSelect.push(lastElement + temp[j]);
              updateScore(temp[j]);
            } else {
              updatedSelect.push(lastElement);
              updatedSelect.push(temp[j]);
            }
          } else updatedSelect.push(temp[j]);
        }
      }

      while (updatedSelect.length !== 4) {
        updatedSelect.push(0);
      }

      for (let k = 3; k >= 0; k--) {
        finalSelected[i - 12 + k * 4] = updatedSelect[3 - k];
      }
    }
    if (!fail) setSelected(randomBox(...finalSelected));
  };

  const onKeyRight = () => {
    let finalSelected = [];

    for (let i = 0; i < 4; i++) {
      let j = 4 * i + 3;
      let temp = [...selected];
      let updatedSelect = [];

      for (j; j >= 4 * i; j--) {
        if (temp[j] !== 0) {
          if (updatedSelect.length !== 0) {
            let lastElement = updatedSelect.pop();
            if (lastElement === temp[j]) {
              updatedSelect.push(lastElement + temp[j]);
              updateScore(temp[j]);
            } else {
              updatedSelect.push(lastElement);
              updatedSelect.push(temp[j]);
            }
          } else updatedSelect.push(temp[j]);
        }
      }

      while (updatedSelect.length !== 4) {
        updatedSelect.push(0);
      }

      for (let k = 0; k < 4; k++) {
        finalSelected[4 * i + (3 - k)] = updatedSelect[k];
      }
    }
    if (!fail) setSelected(randomBox(...finalSelected));
  };

  useEffect(() => {
    setSelected(randomBox(...selected));
  }, []);

  let failed = "bg-slate-500";
  if (fail) {
    if (score > bestScore) setBestScore(score);
    failed = "bg-red-500";
  }

  const handleKeyDown = (e) => {
    let key = e.key;

    if (key === "ArrowLeft") onKeyLeft();
    else if (key === "ArrowUp") onKeyUp();
    else if (key === "ArrowDown") onKeyDown();
    else if (key === "ArrowRight") onKeyRight();
  };

  return (
    <>
      <div
        className="flex h-screen overflow-scroll w-full flex-wrap items-center justify-center bg-[#232B2B] bg-cover bg-no-repeat"
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e)}
      >
        <div className="sm:fixed sm:left-1/4 sm:flex sm:flex-col flex relative m-4 gap-x-5">
          <div className="mb-5 h-fit w-auto rounded-lg bg-blue-500 px-5 py-1 text-center text-xl font-bold text-white">
            <div className="text-5xl ">{score}</div>
            <br />
            Score
          </div>
          <div className="h-fit w-auto rounded-lg bg-blue-500 px-5 py-1 text-center text-xl font-bold text-white">
            <div className="text-5xl ">{bestScore}</div>
            <br />
            Best Score
          </div>
        </div>
        <div className="text-center">
          <div className="mb-7 flex flex-wrap items-center justify-center">
            <div
              className="w-fit rounded-xl bg-blue-500 p-3 text-4xl font-bold
             text-white"
            >
              2048 GAME
            </div>
          </div>
          <div className={`mx-auto h-fit w-fit rounded-xl ${failed}`}>
            <FailAnnounce isFail={fail} />
            <div className="grid grid-rows-4 gap-2 p-3">
              {arraychunk(arr).map((col, c) => (
                <div key={c} className="grid grid-cols-4 gap-2">
                  {col.map((val, i) => (
                    <Box
                      key={i}
                      value={selected[val]}
                      isSelected={selected[val] !== 0}
                      isFail={fail}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <button
              className="button ml-3 mt-7 font-semibold"
              onClick={handleReset}
            >
              Try Again!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
