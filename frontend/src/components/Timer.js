import { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameContext";

const Timer = () => {
    // global vars
    const { gameActive, toggleGameState } = useContext(GameContext)

    // local vars
    const startTime = 30; // can add to GameContext later
    const milliSecValue = .1 // used to subtract current time, both technically should be same but idk
    const milliSecTime = 100; // used for interval in setInterval, if you use 1000ms, text wont update as fast and you see it when you type/interact
    const [currentTime, setCurrentTime] = useState(startTime)
    const [timerText, setTimerText] = useState(`${startTime}s`) // maybe better way to implement
    const [progress, setProgress] = useState(100)
    const [isAlmostTimeUp, setIsAlmostTimeUp] = useState(false)

    // updates time and handles when time reaches 0 to end game
    useEffect(() => {
        if (gameActive) {
            if (currentTime > 0) {
                const interval = setInterval( () => {setCurrentTime(currentTime - milliSecValue);} , milliSecTime); 
                setTimerText(`${currentTime === startTime ? Math.floor(currentTime) : Math.floor(currentTime)+1}s`) // +1 because floor, ceiling has issue when counting from 1 to 0
                setProgress((currentTime/startTime)*100)
                setIsAlmostTimeUp(currentTime<10)
                return () => {clearInterval(interval); } // deletes setInterval to prevent memory leak i think
            } else if (currentTime < 0) {
                setIsAlmostTimeUp(false)
                setCurrentTime(startTime)
                setTimerText(`${Math.floor(currentTime)+1}s`)
                setProgress(100)
                toggleGameState()
            }
        } else {
            setIsAlmostTimeUp(false)
            setCurrentTime(startTime)
            setTimerText(`${Math.floor(startTime)}s`)
            setProgress(100)
        }
    }, [gameActive, currentTime]);
    // return (
    //     <div className="timer">{timerText}</div>
    // );
    return (
        <div className="progress-bar" style={{ width: '100%' }}>
            <div className={`progress-bar-inner ${isAlmostTimeUp ? 'red' : 'green'}`} style={{ width: `${progress}%` }}>
                {timerText}
            </div>
        </div>
    )

}

export default Timer

