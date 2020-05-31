import React, { Component } from 'react'
import './App.css'
import GoogleMaps from './components/GoogleMaps'

export class App extends Component {
  render() {
    return (
      <div>
        <GoogleMaps />        
      </div>
    )
  }
}

export default App


/*import React,{Component} from 'react';
import './App.css';

class App extends Component {
  
  componentDidMount(){
    this.renderMap()
  }

  renderMap = ()=>{
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyC3sXvuy2Kmo5TLamDbHmGx-obyLBNh3tc&v=3&callback=initMap')
    window.initMap = this.initMap
  }

  initMap = ()=> {
   const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  render(){
    return (
      <main className="App">
         <div id="map"></div>
      </main>
    );
  }

}
/*
url = https://maps.googleapis.com/maps/api/js?key=AIzaSyC3sXvuy2Kmo5TLamDbHmGx-obyLBNh3tc&v=3&callback=initMap
 
function loadScript(url){
  const index = window.document.getElementsByTagName('script')[0]
  const script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script,index)
}

export default App;
*/