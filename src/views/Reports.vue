<template>
  <v-app>
    <div id="checkdiv">
      <v-select class="selectDashboard" item-text="name" item-value="value" v-model="value" :items="dashboard" label="انتخاب داشبورد" reverse style="top: 12px;position: absolute;width: 90%;margin-left: 5%;height: 45px;font-family: IranSans" filled rounded dense background-color="#596E79" dark @change="GetChartsByDashboard()"></v-select>
      <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="teal"></v-progress-linear>
    </div>
    <div id="maindiv">
      <v-row justify="center">
        <v-dialog v-model="invChartSettingDialog" max-width="400" style="font-family: IranSans;text-align: center;padding-top: 20px;" eager>
          <v-card id="invChartSettingCard" style="height:600px;background-color: #F0ECE3">
              <v-text-field v-model="invChartTitle" label="عنوان" rounded filled reverse dense dark style="top: 20px;position: absolute;width: 90%;margin-left: 5%;height: 45px;font-family: IranSans;border-radius: 50px" background-color="#596E79"></v-text-field>
              <v-select item-text="title" item-value="id" v-model="chartsTypeValue" :items="chartsType" label="نوع بصری سازی" reverse style="top: 12px;position: absolute;width: 90%;margin-left: 5%;margin-top:100px;height: 45px;font-family: IranSans;" filled rounded dense background-color="#596E79" dark @change=""></v-select>
            <v-card-actions style="font-family: IranSans;position: absolute;bottom: 0;right:0">
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="setNewChartSetting()">
                ذخیره
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="DatatableDialog" max-width="600px" eager>
          <v-card id="VCard" style="background-color: white;height: 300px;">
            <template>
              <v-data-table id="dataTable" :headers="headers" :items="desserts" hide-default-footer class="table" :mobile-breakpoint="0" disable-pagination disable-pagination  style="text-align: center;font-family: IranSans;direction: rtl">
              </v-data-table>
            </template>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <Footer/>
    <v-snackbar  v-model="snackbar" :timeout="timeout" :color="snackColor"  rounded="pill" style="direction: rtl;margin: auto;min-width: 0 !important;width: 50px;font-family: IranSans">
      <v-icon>{{ snackIcon }}</v-icon>
      {{ snackText }}
    </v-snackbar>
    <router-view></router-view>
  </v-app>

</template>

<style>
@media screen and (max-device-height : 640px){
  #maindiv {
    margin-top: 65px !important;
    height: 81% !important;
  }
  .selectDashboard{
    top:6px !important;
  }
  #invChartSettingCard{
    height: 500px !important;
  }
  #filterDiv{
    height: 250px !important;
  }
}
table{
  border-collapse: collapse;
  text-align: center;
}
thead, tbody, tfoot, tr, td, th{
  border: 2px solid white !important;
  padding: 5px;
  width: 400px;
}
.v-sheet.v-list:not(.v-sheet--outlined){
  direction: rtl;
  font-family: IranSans;
}
.apexcharts-canvas{
  background-color: #ffffff;
  margin-bottom: 10px;
  position: fixed;
}
#v-select {
  position: absolute;
  left: 5%;
  top:10%;
  margin-bottom: 45px;
  height: 30px;
  width: 270px;
  border: 1px solid black;
  background-color: #596E79;
  text-align: -webkit-right;
  font-family: "IranSans";
  padding-right: 5px;
  box-shadow: 0px 1px 1px 0px #000000;
  font-size: 15px;
  display: flex;
  color: white;
}
#footer{
  position: fixed;
  bottom: 0;
  padding: 0;
  font-family: IranSans;
  box-shadow: 5px 5px 5px 5px #282828;
  z-index: 500;
  background-color: teal;
}
#maindiv{
  height: 83%;
  width: 100%;
  background-color: #DFD3C3;
  margin-bottom: 50px;
  position: fixed;
  z-index: 0;
  overflow: scroll;
  margin-top: 80px;
  padding-top: 10px;
}
#checkdiv{
  position: fixed;
  top: 0;
  background-color: #F0ECE3;
  height: 10%;
  width: 100%;
  box-shadow:  2px 2px 2px #282828
}

@font-face {
  font-family: "IranSans";
  src: url("../assets/fonts/IRANSANS.TTF");
  font-weight: normal;
  font-style: normal;
}
p{
  position: absolute;
  text-align: right;
  font-family: "IranSans";
  color: #ffffff;
  font-size: 20px;
  right: 10%;
  top: 30%;
}
#chartdiv{
  height: 20%;
  width: 100%;
  top: 12%;
  bottom: 80px;
  overflow: scroll;
  position: fixed;
}
#chart{
  margin-bottom: 10px;
  margin-left: 18px;
  width: 90%;
}
.v-select.v-input--dense .v-select__selection--comma{
color: white;
}
.js-plotly-plot .plotly, .js-plotly-plot .plotly div{
  margin: 10px auto !important;
}
.js-plotly-plot .plotly .main-svg{
  box-shadow: 0px 2px 2px darkgrey;
}
.infolayer{
  visibility: visible !important;
}
.btn{
  font-size: 12px !important;
  margin: 2px;
}
.form-control{
  direction: rtl;
  width: 80% !important;
  margin: 10px;
  font-family: IranSans;
}
.v-card > *:first-child:not(.v-btn):not(.v-chip):not(.v-avatar), .v-card > .v-card__progress + *:not(.v-btn):not(.v-chip):not(.v-avatar){
  border-top-left-radius: 2 !important;
  border-top-right-radius: 2 !important;
}
.btn-group, .btn-group-vertical{
  margin-bottom: 10px;
}
</style>
<script>
import Footer from '../components/Footer.vue'
import axios from 'axios'
import '../querybuilder/query-builder.standalone.js'
// import '../querybuilder/query-builder.fa-IR.js'
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
    invChartTitle:"",
    chartType:"",
    favoriteIcon:mdiHeartOutline,
    layout:{title: ""},
    load:true,
    dialog: false,
    invChartSettingDialog:false,
    chartsTypeValue: {
      id: 1,
      type: 'scatter',
      mode: 'lines',
      fill: 'none',
      title: 'خطی',
      group: '2d'
    },
    chartsType: [
      {
        id: 1,
        type: 'scatter',
        mode: 'lines',
        fill: 'none',
        title: 'خطی',
        group: '2d'
      },
      {
        id: 2,
        type: 'scatter',
        mode: 'markers',
        fill: 'none',
        title:"نقطه ای" ,
        group: '2d'
      },
      {
        id: 3,
        type: 'scatter',
        mode: 'lines+markers',
        fill: 'none',
        title: "خطی و نقطه ای",
        group: '2d'
      },
      {
        id: 4,
        type: 'bar',
        barmode: 'group',
        title: "میله ای",
        group: '2d'
      },
      {
        id: 5,
        type: 'bar',
        barmode: 'stack',
        title: "میله-پشته ای",
        group: '2d'
      },
      {
        id: 6,
        type: 'pie',
        mode: '',
        title: "پای",
        group: '2d'
      },
      {
        id: 7,
        type: 'scatter',
        mode: 'none',
        fill: 'tonexty',
        title: "مساحت",
        group: '2d'
      },
      {
        id: 8,
        type: 'scatter',
        mode: 'lines',
        fill: 'none',
        title: "سری زمانی خطی",
        group: 'time-series'
      },
      {
        id: 9,
        type: 'bar',
        barmode: 'group',
        title: "سری زمانی میله ای",
        group: 'time-series'
      },
      {
        id: 10,
        type: 'table',
        mod: '',
        title: "جدول",
        group: 'table'
      },
        {
        id: 19,
        type: 'invoice',
        title: "گزارش اداری",
      },

    ],
    headers: [
      {text: 'ردیف', align: 'start', sortable: false, value: 'row',},
      { text: 'مقدار', value: 'value' },
      { text: 'تعداد', value: 'count' },
    ],
    newChartSetting:[],
    desserts : [],
    dashboard:[],
    charts:[],
    invoiceCharts:[],
    responseArray:[],
    column:[],
    offset: true,
    loading: false,
    value:"",
    favColor:'red',
    Dialog:false,
    DatatableDialog:false,
    isLogin:false,
    isInvoice:false,
    snackbar:false,
    snackText:"",
    snackIcon:"",
    snackColor:"",
    msg:"",
    timeout:2000,
    rowValue:"",
    i:"",
    j:"",
    randomKey:"dataTable"
  }),
  computed: {},
  components: {
    Footer,
  },

  mounted() {
    let [h] = this.host.split(".");
    if(this.host==="localhost:8081" || this.host==="localhost:8080" || this.host==="192.168.100.9:8080" || this.host==="192.168.100.9:8081"){
      this.host = "https://192.168.100.193"
    }else {
      this.host = this.protocol + this.host.substring(h.length + 1)
    }
    this.GetDashboards();
      },
  methods: {
    GetDashboards(){
      const formData = new FormData();
      formData.append('companyId', "20155");
      formData.append('cmd', "{'/BiTools-portlet.dashboard/get-dashboards':{}}");
      axios.post( this.host + '/api/jsonws/invoke', formData,
      ).then(response => {
        for(var i=0;i<response.data.length;i++){
          this.dashboard.push({"name":response.data[i].title,"value":response.data[i].dashboardId,"status":response.data[i].status})
        }
      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },
    GetChartsByDashboard(){
      $('#maindiv').empty();
      this.responseArray = [];
      var persianDate = require("persian-date")
      this.charts=[];
      this.loading=true;
      const formData = new FormData();
      formData.append('dashboardId', this.value);
      formData.append('mobileNumber', this.getCookie("phone"));
      if(this.getCookie("token")==="" || this.getCookie("token")===undefined){
        formData.append('token', "");
      }else{
        formData.append('token', this.getCookie("token"));
      }
      formData.append('cmd', "{'/BiTools-portlet.chart/get-charts-by-dashboard':{}}");
      axios.post( this.host + '/api/jsonws/invoke', formData
      ).then(response => {
        console.log(response)
        this.loading=false;
        this.load=false;
        if(response.data.length===0){
          var p = document.createElement("p")
          p.innerText = "داشبورد خالی است"
          p.style.color = "teal"
          p.style.position = "sticky"
          p.style.display = "flex"
          p.style.justifyContent = "center"
          p.style.marginTop = "300px"
          document.getElementById("maindiv").appendChild(p)
        }

            for(var i=0;i<response.data.length;i++) {
              if(response.data.length===1 && response.data[i].result.length===0){
                var p = document.createElement("p")
                p.innerText = "داشبورد خالی است"
                p.style.color = "teal"
                p.style.position = "sticky"
                p.style.display = "flex"
                p.style.justifyContent = "center"
                p.style.marginTop = "300px"
                document.getElementById("maindiv").appendChild(p)
              }

              if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.group === '2d' && response.data[i].jsonSetting.chartSetting.type.type === 'scatter')
                this.plotly2DScatterchart(i,response,false,0,false);
              if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.group === '2d' && response.data[i].jsonSetting.chartSetting.type.type === 'bar')
                this.plotly2DBarchart(i,response,false,0,false);
              if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.group === '2d' && response.data[i].jsonSetting.chartSetting.type.type === 'pie')
                this.plotly2DPiechart(i,response,false,0,false);
              if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.group === 'time-series' && response.data[i].jsonSetting.chartSetting.type.type === 'bar')
                this.plotlyTimeSeriesBarchart(i,response,false,0,false);
              if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.group === 'time-series' && response.data[i].jsonSetting.chartSetting.type.type === 'scatter')
                this.plotlyTimeSeriesScatterchart(i,response,false,0,false);
              if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.group === 'table')
                this.plotlyTable(i,response,false,0,false);
              if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.type === 'invoice' && response.data[i].result.length!=0)
                this.invoice(i, response);

              if(response.data[0] && response.data[0].result==="error"){
                this.snackText = response.data[0].msgFa
                this.snackColor = "red accent-2";
                this.snackIcon = "mdi-close-circle"
                this.timeout = 3000;
                this.snackbar = true;
                document.cookie = "token=";
                document.cookie = "phone=";
                location.href = '/#/'
              }

              if(this.getCookie("token")==="" || this.getCookie("token")===undefined){
                $(".favImg").css("visibility","hidden")
              }
            }
      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
},

    plotly2DScatterchart(i,response,isInv,j,newInv) {
      if(newInv){
        console.log("1")
        var th = this;
        var data = [];
        var config = {modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'],
          displaylogo: false};
        var x = this.unpack(response.data[i].result, response.data[0].config.chartSetting.x.alias);
        if (response.data[0].config.chartSetting.x.dataType == 'timestamp') {
          for (var p = 0; p < x.length; p++) {
            x[p] = new persianDate(new Date(x[p])).format('YYYY-MM-DD HH:mm');
          }
        }
        for (let d = 0; d < response.data[0].config.chartSetting.y.length; d++) {
          var y = this.unpack(response.data[i].result, response.data[0].config.chartSetting.y[d].alias);

          if (response.data[0].config.chartSetting.y[d].dataType == 'timestamp') {
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
            title: response.data[0].config.title,
          };
          var trace = {
            x: x,
            y: y,
            mode: response.data[0].config.chartSetting.type.mode,
            type: response.data[0].config.chartSetting.type.type,
            name: response.data[0].config.chartSetting.y[d].title,
            fill: response.data[0].config.chartSetting.type.fill,
          }
          data.push(trace);
        }
        plotly.newPlot("invTable" + this.i + "invChart" + this.j, data, layout, config);
      }else
        if(isInv) {
          console.log("2")
        var th = this;
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
          title: response.data[i].jsonSetting.config.content[j].title,
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
      $('#' + 'invTable' + i + 'invChart' + j).on('click',function (e){
        th.i = i;
        th.j = j;
        th.invChartTitle = response.data[i].jsonSetting.config.content[j].title
        for(var k in th.chartsType) {
          if(response.data[i].jsonSetting.config.content[j].chartSetting.type.title===th.chartsType[k].title){
            th.chartsTypeValue = th.chartsType[k].title
          }
        }
        //th.chartsTypeValue = response.data[i].jsonSetting.config.content[j].chartSetting.type.title,
        th.getDataSourcesByPrimaryKey(i,response,j);

        console.log(th.chartsTypeValue)
      })
    }
        else {
          console.log("3")
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
          var maindiv  = document.getElementById("maindiv");
          div.id='chartdiv' + i;
          div.style.backgroundColor = '#596E79'
          div.style.margin = '10px'
          div.style.padding = '5px'
           div.style.borderRadius = '20px'
          div.style.boxShadow = '0px 0px 5px 0px black'
          div.style.boxShadow = '0px 0px 5px 0px black'
          var img = document.createElement('img');
          if(response.data[i].favortie===true){
            img.setAttribute('src',require('../assets/heart.png'))
          }else{
            img.setAttribute('src',require('../assets/heartOutline.png'))
          }
            img.id="favImg"+"_"+response.data[i].chartId
            img.className="favImg"
            img.style.display='flex';
            img.style.margin='auto';
          let a = this;
          if(response.data[i].favortie===false) {
            img.addEventListener("click", function (e) {
              const formData = new FormData();
              formData.append('mobileNumber', a.getCookie("phone"));
              formData.append('chartId', e.target.id.split("_")[1]);
              formData.append('cmd', "{'/AmarManagement-portlet.person/add-to-favorite':{}}");
              axios.post(a.host + '/api/jsonws/invoke', formData,
              ).then(response => {
                if (response.data[0].result === "success") {
                  img.setAttribute('src', require('../assets/heart.png'))
                  a.snackColor = "success";
                  a.snackText = "به علاقه مندی ها اضافه شد";
                  a.snackIcon = "mdi-check-circle"
                  a.snackbar = true;
                  a.GetChartsByDashboard();
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
          }else{
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
                  a.GetChartsByDashboard();
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
          }
          div.appendChild(img)
          maindiv.appendChild(div);
          plotly.newPlot("chartdiv"+i, data, layout, config);
        }
   },
    plotly2DBarchart(i,response,isInv,j,newInv) {
      if(newInv){
        var th = this;
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
          title: response.data[i].config.title,
          barmode: response.data[i].config.chartSetting.type.barmode
        };
        var x = this.unpack(response.data[i].result, response.data[i].config.chartSetting.x.alias);
        if (response.data[i].config.chartSetting.x.dataType == 'timestamp') {
          for ( var p = 0; p < x.length; p++) {
            x[p] =new persianDate(new Date(x[p])).format('YYYY-MM-DD HH:mm');
          }
        }
        for (let d = 0; d < response.data[i].config.chartSetting.y.length; d++) {
          var y = this.unpack(response.data[i].result, response.data[i].config.chartSetting.y[d].alias);
          if (response.data[i].config.chartSetting.y[d].dataType == 'timestamp') {
            for (var j = 0; j < y.length; j++) {
              y[j] =new persianDate(new Date(y[j])).format('YYYY-MM-DD HH:mm');
            }
          }
          var trace = {
            x: x,
            y: y,
            type: response.data[i].config.chartSetting.type.type,
            name: response.data[i].config.chartSetting.y[d].title
          }
          data.push(trace);
        }
        plotly.newPlot("invTable" + this.i + "invChart" + this.j, data, layout, config);
      }
      if(isInv) {
        var th = this;
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
        $('#' + 'invTable' + i + 'invChart' + j).on('click',function (e){
        th.i = i;
        th.j = j;
             th.invChartTitle = response.data[i].jsonSetting.config.content[j].title
            for(var k in th.chartsType) {
                  if(response.data[i].jsonSetting.config.content[j].chartSetting.type.title===th.chartsType[k].title){
                    th.chartsTypeValue = th.chartsType[k].title
                  }
                };
             th.getDataSourcesByPrimaryKey(i,response,j);
          })
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
        var maindiv  = document.getElementById("maindiv");
        div.id='chartdiv' + i;
          div.style.backgroundColor = '#596E79'
          div.style.margin = '10px'
          div.style.padding = '5px'
           div.style.borderRadius = '20px'
        div.style.boxShadow = '0px 0px 5px 0px black'
        var img = document.createElement('img');
          if(response.data[i].favortie===true){
            img.setAttribute('src',require('../assets/heart.png'))
          }else{
            img.setAttribute('src',require('../assets/heartOutline.png'))
          }
        img.id="favImg"+"_"+response.data[i].chartId
            img.className="favImg"
        img.style.display='flex';
        img.style.margin='auto';
        let a = this;
        if(response.data[i].favortie===false) {
          img.addEventListener("click", function (e) {
            const formData = new FormData();
            formData.append('mobileNumber', a.getCookie("phone"));
            formData.append('chartId', e.target.id.split("_")[1]);
            formData.append('cmd', "{'/AmarManagement-portlet.person/add-to-favorite':{}}");
            axios.post(a.host + '/api/jsonws/invoke', formData,
            ).then(response => {
              if (response.data[0].result === "success") {
                img.setAttribute('src', require('../assets/heart.png'))
                a.snackColor = "success";
                a.snackText = "به علاقه مندی ها اضافه شد";
                a.snackIcon = "mdi-check-circle"
                a.snackbar = true;
                  a.GetChartsByDashboard();
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
        }else{
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
                  a.GetChartsByDashboard();
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
        }

          div.appendChild(img)
        maindiv.appendChild(div);
        plotly.newPlot("chartdiv"+i, data, layout, config);
      }
    },
    plotly2DPiechart(i,response,isInv,j,newInv) {
      if(newInv){
        var th = this;
        var data = []
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
          title: response.data[i].config.title,
        };

        var x = this.unpack(response.data[i].result, response.data[i].config.chartSetting.x.alias);

        if (response.data[i].config.chartSetting.x.dataType == 'timestamp') {
          for (var p = 0; p < x.length; p++) {
            x[p] = new persianDate(new Date(x[p])).format('YYYY-MM-DD HH:mm');
          }
        }
        for (let d = 0; d < response.data[i].config.chartSetting.y.length; d++) {
          var y = this.unpack(response.data[i].result, response.data[i].config.chartSetting.y[d].alias);

          if (response.data[i].config.chartSetting.y[d].dataType == 'timestamp') {
            for (var k = 0; k < y.length; k++) {
              y[k] = new persianDate(new Date(y[k])).format('YYYY-MM-DD HH:mm');
            }
          }
          var trace = {
            values: y,
            labels: x,
            type: 'pie',
            name: response.data[i].config.chartSetting.y[d].title,
            domain: {
              row: data.length,
              column: 0
            },
            textinfo: "label+percent",
            textposition: "outside",

          }
          data.push(trace);
        }

        plotly.newPlot("invTable" + this.i + "invChart" + this.j, data, layout, config);
      }
      if(isInv){
        var th = this;
        var data = []
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
        };

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
          var trace = {
            values: y,
            labels: x,
            type: 'pie',
            name: response.data[i].jsonSetting.config.content[j].chartSetting.y[d].title,
            domain: {
              row: data.length,
              column: 0
            },
            textinfo: "label+percent",
            textposition: "outside",

          }
          data.push(trace);
        }

       plotly.newPlot("invTable" + i + "invChart" + j, data, layout, config);
          $('#' + 'invTable' + i + 'invChart' + j).on('click',function (e){

        th.i = i;
        th.j = j;


             th.invChartTitle = response.data[i].jsonSetting.config.content[j].title
            for(var k in th.chartsType) {
                  if(response.data[i].jsonSetting.config.content[j].chartSetting.type.title===th.chartsType[k].title){
                    th.chartsTypeValue = th.chartsType[k].title

                  }
                };
             th.getDataSourcesByPrimaryKey(i,response,j);

            console.log(th.chartsTypeValue)
          })
      }
      else
      {
        var data = []
        var config = {modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'], displaylogo: false};

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
        var maindiv  = document.getElementById("maindiv");
        div.id='chartdiv' + i;
          div.style.backgroundColor = '#596E79'
          div.style.margin = '10px'
          div.style.padding = '5px'
           div.style.borderRadius = '20px'
        div.style.boxShadow = '0px 0px 5px 0px black'
        var img = document.createElement('img');
          if(response.data[i].favortie===true){
            img.setAttribute('src',require('../assets/heart.png'))
          }else{
            img.setAttribute('src',require('../assets/heartOutline.png'))
          }
        img.id="favImg"+"_"+response.data[i].chartId
            img.className="favImg"
        img.style.display='flex';
        img.style.margin='auto';
        let a = this;
        if(response.data[i].favortie===false) {
          img.addEventListener("click", function (e) {
            const formData = new FormData();
            formData.append('mobileNumber', a.getCookie("phone"));
            formData.append('chartId', e.target.id.split("_")[1]);
            formData.append('cmd', "{'/AmarManagement-portlet.person/add-to-favorite':{}}");
            axios.post(a.host + '/api/jsonws/invoke', formData,
            ).then(response => {
              if (response.data[0].result === "success") {
                img.setAttribute('src', require('../assets/heart.png'))
                a.snackColor = "success";
                a.snackText = "به علاقه مندی ها اضافه شد";
                a.snackIcon = "mdi-check-circle"
                a.snackbar = true;
                  a.GetChartsByDashboard();
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
        }else{
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
                  a.GetChartsByDashboard();
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
        }

          div.appendChild(img)
        maindiv.appendChild(div);
        plotly.newPlot("chartdiv"+i, data, layout, config);
      }
    },
    plotlyTimeSeriesScatterchart(i,response,isInv,j,newInv) {
      if(newInv){
        var dateformat = response.data[i].config.chartSetting.dateformat;
        var th = this;
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
          title: response.data[i].config.title,
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
        var x = this.unpack(response.data[i].result, response.data[i].config.chartSetting.x.alias);
        for (var p = 0; p < x.length; p++) {
          x[p] = new persianDate(new Date(x[p])).format('YYYY-MM-DD HH:mm');
        }
        x.sort(function (date1, date2) {
          return date1 > date2
        });

        for (let d = 0; d < response.data[i].config.chartSetting.y.length; d++) {
          var y = this.unpack(response.data[i].result, response.data[i].config.chartSetting.y[d].alias);
          var trace = {
            x: x,
            y: y,
            mode: response.data[i].config.chartSetting.type.mode,
            type: response.data[i].config.chartSetting.type.type,
            name: response.data[i].config.chartSetting.y[d].title,
            fill: response.data[i].config.chartSetting.type.fill,
          }
          data.push(trace);
        }
        plotly.newPlot("invTable" + this.i + "invChart" + this.j, data, layout, config);
      }
      if(isInv){
        var dateformat = response.data[i].jsonSetting.config.content[j].chartSetting.dateformat;
        var th = this;
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
          $('#' + 'invTable' + i + 'invChart' + j).on('click',function (e){

        th.i = i;
        th.j = j;


             th.invChartTitle = response.data[i].jsonSetting.config.content[j].title
            for(var k in th.chartsType) {
                  if(response.data[i].jsonSetting.config.content[j].chartSetting.type.title===th.chartsType[k].title){
                    th.chartsTypeValue = th.chartsType[k].title

                  }
                };
            //th.chartsTypeValue = response.data[i].jsonSetting.config.content[j].chartSetting.type.title,
             th.getDataSourcesByPrimaryKey(i,response,j);

            console.log(th.chartsTypeValue)
          })
      }
      else {
        var dateformat = response.data[i].jsonSetting.chartSetting.dateformat;
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
        for (var p = 0; p < x.length; p++) {
          x[p] = new persianDate(new Date(x[p])).format('YYYY-MM-DD HH:mm');
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
        var maindiv  = document.getElementById("maindiv");
        div.id='chartdiv' + i;
          div.style.backgroundColor = '#596E79'
          div.style.margin = '10px'
          div.style.padding = '5px'
           div.style.borderRadius = '20px'
        div.style.boxShadow = '0px 0px 5px 0px black'
        var img = document.createElement('img');
          if(response.data[i].favortie===true){
            img.setAttribute('src',require('../assets/heart.png'))
          }else{
            img.setAttribute('src',require('../assets/heartOutline.png'))
          }
        img.id="favImg"+"_"+response.data[i].chartId
            img.className="favImg"
        img.style.display='flex';
        img.style.margin='auto';
        let a = this;
        if(response.data[i].favortie===false) {
          img.addEventListener("click", function (e) {
            const formData = new FormData();
            formData.append('mobileNumber', a.getCookie("phone"));
            formData.append('chartId', e.target.id.split("_")[1]);
            formData.append('cmd', "{'/AmarManagement-portlet.person/add-to-favorite':{}}");
            axios.post(a.host + '/api/jsonws/invoke', formData,
            ).then(response => {
              if (response.data[0].result === "success") {
                img.setAttribute('src', require('../assets/heart.png'))
                a.snackColor = "success";
                a.snackText = "به علاقه مندی ها اضافه شد";
                a.snackIcon = "mdi-check-circle"
                a.snackbar = true;
                  a.GetChartsByDashboard();
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
        }else{
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
                  a.GetChartsByDashboard();
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
        }

        div.appendChild(img);
        maindiv.appendChild(div);
        plotly.newPlot("chartdiv"+i, data, layout, config);
      }
    },
    plotlyTimeSeriesBarchart(i,response,isInv,j,newInv) {
      if(newInv){
        var dateformat = response.data[i].config.chartSetting.dateformat;
        var th = this;
        var data = [];
        var config = {modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'], displaylogo: false};

        var x = this.unpack(response.data[i].result, response.data[i].config.chartSetting.x.alias);

        for (var p = 0; p < x.length; p++) {
          x[p] = new Date(x[p]);
        }
        x.sort(function (date1, date2) {
          return date1 > date2
        });

        for (let d = 0; d < response.data[i].config.chartSetting.y.length; d++) {
          var y = this.unpack(response.data[i].result, response.data[i].config.chartSetting.y[d].alias)
          var trace = {
            x: x,
            y: y,
            type: response.data[i].config.chartSetting.type.type,
            name: response.data[i].config.chartSetting.y[d].title,
            mode: response.data[i].config.chartSetting.type.mode,
            fill: response.data[i].config.chartSetting.type.fill,
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
          title: response.data[i].config.title,
          barmode: response.data[i].config.chartSetting.type.barmode,
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
        plotly.newPlot("invTable" + this.i + "invChart" + this.j, data, layout, config);
      }
      if(isInv){
        var dateformat = response.data[i].jsonSetting.config.content[j].chartSetting.dateformat;
        var th = this;
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
          $('#' + 'invTable' + i + 'invChart' + j).on('click',function (e){

        th.i = i;
        th.j = j;
            th.invChartTitle = response.data[i].jsonSetting.config.content[j].title
            for(var k in th.chartsType) {
                  if(response.data[i].jsonSetting.config.content[j].chartSetting.type.title===th.chartsType[k].title){
                    th.chartsTypeValue = th.chartsType[k].title

                  }
                };
            //th.chartsTypeValue = response.data[i].jsonSetting.config.content[j].chartSetting.type.title,
             th.getDataSourcesByPrimaryKey(i,response,j);

            console.log(th.chartsTypeValue)
          })
      } else
      {
        var dateformat = response.data[i].jsonSetting.chartSetting.dateformat;
        var data = [];
        var config = {modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'], displaylogo: false};

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
        var maindiv  = document.getElementById("maindiv");
        div.id='chartdiv' + i;
          div.style.backgroundColor = '#596E79'
          div.style.margin = '10px'
          div.style.padding = '5px'
           div.style.borderRadius = '20px'
        div.style.boxShadow = '0px 0px 5px 0px black'
        var img = document.createElement('img');
          if(response.data[i].favortie===true){
            img.setAttribute('src',require('../assets/heart.png'))
          }else{
            img.setAttribute('src',require('../assets/heartOutline.png'))
          }
        img.id="favImg"+"_"+response.data[i].chartId
            img.className="favImg"
        img.style.display='flex';
        img.style.margin='auto';
        let a = this;
        if(response.data[i].favortie===false) {
          img.addEventListener("click", function (e) {
            const formData = new FormData();
            formData.append('mobileNumber', a.getCookie("phone"));
            formData.append('chartId', e.target.id.split("_")[1]);
            formData.append('cmd', "{'/AmarManagement-portlet.person/add-to-favorite':{}}");
            axios.post(a.host + '/api/jsonws/invoke', formData,
            ).then(response => {
              if (response.data[0].result === "success") {
                img.setAttribute('src', require('../assets/heart.png'))
                a.snackColor = "success";
                a.snackText = "به علاقه مندی ها اضافه شد";
                a.snackIcon = "mdi-check-circle"
                a.snackbar = true;
                  a.GetChartsByDashboard();
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
        }else{
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
                  a.GetChartsByDashboard();
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
        }

          div.appendChild(img)
        maindiv.appendChild(div);
        plotly.newPlot("chartdiv"+i, data, layout, config);
      }

    },
    plotlyTable(i,response,isInv,j,newInv) {
      if(newInv){
        var data = [];
        var th = this;
        var config = {modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'], displaylogo: false};
        var headerValues = [];
        var cellValues = [];
        for (var p = 0; p < response.data[i].config.chartSetting.fields.length; j++) {
          headerValues[p] = [response.data[i].config.chartSetting.fields[p].title];
          if (response.data[i].config.chartSetting.fields[p].dataType == 'timestamp') {
            var vals = this.unpack(response.data[i].result, response.data[i].config.chartSetting.fields[p].alias);
            for (var d = 0; d < vals.length; d++) {
              vals[d] = new persianDate(new Date(vals[d])).format('YYYY-MM-DD HH:mm');
            }
            cellValues[p] = vals;
          } else
            cellValues[p] = this.unpack(response.data[i].result, response.data[i].config.chartSetting.fields[p].alias);
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
          title: response.data[i].config.title,
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
        plotly.newPlot("invTable" + this.i + "invChart" + this.j, data, layout, config);
      }
      if(isInv) {
      var data = [];
      var th = this;
      var config = {modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'], displaylogo: false};
      var headerValues = [];
      var cellValues = [];
        for (var p = 0; p < response.data[i].jsonSetting.config.content[j].chartSetting.fields.length; j++) {
          headerValues[p] = [response.data[i].jsonSetting.config.content[j].chartSetting.fields[p].title];
          if (response.data[i].jsonSetting.config.content[j].chartSetting.fields[p].dataType == 'timestamp') {
            var vals = this.unpack(response.data[i].result[p].result, response.data[i].jsonSetting.config.content[j].chartSetting.fields[p].alias);
            for (var d = 0; d < vals.length; d++) {
              vals[d] = new persianDate(new Date(vals[d])).format('YYYY-MM-DD HH:mm');
            }
            cellValues[p] = vals;
          } else
            cellValues[p] = this.unpack(response.data[i].result[p].result, response.data[i].jsonSetting.config.content[j].chartSetting.fields[p].alias);
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
        $('#' + 'invTable' + i + 'invChart' + j).on('click',function (e){
        
          th.i = i;
          th.j = j;
          th.invChartTitle = response.data[i].jsonSetting.config.content[j].title
          for(var k in th.chartsType) {
            if(response.data[i].jsonSetting.config.content[j].chartSetting.type.title===th.chartsType[k].title){
              th.chartsTypeValue = th.chartsType[k].title

            }
          };
          //th.chartsTypeValue = response.data[i].jsonSetting.config.content[j].chartSetting.type.title,
          th.getDataSourcesByPrimaryKey(i,response,j);
        
          console.log(th.chartsTypeValue)
        })
      }
      else {
        var data = [];
        var th = this;
        var config = {modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'toImage', 'sendDataToCloud', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews', 'toggleSpikelines', 'resetViewMapbox','toImage', 'sendDataToCloud'], displaylogo: false};
        var headerValues = [];
        var cellValues = [];
        for (var p = 0; p < response.data[i].jsonSetting.chartSetting.fields.length; p++) {
          headerValues[p] = [response.data[i].jsonSetting.chartSetting.fields[p].title];
          if (response.data[i].jsonSetting.chartSetting.fields[p].dataType == 'timestamp') {
            var vals = this.unpack(response.data[i].result, response.data[i].jsonSetting.chartSetting.fields[p].alias);
            for (var d = 0; d < vals.length; d++) {
              vals[d] = new persianDate(new Date(vals[d])).format('YYYY-MM-DD HH:mm');
            }
            cellValues[p] = vals;
          } else
            cellValues[p] = this.unpack(response.data[i].result, response.data[i].jsonSetting.chartSetting.fields[p].alias);
        }
        var layout = {
          width: 320,
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
        var maindiv = document.getElementById("maindiv");
        div.id = 'chartdiv' + i;
        div.style.backgroundColor = '#596E79'
        div.style.margin = '10px'
        div.style.padding = '5px'
        div.style.borderRadius = '20px'
        div.style.boxShadow = '0px 0px 5px 0px black'
        div.style.boxShadow = '0px 0px 5px 0px black'
        var img = document.createElement('img');
        if (response.data[i].favortie === true) {
          img.setAttribute('src', require('../assets/heart.png'))
        } else {
          img.setAttribute('src', require('../assets/heartOutline.png'))
        }
        img.id = "favImg" + "_" + response.data[i].chartId
        img.className = "favImg"
        img.style.display = 'flex';
        img.style.margin = 'auto';
        let a = this;
        if(response.data[i].favortie===false) {
          img.addEventListener("click", function (e) {
            const formData = new FormData();
            formData.append('mobileNumber', a.getCookie("phone"));
            formData.append('chartId', e.target.id.split("_")[1]);
            formData.append('cmd', "{'/AmarManagement-portlet.person/add-to-favorite':{}}");
            axios.post(a.host + '/api/jsonws/invoke', formData,
            ).then(response => {
              if (response.data[0].result === "success") {
                img.setAttribute('src', require('../assets/heart.png'))
                a.snackColor = "success";
                a.snackText = "به علاقه مندی ها اضافه شد";
                a.snackIcon = "mdi-check-circle"
                a.snackbar = true;
                a.GetChartsByDashboard();
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
        }else{
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
                a.GetChartsByDashboard();
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
        }
        div.appendChild(img)
        maindiv.appendChild(div);
        plotly.newPlot("chartdiv"+i, data, layout, config);
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
    unpack(rows, key) {
     return rows.map(function(row)
     { return row[key]; });
     },
    invoice(i,response) {
      var div  = document.createElement("div");
      var maindiv  = document.getElementById("maindiv");
      div.id='chartdiv' + i;
      maindiv.appendChild(div);

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
          if(response.data[i].favortie===true){
            img.setAttribute('src',require('../assets/heart.png'))
          }else{
            img.setAttribute('src',require('../assets/heartOutline.png'))
          }            
           img.id="favImg"+"_"+response.data[i].chartId
            img.className="favImg"
            img.style.display='flex';
            img.style.margin='auto';
          let a = this;
            if(response.data[i].favortie===false) {
              img.addEventListener("click", function (e) {
                const formData = new FormData();
                formData.append('mobileNumber', a.getCookie("phone"));
                formData.append('chartId', e.target.id.split("_")[1]);
                formData.append('cmd', "{'/AmarManagement-portlet.person/add-to-favorite':{}}");
                axios.post(a.host + '/api/jsonws/invoke', formData,
                ).then(response => {
                  if (response.data[0].result === "success") {
                    img.setAttribute('src', require('../assets/heart.png'))
                    a.snackColor = "success";
                    a.snackText = "به علاقه مندی ها اضافه شد";
                    a.snackIcon = "mdi-check-circle"
                    a.snackbar = true;
                  a.GetChartsByDashboard();
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
            }else{
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
                  a.GetChartsByDashboard();
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
            }
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
          this.plotly2DScatterchart(i,response, true,c,false);
        if (response.data[i].jsonSetting.config.content[c].chartSetting.type && response.data[i].jsonSetting.config.content[c].chartSetting.type.group === '2d' && response.data[i].jsonSetting.config.content[c].chartSetting.type.type === 'bar')
          this.plotly2DBarchart(i,response,true,c,false);
        if (response.data[i].jsonSetting.config.content[c].chartSetting.type && response.data[i].jsonSetting.config.content[c].chartSetting.type.group === '2d' && response.data[i].jsonSetting.config.content[c].chartSetting.type.type === 'pie')
          this.plotly2DPiechart(i,response,true,c,false);
        if (response.data[i].jsonSetting.config.content[c].chartSetting.type && response.data[i].jsonSetting.config.content[c].chartSetting.type.group === 'time-series' && response.data[i].jsonSetting.config.content[c].chartSetting.type.type === 'bar')
          this.plotlyTimeSeriesBarchart(i,response,true,c,false);
        if (response.data[i].jsonSetting.config.content[c].chartSetting.type && response.data[i].jsonSetting.config.content[c].chartSetting.type.group === 'time-series' && response.data[i].jsonSetting.config.content[c].chartSetting.type.type === 'scatter')
          this.plotlyTimeSeriesScatterchart(i,response,true,c,false);
        if (response.data[i].jsonSetting.chartSetting.type && response.data[i].jsonSetting.chartSetting.type.group === 'table')
          this.plotlyTable(i,response,true,c,false);
        if (response.data[i].jsonSetting.config.content[c].chartSetting.type && response.data[i].jsonSetting.config.content[c].chartSetting.type.type === 'table')
        {
            if (response.data[i].jsonSetting.config.content[c].chartSetting.type.id === response.data[i].result[c].config.chartSetting.type.id) {
              this.addTableToInvoice(i,response,c);
            }
        }
      }
    },
    getCookie(name) {
      let cookie = {};
      document.cookie.split(';').forEach(function(el) {
        let [k] = el.split('=');
        cookie[k.trim()] = el.substring(k.length + 1);
      })
      return cookie[name];
    },
    _dataTypes(dataType) {
      var type = '';
      if (dataType == 'int8' || dataType == 'int4' || dataType == 'INTEGER') {
        type = 'integer'
      } else if (dataType == 'varchar' || dataType == 'text' || dataType == 'VARCHAR') {
        type = 'string'
      } else if (dataType == 'bool') {
        type = 'boolean'
      } else if (dataType == 'timestamp') {
        type = 'datetime'
      } else if (dataType == 'float8' || dataType == 'DOUBLE' || dataType == 'FLOAT') {
        type = 'double'
      } else if (dataType.toUpperCase() == 'GEOMETRY' || dataType.toUpperCase() == 'POINT' || dataType.toUpperCase() == 'LINESTRING' ||
          dataType.toUpperCase() == 'POLYGON' || dataType.toUpperCase() == 'MULTIPOINT' || dataType.toUpperCase() == 'MULTILINESTRING' ||
          dataType.toUpperCase() == 'MULTIPOLYGON' || dataType.toUpperCase() == 'GEOMETRYCOLLECTION') {
        type = 'geometry'
      }
      return type;

    },
    _randomId() {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      var charactersLength = characters.length;
      for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      result = result + ((new Date()).getMilliseconds().toString());
      return result;
    },
    getDataSourcesByPrimaryKey(i,response0,j){
      $('#filterDiv').remove();
      this.newChartSetting = [];
      var div = document.createElement("div");
      div.id = "filterDiv"
      div.style.height="300px";
      div.style.width="100%";
      div.style.position="absolute";
      div.style.bottom="50px";
      div.style.overflow="scroll";
      div.style.padding="5px";
      document.getElementById("invChartSettingCard").append(div)
      var filter = [];
      this.column = [];
      var t = this;
      const formData = new FormData();
      formData.append('dataSourceId', response0.data[i].jsonSetting.config.content[j].dataSourceId);
      formData.append('token', this.getCookie("token"));
      formData.append('cmd', "{'/BiTools-portlet.datasources/get-data-sources-by-primary-key':{}}");
      axios.post( this.host + '/api/jsonws/invoke', formData,
      ).then(response => {
        JSON.parse(response.data.jsonSetting).columns.forEach(function (element) {
          t.column.push({
            name: element.name,
            title: element.title,
            type: element.dataType
          });         
        });
        this.column.forEach(function (column) {

          if (t._dataTypes(column.type) == 'geometry')
            return;

          if (t._dataTypes(column.type) == 'string') {
            filter.push({
              id: column.name,
              label: column.title,
              type: t._dataTypes(column.type),
              operators: ['equal', 'not_equal', 'begins_with', 'not_begins_with', 'contains', 'not_contains', 'ends_with', 'not_ends_with', 'is_empty', 'is_not_empty', 'is_null', 'is_not_null'],
              input: function (rule, name) {
                var $container = rule.$el.find('.rule-value-container');
                var operator = rule.__.operator.type;
                $container.on('click', '#' + name + '_icon_question_sign', function (e) {
                  console.log($container)
                    t._fetchAndDisplaySuggestedValues(rule.filter.field, response.data.dataSourceId, function (selectedValue) {
                      console.log($container)
                      console.log($container[0])
                      console.log($container[0].firstChild)
                      rule.value = selectedValue;
                      $container[0].firstChild.value = selectedValue;
                      t.DatatableDialog = false;
                      selectedValue = null;
                    });
                });
                return '<input class="form-control" name="' + name + '" type="text">&nbsp;<i id="' + name + '_icon_question_sign" class="fa fa-question-circle" style="cursor: pointer;font-size: x-large"></i>';
              }
            });
          } else if (t._dataTypes(column.type) == 'datetime' || t._dataTypes(column.type) == 'date' || t._dataTypes(column.type) == 'date-time') {
            filter.push({
              id: column.name,
              label: column.title,
              type: 'date',
              operators: ['equal', 'not_equal', 'less', 'less_or_equal', 'greater', 'greater_or_equal', 'between', 'not_between', 'is_null', 'is_not_null'],
              // input: function (rule, name) {
              //   var $container = rule.$el.find('.rule-value-container');
              //   $container.on('click', '#' + name + 'date-picker', function (e) {
              //     AUI().use("stri-ext-jquery", "stri-ext-jquery-calendars", "stri-ext-jquery-calendars-persian", "stri-ext-jquery-calendars-picker", "stri-ext-jquery-calendars-picker-fa",
              //         function (A) {
              //           $('#' + name + 'date-picker').calendarsPicker({
              //             calendar: $.calendars.instance('persian', 'fa'),
              //             dateFormat: 'yyyy-mm-dd',
              //             onSelect: function (dates) {
              //               if (dates.length > 0) {
              //                 var date = dates[dates.length - 1].toJSDate();
              //                 var d = new Date(date),
              //                     month = '' + (d.getMonth() + 1),
              //                     day = '' + d.getDate(),
              //                     year = d.getFullYear();
              //
              //                 if (month.length < 2)
              //                   month = '0' + month;
              //                 if (day.length < 2)
              //                   day = '0' + day;
              //                 $('#' + name + 'js_date').val([year, month, day].join('-'));
              //               } else {
              //                 $('#' + name + 'js_date').val('');
              //               }
              //             }
              //           });
              //           $('#' + name + 'date-picker').calendarsPicker('show');
              //         });
              //   });
              //   return '<input id="' + name + 'date-picker" class="form-control" type="text" /><input id="' + name + 'js_date" class="form-control" name="' + name + '" type="hidden" />';
              // }
            });
          }else if (t._dataTypes(column.type) == 'boolean') {
            filter.push({
              id: column.name,
              label: column.title,
              type: 'string',
              input: 'radio',
              values: {
                'true': "بلی",
                'false': "خیر"
              },
              operators: ['equal']
            });
          }else if (t._dataTypes(column.type) == 'number' || t._dataTypes(column.type) == 'int' || t._dataTypes(column.type) == 'integer' || t._dataTypes(column.type) == 'double' || t._dataTypes(column.type) == 'long'){
            filter.push({
              id: column.name,
              label: column.title,
              type: t._dataTypes(column.type),
              input: function (rule, name) {
                var $container = rule.$el.find('.rule-value-container');
                var operator = rule.__.operator.type;
                $container.on('click', '#' + name + '_icon_question_sign', function (e) {
                    t.DatatableDialog = true;
                    t._fetchAndDisplaySuggestedValues(rule.filter.field, response.data.dataSourceId, function (selectedValue) {
                      rule.value = selectedValue;
                      $container[0].firstChild.value = selectedValue;
                      t.DatatableDialog = false;
                      selectedValue = null;
                  });
                });
                return '<input class="form-control" name="' + name + '" type="text">&nbsp;<i id="' + name + '_icon_question_sign" class="fa fa-question-circle" style="cursor: pointer;font-size: x-large"></i>';
              }
            });
          } else {
            filter.push({
              id: column.name,
              label: column.title,
              type: t._dataTypes(column.type)
            });
          }
        });
        var queryBuilder = $('#filterDiv').queryBuilder({
          filters: filter
        });
        queryBuilder.on("afterAddRule.queryBuilder afterAddGroup.queryBuilder afterApplyGroupFlags.queryBuilder afterApplyRuleFlags.queryBuilder afterClear.queryBuilder afterCreateRuleFilters.queryBuilder afterCreateRuleInput.queryBuilder afterCreateRuleOperators.queryBuilder  afterDeleteGroup.queryBuilder afterDeleteRule.queryBuilder afterInit.queryBuilder afterReset.queryBuilder afterSetRules.queryBuilder afterUpdateGroupCondition.queryBuilder afterUpdateRuleFilter.queryBuilder afterUpdateRuleOperator.queryBuilder afterUpdateRuleValue.queryBuilder", function (event) {
          var result = $('#filterDiv').queryBuilder('getRules');
          console.log(result)
          if (!$.isEmptyObject(result)) {
            response0.data[i].jsonSetting.config.content[j].query.where = result;
            var sqlResult = $('#filterDiv').queryBuilder('getSQL', false);
          }else {
            response0.data[i].jsonSetting.config.content[j].query.where = {};
          }
            t.chartsType.forEach(function (item) {
              if (item.id === t.chartsTypeValue) {
                response0.data[i].jsonSetting.config.content[j].chartSetting.type = item;
              }
            })
            response0.data[i].jsonSetting.config.content[j].title = t.invChartTitle;
        });
        this.newChartSetting.push({'newChart':[response0.data[i].jsonSetting.config.content[j]],'i':i,'j':j});
        this.invChartSettingDialog = true;
      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },
    _fetchAndDisplaySuggestedValues(fieldName, dataSourceId, onSelectedValue) {
      this.desserts = [];
      var th = this;
      var randomKey = this._randomId();
      const formData = new FormData();
      formData.append('fieldName', fieldName);
      formData.append('dataSourceId', dataSourceId);
      formData.append('cmd', "{'/BiTools-portlet.datasources/get-field-uniqe-value':{}}");
      axios.post( this.host + '/api/jsonws/invoke', formData,
      ).then(response => {
        console.log(response)
        var data = [];
        var counter = 0;
        response.data.forEach(function (row) {
          counter += 1;
          data.push({
            row: counter,
            value: row.value,
            count: row.count
          });
        });
        this.desserts = data;
      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
      th.DatatableDialog = true;
      var rmd = this._randomId();
      $('#' + this.randomKey).attr('id',rmd)
      $('#' + rmd).on('click',function (e){
        onSelectedValue(e.target.parentNode.childNodes[1].innerText)
        $('#' + rmd).attr("onclick",null).unbind("click");
      })
      this.randomKey = rmd;
    },
    setNewChartSetting(){
      var t = this;
      if(this.newChartSetting[0].newChart[0].query.where.length === 0) {
        this.chartsType.forEach(function (item) {
          if (item.id === t.chartsTypeValue) {
            t.newChartSetting[0].newChart[0].chartSetting.type = item;
          }
        })
        }
      console.log(this.newChartSetting)
      const formData = new FormData();
      formData.append('companyId', "20155");
      formData.append('groupId', "-1");
      formData.append('status', "0");
      formData.append('chartSettingStr',JSON.stringify(this.newChartSetting[0].newChart));
      formData.append('filterJson', null);
      formData.append('cmd', "{'/BiTools-portlet.biremote/get-category-values':{}}");
      axios.post( this.host + '/api/jsonws/invoke', formData,
      ).then(response => {
        console.log(response)
        if (response.data[0].config.chartSetting.type && response.data[0].config.chartSetting.type.group === '2d' && response.data[0].config.chartSetting.type.type === 'scatter')
          this.plotly2DScatterchart(0,response, false,0,true);
        if (response.data[0].config.chartSetting.type && response.data[0].config.chartSetting.type.group === '2d' && response.data[0].config.chartSetting.type.type === 'bar')
          this.plotly2DBarchart(0,response,false,0,true);
        if (response.data[0].config.chartSetting.type && response.data[0].config.chartSetting.type.group === '2d' && response.data[0].config.chartSetting.type.type === 'pie')
          this.plotly2DPiechart(0,response,false,0,true);
        if (response.data[0].config.chartSetting.type && response.data[0].config.chartSetting.type.group === 'time-series' && response.data[0].config.chartSetting.type.type === 'bar')
          this.plotlyTimeSeriesBarchart(0,response,false,0,true);
        if (response.data[0].config.chartSetting.type && response.data[0].config.chartSetting.type.group === 'time-series' && response.data[0].config.chartSetting.type.type === 'scatter')
          this.plotlyTimeSeriesScatterchart(0,response,false,0,true);
        if (response.data[0].config.chartSetting.type && response.data[0].config.chartSetting.type.group === 'table')
          this.plotlyTable(0,response,false,0,true);
      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
      this.invChartSettingDialog = false;
    },
  },
}

</script>
