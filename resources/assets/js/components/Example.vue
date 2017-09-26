<template>
  <v-app id="sandbox" standalone>
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :persistent="primaryDrawer.type === 'persistent'"
      :clipped="true"
       
      
      absolute
      overflow
      enable-resize-watcher
    ></v-navigation-drawer>
    <v-toolbar>
  
    
      <v-toolbar-side-icon @click.stop="primaryDrawer.model = !primaryDrawer.model" v-if="primaryDrawer.type !== 'permanent'"></v-toolbar-side-icon>
      <v-toolbar-title>Flyner</v-toolbar-title>
     
     
   

 
    
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12>
            <v-card>
               
               
               <mapper style="position:relative;"></mapper>  
            
           
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
    <v-footer :absolute="footer.fixed">
      <span>© {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
 


<script>
  export default {
    data: () => ({
      dark: true,
      drawers: ['Permanent', 'Persistent', 'Temporary'],
      primaryDrawer: {
        model: true,
        type: 'persistent',
        clipped: false,
        floating: false,
        mini: false
      },
      footer: {
        fixed: false
      }
    })
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
</style>