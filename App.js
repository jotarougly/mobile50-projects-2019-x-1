import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { styles } from './Appstyle';

class Timer extends Component{
 constructor(props){
      super(props),
      this.state = {
          second : 0,
          minute : 25,
          intervalId : 0,
          wording: "Let's Go!",
          work_time: true
      }
      this.start_count = this.start_count.bind(this);
      this.reset_count = this.reset_count.bind(this);
      this._count = this._count.bind(this);
      this.pause = this.pause.bind(this);
  }

  start_count(){
    if(this.state.work_time){
      this.setState({
        wording: "Work time",
      })
      this.state.intervalId = setInterval(this._count, 1000)
      this.setState({
        second: this.state.intervalId
      })
    }else{
      this.setState({
        wording: "Rest time",
      })
      this.state.intervalId = setInterval(this._count, 1000)
      this.setState({
        second: this.state.intervalId
      })
    }
    
  }

  _count(){
    if(this.state.second != 0){
      this.setState({
        second : this.state.second - 1
      })
    }else if(this.state.second == 0){
      this.setState({
        second : 59,
        minute : this.state.minute - 1
      })
    }
    if(this.state.minute == 0)
      this.setState({
        work_time: !this.state.work_time
      })
  }

  pause(){
    clearInterval(this.state.intervalId)
  }

  reset_count(){
    clearInterval(this.state.intervalId)
    this.setState({
      second : 0,
      minute : 25,
    })
  }
  render() { 
    return (
      <View>
        <Text style = {[ styles.appName]}>Promodoro App</Text>
        <Text style = {[ styles.appName]}>{this.state.wording}</Text>
        <Text style = {[ styles.timer]}>{this.state.minute} : {this.state.second} </Text>
        <View style = {[ styles.fixToText]}>
        <Button 
          title="Go" 
          onPress={this.start_count} 
        />
        <Button 
          title="Pause" 
          onPress={this.pause} 
        />
        <Button 
          title="Reset" 
          onPress={this.reset_count} 
        />
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
