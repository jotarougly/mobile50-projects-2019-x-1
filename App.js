import React, { Component } from 'react';
import { Text, View, Button, Picker } from 'react-native';
import { styles } from './Appstyle';
import vibrate from './utils/vibrate';

//Function for getting value from passed timer
function picker(n) {
  if (parseInt(n) < 10) {
    return "0" + n.toString();
  } else {
    return n.toString();
  }
}

function getTime(val) {
  return picker(val) + ":00";
}

class Timer extends Component{
 
  //Constructo for init values and provide context for methods
  constructor(props) {
    super(props),
    this.state = {
      current_time: "05:00",
      work_time: "05:00",
      break_time: "02:00",
      working: true,
      timer: null,
      paused: false,
      playing: false,
      wording : "Let's GO!"
    }
    this.setWorkTimer = this.setWorkTimer.bind(this);
    this.setBreakTimer = this.setBreakTimer.bind(this);
    this.playButton = this.playButton.bind(this);
    this.pauseButton = this.pauseButton.bind(this);
    this.resetButton = this.resetButton.bind(this);
    this.countdown = this.countdown.bind(this);
    this.statusChecker = this.statusChecker.bind(this);
  }

  setWorkTimer(val) {
    let newTime = getTime(val);
    this.setState({
      work_time: newTime,
    });
    if (!this.state.timer) {
      this.setState({
        current_time: newTime,
      });
    }      
  }

  setBreakTimer(val) {
    let newTime = getTime(val);
    this.setState({
      break_time: newTime,
    });
  }

  /*
  * function for manager timer countdown
  * first it check if the countdown is on pause or if it is not load yet
  * then it start the timer
  */
  playButton() {
    if (this.state.paused === true || this.state.playing === false) { 
      this.setState({
        wording:"Work time!",
        timer: setInterval(this.countdown, 1000),
        paused: false,
        playing: true,
      });
    }
  }
  /*
  * Function for break the countdown
  * after verifed if the timer is loaded or whether it is on pause
  * after that it update paused,timer and playing status.
  * 
  */
  pauseButton () {
    if (this.state.paused === false && this.state.playing === true) {
      clearInterval(this.state.timer);
      this.setState({
        paused: true,
        timer: null,
        playing: false
      });
    } 
  }
  /*
  * reset function use to stop the timer and reinitializes parameters
  *
  */

  resetButton () {
    this.pauseButton();
    this.setState({
      wording:"Let's Go!",
      current_time: this.state.work_time,
      playing: false,
      paused: false,
      working: true,
    })
  }

  /*
  * The countdown function 
  * Step 1: it check if the timer is over and is deducting
  *   if the condition is true it means it's over. Whether it is work time or rest time
  * Step 2: it hit this step if the first condition is false.
  *   So from the currentTime value it parse to int the second and minute after get them by selecting 
  *   their value from the string array with the slice() method
  *   Then the method update the current value with the new second and minute
  *
  */
  countdown() {
    if (this.state.current_time === "00:00" && this.state.playing === true) {
      vibrate();
      this.statusChecker();
    } else {
      let sec = this.state.current_time.slice(3);
      let min = this.state.current_time.slice(0, 2);
      if (sec === "00") {
        let newMin = picker(parseInt(min) - 1);
        let newTime = newMin + ":59";
        this.setState({
          current_time: newTime,
        });
      } else {
        let newSec = picker((parseInt(sec) - 1));
        let newTime = min + ":" + newSec;
        this.setState({
          current_time: newTime,
        })
      }
    }
  }
  /*
  * this function use to controler the timer status
  * by updating working and currentTime value
  */
  statusChecker() {
    if (this.state.working) {
      this.setState({
        wording:"Rest time!",
        working: false,
        current_time: this.state.break_time,
      })
    } else {
      this.setState({
        wording:"Work time!",
        working: true,
        current_time: this.state.work_time,
      })
    }
  }

  render() { 
    return (
      <View>
        <Text style = {[ styles.appName]}>Promodoro App</Text>
        <Text style = {[ styles.wording]}>{this.state.wording}</Text>
        <Text style = {[ styles.timer]}>{this.state.current_time} </Text>
        <View style = {[ styles.fixToText]}>
        <Button 
          title="Go" 
          onPress={this.playButton} 
        />
        <Button 
          title="Pause" 
          onPress={this.pauseButton} 
        />
        <Button 
          title="Reset" 
          onPress={this.resetButton} 
        />
        </View>
        <View>
        {/* <Picker
          selectedValue={this.state.current_time}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({currentTime: itemValue})
          }>
          <Picker.Item label="15:00" value="15:00" />
          <Picker.Item label="05:00" value="05:00" />
        </Picker> */}
        </View>
      </View>
    );
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <Timer/>
    </View>
  );
}
