<template>
  <v-app>
    <div id="mainDiv">

    </div>
    <Footer/>
    <v-snackbar  v-model="snackbar" :timeout="2000" :color="snackColor"  rounded="pill" style="direction: rtl;margin: auto;min-width: 0 !important;width: 50px;font-family: IranSans">
      <v-icon>{{ snackIcon }}</v-icon>
      {{ snackText }}
    </v-snackbar>
    <router-view></router-view>
  </v-app>

</template>

<style>
#mainDiv{
  width: 100%;
  height: 93%;
  background-color: #DFD3C3;
  overflow: scroll;
  position: fixed;
  padding-top: 10px;
}
.infolayer{
  visibility: visible !important;
}
</style>
<script>
import Footer from '../components/Footer.vue'
import axios from 'axios'
import { mdiHeartOutline } from '@mdi/js';
import plotly from 'plotly.js'
import persianDate from "persian-date";
import $ from 'jquery'
export default {
  name: 'Vue Chart',
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  data: () => ({
    host:location.host,
    protocol:location.protocol + "//",
    data: [],
    favoriteIcon:mdiHeartOutline,
    layout:{
      title: ""
    },
    load:true,
    dialog: false,
    dashboard:[],
    charts:[],
    invoiceCharts:[],
    responseArray:[],
    offset: true,
    loading: false,
    value:"",
    favColor:'red',
    Dialog:false,
    isLogin:false,
    isInvoice:false,
    snackbar:false,
    snackText:"",
    snackIcon:"",
    snackColor:"",
  }),
  computed: {},
  components: {
    Footer,
  },

  mounted() {
    let [h] = this.host.split(".");
    if(this.host==="localhost:8081" || this.host==="localhost:8080"){
      this.host = "https://192.168.100.193"
    }else {
      this.host = this.protocol + this.host.substring(h.length + 1)
    }
    this.GetFavoriteChartsByDashboard();
  },
  methods: {
    SubmenuActionClick(id) {
      if (id === 0) {
        this.dialog = true;
      }
    },
    GetFavoriteChartsByDashboard(){
      // $('.plot-container plotly').remove();
      $('#mainDiv').empty();
      this.responseArray = [];
      var persianDate = require("persian-date")
      this.charts=[];
      this.loading=true;
      const formData = new FormData();
      formData.append('mobileNumber', this.getCookie("phone"));
      formData.append('token', this.getCookie("token"));
      formData.append('cmd', "{'/BiTools-portlet.chart/get-favorite-charts-person-by-dashboard':{}}");
      axios.post( this.host + '/api/jsonws/invoke', formData,
      ).then(response => {
        if(response.data.length===0){
          var p = document.createElement("p")
          p.innerText = "موردی یافت نشد"
          p.style.color = "teal"
          p.style.position = "sticky"
          p.style.display = "flex"
          p.style.justifyContent = "center"
          p.style.marginTop = "300px"
          document.getElementById("mainDiv").appendChild(p)
        }
        this.loading=false;
        this.load=false;
        for(var i=0;i<response.data.length;i++) {
          this.responseArray.push(i)
          console.log(response)
          if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.group === '2d' && response.data[i].jsonSetting.chartSetting.type.type === 'scatter')
            this.plotly2DScatterchart(i,response,false);
          if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.group === '2d' && response.data[i].jsonSetting.chartSetting.type.type === 'bar')
            this.plotly2DBarchart(i,response,false);
          if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.group === '2d' && response.data[i].jsonSetting.chartSetting.type.type === 'pie')
            this.plotly2DPiechart(i,response,false);
          if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.group === 'time-series' && response.data[i].jsonSetting.chartSetting.type.type === 'bar')
            this.plotlyTimeSeriesBarchart(i,response,false);
          if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.group === 'time-series' && response.data[i].jsonSetting.chartSetting.type.type === 'scatter')
            this.plotlyTimeSeriesScatterchart(i,response,false);
          if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.group === 'table')
            this.plotlyTable(i,response,false);
          if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.group === 'table')
            this.plotlyTable(i,response,false);
          if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.type === 'invoice')
            this.invoice(i, response);
        }


      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },

    plotly2DScatterchart(i,response,isInv,j) {
      if(isInv) {
        var data = [];
        var config = {modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'],
          displaylogo: false};
        var x = this.unpack(response.data[i].result[j].result, response.data[i].jsonSetting.config.content[j].chartSetting.x.alias);
        if (response.data[i].jsonSetting.config.content[j].chartSetting.x.dataType == 'timestamp') {
          for (var p = 0; p < x.length; p++) {
            x[p] = new persianDate(new Date(x[p])).format('YYYY-MM-DD HH:mm');
          }
        }

        for (let d = 0; d < response.data[i].jsonSetting.config.content[j].chartSetting.y.length; d++) {
          var y = this.unpack(response.data[i].result[j].result, response.data[i].jsonSetting.config.content[j].chartSetting.y[d].alias);

          if (response.data[i].jsonSetting.config.content[j].chartSetting.y[d].dataType == 'timestamp') {
            for (var k = 0; k < y.length; k++) {
              y[k] = new persianDate(new Date(y[k])).format('YYYY-MM-DD HH:mm');
            }
          }
          var layout = {
            width:320,
            height:450,
            font: {
              family: 'IRANSans'
            },
            hoverlabel: {
              font: {
                family: 'IRANSans'
              }
            },
            autosize: false,
            title: response.data[i].jsonSetting.config.content[j].title
          };
          var trace = {
            x: x,
            y: y,
            mode: response.data[i].jsonSetting.config.content[j].chartSetting.type.mode,
            type: response.data[i].jsonSetting.config.content[j].chartSetting.type.type,
            name: response.data[i].jsonSetting.config.content[j].chartSetting.y[d].title,
            fill: response.data[i].jsonSetting.config.content[j].chartSetting.type.fill,
          }
          data.push(trace);
        }
        plotly.newPlot("invTable" + i + "invChart" + j, data, layout, config);
      }
      else {
        var data = [];
        var config = {modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'], displaylogo: false};
        var x = this.unpack(response.data[i].result, response.data[i].jsonSetting.chartSetting.x.alias);

        if (response.data[i].jsonSetting.chartSetting.x.dataType == 'timestamp') {
          for (var p = 0; p < x.length; p++) {
            x[p] = new persianDate(new Date(x[p])).format('YYYY-MM-DD HH:mm');
          }
        }

        for (let d = 0; d < response.data[i].jsonSetting.chartSetting.y.length; d++) {
          var y = this.unpack(response.data[i].result, response.data[i].jsonSetting.chartSetting.y[d].alias);

          if (response.data[i].jsonSetting.chartSetting.y[d].dataType == 'timestamp') {
            for (var p = 0; p < y.length; p++) {
              y[p] = new persianDate(new Date(y[p])).format('YYYY-MM-DD HH:mm');
            }
          }
          var layout = {
            width:320,
            height:450,
            borderRadius: '15px',
            font: {
              family: 'IRANSans'
            },
            hoverlabel: {
              font: {
                family: 'IRANSans'
              }
            },
            autosize: false,
            title: response.data[i].title
          };
          var trace = {
            x: x,
            y: y,
            mode: response.data[i].jsonSetting.chartSetting.type.mode,
            type: response.data[i].jsonSetting.chartSetting.type.type,
            name: response.data[i].jsonSetting.chartSetting.y[d].title,
            fill: response.data[i].jsonSetting.chartSetting.type.fill,
          }
          data.push(trace);
        }
        // this.charts.push({"data": data, "layout": layout});
        var div  = document.createElement("div");
        var mainDiv  = document.getElementById("mainDiv");
        div.id='chartdiv' + i;
        div.style.backgroundColor = '#596E79'
        div.style.margin = '10px'
        div.style.padding = '5px'
        div.style.borderRadius = '20px'
        div.style.boxShadow = '0px 0px 5px 0px black'
        div.style.boxShadow = '0px 0px 5px 0px black'
        var img = document.createElement('img');
        img.setAttribute('src',require('../assets/heart.png'))
        img.id="favImg"+"_"+response.data[i].chartId
        img.className="favImg"
        img.style.display='flex';
        img.style.margin='auto';
        let a = this;

          img.addEventListener("click", function (e) {
            const formData = new FormData();
            formData.append('mobileNumber', a.getCookie("phone"));
            formData.append('chartId', e.target.id.split("_")[1]);
            formData.append('cmd', "{'/AmarManagement-portlet.person/remove-from-favorite':{}}");
            axios.post(a.host + '/api/jsonws/invoke', formData,
            ).then(response => {
              if (response.data[0].result === "success") {
                img.setAttribute('src', require('../assets/heartOutline.png'))
                a.snackColor = "red accent-2";
                a.snackText = "از علاقه مندی ها حذف شد";
                a.snackIcon = "mdi-close-circle"
                a.snackbar = true;
                a.GetFavoriteChartsByDashboard();
              }
            }).catch(error => {
              a.snackColor = "red accent-2";
              a.snackText = "خطای ارتباط با سرور";
              a.snackIcon = "mdi-close-circle"
              a.snackbar = true;
              a.errorMessage = error.message;
              console.error("There was an error!", error);
            });
          })
        div.appendChild(img)
        mainDiv.appendChild(div);
        plotly.newPlot("chartdiv"+i, data, layout, config);
      }
    },
    plotly2DBarchart(i,response,isInv,j) {
      if(isInv) {
        var data = [];
        var config = {modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'], displaylogo: false};
        var layout = {
          width:320,
          height:450,
          font: {
            family: 'IRANSans'
          },
          hoverlabel: {
            font: {
              family: 'IRANSans'
            }
          },
          autosize: true,
          title: response.data[i].jsonSetting.config.content[j].title,
          barmode: response.data[i].jsonSetting.config.content[j].chartSetting.type.barmode
        };

        var x = this.unpack(response.data[i].result[j].result, response.data[i].jsonSetting.config.content[j].chartSetting.x.alias);
        if (response.data[i].jsonSetting.config.content[j].chartSetting.x.dataType == 'timestamp') {
          for ( var p = 0; p < x.length; p++) {
            x[p] =new persianDate(new Date(x[p])).format('YYYY-MM-DD HH:mm');
          }
        }
        console.log(i)
        console.log(j)
        console.log(isInv)
        for (let d = 0; d < response.data[i].jsonSetting.config.content[j].chartSetting.y.length; d++) {
          var y = this.unpack(response.data[i].result[j].result, response.data[i].jsonSetting.config.content[j].chartSetting.y[d].alias);
          if (response.data[i].jsonSetting.config.content[j].chartSetting.y[d].dataType == 'timestamp') {
            for (var j = 0; j < y.length; j++) {
              y[j] =new persianDate(new Date(y[j])).format('YYYY-MM-DD HH:mm');
            }
          }
          var trace = {
            x: x,
            y: y,
            type: response.data[i].jsonSetting.config.content[j].chartSetting.type.type,
            name: response.data[i].jsonSetting.config.content[j].chartSetting.y[d].title
          }
          data.push(trace);
        }
        plotly.newPlot("invTable" + i + "invChart" + j, data, layout, config);
      }
      else {
        var data = [];
        var config = {modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'], displaylogo: false};
        // for(var i=0;i<this.responseArray.length;i++) {
        var layout = {
          width:320,
          height:450,
          font: {
            family: 'IRANSans'
          },
          hoverlabel: {
            font: {
              family: 'IRANSans'
            }
          },
          autosize: true,
          title: response.data[i].title,
          barmode: response.data[i].jsonSetting.chartSetting.type.barmode
        };

        var x = this.unpack(response.data[i].result, response.data[i].jsonSetting.chartSetting.x.alias);
        if (response.data[i].jsonSetting.chartSetting.x.dataType == 'timestamp') {
          for (var j = 0; j < x.length; j++) {
            x[j] = new persianDate(new Date(x[j])).format('YYYY-MM-DD HH:mm');
          }
        }
        for (let d = 0; d < response.data[i].jsonSetting.chartSetting.y.length; d++) {
          var y = this.unpack(response.data[i].result, response.data[i].jsonSetting.chartSetting.y[d].alias);
          if (response.data[i].jsonSetting.chartSetting.y[d].dataType == 'timestamp') {
            for (var j = 0; j < y.length; j++) {
              y[j] = new persianDate(new Date(y[j])).format('YYYY-MM-DD HH:mm');
            }
          }
          var trace = {
            x: x,
            y: y,
            type: response.data[i].jsonSetting.chartSetting.type.type,
            name: response.data[i].jsonSetting.chartSetting.y[d].title
          }
          data.push(trace);
        }
        var div  = document.createElement("div");
        var mainDiv  = document.getElementById("mainDiv");
        div.id='chartdiv' + i;
        div.style.backgroundColor = '#596E79'
        div.style.margin = '10px'
        div.style.padding = '5px'
        div.style.borderRadius = '20px'
        div.style.boxShadow = '0px 0px 5px 0px black'
        var img = document.createElement('img');
        img.setAttribute('src',require('../assets/heart.png'))
        img.id="favImg"+"_"+response.data[i].chartId
        img.className="favImg"
        img.style.display='flex';
        img.style.margin='auto';
        let a = this;
          img.addEventListener("click", function (e) {
            const formData = new FormData();
            formData.append('mobileNumber', a.getCookie("phone"));
            formData.append('chartId', e.target.id.split("_")[1]);
            formData.append('cmd', "{'/AmarManagement-portlet.person/remove-from-favorite':{}}");
            axios.post(a.host + '/api/jsonws/invoke', formData,
            ).then(response => {
              if (response.data[0].result === "success") {
                img.setAttribute('src', require('../assets/heartOutline.png'))
                a.snackColor = "red accent-2";
                a.snackText = "از علاقه مندی ها حذف شد";
                a.snackIcon = "mdi-close-circle"
                a.snackbar = true;
                a.GetFavoriteChartsByDashboard();
              }
            }).catch(error => {
              a.snackColor = "red accent-2";
              a.snackText = "خطای ارتباط با سرور";
              a.snackIcon = "mdi-close-circle"
              a.snackbar = true;
              a.errorMessage = error.message;
              console.error("There was an error!", error);
            });
          })
        div.appendChild(img)
        mainDiv.appendChild(div);
        plotly.newPlot("chartdiv"+i, data, layout, config);
      }
    },
    plotly2DPiechart(i,response,isInv,j) {
      if(isInv){
        var data = []
        var config = {modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'], displaylogo: false};
        var x = this.unpack(response.data[i].result[j].result, response.data[i].jsonSetting.config.content[j].chartSetting.x.alias);

        if (response.data[i].jsonSetting.config.content[j].chartSetting.x.dataType == 'timestamp') {
          for (var p = 0; p < x.length; p++) {
            x[p] = new persianDate(new Date(x[p])).format('YYYY-MM-DD HH:mm');
          }
        }
        for (let d = 0; d < response.data[i].jsonSetting.config.content[j].chartSetting.y.length; d++) {
          var y = this.unpack(response.data[i].result[j].result, response.data[i].jsonSetting.config.content[j].chartSetting.y[d].alias);

          if (response.data[i].jsonSetting.config.content[j].chartSetting.y[d].dataType == 'timestamp') {
            for (var j = 0; j < y.length; j++) {
              y[j] = new persianDate(new Date(y[j])).format('YYYY-MM-DD HH:mm');
            }
          }
          var trace = {
            values: y,
            labels: x,
            type: 'pie',
            name: response.data[i].title,
            domain: {
              row: data.length,
              column: 0
            },
            textinfo: "label+percent",
            textposition: "outside",

          }
          data.push(trace);
        }

        var layout = {
          width:320,
          height:450,
          font: {
            family: 'IRANSans'
          },
          autosize: true,
          title: response.data[i].jsonSetting.config.content[j].title,
          grid: {rows: data.length, columns: 0}
        };
        plotly.newPlot("invTable" + i + "invChart" + j, data, layout, config);
      }
      else {
        var data = []
        var config = {
          modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'],
          displaylogo: false
        };
        // for(var i=0;i<this.responseArray.length;i++) {
        var layout = {
          width:320,
          height:450,
          font: {
            family: 'IRANSans'
          },
          hoverlabel: {
            font: {
              family: 'IRANSans'
            }
          },
          autosize: true,
          title: response.data[i].title
        };

        var x = this.unpack(response.data[i].result, response.data[i].jsonSetting.chartSetting.x.alias);

        if (response.data[i].jsonSetting.chartSetting.x.dataType == 'timestamp') {
          for (var j = 0; j < x.length; j++) {
            x[j] = new persianDate(new Date(x[j])).format('YYYY-MM-DD HH:mm');
          }
        }
        for (let d = 0; d < response.data[i].jsonSetting.chartSetting.y.length; d++) {
          var y = this.unpack(response.data[i].result, response.data[i].jsonSetting.chartSetting.y[d].alias);

          if (response.data[i].jsonSetting.chartSetting.y[d].dataType == 'timestamp') {
            for (var j = 0; j < y.length; j++) {
              y[j] = new persianDate(new Date(y[j])).format('YYYY-MM-DD HH:mm');
            }
          }
          var trace = {
            values: y,
            labels: x,
            type: 'pie',
            name: response.data[i].jsonSetting.chartSetting.y[d].title,
            domain: {
              row: data.length,
              column: 0
            },
            textinfo: "label+percent",
            textposition: "outside",

          }
          data.push(trace);
        }

        var layout = {
          width:320,
          height:450,
          font: {
            family: 'IRANSans'
          },
          autosize: true,
          title: response.data[i].title,
          grid: {rows: data.length, columns: 0}
        };
        var div  = document.createElement("div");
        var mainDiv  = document.getElementById("mainDiv");
        div.id='chartdiv' + i;
        div.style.backgroundColor = '#596E79'
        div.style.margin = '10px'
        div.style.padding = '5px'
        div.style.borderRadius = '20px'
        div.style.boxShadow = '0px 0px 5px 0px black'
        var img = document.createElement('img');
        img.setAttribute('src',require('../assets/heart.png'))
        img.id="favImg"+"_"+response.data[i].chartId
        img.className="favImg"
        img.style.display='flex';
        img.style.margin='auto';
        let a = this;
        img.addEventListener("click", function (e) {
            const formData = new FormData();
            formData.append('mobileNumber', a.getCookie("phone"));
            formData.append('chartId', e.target.id.split("_")[1]);
            formData.append('cmd', "{'/AmarManagement-portlet.person/remove-from-favorite':{}}");
            axios.post(a.host + '/api/jsonws/invoke', formData,
            ).then(response => {
              if (response.data[0].result === "success") {
                img.setAttribute('src', require('../assets/heartOutline.png'))
                a.snackColor = "red accent-2";
                a.snackText = "از علاقه مندی ها حذف شد";
                a.snackIcon = "mdi-close-circle"
                a.snackbar = true;
                a.GetFavoriteChartsByDashboard();
              }
            }).catch(error => {
              a.snackColor = "red accent-2";
              a.snackText = "خطای ارتباط با سرور";
              a.snackIcon = "mdi-close-circle"
              a.snackbar = true;
              a.errorMessage = error.message;
              console.error("There was an error!", error);
            });
          })
        div.appendChild(img)
        mainDiv.appendChild(div);
        plotly.newPlot("chartdiv"+i, data, layout, config);
      }
    },
    plotlyTimeSeriesScatterchart(i,response,isInv,j) {
      if(isInv){
        var dateformat = response.data[i].jsonSetting.config.content[j].chartSetting.dateformat;
        var data = [];
        var config = {
          modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'],
          displaylogo: false
        };

        var layout = {
          width:320,
          height:450,
          font: {
            family: 'IRANSans'
          },
          hoverlabel: {
            font: {
              family: 'IRANSans'
            }
          },
          autosize: true,
          title: response.data[i].jsonSetting.config.content[j].title,
          xaxis: {
            autorange: true,
            rangeselector: {
              buttons: [
                {count: 1, label: '1d', step: 'day', stepmode: 'backward'},
                {count: 7, label: '7d', step: 'day', stepmode: 'backward'},
                {count: 30, label: '1m', step: 'day', stepmode: 'backward'},
                {count: 90, label: '3m', step: 'day', stepmode: 'backward'},
                {count: 180, label: '6m', step: 'day', stepmode: 'backward'},
                {count: 365, label: '1y', step: 'day', stepmode: 'backward'},
                {step: 'all'}
              ]
            },
            rangeslider: {},
            // type: 'date'
          },
          yaxis: {
            autorange: true,
          }
        };

        var x = this.unpack(response.data[i].result[j].result, response.data[i].jsonSetting.config.content[j].chartSetting.x.alias);
        for (var p = 0; p < x.length; p++) {
          x[p] = new persianDate(new Date(x[p])).format('YYYY-MM-DD HH:mm');
        }
        x.sort(function (date1, date2) {
          return date1 > date2
        });

        for (let d = 0; d < response.data[i].jsonSetting.config.content[j].chartSetting.y.length; d++) {
          var y = this.unpack(response.data[i].result[j].result, response.data[i].jsonSetting.config.content[j].chartSetting.y[d].alias);
          var trace = {
            x: x,
            y: y,
            mode: response.data[i].jsonSetting.config.content[j].chartSetting.type.mode,
            type: response.data[i].jsonSetting.config.content[j].chartSetting.type.type,
            name: response.data[i].jsonSetting.config.content[j].chartSetting.y[d].title,
            fill: response.data[i].jsonSetting.config.content[j].chartSetting.type.fill,
          }
          data.push(trace);
        }
        plotly.newPlot("invTable" + i + "invChart" + j, data, layout, config);
      }
      else {
        var dateformat = response.data[i].jsonSetting.chartSetting.dateformat;
        var data = [];
        var config = {
          modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'],
          displaylogo: false
        };

        var layout = {
          width:320,
          height:450,

          font: {
            family: 'IRANSans'
          },
          hoverlabel: {
            font: {
              family: 'IRANSans'
            }
          },
          autosize: true,
          title: response.data[i].title,
          xaxis: {
            autorange: true,
            rangeselector: {
              buttons: [
                {count: 1, label: '1d', step: 'day', stepmode: 'backward'},
                {count: 7, label: '7d', step: 'day', stepmode: 'backward'},
                {count: 30, label: '1m', step: 'day', stepmode: 'backward'},
                {count: 90, label: '3m', step: 'day', stepmode: 'backward'},
                {count: 180, label: '6m', step: 'day', stepmode: 'backward'},
                {count: 365, label: '1y', step: 'day', stepmode: 'backward'},
                {step: 'all'}
              ]
            },
            rangeslider: {},
            // type: 'date'
          },
          yaxis: {
            autorange: true,
          }
        };

        var x = this.unpack(response.data[i].result, response.data[i].jsonSetting.chartSetting.x.alias);
        for (var j = 0; j < x.length; j++) {
          x[j] = new persianDate(new Date(x[j])).format('YYYY-MM-DD HH:mm');
        }
        x.sort(function (date1, date2) {
          return date1 > date2
        });

        for (let d = 0; d < response.data[i].jsonSetting.chartSetting.y.length; d++) {
          var y = this.unpack(response.data[i].result, response.data[i].jsonSetting.chartSetting.y[d].alias);
          var trace = {
            x: x,
            y: y,
            mode: response.data[i].jsonSetting.chartSetting.type.mode,
            type: response.data[i].jsonSetting.chartSetting.type.type,
            name: response.data[i].jsonSetting.chartSetting.y[d].title,
            fill: response.data[i].jsonSetting.chartSetting.type.fill,
          }
          data.push(trace);
        }
        var div  = document.createElement("div");
        var mainDiv  = document.getElementById("mainDiv");
        div.id='chartdiv' + i;
        div.style.backgroundColor = '#596E79'
        div.style.margin = '10px'
        div.style.padding = '5px'
        div.style.borderRadius = '20px'
        div.style.boxShadow = '0px 0px 5px 0px black'
        var img = document.createElement('img');
        img.setAttribute('src',require('../assets/heart.png'))
        img.id="favImg"+"_"+response.data[i].chartId
        img.className="favImg"
        img.style.display='flex';
        img.style.margin='auto';
        let a = this;
        img.addEventListener("click", function (e) {
            const formData = new FormData();
            formData.append('mobileNumber', a.getCookie("phone"));
            formData.append('chartId', e.target.id.split("_")[1]);
            formData.append('cmd', "{'/AmarManagement-portlet.person/remove-from-favorite':{}}");
            axios.post(a.host + '/api/jsonws/invoke', formData,
            ).then(response => {
              if (response.data[0].result === "success") {
                img.setAttribute('src', require('../assets/heartOutline.png'))
                a.snackColor = "red accent-2";
                a.snackText = "از علاقه مندی ها حذف شد";
                a.snackIcon = "mdi-close-circle"
                a.snackbar = true;
                a.GetFavoriteChartsByDashboard();
              }
            }).catch(error => {
              a.snackColor = "red accent-2";
              a.snackText = "خطای ارتباط با سرور";
              a.snackIcon = "mdi-close-circle"
              a.snackbar = true;
              a.errorMessage = error.message;
              console.error("There was an error!", error);
            });
          })
        div.appendChild(img)
        mainDiv.appendChild(div);
        plotly.newPlot("chartdiv"+i, data, layout, config);
      }
    },
    plotlyTimeSeriesBarchart(i,response,isInv,j) {
      if(isInv){
        var dateformat = response.data[i].jsonSetting.config.content[j].chartSetting.dateformat;
        var data = [];
        var config = {modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'], displaylogo: false};

        var x = this.unpack(response.data[i].result[j].result, response.data[i].jsonSetting.config.content[j].chartSetting.x.alias);

        for (var p = 0; p < x.length; p++) {
          x[p] = new Date(x[p]);
        }
        x.sort(function (date1, date2) {
          return date1 > date2
        });

        for (let d = 0; d < response.data[i].jsonSetting.config.content[j].chartSetting.y.length; d++) {
          var y = this.unpack(response.data[i].result[j].result, response.data[i].jsonSetting.config.content[j].chartSetting.y[d].alias)
          var trace = {
            x: x,
            y: y,
            type: response.data[i].jsonSetting.config.content[j].chartSetting.type.type,
            name: response.data[i].jsonSetting.config.content[j].chartSetting.y[d].title,
            mode: response.data[i].jsonSetting.config.content[j].chartSetting.type.mode,
            fill: response.data[i].jsonSetting.config.content[j].chartSetting.type.fill,
          }
          data.push(trace);
        }

        var layout = {
          width:320,
          height:450,
          font: {
            family: 'IRANSans'
          },
          hoverlabel: {
            font: {
              family: 'IRANSans'
            }
          },
          autosize: true,
          title: response.data[i].jsonSetting.config.content[j].title,
          barmode: response.data[i].jsonSetting.config.content[j].chartSetting.type.barmode,
          xaxis: {
            autorange: true,
            rangeselector: {
              buttons: [
                {
                  count: 1,
                  label: '1d',
                  step: 'day',
                  stepmode: 'backward'
                },
                {
                  count: 7,
                  label: '7d',
                  step: 'day',
                  stepmode: 'backward'
                },
                {
                  count: 30,
                  label: '30d',
                  step: 'day',
                  stepmode: 'backward'
                },
                {step: 'all'}
              ]
            },
            rangeslider: {},
            type: 'date'
          },
          yaxis: {
            autorange: true
          }
        };
        plotly.newPlot("invTable" + i + "invChart" + j, data, layout, config);
      } else {
        var dateformat = response.data[i].jsonSetting.chartSetting.dateformat;
        var data = [];
        var config = {
          modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'],
          displaylogo: false
        };

        var x = this.unpack(response.data[i].result, response.data[i].jsonSetting.chartSetting.x.alias);

        for (var i = 0; i < x.length; i++) {
          x[i] = new Date(x[i]);
        }
        x.sort(function (date1, date2) {
          return date1 > date2
        });

        for (let d = 0; d < response.data[i].jsonSetting.chartSetting.y.length; d++) {
          var y = this.unpack(response.data[i].result, response.data[i].jsonSetting.chartSetting.y[d].alias)
          var trace = {
            x: x,
            y: y,
            type: response.data[i].jsonSetting.chartSetting.type.type,
            name: response.data[i].jsonSetting.chartSetting.y[d].title,
            mode: response.data[i].jsonSetting.chartSetting.type.mode,
            fill: response.data[i].jsonSetting.chartSetting.type.fill,
          }
          data.push(trace);
        }

        var layout = {
          width:320,
          height:450,
          font: {
            family: 'IRANSans'
          },
          hoverlabel: {
            font: {
              family: 'IRANSans'
            }
          },
          autosize: true,
          title: response.data[i].title,
          barmode: response.data[i].jsonSetting.chartSetting.type.barmode,
          xaxis: {
            autorange: true,
            rangeselector: {
              buttons: [
                {
                  count: 1,
                  label: '1d',
                  step: 'day',
                  stepmode: 'backward'
                },
                {
                  count: 7,
                  label: '7d',
                  step: 'day',
                  stepmode: 'backward'
                },
                {
                  count: 30,
                  label: '30d',
                  step: 'day',
                  stepmode: 'backward'
                },
                {step: 'all'}
              ]
            },
            rangeslider: {},
            type: 'date'
          },
          yaxis: {
            autorange: true
          }
        };
        var div  = document.createElement("div");
        var mainDiv  = document.getElementById("mainDiv");
        div.id='chartdiv' + i;
        div.style.backgroundColor = '#596E79'
        div.style.margin = '10px'
        div.style.padding = '5px'
        div.style.borderRadius = '20px'
        div.style.boxShadow = '0px 0px 5px 0px black'
        var img = document.createElement('img');
        img.setAttribute('src',require('../assets/heart.png'))
        img.id="favImg"+"_"+response.data[i].chartId
        img.className="favImg"
        img.style.display='flex';
        img.style.margin='auto';
        let a = this;
          img.addEventListener("click", function (e) {
            const formData = new FormData();
            formData.append('mobileNumber', a.getCookie("phone"));
            formData.append('chartId', e.target.id.split("_")[1]);
            formData.append('cmd', "{'/AmarManagement-portlet.person/remove-from-favorite':{}}");
            axios.post(a.host + '/api/jsonws/invoke', formData,
            ).then(response => {
              if (response.data[0].result === "success") {
                img.setAttribute('src', require('../assets/heartOutline.png'))
                a.snackColor = "red accent-2";
                a.snackText = "از علاقه مندی ها حذف شد";
                a.snackIcon = "mdi-close-circle"
                a.snackbar = true;
                a.GetFavoriteChartsByDashboard();
              }
            }).catch(error => {
              a.snackColor = "red accent-2";
              a.snackText = "خطای ارتباط با سرور";
              a.snackIcon = "mdi-close-circle"
              a.snackbar = true;
              a.errorMessage = error.message;
              console.error("There was an error!", error);
            });
          })
        div.appendChild(img)
        mainDiv.appendChild(div);
        plotly.newPlot("chartdiv"+i, data, layout, config);
      }

    },
    plotlyTable(i,response,isInv,p) {
      var data = [];
      var config = {modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox', 'toImage', 'sendDataToCloud'], displaylogo: false};
      var headerValues = [];
      var cellValues = [];
      if (isInv) {
        for (var j = 0; j < response.data[i].jsonSetting.config.content[p].chartSetting.fields.length; j++) {
          headerValues[j] = [response.data[i].jsonSetting.config.content[p].chartSetting.fields[j].title];
          if (response.data[i].jsonSetting.config.content[p].chartSetting.fields[j].dataType == 'timestamp') {
            var vals = this.unpack(response.data[i].result[j].result, response.data[i].jsonSetting.config.content[p].chartSetting.fields[j].alias);
            for (var d = 0; d < vals.length; d++) {
              vals[d] = new persianDate(new Date(vals[d])).format('YYYY-MM-DD HH:mm');
            }
            cellValues[j] = vals;
          } else
            cellValues[j] = this.unpack(response.data[i].result[j].result, response.data[i].jsonSetting.config.content[p].chartSetting.fields[j].alias);
        }
        var layout = {
          width: 320,
          height: 450,
          font: {
            family: 'IRANSans'
          },
          hoverlabel: {
            font: {
              family: 'IRANSans'
            }
          },
          autosize: true,
          title: response.data[i].jsonSetting.config.content[j].title
        };

        var data = [{
          type: 'table',
          header: {
            values: headerValues,
            align: ["center", "center"],
            line: {width: 1, color: '#506784'},
            fill: {color: '#119DFF'},
            font: {family: "IRANSans", size: 12, color: "white"}
          },
          cells: {
            values: cellValues,
            align: ["center", "center"],
            line: {color: "#506784", width: 1},
            font: {family: "IRANSans", size: 11, color: ["#506784"]}
          }
        }];
        plotly.newPlot("invTable" + i + "invChart" + j, data, layout, config);
      } else {
        console.log(response)
        for (var j = 0; j < response.data[i].jsonSetting.chartSetting.fields.length; j++) {
          headerValues[j] = [response.data[i].jsonSetting.chartSetting.fields[j].title];
          if (response.data[i].jsonSetting.chartSetting.fields[j].dataType == 'timestamp') {
            var vals = this.unpack(response.data[i].result, response.data[i].jsonSetting.chartSetting.fields[j].alias);
            for (var d = 0; d < vals.length; d++) {
              vals[d] = new persianDate(new Date(vals[d])).format('YYYY-MM-DD HH:mm');
            }
            cellValues[j] = vals;
          } else
            cellValues[j] = this.unpack(response.data[i].result, response.data[i].jsonSetting.chartSetting.fields[j].alias);
        }
        var layout = {
          width: 320,
          height: 450,
          font: {
            family: 'IRANSans'
          },
          hoverlabel: {
            font: {
              family: 'IRANSans'
            }
          },
          autosize: true,
          title: response.data[i].title
        };

        var data = [{
          type: 'table',
          header: {
            values: headerValues,
            align: ["center", "center"],
            line: {width: 1, color: '#506784'},
            fill: {color: '#119DFF'},
            font: {family: "IRANSans", size: 12, color: "white"}
          },
          cells: {
            values: cellValues,
            align: ["center", "center"],
            line: {color: "#506784", width: 1},
            font: {family: "IRANSans", size: 11, color: ["#506784"]}
          }
        }];
        var div = document.createElement("div");
        var mainDiv = document.getElementById("mainDiv");
        div.id = 'chartdiv' + i;
        div.style.backgroundColor = '#596E79'
        div.style.margin = '10px'
        div.style.padding = '5px'
        div.style.borderRadius = '20px'
        div.style.boxShadow = '0px 0px 5px 0px black'
        div.style.boxShadow = '0px 0px 5px 0px black'
        var img = document.createElement('img');
          img.setAttribute('src', require('../assets/heart.png'))
        img.id = "favImg" + "_" + response.data[i].chartId
        img.className = "favImg"
        img.style.display = 'flex';
        img.style.margin = 'auto';
        let a = this;
          img.addEventListener("click", function (e) {
            const formData = new FormData();
            formData.append('mobileNumber', a.getCookie("phone"));
            formData.append('chartId', e.target.id.split("_")[1]);
            formData.append('cmd', "{'/AmarManagement-portlet.person/remove-from-favorite':{}}");
            axios.post(a.host + '/api/jsonws/invoke', formData,
            ).then(response => {
              if (response.data[0].result === "success") {
                img.setAttribute('src', require('../assets/heartOutline.png'))
                a.snackColor = "red accent-2";
                a.snackText = "از علاقه مندی ها حذف شد";
                a.snackIcon = "mdi-close-circle"
                a.snackbar = true;
                a.GetFavoriteChartsByDashboard();
              }
            }).catch(error => {
              a.snackColor = "red accent-2";
              a.snackText = "خطای ارتباط با سرور";
              a.snackIcon = "mdi-close-circle"
              a.snackbar = true;
              a.errorMessage = error.message;
              console.error("There was an error!", error);
            });
          })
          div.appendChild(img)
          mainDiv.appendChild(div);
          plotly.newPlot("chartdiv" + i, data, layout, config);
      }
    },
    
    addTableToInvoice(i,response,j){
      let sum = 0;
      let avgSum = 0;
      var tdArray=[];
      var aggFunc=[];
      var sumArray = [];
      var maxArray = [];
      var minArray = [];
      var avgArray = [];
      var countArray = [];
      var table = document.createElement("table");
      table.style.margin='auto';
      table.style.marginTop='20px';
      table.style.width='350px';
      table.style.display='inline-block';
      table.style.overflow='scroll';

      var tr = document.createElement("tr");
      var tr1 = document.createElement("tr");
      var td1 = document.createElement("td");

      for(var tth=0;tth<response.data[i].result[j].config.query.computational.length;tth++){
        tdArray.push({'name':response.data[i].result[j].config.query.computational[tth].fieldName,'title':response.data[i].result[j].config.query.computational[tth].fieldTitle,'aggFunc':response.data[i].result[j].config.query.computational[tth].aggFunc})
      }
      for(var th=0;th<response.data[i].result[j].config.chartSetting.y.length;th++){
        var newTitle = response.data[i].result[j].config.chartSetting.y[th].title.split("-")[0];
        tdArray.push({'name':response.data[i].result[j].config.chartSetting.y[th].name,'title':newTitle,"aggFunc":response.data[i].result[j].config.chartSetting.y[th].aggFun})
      }

      tdArray.push({'name':"row",'title':"ردیف"})

      for(var a=0;a<tdArray.length;a++){
        th = document.createElement("th");
        th.innerText=tdArray[a].title;
        tr.appendChild(th);
        tr.style.backgroundColor = 'indianred';
      }
      table.appendChild(tr);

      response.data[i].result[j].result.forEach((item) => {
        let tr = document.createElement("tr");
        tdArray.forEach((column) => {
          let td2 = document.createElement("td");
          for (var k in item) {
            if (column.name == k) {
              let td = document.createElement("td");
              td.innerText = item[k];
              tr.appendChild(td);
            }
          }
        })
        table.appendChild(tr);
      })

      tdArray.forEach((item)=>{
        let td = document.createElement("td");
        response.data[i].result[j].result.forEach((column)=> {
          for (var c in column) {
            if (c == item.name && item.aggFunc == 'SUM') {
              sumArray.push(column[c])
              sum += parseInt(column[c]);
              td.innerText = 'جمع :' + sum;
              tr1.appendChild(td);
            } else if (c == item.name && item.aggFunc == 'MAX') {
              maxArray.push(column[c])
              const max = Math.max.apply(null, Object.values(maxArray));
              td.innerText = 'بیشینه :' + max;
              tr1.appendChild(td);
            } else if (c == item.name && item.aggFunc == 'MIN') {
              minArray.push(column[c])
              const max = Math.min.apply(null, Object.values(minArray));
              td.innerText = 'کمینه :' + max;
              tr1.appendChild(td);
            } else if (c == item.name && item.aggFunc == 'AVG') {
              avgArray.push(column[c]);
              avgSum += parseInt(column[c]);
              td.innerText = 'میانگین :' + avgSum/(avgArray.length);
              tr1.appendChild(td);
            } else if (c == item.name && item.aggFunc == 'COUNT') {
              countArray.push(column[c])
              td.innerText = 'شمارش :' + countArray.length;
              tr1.appendChild(td);
            } else if (c == item.name && item.aggFunc == '') {
              td.innerText = '-';
              tr1.appendChild(td);
            }
          }
        })
      })

      var count = 'تعداد رکورد :' + response.data[i].result[j].result.length;
      td1.innerText=count
      tr1.appendChild(td1);
      tr1.style.fontSize='10px'
      tr1.style.backgroundColor='indianred'
      table.appendChild(tr1);
      $('#invTable'+i).append(table);
    },
    // unpackGeojsonProp: function (rows, key) {
    //   return rows.map(function (row) {
    //     return row.properties[key];
    //   });
    // },
    // unpackLatLonZ: function (rows, key,key2) {
    //   var lat=[];
    //   var lon=[];
    //   var z=[];
    //   var text=[];
    //   for(var i=0; i<rows.length; i++){
    //     lat.push(turf.getCoords(turf.centroid(rows[i]))[1]);
    //     lon.push(turf.getCoords(turf.centroid(rows[i]))[0]);
    //     z.push(rows[i].properties[key]);
    //     if(key2)
    //       text.push(rows[i].properties[key2]);
    //   }
    //   return {"lat":lat,"lon":lon, "z":z,"text":text};
    // },
    unpackGeojsonId: function (rows) {
      return rows.map(function (row) {
        return row.id;
      });
    },
    unpack(rows, key) {
      return rows.map(function(row)
      { return row[key]; });
    },
    invoice(i,response) {
      var div  = document.createElement("div");
      var mainDiv  = document.getElementById("mainDiv");
      div.id='chartdiv' + i;
      mainDiv.appendChild(div);

      var myTableDiv = document.getElementById("chartdiv"+i);
      var table = document.createElement('TABLE');
      table.className='invoice';
      table.border = '1';
      table.width = '95%';
      table.style.overflow = 'scroll';
      table.style.display = 'inline-block';
      table.style.fontFamily = 'IranSans';
      table.style.backgroundColor = 'white';
      table.style.marginLeft = '10px';
      table.style.backgroundColor = '#596E79';
      table.style.color = 'white';
      table.style.boxShadow = '0px 0px 5px 0px black';

      var tableBody = document.createElement('TBODY');
      table.appendChild(tableBody);

      for (var k = 0; k < 7; k++) {
        var tr = document.createElement('TR');
        let mybr = document.createElement('BR');
        tableBody.appendChild(tr);

        for (var j = 0; j < 1; j++) {
          var td = document.createElement('TD');
          td.width = '80%';
          if(k===0 && j===0){
            td.appendChild(document.createTextNode(response.data[i].title));
            td.style.textAlign='center'
          }
          if(k===1 && j===0){
            td.style.height='auto'
            td.appendChild(document.createTextNode( 'تاریخ :' +" "+ response.data[i].jsonSetting.config.persianCreateDate))
            td.appendChild(mybr)
            td.appendChild(document.createTextNode( 'ساعت :' +" "+ response.data[i].jsonSetting.config.createTime))
            td.style.direction='rtl'
            td.style.textAlign='left'
            td.style.fontSize='13px'
          }
          if(k===2 && j===0){
            for(var t=0;t<response.data[i].jsonSetting.config.header.rows.length;t++){
              let mybr = document.createElement('BR');
              td.appendChild(document.createTextNode(response.data[i].jsonSetting.config.header.rows[t].fieldTitle+' : '+response.data[i].jsonSetting.config.header.rows[t].value));
              td.appendChild(mybr);
            }
            td.style.textAlign='center'
            td.style.fontSize='13px'
          }
          if(k===3 && j===0){
            td.id='invTable'+i
            td.style.height='400px';
            td.style.overflow='scroll';
          }
          if(k===4 && j===0){
            for(var t=0;t<response.data[i].jsonSetting.config.footer.rows.length;t++){
              let mybr = document.createElement('BR');
              td.appendChild(document.createTextNode(response.data[i].jsonSetting.config.footer.rows[0].fieldTitle+' : '+response.data[i].jsonSetting.config.footer.rows[0].value));
              td.appendChild(mybr);
            }
            td.style.textAlign='center'
            td.style.direction='rtl'
            td.style.fontSize='13px'
          }
          if(k===5 && j===0){
            td.appendChild(document.createTextNode( 'تهیه کننده گزارش :' + response.data[i].jsonSetting.config.footer.creator))
            td.style.direction='rtl'
            td.style.textAlign='left'
            td.style.fontSize='13px'
          }
          if(k===6 && j===0){
            var img = document.createElement('img');
            img.setAttribute('src',require('../assets/heart.png'))
            img.id="favImg"+"_"+response.data[i].chartId
            img.className="favImg"
            img.style.display='flex';
            img.style.margin='auto';
            let a = this;
              img.addEventListener("click", function (e) {
                const formData = new FormData();
                formData.append('mobileNumber', a.getCookie("phone"));
                formData.append('chartId', e.target.id.split("_")[1]);
                formData.append('cmd', "{'/AmarManagement-portlet.person/remove-from-favorite':{}}");
                axios.post(a.host + '/api/jsonws/invoke', formData,
                ).then(response => {
                  if (response.data[0].result === "success") {
                    img.setAttribute('src', require('../assets/heartOutline.png'))
                    a.snackColor = "red accent-2";
                    a.snackText = "از علاقه مندی ها حذف شد";
                    a.snackIcon = "mdi-close-circle"
                    a.snackbar = true;
                    a.GetFavoriteChartsByDashboard();
                  }
                }).catch(error => {
                  a.snackColor = "red accent-2";
                  a.snackText = "خطای ارتباط با سرور";
                  a.snackIcon = "mdi-close-circle"
                  a.snackbar = true;
                  a.errorMessage = error.message;
                  console.error("There was an error!", error);
                });
              })
            td.appendChild(img)
          }
          tr.appendChild(td);
        }
      }
      myTableDiv.appendChild(table);
      for(var c=0;c<response.data[i].jsonSetting.config.content.length;c++) {
        var div = document.createElement("div");
        div.id = 'invTable' + i + 'invChart' + c;
        $('#' + 'invTable' + i).append(div)
        if (response.data[i].jsonSetting.config.content[c].chartSetting.type && response.data[i].jsonSetting.config.content[c].chartSetting.type.group === '2d' && response.data[i].jsonSetting.config.content[c].chartSetting.type.type === 'scatter')
          this.plotly2DScatterchart(i,response, true,c);
        if (response.data[i].jsonSetting.config.content[c].chartSetting.type && response.data[i].jsonSetting.config.content[c].chartSetting.type.group === '2d' && response.data[i].jsonSetting.config.content[c].chartSetting.type.type === 'bar')
          this.plotly2DBarchart(i,response,true,c);
        if (response.data[i].jsonSetting.config.content[c].chartSetting.type && response.data[i].jsonSetting.config.content[c].chartSetting.type.group === '2d' && response.data[i].jsonSetting.config.content[c].chartSetting.type.type === 'pie')
          this.plotly2DPiechart(i,response,true,c);
        if (response.data[i].jsonSetting.config.content[c].chartSetting.type && response.data[i].jsonSetting.config.content[c].chartSetting.type.group === 'time-series' && response.data[i].jsonSetting.config.content[c].chartSetting.type.type === 'bar')
          this.plotlyTimeSeriesBarchart(i,response,true,c);
        if (response.data[i].jsonSetting.config.content[c].chartSetting.type && response.data[i].jsonSetting.config.content[c].chartSetting.type.group === 'time-series' && response.data[i].jsonSetting.config.content[c].chartSetting.type.type === 'scatter')
          this.plotlyTimeSeriesScatterchart(i,response,true,c);
        if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.group === 'table')
          this.plotlyTable(i,response,true,c);
        if (response.data[i].jsonSetting.config.content[c].chartSetting.type && response.data[i].jsonSetting.config.content[c].chartSetting.type.type === 'table')
        {
          // for(var r=0;r<response.data[i].result.length;r++) {
          if (response.data[i].jsonSetting.config.content[c].chartSetting.type.id === response.data[i].result[c].config.chartSetting.type.id) {
            // this.contentResult.push(response.data[i].result[r].result)
            this.addTableToInvoice(i,response,c);
          }

          // }
        }
      }
    },
    getCookie(name) {
      let cookie = {};
      document.cookie.split(';').forEach(function(el) {
        let [k] = el.split('=');
        cookie[k.trim()] = el.substring(k.length + 1);
      })
      console.log(cookie[name]);
      return cookie[name];
    }
  },
}

</script>
