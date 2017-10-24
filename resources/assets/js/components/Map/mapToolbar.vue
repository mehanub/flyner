<template>
	<v-flex  style="position:absolute;top:-10px;left: 350px; z-index:1" xs12  class="rp-settings">
    
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
 
       <v-btn-toggle   mandatory v-model="toolbar_toogle">   
        <v-btn flat   >
           <v-icon >open_with</v-icon>
        </v-btn :>  
        <v-btn flat>
          <v-icon >place</v-icon>
        </v-btn>
        <v-btn flat  >
          <v-icon></v-icon>
        </v-btn>
        </v-btn-toggle>
    </v-toolbar>
  </v-flex  > 
</template>

<script>
export default {
   props: ['toggle_draw'],
  data () {
    return {
      
      place: null,
      styles: [],
      
    }
  },
  computed: {
    toolbar_toogle: {
      get: function(){
       return this.toggle_draw;
       },
      set: function(newValue){
         this.$emit('change_toogle', newValue);
      }
    }
  },

  methods: {      
      setPlace(place) {
        this.place = place
         if (this.place){
         this.$emit('find_place',this.place)   
           }
          this.place = null   
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