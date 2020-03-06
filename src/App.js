import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [sessionTime, setSessionTime] = useState(25);
  const [second, setSecond] = useState(60);
  const [breakTime, setBreakTime] = useState(5);
  const [sessionRemainingTime, setSessionRemainingTime] = useState(sessionTime);
  const [oneTimeMinus, setOneTimeMinus] = useState(true);
  const [countFinished, setCountFinished] = useState(false);
  const [breakRemainingTime, setBreakRemainingTime] = useState(5);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [playTheSound, setPlayTheSound] = useState(false);

  function startTheClock() {
    setIsTimeRunning(pre => !pre);
    setCountFinished(false);
  }

  function resetTheClock() {
    setCountFinished(true);
    setIsTimeRunning(false);
    setSecond(60);
    setOneTimeMinus(true);
    setPlayTheSound(false);
    setSessionTime(25);
    setBreakTime(5);
    setBreakRemainingTime(5);
    setSessionRemainingTime(25);
  }

  function incrementSession() {
    setSessionTime(pre => (pre < 60 ? pre + 1 : 60));
  }

  function incrementBreak() {
    setBreakTime(pre => (pre < 60 ? pre + 1 : 60));
  }

  function decrementSession() {
    setSessionTime(pre => (pre > 0 ? pre - 1 : 0));
  }

  function decrementBreak() {
    setBreakTime(pre => (pre > 0 ? pre - 1 : 0));
  }

  useEffect(() => {
    if (isTimeRunning && oneTimeMinus) {
      setSessionRemainingTime(pre => pre - 1);
      setOneTimeMinus(false);
    }
    //if (oneTimeMinus === true) {
    // setSessionRemainingTime(24);
    // setTimeout(() => {
    //   setOneTimeMinus(false);
    // }, 1000);
  }, [second]);

  useEffect(() => {
    if (isTimeRunning && countFinished === false && second >= 0) {
      setTimeout(() => {
        setSecond(pre => pre - 1);
      }, 1000);
    } else if (sessionRemainingTime > 0 && second < 0) {
      setSecond(59);
      setSessionRemainingTime(pre => pre - 1);
    } else if (sessionRemainingTime === 0 && second < 0) {
      setCountFinished(true);
      setSecond(0);

      setPlayTheSound(true);
    }
  }, [isTimeRunning, second]);

  useEffect(() => {
    if (isTimeRunning && countFinished && playTheSound) {
      setTimeout(() => {
        setSessionRemainingTime(-1);
        setPlayTheSound(false);
        setSecond(60);
      }, 3000);
    } else if (
      isTimeRunning &&
      playTheSound === false &&
      countFinished &&
      second > 0
    ) {
      setTimeout(() => {
        setSecond(pre => pre - 1);
      }, 1000);
    } else if (
      playTheSound === false &&
      countFinished &&
      breakRemainingTime > 0 &&
      second === 0
    ) {
      setSecond(60);
      setBreakRemainingTime(pre => pre - 1);
    } else if (
      countFinished &&
      playTheSound === false &&
      breakRemainingTime === 0 &&
      second === 0
    ) {
      setPlayTheSound(true);
      setIsTimeRunning(false);
      setTimeout(() => {
        resetTheClock();
      }, 3000);
    }
  }, [playTheSound, second, breakRemainingTime]);

  //before strating the timer
  useEffect(() => {
    setSessionRemainingTime(sessionTime);

    setBreakRemainingTime(breakTime);
  }, [sessionTime, breakTime]);

  return (
    <div className="grid">
      <h1 className="title"> Pomodoro Clock </h1>

      <div id="session-label" className="sessionSetting flex">
        <button
          className="buttonSetting"
          onClick={incrementSession}
          disabled={isTimeRunning ? true : false}
          id="session-increment"
        >
          {" "}
          +{" "}
        </button>
        <h3 id="session-length">Session: {sessionTime} </h3>

        <button
          className="buttonSetting"
          onClick={decrementSession}
          disabled={isTimeRunning ? true : false}
          id="session-decrement"
        >
          {" "}
          -{" "}
        </button>
      </div>

      <div id="break-label" className="breakSetting flex">
        <button
          className="buttonSetting"
          onClick={incrementBreak}
          disabled={isTimeRunning ? true : false}
          id="break-increment"
        >
          {" "}
          +{" "}
        </button>

        <h3 id="break-length">
          {" "}
          Break:{breakTime < 10 ? "0" + breakTime : breakTime}
        </h3>
        <button
          className="buttonSetting"
          onClick={decrementBreak}
          disabled={isTimeRunning ? true : false}
          id="break-decrement"
        >
          {" "}
          -{" "}
        </button>
      </div>

      <div id="timer_label" className="display">
        <h2 id="time-left">
          {sessionRemainingTime >= 0 ? (
            <p>
              {" "}
              Session Remaining Time <br />
              {sessionRemainingTime < 10
                ? "0" + sessionRemainingTime
                : sessionRemainingTime}{" "}
              :{" "}
              {second === 60
                ? "00"
                : second < 10 && second > 0
                ? "0" + second
                : second === 0
                ? "00"
                : second}
            </p>
          ) : (
            <p>
              Break Remaining Time <br />
              {breakRemainingTime < 10
                ? "0" + breakRemainingTime
                : breakRemainingTime}{" "}
              :{" "}
              {second === 60
                ? "00"
                : second < 10 && second > 0
                ? "0" + second
                : second === 0
                ? "00"
                : second}
            </p>
          )}
        </h2>
        <button
          className="buttonStart"
          id="start_stop"
          onClick={startTheClock}
          disable={isTimeRunning}
        >
          {!isTimeRunning ? "Start" : "Pause"}
        </button>

        <button className="buttonStart" id="reset" onClick={resetTheClock}>
          Reset
        </button>
      </div>

      {playTheSound ? (
        <audio id="beep" autoPlay src="https://goo.gl/65cBl1" />
      ) : null}
    </div>
  );
}

export default App;
