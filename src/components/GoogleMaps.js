import React, { Component,createRef } from 'react'

class GoogleMaps extends Component {
    constructor(props){
        super(props)
        this.state={
        markers : [],
        map : ''
        }
        
        this.googleMapRef = createRef()
        this.showListingsRef = createRef()
        this.hideListingsRef = createRef()
        
    }    
    
    componentDidMount =() =>{
        window.createGoogleMap = this.createGoogleMap
        const googleMapScript = document.createElement('script')

        googleMapScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC3sXvuy2Kmo5TLamDbHmGx-obyLBNh3tc&v=3&callback=createGoogleMap"
        googleMapScript.async = true
        googleMapScript.defer = true
        window.document.body.appendChild(googleMapScript)
        
    }

    createGoogleMap = () => {
        var styles = [
            {
              featureType: 'water',
              stylers: [
                { color: '#19a0d8' }
              ]
            },{
              featureType: 'administrative',
              elementType: 'labels.text.stroke',
              stylers: [
                { color: '#ffffff' },
                { weight: 6 }
              ]
            },{
              featureType: 'administrative',
              elementType: 'labels.text.fill',
              stylers: [
                { color: '#e85113' }
              ]
            },{
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [
                { color: '#efe9e4' },
                { lightness: -40 }
              ]
            },{
              featureType: 'transit.station',
              stylers: [
                { weight: 9 },
                { hue: '#e85113' }
              ]
            },{
              featureType: 'road.highway',
              elementType: 'labels.icon',
              stylers: [
                { visibility: 'off' }
              ]
            },{
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [
                { lightness: 100 }
              ]
            },{
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [
                { lightness: -100 }
              ]
            },{
              featureType: 'poi',
              elementType: 'geometry',
              stylers: [
                { visibility: 'on' },
                { color: '#f0e4d3' }
              ]
            },{
              featureType: 'road.highway',
              elementType: 'geometry.fill',
              stylers: [
                { color: '#efe9e4' },
                { lightness: -25 }
              ]
            }
          ]
          
      const map  = new window.google.maps.Map(this.googleMapRef.current,{
            zoom :13,
            styles : styles,
            center :{
                lat:40.7413549,
                lng:-73.9980244
            },
            mapTypeControl: false
        })

        this.setState({
            map
        })
        //var tribeca =  { lat: 40.719526, lng: -74.0089934}

        var locations = [
            {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
            {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
            {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
            {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
            {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
            {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
          ]

        const largeInfoWindow = new window.google.maps.InfoWindow()

        var defaultIcon = this.makeMarkerIcon('0091ff')

        var highlightedIcon = this.makeMarkerIcon('FFFF24')

        for (var i = 0; i < locations.length; ++i){
            var position = locations[i].location
            var title = locations[i].title

            const marker = new window.google.maps.Marker({
                position:position,
                title:title,
                icon:defaultIcon,
                animation:window.google.maps.Animation.DROP,
                id:i
            })
            this.setState(prevState=>{
               return {markers:[...prevState.markers, marker]}
            })
            window.populateInfoWindow = this.populateInfoWindow
            marker.addListener('click',function(){
                window.populateInfoWindow(this,largeInfoWindow)
            })
            marker.addListener('mouseover', function(){
              this.setIcon(highlightedIcon)
            })
            marker.addListener('mouseout', function(){
              this.setIcon(defaultIcon)
            })
        }
        this.showListingsRef.current.addEventListener('click',this.showListings)
        this.hideListingsRef.current.addEventListener('click',this.hideListings)
    }
    
    makeMarkerIcon = (markerColor) =>{
      var markerImage = new window.google.maps.MarkerImage('http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new window.google.maps.Size(21,34),
      new window.google.maps.Point(0,0),
      new window.google.maps.Point(10,34),
      new window.google.maps.Size(21,34)
      )

      return markerImage
    }

    showListings = () =>{
        const bounds = new window.google.maps.LatLngBounds()

        this.setState(prevState=>{
            return {
                markers:prevState.markers.map(marker =>{
                    marker.setMap(this.state.map)
                    return marker
                })
            }
        },()=>{
            this.state.markers.map(marker=>bounds.extend(marker.position))
        })

        this.state.map.fitBounds(bounds)

    }

    hideListings =() =>{
        this.setState(prevState=>{
            return {
                markers: prevState.markers.map(marker=>{
                    marker.setMap(null)
                    return marker
                })
            }
        })
    }

    populateInfoWindow = (marker,infoWindow) =>{
        if(infoWindow.marker !== marker){
            infoWindow.marker = marker
            infoWindow.setContent('<div>' + marker.title + '</div>')
            infoWindow.open(this.state.map,marker)
            infoWindow.addListener('closeClick', ()=>{
                infoWindow.setMarker(null)
            })
        }
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className="options-box">
                        <h5>Find Your New NYC Home</h5>
                        <div>
                            <input ref={this.showListingsRef} id="show-listings" type="button" value="Show Listings" />
                            <input ref={this.hideListingsRef} id="hide-listings" type="button" value="Hide Listings" />
                        </div>
                    </div>

                </div>
                <div 
                    id="map"
                    ref={this.googleMapRef}
                >                
                </div>
            </div>
            
        )
    }
}

export default GoogleMaps
