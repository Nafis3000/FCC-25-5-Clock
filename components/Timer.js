import React from 'react';
import styles from '../styles/Timer.module.css'

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 25 * 60,
            isRunning: false,
            break_time: 5,
            session_time: 25,
            session: true,
        };
    }
    tick() {
        if (this.state.isRunning === true && this.state.seconds > 0)
        {this.setState(prevState => ({
            seconds: prevState.seconds - 1
        }));}
        if (this.state.seconds === 0) {
            this.audio();
            this.setState(prevState => ({
                session: !prevState.session,
                seconds: prevState.session ? prevState.break_time * 60 : prevState.session_time * 60,
            }));
        }
    }

    handleStartStop = () => {
        if (this.state.isRunning === false) {
        this.setState({
            seconds: this.state.seconds,
            isRunning: true,
            break_time: this.state.break_time,
            session_time: this.state.session_time,
        });
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        } else {
        this.setState({
            seconds: this.state.seconds,
            isRunning: false,
            break_time: this.state.break_time,
            session_time: this.state.session_time,
        });
        clearInterval(this.timerID);
        }
    }

    handleReset = () => {
        clearInterval(this.timerID);
        this.setState({
            seconds: 25 * 60,
            isRunning: false,
            break_time: 5,
            session_time: 25,
            session: true,
        });
    }


    convertSecondsToMinutes(time) {
        const minutes = Math.floor(time / 60)
        const seconds = time - minutes * 60
        function str_pad_left(string,pad,length) {
            return (new Array(length+1).join(pad)+string).slice(-length);
        }
        const finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
        return finalTime;
    }

    handleBreakIncrement = () => {
        if (this.state.session === false){
            if (this.state.break_time < 60) {
                this.setState(prevState => ({
                    seconds: prevState.seconds + 60,
                    isRunning: prevState.isRunning,
                    break_time: prevState.break_time + 1,
                    session_time: prevState.session_time,
                }));
            }
        } else {
            if (this.state.break_time < 60) {
                this.setState(prevState => ({
                    seconds: prevState.seconds,
                    isRunning: prevState.isRunning,
                    break_time: prevState.break_time + 1,
                    session_time: prevState.session_time,
                }));
            }
        }
    }

    handleBreakDecrement = () => {
        if (this.state.session === false){
            if (this.state.break_time > 1) {
                this.setState(prevState => ({
                    seconds: prevState.seconds - 60,
                    isRunning: prevState.isRunning,
                    break_time: prevState.break_time - 1,
                    session_time: prevState.session_time,
                }));
            }
        } else {
            if (this.state.break_time > 1) {
                this.setState(prevState => ({
                    seconds: prevState.seconds,
                    isRunning: prevState.isRunning,
                    break_time: prevState.break_time - 1,
                    session_time: prevState.session_time,
                }));
            }
        }
    }

    handleSessionIncrement = () => {
        if (this.state.session === true){
            if (this.state.session_time < 60) {
                this.setState(prevState => ({
                    seconds: prevState.seconds + 60,
                    isRunning: prevState.isRunning,
                    break_time: prevState.break_time,
                    session_time: prevState.session_time + 1,
                }));
            }} else {
                if (this.state.session_time < 60) {
                    this.setState(prevState => ({
                        seconds: prevState.seconds,
                        isRunning: prevState.isRunning,
                        break_time: prevState.break_time,
                        session_time: prevState.session_time + 1,
                    }));
                }
            }
    }

    handleSessionDecrement = () => {
        if (this.state.session === true){
            if (this.state.session_time > 1) {
                this.setState(prevState => ({
                    seconds: prevState.seconds - 60,
                    isRunning: prevState.isRunning,
                    break_time: prevState.break_time,
                    session_time: prevState.session_time - 1,
                }));
            }} else {
                if (this.state.session_time > 1) {
                    this.setState(prevState => ({
                        seconds: prevState.seconds,
                        isRunning: prevState.isRunning,
                        break_time: prevState.break_time,
                        session_time: prevState.session_time - 1,
                    }));
                }
            }
        }
        
    audio() {
        const audio = document.getElementById('beep');
        audio.play();
    }


    render() {
        return (
            <>
            <div className={styles.timer}>
                <div className={styles.break}>
                        <div id="break-label">Break Length</div>
                        <div id="break-length">
                            <h2 className={styles.break_length_label}>{this.state.break_time}</h2>
                            <div className={styles.break_buttons}>
                                <button id="break-decrement" className={styles.break_decrement} onClick={this.handleBreakDecrement}>-</button>
                                <button id="break-increment" className={styles.break_increment} onClick= {this.handleBreakIncrement}>+</button>
                            </div>
                        </div>
                </div>
                    <div className={styles.session}>
                        <div id="session-label">Session Length</div>
                        <div id="session-length">
                            <h2 className={styles.session_length_label}>{this.state.session_time}</h2>
                        <div className={styles.session_buttons}>
                            <button id="session-decrement" className={styles.session_decrement} onClick={this.handleSessionDecrement}>-</button>
                            <button id="session-increment" className={styles.session_increment} onClick={this.handleSessionIncrement}>+</button>
                        </div>
                    </div>
                </div>
                    <div id='timer-label' className={styles.timer_label}>
                        {this.state.session ? 'Session' : 'Break'}
                    </div>
                    <div id='time-left' className={styles.time_left}>
                        {this.convertSecondsToMinutes(this.state.seconds)}
                    </div>
                    
                        <button className={styles.start_stop} id='start_stop' onClick={this.handleStartStop}>
                            {this.state.isRunning ? 'Stop' : 'Start'}
                        </button>
                        <button className={styles.reset} id='reset' onClick={this.handleReset}>
                            Reset
                        </button>
                    
                <audio id="beep" >
                    <source src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" type="audio/wav"
                    />
                </audio>
            </div>
            </>
        )
    }
}

export default Timer;