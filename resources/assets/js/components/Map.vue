 
<template>
 
        
   



       <!--   <gmap-autocomplete
                     @place_changed="setPlace">
                </gmap-autocomplete>

                <button @click="usePlace">Add</button>
 
-->     
<v-flex xs12>
 
  <v-flex  style="position:absolute;top: 10px;left: 150px; z-index:1" xs12  class="rp-settings">
    
   <v-toolbar class="white" floating dense>
       <div data-v-5005e3f0="" class="input-group input-group--prepend-icon input-group--hide-details input-group--text-field input-group--single-line">
          <div class="input-group__input">
              <i aria-hidden="true" class="material-icons icon input-group__prepend-icon">search</i> 
              <gmap-autocomplete @keypress.enter="alert();" @place_changed="setPlace"></gmap-autocomplete>
          </div>
          <div class="input-group__details">
          <div class="input-group__messages"></div>
          </div>
        </div>
 
       <v-btn-toggle  mandatory v-model="toggle_draw">   
        <v-btn flat >
           <v-icon >open_with</v-icon>
        </v-btn>  
        <v-btn flat>
          <v-icon >place</v-icon>
        </v-btn>
        <v-btn flat>
          <v-icon>more_vert</v-icon>
        </v-btn>
        </v-btn-toggle>
    </v-toolbar>
  </v-flex  > 
           <gmap-map @click="mapClick"  :center="center":zoom="zoom" style="height:750px" >
             <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
                   <v-card>
                    <v-list>
                      <v-list-tile avatar>
 
                        <v-list-tile-content>
                          <v-list-tile-title>John Leider</v-list-tile-title>
                          <v-list-tile-sub-title>Founder of Vuetify.js</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-btn
                            icon
                            :class="fav ? 'red--text' : ''"
                            @click="fav = !fav"
                          >
                            <v-icon>favorite</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-action>
                          <v-switch v-model="message" color="purple"></v-switch>
                        </v-list-tile-action>
                        <v-list-tile-title>Enable messages</v-list-tile-title>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-action>
                          <v-switch v-model="hints" color="purple"></v-switch>
                        </v-list-tile-action>
                        <v-list-tile-title>Enable hints</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat @click="menu = false">Cancel</v-btn>
                      <v-btn primary flat @click="menu = false">Save</v-btn>
                    </v-card-actions>
                  </v-card>
            </gmap-info-window>

                <gmap-marker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  :clickable="true"
                  :draggable="true"
                  @click="toggleInfoWindow(m,index)"
                ></gmap-marker>
              </gmap-map>
         
 
 
</v-flex>  
</template>
<script>
export default {
  data () {
    return {
      PlaceisActive: false,
 
        center: {lat: 0.0, lng: 0.0},
        infoContent: '',
          infoWindowPos: {
            lat: 0,
            lng: 0
          },
          infoWinOpen: false,
          currentMidx: null,
          infoOptions: {
            pixelOffset: {
              width: 0,
              height: -35
            }
          },
        markers: [],
         zoom:2,
      place: null,
      styles: [],
      toggle_draw:0,
    }
  },
  methods: {
       
      setPlace(place) {
        this.place = place
          
         this.usePlace(place);
      },
      usePlace(place) {
      
        if (this.place) {
          this.markers.push({
            position: {
              lat: this.place.geometry.location.lat(),
              lng: this.place.geometry.location.lng(),
            }
          })
          this.center = {
              lat: this.place.geometry.location.lat(),
              lng: this.place.geometry.location.lng(),
            }
          this.zoom=11;
          this.place = null;
        }
      },

     mapClick(e){
      // добавить маркер на карту
      if (this.toggle_draw=1) {
         this.markers.push({
                position: {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            }
              })    
          }
        },
        toggleInfoWindow: function(marker, idx) {
            this.infoWindowPos = marker.position;
            this.infoContent = marker.infoText;
            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == idx) {
              this.infoWinOpen = !this.infoWinOpen;
            }
            //if different marker set infowindow to open and reset current marker index
            else {
              this.infoWinOpen = true;
              this.currentMidx = idx;
            }
          },

    markerClick(e){

      console.log(e.position);

    }

  }
}
</script>
<style scope>
 
.btn--active{color:#5d95ff!important;}

.btn__content:before {
    
    width: 0;
}

.btn-toggle--selected {
    box-shadow: none;
}
</style>