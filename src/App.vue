<template>
      <v-app id="app">
    <div class="vue-tempalte">
      <div class="custom-shape-divider-top-1639491006">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
        </svg>
      </div>
      <LoginForm/>
      <div class="custom-shape-divider-bottom-1639491063">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
        </svg>
      </div>
    </div>
        <router-view></router-view>
      </v-app>
</template>
<style>
.v-messages__message{
  float: right;
}
.custom-shape-divider-top-1639491006 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape-divider-top-1639491006 svg {
  position: relative;
  display: block;
  width: calc(226% + 1.3px);
  height: 374px;
}

.custom-shape-divider-top-1639491006 .shape-fill {
  fill: #C7B198;
}

/** For mobile devices **/
@media (max-width: 767px) {
  .custom-shape-divider-top-1639491006 svg {
    width: calc(184% + 1.3px);
    height: 98px;
  }
}

.custom-shape-divider-bottom-1639491063 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-bottom-1639491063 svg {
  position: relative;
  display: block;
  width: calc(226% + 1.3px);
  height: 374px;
}

.custom-shape-divider-bottom-1639491063 .shape-fill {
  fill: #C7B198;
}

/** For mobile devices **/
@media (max-width: 767px) {
  .custom-shape-divider-bottom-1639491063 svg {
    width: calc(184% + 1.3px);
    height: 98px;
  }
}

/** For mobile devices **/
@media (max-width: 767px) {
  .custom-shape-divider-top-1638773172 svg {
    width: calc(208% + 1.3px);
    height: 189px;
  }
}

@font-face {
  font-family: "IranSans";
  src: url("./assets/fonts/IRANSANS.TTF");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "IranNastaliq";
  src: url("./assets/fonts/IranNastaliq.ttf");
  font-weight: normal;
  font-style: normal;
}
#subminbtn{
  margin-top: 10px;
  background-color: #596E79;
  color: white;
  width: 100%;
  border: hidden;
}
#phonetext{
  margin-top: 30px;
  min-height: 0;
  text-align: center;
}
.vue-tempalte{
  width:100%;
  height:100%;
  position: absolute;
  text-align: center;
  background-color: white;
  font-family: IranSans;
  padding: 20px;
  color: black;
}



.v-input--selection-controls .v-input__slot > .v-label, .v-input--selection-controls .v-radio > .v-label {
  font-size: 12px;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.phonetext.v-text-field.v-input--dense:not(.v-text-field--outlined) input{
  text-align: center !important;
}


</style>
<script>
import { mdiChartAreaspline  } from '@mdi/js';
import LoginForm from './components/LoginForm.vue'
import $ from "jquery"
import axios from 'axios'

  export default {
    data: () => ({
      host:location.protocol + "//" + location.host,
      isLogin:false,
      logo:mdiChartAreaspline ,
      errormsg:"",
      loader: null,
    }),
    components:{
      mdiChartAreaspline,
      LoginForm,
    },
    mounted() {
      let a = this;
      setTimeout(function() { a.success = false; }, 3000);
    },
    methods: {

    },

  }
</script>