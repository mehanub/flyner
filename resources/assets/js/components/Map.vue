 
<template>
 <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12>
            <v-card>   
             <div style="heigh:100%">
             <maptoolbar v-on:find_place="usePlace" v-on:change_toogle="setToogle"  v-bind:toggle_draw="toggle_draw"/>   
                <gmap-map  ref="map" @click="mapClick"  :center="center":zoom="zoom" style="position: fixed;top: 0;right: 0; bottom: 0; left: 0;">
                  <markerInfo  v-if="infoWinOpen" :info="infoContent" :open.sync="infoWinOpen"/>
                  <shape v-if="mapLoaded" :coords="markers"/>
                </gmap-map>
             </div>   
          </v-card>
      </v-flex>   
    </v-layout>
  </v-container>
</template>

<script>
export default {
 
  data () {
    return {
        
        center: {lat: 56.732, lng:37.166},
        //параменты info окна
        infoType:1,
        infoContent: [],
        infoWindowPos: {lat: 0,lng: 0},
        infoWinOpen: false,
        currentMidx: null,
        infoOptions: {pixelOffset: {width: 0,height: -35}},
        //маркеры
        markers: [{
          id: 123,
          type: 1,
          position:{lat: 56.732,lng: 37.166,},
          adress: 'Дубна, Московская обл., Россия',
          info:{title:'Дубна',descr:'Мой любимый город'},
          markerType:'flag_finish',
           }],
        currPlace:'',
        zoom:3,
        mapLoaded: false,
        styles: [],
        toggle_draw:0,
         //scaledSize:  new google.maps.Size(60, 60),
    }
  },

  methods: {
   setToogle(toogle){
       this.toggle_draw=toogle;
    },

   setCenter(lat,lng){
      this.center = {
              lat: lat,
              lng: lng,
            }
    },
    //найти место
      usePlace(place) {   
         this.markers.push({
              id: this.getRandomId(),
              position: { 
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              },
              adress : place.formatted_address,
              info:{title:'',descr:''},
              markerType:'placeholder'
          })
        this.setCenter( place.geometry.location.lat(),place.geometry.location.lng())        
        this.toggleInfoWindow(this.markers[this.markers.length-1],0)
        },
  
     mapClick(e){       
      // добавить маркер на карту
      if (this.toggle_draw==1) {
          this.markers.push({
             id: this.getRandomId(),
              position: {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
              },
              adress: '',
              info:{title:'',descr:''},
              adress: '',
              markerType:'placeholder'
              })
           this.toggleInfoWindow(this.markers[this.markers.length-1],this.markers.length-1)
           this.setCenter(e.latLng.lat(),e.latLng.lng())          
            }
        },
        toggleInfoWindow: function(marker, idx) {
            this.infoWindowPos = marker.position;
            this.infoContent = marker;
           
            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == idx) {
              this.infoWinOpen = !this.infoWinOpen;
            }
            //if different marker set infowindow to open and reset current marker index
            else {
              this.infoWinOpen = true;
              this.currentMidx = idx;
            }          
               this.toggle_draw=0
          }, 
         

       
    
  },
  mounted:function() {
 
    this.$refs.map.$mapCreated.then(() => {
      this.map = this.$refs.map.$mapObject;
      this.map.setOptions({
        mapTypeControl: true,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.HYBRID,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.TERRAIN],
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: google.maps.ControlPosition.TOP_RIGHT
        },
        panControl: true,
        panControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        streetViewControl: true,
        streetViewControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        scaleControl: true,
        overviewMapControl: true,
        rotateControl: true
      });
    this.mapLoaded=true
   
    var planeSymbol = {

      path: 'M362.985,430.724l-10.248,51.234l62.332,57.969l-3.293,26.145 l-71.345-23.599l-2.001,13.069l-2.057-13.529l-71.278,22.928l-5.762-23.984l64.097-59.271l-8.913-51.359l0.858-114.43 l-21.945-11.338l-189.358,88.76l-1.18-32.262l213.344-180.08l0.875-107.436l7.973-32.005l7.642-12.054l7.377-3.958l9.238,3.65 l6.367,14.925l7.369,30.363v106.375l211.592,182.082l-1.496,32.247l-188.479-90.61l-21.616,10.087l-0.094,115.684',
      scale: 0.0633,
      strokeOpacity: 1,
      strokeColor: '#5d95ff',
      fillColor: 'white',
      fillOpacity: 1,
      strokeWeight: 1,
      anchor: new google.maps.Point(300, 300)
    };

      var image = {
        url: '/img/flag_start.png', // image is 512 x 512
        scaledSize: new google.maps.Size(20, 20),     
    };
    var image2 = {
        url: '/img/flag_finish.png', // image is 512 x 512
        scaledSize: new google.maps.Size(20, 20),     
    }; 

    var marker = new google.maps.Marker({
        position: { lat: 16.003575733881323 ,lng: 101.689453125 },
        map: this.map,
        icon: image
    });
     var marker2 = new google.maps.Marker({
        position: { lat: 59.934288 ,lng: 30.3350336 },
        map: this.map,
        icon: image2
    });


      var departure = new google.maps.LatLng(16.003575733881323, 101.689453125); //Set to whatever lat/lng you need for your departure location
      var arrival = new google.maps.LatLng(59.934288, 30.3350336); //Set to whatever lat/lng you need for your arrival location
      var line = new google.maps.Polyline({
      path: [departure, arrival],
      strokeColor: "grey",
      strokeOpacity: 1,
      strokeWeight: 2,
      geodesic: true, //set to false if you want straight line instead of arc
      map: this.map,
      icons: [{
        icon: planeSymbol,
        offset: '0'
      }],




        /*icons: [{
                    icon: {path: google.maps.SymbolPath.FORWARD_OPEN_ARROW},
                    offset: '100%'}], */
      });
       line.setPath([departure, arrival]);
         (function animateArrow() {

            var counter = 0;
            var accessVar = window.setInterval(function() {
                counter = (counter + 1) % 350;
 
                var arrows = line.get('icons');
                arrows[0].offset = (counter / 2) + '%';
                line.set('icons', arrows);
            }, 100);
        }())
      /* var step = 0;
       var numSteps = 250; //Change this to set animation resolution
       var timePerStep = 5; //Change this to alter animation speed
       var interval = setInterval(function() {
           step += 1;
           if (step > numSteps) {
               clearInterval(interval);
           } else {
               var are_we_there_yet = google.maps.geometry.spherical.interpolate(departure,arrival,step/numSteps);
               line.setPath([departure, are_we_there_yet]);
           }
       }, 5);
        */
        


    })
  

   this._deleteMarker =()=> {
     this.markers.splice(this.currentMidx,1)    
   }
   this._saveMarker =(data)=> {
      
     this.markers[this.currentMidx].info.descr=data.adress;    
   }

   this.$bus.$on("deleteMarker",this._deleteMarker);
   this.$bus.$on("toogleInfo",this.toggleInfoWindow);
   this.$bus.$on("saveMarker",this._saveMarker);
  },


  beforeDestroy: function() {
   this._deleteMarker && this.$bus.$off("deleteMarker",this._deleteMarker);
   this._saveMarker && this.$bus.$off("saveMarker",this._saveMarker);
   
   },  
}

</script>
