<template>
	 <gmap-info-window :options="infoOptions" :position="infoPos" :opened="open" @closeclick="$emit('update:open', false)">
              <v-card v-if="editing">
			    <v-list>
			      <v-list-tile avatar>
			        <v-avatar :tile=true>
			          <!--<v-icon large class="blue--text text--darken-2">{{info.markerType}}</v-icon>-->
			           <img class="avatar-img" :src="infoUrl"/> 
			        </v-avatar>
			        <v-list-tile-content>
			        <!--  <v-list-tile-title>{{info.info.title}} </v-list-tile-title> -->
			          <v-list-tile-title> <div>{{info.info.descr}}</div></v-list-tile-title>
			        
			        </v-list-tile-content>

			      </v-list-tile>
			    </v-list>
			   <span>{{place}} </span>  
			    <v-divider></v-divider>
			        <v-card-actions >
			           <span>{{info.position.lat}}, {{info.position.lng}} </span>
			            <v-spacer></v-spacer>
			            <v-btn icon @click="editMarker()">
			              <v-icon>edit</v-icon>
			            </v-btn>
			            <v-btn icon @click="deleteMarker()">
			              <v-icon>delete</v-icon>
			            </v-btn>
	                </v-card-actions>			          
			  </v-card> 

     <v-card v-if="!editing" style="width:400px; overflow:hidden;">    
	    <v-select  v-bind:items="marker_type" v-model="info.markerType" item-text="name" item-value="name">
	              <template slot="selection" scope="data">
	              <v-chip   label  @input="data.parent.selectItem(data.item)"
                  :selected="data.selected"
                  class="chip--select"
                  :key="JSON.stringify(data.item)">
                  <v-avatar :tile=true>
                    <img  class="avatar-img" :src="data.item.avatar">
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
	                                
	              </template>
	              <template slot="item" scope="data">
	                   
	                  <v-avatar :tile=true>
                    <img class="avatar-img" :src="data.item.avatar">
                  </v-avatar>
	                  <v-list-tile-content>
	                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>	                     
	                  </v-list-tile-content>
	              </template>
	     </v-select>   
      
      <textarea class="textarea" ref="note" v-model="note" placeholder="Опишите место..."/> 
			<span>{{place}} </span>   
			<v-divider></v-divider>
		 <v-card-actions >
			    <span>{{info.position.lat}}, {{info.position.lng}} </span>
				<v-spacer></v-spacer>
			 
	          <v-btn small flat color="primary" @click="saveMarker()">Save</v-btn>  
	          <v-btn small flat color="primary" @click="editing=true">Cancel</v-btn>
        </v-card-actions>
              
      </v-card> 
     </gmap-info-window>

</template>

<script>
export default {
  props: ['info','open'],
  data () {
  		let srcs = {
        1: '/img/placeholder.png',
        2: '/img/flag_start.png',
        3: '/img/flag_finish.png',
    
      }    

    return {
        
    	 test: new google.maps.Point(11,40),
        editing: true,
        infoContent: [],
        infoWindowPos: {lat: 0,lng: 0},
       // infoWinOpen: false,
        currentMidx: null,
        infoOptions: {pixelOffset: {width: 0,height: -35}},
 		place: null,
 		note:'',
 		  e11: [],
 		 marker_type: [
         // { header: 'Group 1'},
          { name: 'placeholder', avatar: srcs[1] },
           { name: 'flag_start',  avatar: srcs[2] },
           { name: 'flag_finish',  avatar: srcs[3] },
      //    { name: 'Airport',  avatar: srcs[4] },
           
        ],
    }
  },
 computed : {
 	infoPos: function(){
 		return this.info.position;
 	},
 	infoUrl: function(){
 		return '/img/'+this.info.markerType+'.png';
 	},
 	
 },
  mounted: function () {
  this.getlocation();
},
  methods: {
  	editMarker: 
  		function() {
			this.note=this.info.info.descr
			this.editing = false;
			this.$nextTick(() => {
				 this.$refs.note.focus();
			});
		},
	deleteMarker: 
  		function() {		 
			this.$emit('update:open', false)
			this.$bus.$emit('deleteMarker')
		},
	saveMarker: 
  		function() {
			this.editing = true; 
			this.$bus.$emit('saveMarker',{adress:this.note})
		},	

    getlocation:  
      function () {       
        this.place = 'Определяю...';
        var vm = this
           $.ajax({
                url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.info.position.lat+','+this.info.position.lng+'&key=AIzaSyBsZpmjeo2mhkWXOYpwa86DDr7SFCsDAL0',
                success(data) {
                     vm.place = _.capitalize(data.results[0].formatted_address)
                },
                error(jq, status, error){
                   vm.place = 'Ошибка! не могу определить местоположение... ' + error
                }

            });
      } 
  }
}
</script>


<style type="text/css">
	
 

hr{

	    margin-top: 8px;
    margin-bottom: 8px;
}

.card__actions{

  padding: 0
}

.input-group__details{

	min-height: 0px;
}
 

ul.list{
	margin-bottom: 0px;
}

.list__tile--avatar{

	height: 45px;
}
.textarea{

	    margin-bottom: 2px;
    height: 71px;
    border: 1px solid grey;
    padding: 9px;
    margin-top: 9px;
    width: 100%;
}

.card>.list{
padding: 0px;
padding-left: 10px;
}
 .avatar-img{

 	width: 25px!important;
 	height: 25px!important;
 }

 .application--light .chip {
    background: #f5f5f5;
    color: rgba(0,0,0,.87);
}

</style>
