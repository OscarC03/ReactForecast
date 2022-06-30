import React, { Component } from 'react';
import '../components/css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MapContainer, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import MapView from './MapView';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.getForecast = this.getForecast.bind(this);
    this.state = {
      location:{},
      current:{},
      errors: [],
      lat:0.0,
      lon:0.0,
      isLoaded:false
    };
  }

    componentDidMount() {
        this.getForecast();
    }

    getForecast= ()=>{
        navigator.geolocation.getCurrentPosition((position)=>{        
            axios.get("https://api.weatherapi.com/v1/current.json?key=a8175195d7bc4533802202525222906&q="+position.coords.latitude+","+position.coords.longitude+"&aqi=no").then((response)=>{
                console.log(response.data,position.coords.latitude,position.coords.longitude)
                this.setState({location:response.data.location,current:response.data.current,isLoaded:true,lat:position.coords.latitude,lon:position.coords.longitude});
            }).catch((e)=>{
                this.setState({errors:e})
            });
        });
    }

    render() {
        const position=[this.state.isLoaded ? this.state.lat:0, this.state.isLoaded ? this.state.lon:0];
        return (
            <>
            <MapContainer center={[this.state.isLoaded ? this.state.lat:0, this.state.isLoaded ? this.state.lon:0]} zoom={15} scrollWheelZoom={false}>
                <TileLayer url="https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=JjP8asyAXrUEpd1YVfXb"/>
                <MapView coords={position} />
            </MapContainer>
            <div id="weather_wrapper">
            <h1 className='text-center text-white fw-bolder mt-5 content-top mb-5'>Previsioni Meteo</h1>
            <div className="weatherCard">
              <div className="currentTemp">
                <span className="temp">{ this.state.isLoaded ? this.state.current.temp_c : "Unset"}&deg;</span>
                <span className="location">{ this.state.isLoaded ? this.state.location.name : "Unset"}</span>
              </div>
              <div className="currentWeather">
                <span className="conditions"><img src={ this.state.isLoaded ? this.state.current.condition.icon : "Unset"} alt="img-weather"/></span>
                <div className="info">
                  <span className="rain">{this.state.isLoaded ? this.state.current.precip_mm : "Unset"} MM</span>
                  <span className="wind">{this.state.isLoaded ? this.state.current.wind_kph : "Unset"} Km/h</span>
                </div>
              </div>
            </div>
          </div>
            </>
        );
    }

}

export default Weather;