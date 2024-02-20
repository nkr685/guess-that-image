import { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameContext";

const Timer = () => {
    // global vars
    const { gameActive, toggleGameState } = useContext(GameContext)

    // local vars
    const startTime = 30; // can add to GameContext later
    const milliSecValue = .015 // used to subtract current time, both technically should be same but idk
    const milliSecTime = 10; // used for interval in setInterval, if you use 1000ms, text wont update as fast and you see it when you type/interact
    const [currentTime, setCurrentTime] = useState(startTime)
    const [timerText, setTimerText] = useState(`Countdown Timer: ${startTime}`) // maybe better way to implement

    // updates time and handles when time reaches 0 to end game
    useEffect(() => {
        if (gameActive) {
            if (currentTime > 0) {
                const memoryLeak = setInterval( () => {setCurrentTime(currentTime - milliSecValue);} , milliSecTime); 
                setTimerText(`Countdown Timer: ${Math.floor(currentTime)+1}`) // +1 because floor, ceiling has issue when counting from 1 to 0
                return () => {clearInterval(memoryLeak); } // deletes setInterval to prevent memory leak i think
            } else if (currentTime <= 0) {
                setCurrentTime(startTime)
                setTimerText(`Countdown Timer: ${Math.floor(currentTime)+1}`)
                toggleGameState()
            }
        } else {
            setCurrentTime(startTime)
            setTimerText(`Countdown Timer: ${Math.floor(startTime)}`)
        }
    }, [gameActive, currentTime]);
    return (
        <div className="timer">{timerText}</div>
    );

}

export default Timer

