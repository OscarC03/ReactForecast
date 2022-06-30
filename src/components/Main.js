import React, { Component } from 'react';
import '../components/css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MapContainer, TileLayer} from 'react-leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWind,faDroplet,faCloudRain} from "@fortawesome/free-solid-svg-icons"
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
              <section className="vh-100 d-flex align-items-center justify-content-center" id="weather_wrapper">
                  <div className="container-fluid py-5 h-100">
                      <div className="row d-flex justify-content-center align-items-center h-100">
                      <h1 className='text-center text-white fw-bolder'>Previsioni Meteo</h1>
                          <div className="col-md-8 col-lg-6 col-xl-4">
                
                              <div className="card shadow" style={{color: "#4B515D",borderRadius: "35px"}}>
                                  <div className="card-body p-4">
                                      <div className="d-flex">
                                          <h6 className="flex-grow-1">{this.state.isLoaded ? this.state.location.name : "Unset"}</h6>
                                          <h6>{this.state.isLoaded ? this.state.location.localtime.split(' ')[1] : "Unset"}</h6>
                                      </div>
                                      <div className="d-flex flex-column text-center mt-5 mb-4">
                                          <h6 className="display-4 mb-0 font-weight-bold" style={{color: "#1C2331"}}> {this.state.isLoaded ? this.state.current.temp_c : "Unset"}°C </h6>
                                          <span className="small" style={{color: "#868B94"}}>{this.state.isLoaded ? this.state.current.condition.text : "Unset"}</span>
                                      </div>
                                      <div className="d-flex align-items-center">
                                          <div className="flex-grow-1" style={{fontSize: "1rem"}}>
                                              <div><i className="fas fa-wind fa-fw" style={{color: "#868B94"}}></i> <span className="ms-1"><FontAwesomeIcon icon={faWind} /> {this.state.isLoaded ? this.state.current.wind_kph : "Unset"} km/h</span></div>
                                              <div><i className="fas fa-tint fa-fw" style={{color: "#868B94"}}></i> <span className="ms-1"><FontAwesomeIcon icon={faDroplet} /> {this.state.isLoaded ? this.state.current.humidity : "Unset"} % </span></div>
                                              <div><i className="fas fa-sun fa-fw" style={{color: "#868B94"}}></i> <span className="ms-1"><FontAwesomeIcon icon={faCloudRain} /> {this.state.isLoaded ? this.state.current.precip_mm : "Unset"} mm</span></div>
                                          </div>
                                          <div>
                                              <img src={this.state.isLoaded ? this.state.current.condition.icon : "Unset"} className="img-fluid" style={{maxWidth:"100px"}} alt="img-weather" />
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
            </>
        );
    }

}

export default Weather;