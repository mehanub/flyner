<template>
<div>
  <gmap-marker    :icon="{url:'/img/'+m.markerType+'.png',scaledSize:scaledSize}"  :key="index" v-for="(m, index) in coords" :position="m.position":clickable="true" :draggable="false" @click="$bus.$emit('toogleInfo',m,index)" />  

</div>
</template>


<script>
export default {
  props: ['coords'],
  data () {
    return {
        markerIcon: {
       url: '/img/placeholder.png',
        },
      
     }
  }, 

  computed:{
    scaledSize: function(){
      return new google.maps.Size(28, 28);
    }
  }
  
 
  }

</script>