<template>
  <div>
<v-navigation-drawer absolute persistent light v-model="drawer" overflow>
   <projectToolbar/>
    <v-divider dark class="my-0"></v-divider>
    <v-list dense>
    <template v-for="(item, i) in items">
      <div class="my-flex-container">
        <div class="my-flex-block">
          <v-btn  color="grey lighten-3" @click="item.model=!item.model" icon class="settings-icon">
            <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
          </v-btn></div>
        <div class="my-flex-block" style="width:100%">  
        <v-btn @click="addLayer()" class="btn-layer"><i class="fa fa-plus fw" style="padding-right: 5px"></i>Add layer</v-btn></div>
      </div>
       <v-list-group v-if="layers" v-model="item.model" lazy no-action>
         <layer v-for="(l,index) in layers" :key="l.id"  :layer="l" :selected="l.id==selectedLayer"/>  
       </v-list-group>
      </template>
    </v-list>
</v-navigation-drawer>
    <mapper style="position:relative;"></mapper> 
    
</div>
</template>
 


<script>
Vue.mixin({
  methods:  {
    layerShapes(){
      let l = this.myOption;
      console.log(l)
     // if (!layer || !layer.shapesIds || layer.shapesIds.length==0) return [];
      //return layer.shapesIds.map(shapeId => state.shapes[shapeId]);
    } ,
 },
  
})

  export default {

    data: () => ({
      myOption: 'hello!',
      selectedLayer: undefined,
      drawer: true,
      items: [{
       icon: 'keyboard_arrow_up',
      'icon-alt': 'keyboard_arrow_down',
      text: 'Layers',
      model: true }],
      layers: [{ 
        id:1, text: 'Layer 1', display:true, expanded:true,shapesIds:[123]
        }],  
      shapes: [{
          id: 123,
          type: 1,
          position:{lat: 56.732,lng: 37.166,},
          adress: 'Дубна, Московская обл., Россия',
          info:{title:'Дубна',descr:'Мой любимый город'},
          markerType:'flag_finish',
           }]
      }),    
     

    methods:{
      _selectLayer: function(id){
        this.selectedLayer = id;
      },

      addLayer(){
          var that=this
          var a=(function(){
              let id=that.getRandomId();
              that.layers.push({
              id: id ,
              text: "Undefined layer",
              display: true,
              expanded: true,
            });
            return id
          }());
         this._selectLayer(a)  
        }
      },

    mounted: function(){
      if (this.layers.length>0){
        this._selectLayer(this.layers[0].id)
      }

      this._saveLayer=(id,text)=>{
        let index=this.getIndex(this.layers,id)
        this.layers[index].text=text
      }

      this._deleteLayer=(id)=>{
        let index=this.getIndex(this.layers,id)
        this.layers.splice(index,1)    
      }

      this.$bus.$on("selectLayer",this._selectLayer);
      this.$bus.$on("saveLayer",this._saveLayer);
      this.$bus.$on("deleteLayer",this._deleteLayer);
    },

    beforeDestroy: function() {
     this._selectLayer && this.$bus.$off("selectLayer",this._selectLayer);
     this._saveLayer && this.$bus.$off("saveLayer",this._saveLayer);
     this._deleteLayer && this.$bus.$off("deleteLayer",this._deleteLayer);
   
   }, 


  }
</script>


<style>
  #sandbox {
    border: 1px solid rgba(0, 0, 0, .1);
    overflow: hidden;
  }
  #sandbox .container, #sandbox {
    min-height: 700px;
  }
  a{
    text-decoration: none!important;
  }
  .settings-icon{
    padding: 0px;
    margin: 0px;
    margin-left: 3px;
    width: 25px;
    height: 25px;
  }

  .container.grid-list-lg {
    padding: 5px;
}
.my-flex-container{
display: flex;
 justify-content:flex-start;
 align-items: center;
}
.my-flex-block{
      padding: 5px 10px;
}
.top-right-button{
      text-align: right;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    overflow: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: baseline;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: flex-end;
    -ms-flex-direction: column;
    flex-direction: row;
    height: 100%;
}
.top-right-icon{
  font-size: 20px;
}

.grey.lighten-3 {
    border-color: #c7c6c6!important;
}

.list__tile{
  padding:0px 8px;
  padding-left: 8px!important;
}
.a-layer{
  float: right;
  padding-right: 5px;
}
.btn-layer{
    float: right;
  height: 28px;
 font-size: 11px;
 width: 28px;
 padding: 0px 11px;
 margin: 0px 0px;
}

.btn__content{
  padding: 0px 0px
}
</style>