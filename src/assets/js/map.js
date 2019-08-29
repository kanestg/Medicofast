
    function initialize() {
        var center = new google.maps.LatLng(28.632430, 77.218790);
        
        var mapOptions = {
            center: center,
            zoom: 14,
            gestureHandling: 'none',
            zoomControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
  
            styles: [
   {
      "featureType":"water",
      "stylers":[
         {
            "saturation":43
         },
         {
            "lightness":-11
         },
         {
            "hue":"#0088ff"
         }
      ]
   },
   {
      "featureType":"road",
      "elementType":"geometry.fill",
      "stylers":[
         {
            "hue":"#ff0000"
         },
         {
            "saturation":-100
         },
         {
            "lightness":99
         }
      ]
   },
   {
      "featureType":"road",
      "elementType":"geometry.stroke",
      "stylers":[
         {
            "color":"#808080"
         },
         {
            "lightness":54
         },
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"landscape.man_made",
      "elementType":"geometry.fill",
      "stylers":[
         {
            "color":"#ece2d9"
         },
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"poi.park",
      "elementType":"geometry.fill",
      "stylers":[
         {
            "color":"#ccdca1"
         },{
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"road",
      "elementType":"labels.text.fill",
      "stylers":[
         {
            "color":"#767676"
         },
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"road",
      "elementType":"labels.text.stroke",
      "stylers":[
         {
            "color":"#ffffff"
         },{
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"poi",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"landscape.natural",
      "elementType":"geometry.fill",
      "stylers":[
         {
            "visibility":"off"
         },
         {
            "color":"#b8cb93"
         }
      ]
   },
   {
      "featureType":"poi.park",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"poi.sports_complex",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"poi.medical",
      "stylers":[
         {
            "visibility":"on"
         },
         {
            "color":"red"
         }
      ]
   },
   {
      "featureType":"poi.business",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },{
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
  ],
                    label: {
                    color: 'red',
                    fontWeight: 'bold',
                    text: 'Hello world',
                    fontSize:'89'
                    },
        }
  
        
        var map = new google.maps.Map(document.getElementById("map"),
                        mapOptions);
  
        var circle = new google.maps.Circle({
            center: center,
            radius: 300,
            strokeColor: "#E16D65",
            strokeOpacity: 1,
            strokeWeight: 1,
            fillColor: "#E16D65",
            fillOpacity: 0.5
        });
        circle.setMap(map);
        
        var direction = 1;
        var rMin = 300, rMax = 1000;
        setInterval(function() {
            var radius = circle.getRadius();
            if ((radius > rMax) || (radius < rMin)) {
                direction *= -1;
            }
            circle.setRadius(radius + direction * 10);
            //console.log(radius);
        }, 25);
    }
  
    google.maps.event.addDomListener(window, 'load', initialize);