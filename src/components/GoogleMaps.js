import React, { Component,createRef } from 'react'

class GoogleMaps extends Component {
    constructor(props){
        super(props)
        this.state={
        markers : [],
        map: ''
        }
        this.googleMapRef = createRef()
        
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
      const map  = new window.google.maps.Map(this.googleMapRef.current,{
            zoom :13,
            center :{
                lat:40.7413549,
                lng:-73.9980244
            }
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
        const bounds = new window.google.maps.LatLngBounds()

        for (var i = 0; i < locations.length; ++i){
            var position = locations[i].location
            var title = locations[i].title

            const marker = new window.google.maps.Marker({
                map,
                position,
                title,
                animation:window.google.maps.Animation.DROP,
                id:i
            })
            this.setState(prevState=>({
                markers:[...prevState.markers,marker]
            }))
            bounds.extend(marker.position)
            window.populateInfoWindow = this.populateInfoWindow
            marker.addListener('click',function(){
                window.populateInfoWindow(this,largeInfoWindow)
            })
        }
        map.fitBounds(bounds)
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
            <div 
            id="map"
            ref={this.googleMapRef}
            >                
            </div>
        )
    }
}

export default GoogleMaps
