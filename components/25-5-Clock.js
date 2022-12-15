import { useReducer } from 'react'
import React from 'react'
import styles from '../styles/25-5-Clock.module.css'
import { useEffect } from 'react'

const ACTIONS = {
    STARTSTOP: 'start-stop',
    RESET: 'reset',
    INCREMENT_BREAK: 'increment-break',
    DECREMENT_BREAK: 'decrement-break',
    INCREMENT_SESSION: 'increment-session',
    DECREMENT_SESSION: 'decrement-session',    
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.STARTSTOP:
            if (state.isRunning) {
                return {...state, isRunning: false}
            } else {
                return {...state, isRunning: true}
            }
        case ACTIONS.RESET:
            return { isRunning: false, break_time: 5, session_time: 25, session: true}
        case ACTIONS.INCREMENT_BREAK:
            return {...state, break_time: state.break_time + 1}
        case ACTIONS.DECREMENT_BREAK:
            if(state.break_time <= 0) {
                return state
            } else {
                return {...state, break_time: state.break_time - 1}
            }
        case ACTIONS.INCREMENT_SESSION:
            return {...state, session_time: state.session_time + 1}
        case ACTIONS.DECREMENT_SESSION:
            if(state.session_time <= 0) {
                return state
            } else {
                return {...state, session_time: state.session_time - 1,}
            }
        default:
            return state
    }
}
//convert seconds to minutes and seconds
function convertSecondsToMinutes(time) {
    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60
    function str_pad_left(string,pad,length) {
        return (new Array(length+1).join(pad)+string).slice(-length);
    }
    
    const finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
    return finalTime;
}



function FccClock() {
    const [{break_time, session_time, session}, dispatch] = useReducer(reducer, {break_time: 5, session_time: 25, session: true })
    const timerKey = session ? 'Session' : 'Break'
    let currentTime = session ? session_time * 60 : break_time * 60

    useEffect(() => {
        if (currentTime === 0) {
            dispatch({type: ACTIONS.RESET})
        }
    }, [currentTime])

    return (
        <div className={styles.FccClock}>
            <div className={styles.header}>
                <h1 className={styles.h1}>25 + 5 Clock</h1>
                <div className={styles.break}>
                    <div id="break-label">Break Length</div>
                    <div id="break-length">
                        <h2 className={styles.break_length_label}>{break_time}</h2>
                        <div className={styles.break_buttons}>
                            <button id="break-decrement" className={styles.break_decrement} onClick={() => dispatch({type: ACTIONS.DECREMENT_BREAK})}>-</button>
                            <button id="break-increment" className={styles.break_increment} onClick={() => dispatch({type: ACTIONS.INCREMENT_BREAK})}>+</button>
                        </div>
                    </div>
                </div>
                <div className={styles.session}>
                    <div id="session-label">Session Length</div>
                    <div id="session-length">
                        <h2 className={styles.session_length_label}>{session_time}</h2>
                        <div className={styles.session_buttons}>
                            <button id="session-decrement" className={styles.session_decrement} onClick={() => dispatch({type: ACTIONS.DECREMENT_SESSION})}>-</button>
                            <button id="session-increment" className={styles.session_increment} onClick={() => dispatch({type: ACTIONS.INCREMENT_SESSION})}>+</button>
                        </div>
                    </div>
                </div>
                <div className={styles.timer}>
                <div id="timer-label">
                    {timerKey}
                </div>
                {convertSecondsToMinutes(currentTime)}
                </div>
            </div>
            <div className={styles.buttons}>
                <button id="start_stop" className={styles.start_stop} onClick={() => dispatch({type:ACTIONS.STARTSTOP})}>Start/Stop</button>
                <button id="reset" className={styles.reset} onClick={() => dispatch({type:ACTIONS.RESET})}>Reset</button>
            </div>
        </div>


    )
}

export default FccClock

