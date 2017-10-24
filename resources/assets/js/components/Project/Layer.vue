 <template>   
 <div>
   <v-container fluid style="min-height: 0;" grid-list-lg  @click="selectLayer()">
            <v-card  :class="[selected ? '-selected' : '-unselected']"  hover class="white--text mx-1">
                <v-list-tile class="layer_container"  color="grey lighten-4" >
                <template v-if="edit==false">
                  <v-list-tile-content >
                    <v-list-tile-title>
                     <v-btn  @click="layer.expanded=!layer.expanded"  flat class="settings-icon"  icon><v-icon fa-fw style="font-size:14px">{{layer.expanded? 'fa-minus-square': 'fa-plus-square'}}</v-icon></v-btn>
                      <span>{{ layer.text }}</span>

                    </v-list-tile-title>
                  </v-list-tile-content>

                  <transition name="slide-fade">
                  <v-btn v-show="selected" @click="editLayer()"  flat   icon class="settings-icon"><v-icon fa-fw style="font-size:16px">fa-gear</v-icon></v-btn>
                  </transition>

                   <v-btn flat @click="layer.display=!layer.display" icon class="settings-icon"><v-icon fa-fw style="font-size:16px">{{ layer.display ? 'fa-eye' : 'fa-eye-slash' }}</v-icon></v-btn>
                  </template>
                  <template v-else>
                    <input class="layerInput" ref="layerName" v-model="layertext" type="text" name="">
                    <v-btn @click="saveLayer()" flat  icon class="settings-icon"><v-icon color="blue lighten-2" fa-fw style="font-size:16px">fa-check</v-icon></v-btn>
                    <v-btn @click="deleteLayer()" flat  icon class="settings-icon"><v-icon color="red lighten-2" fa-fw style="font-size:16px">fa-trash</v-icon></v-btn>
                  </template>

                </v-list-tile>
                <v-divider light class="my-0"></v-divider>
                <transition name="slide-fade">  <v-card-title v-show="layer.expanded"  class="grey--text">--Empty--</v-card-title> </transition>
             </v-card>
    </v-container>
</div>
</template>
<script> 
  export default {
  	props:['layer','selected'],
    data: () => ({      
      edit: false,
      layertext: ''
    }),
    methods:{
    	selectLayer: function() {
	   		this.$bus.$emit("selectLayer",this.layer.id);
        this.layerShapes()
 	   	},
      editLayer: function(){
        this.edit=true
        this.layertext=this.layer.text
        this.$nextTick(() => {
           this.$refs.layerName.focus();
        });
      },
      saveLayer:function(){
        this.$bus.$emit("saveLayer",this.layer.id, this.layertext);

        this.edit=false;
      },
      deleteLayer:function(){
         console.log(this.layer)
        this.edit=false;
        this.$bus.$emit("deleteLayer",this.layer.id);
      },
      
   },
    watch: {
      selected: function(val){
        if(!val){
            this.edit=false;
          }
        },
    },
     

  }
</script>

<style type="text/css">
	.-selected{
		border-left: 4px solid #5d95ff;
     transition: all .5s ease;
	}

  .-unselected{
    border-left: 4px solid transparent;
     transition: all .5s ease;
  }


	.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(20px);
  opacity: 0; 
}

.layerInput{
  padding: 2px 5px;
  outline: none;
  border-bottom: 2px solid #5d95ff;
  width: 200px;
  caret-color: grey;
}


</style>