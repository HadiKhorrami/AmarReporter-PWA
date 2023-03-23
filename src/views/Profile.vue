<template>
  <v-app style="font-family: IranSans">
    <div id="main">
      <div class="custom-shape-divider-top-1639403246">
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" style="z-index: 500;position: fixed;margin-top: 5px;font-size:30px;margin-left: 5px;color: white ">mdi-account</v-icon>
          </template>
          <v-list>
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="profileMenu(i)"
                v-bind:id="i"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" size="large" style="margin-right: 0"></v-icon>
              </v-list-item-icon>
              <v-list-item-title style="font-size: 12px">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-icon style="z-index: 500;position: fixed;margin-top: 5px;font-size:30px;right: 5px;color: white;float: right ">mdi-menu</v-icon>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
        </svg>

      </div>
      <v-row justify="center">
        <v-dialog v-model="ExiteAgreeDialog" max-width="290" style="font-family: IranSans;text-align: center;padding-top: 20px;" eager>
          <v-card>
            <v-card-text style="font-family: IranSans;text-align: center;padding-top: 20px">
              حتما قصد خروج دارید؟
            </v-card-text>

            <v-card-actions style="font-family: IranSans;">
              <v-spacer></v-spacer>

              <v-btn
                  color="red darken-1"
                  text
                  @click="ExiteAgreeDialog = false"
                  style="float: left;position: fixed"
              >
                خیر
              </v-btn>
                <v-btn color="green darken-1" text @click="setSession();ExiteAgreeDialog = false">
                  بله
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="FavoriteDialog" style="font-family: IranSans;height: 600px;padding: 0" eager>
          <v-card style="height: 600px;width:100%;position: relative;top:0;background-color: #F0ECE3">
            <div style="height: 100%;width: 100%">
              <div style="position: absolute;top: 0;width: 100%;text-align: center;font-family: IranSans;margin-top: 20px;color: #596E79;height: 50px;font-size: 20px;direction: rtl">
                <v-icon color="#596E79">mdi-heart</v-icon>
                علاقه مندی ها
              </div>
              <template>
                <div style="height: 80%;width: 100%;position: relative;top:10%;overflow: scroll">

                  <div v-for="i in 5" style="border-radius: 5px;background-color: #596E79;padding-top:5px;margin-top: 10px;width: 95%;margin-left: 10px">
                    <Plotly id="plotly" :data="data" :layout="layout"  :display-mode-bar="false" style="display: flex;justify-content: center;height: 400px;margin-bottom: 10px;margin-top: 10px"></Plotly>
                    <v-btn small style="margin-left: 40%;margin-bottom: 10px;background-color: #ff707d;color:white;direction: rtl;font-family:IranSans;max-width: 100% " @click="DeleteFavoriteDialog=true"><v-icon>mdi-delete</v-icon>حذف</v-btn>
                  </div>
                </div>
              </template>
            </div>
            <v-card-actions style="position: absolute;bottom: 0;width: 100%">
              <v-spacer></v-spacer>
              <v-btn color="#ff4444" text @click="FavoriteDialog = false" style="font-family: IranSans;right: 0;position: relative">
                بستن
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      </div>

    <div id="inputdiv" style="margin-top: 180px;margin-left: 10px;margin-right: 10px;font-family: IranSans;overflow: scroll;height: 80%;position: fixed;width: 95%;padding: 10px">
      <v-text-field :disabled="txtDisabled" v-model="screenName" label="نام نمایشی" persistent-hint required reverse color="red" filled rounded dense style="margin-bottom: 5px;direction: rtl;min-height:0;height: 55px " append-icon="mdi-account"></v-text-field>
      <v-text-field :disabled="txtDisabled" v-model="firstName" label="نام" persistent-hint required reverse color="red" filled rounded dense style="margin-bottom: 5px;direction: rtl;min-height:0;height: 55px" append-icon="mdi-account"></v-text-field>
      <v-text-field :disabled="txtDisabled" v-model="lastName" label="نام خانوادگی" persistent-hint reverse color="red" filled required rounded dense style="margin-bottom: 5px;direction: rtl;min-height:0;height: 55px" append-icon="mdi-account"></v-text-field>
<!--      <v-text-field  v-model="email" label="ایمیل" persistent-hint reverse color="red" filled required rounded dense style="margin-bottom: 5px;direction: rtl;min-height:0;height: 55px" append-icon="mdi-at"></v-text-field>-->
      <v-text-field :disabled="txtDisabled" v-model="password" label="رمز عبور" persistent-hint required reverse color="red" type="password" filled rounded dense style="margin-bottom: 5px;direction: rtl;min-height:0;height: 55px" append-icon="mdi-lock"></v-text-field>
      <v-text-field :disabled="txtDisabled" v-model="passwordAgain" label="تکرار رمز عبور" persistent-hint required reverse color="red" type="password" filled rounded dense style="margin-bottom: 20px;direction: rtl;min-height:0;height: 55px" append-icon="mdi-lock" :error-messages="confirmError"></v-text-field>
<!--      <v-file-input :disabled="txtDisabled" label="آپلود عکس" v-model="file" filled reverse dense rounded @change="AddProfilePhoto()" style="direction: rtl" prepend-icon="mdi-camera"></v-file-input>-->
            <br>
            <v-btn :disabled="txtDisabled" id="editbtn" rounded  style="left: 30%;margin-top: 0.5%;background-color: #ffffff;color: green;position: absolute;width: 40%;border: 1px green solid" @click=" PasswordConfirmation();SaveProfile()">
              ذخیره
              <v-icon dark right color="green">
              mdi-checkbox-marked-circle
            </v-icon>
            </v-btn>
          </div>
    <v-snackbar  v-model="snackbar" :color="snackColor"  rounded="pill" style="direction: rtl;margin: auto;min-width: 0 !important;width: 50px">
      <v-icon>{{ snackIcon }}</v-icon>
      {{ snackText }}
    </v-snackbar>
<Footer/>
  </v-app>
</template>
<style>
@media only screen and (device-height : 761px) {
  #inputdiv {
    margin-top: 180px !important;
  }
  #charts{
     width: 300px ;
    margin-left: 10px !important;
  }
}
@media only screen and (device-height : 640px) {
  #inputdiv {
    margin-top: 130px !important;
  }
}
#charts{
  margin-left: 15px;
}
.v-dialog{
  box-shadow: none;
}
.v-text-field.v-text-field--enclosed .v-text-field__details{
  margin-bottom: 0;
}
#footer{
  position: fixed;
  bottom: 0;
  padding: 0;
  font-family: IranSans;
  box-shadow: 5px 5px 5px 5px #282828;
  background-color: teal;
}

#main{
  width: 100%;
  height: 93%;
  position: fixed;
  top: 0;
  padding: 0;
  font-family: IranSans;
  background-color: #F0ECE3;
}
.custom-shape-divider-top-1638862908 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-top-1639403246 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;

}

.custom-shape-divider-top-1639403246 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 150px;

}

.custom-shape-divider-top-1639403246 .shape-fill {
  fill: #596E79;
}

/** For mobile devices **/
@media (max-width: 767px) {
  .custom-shape-divider-top-1639403246 svg {
    width: calc(281% + 1.3px);
    height: 155px;
  }

}
.v-list-item__icon{
  margin-right: 0 !important;
}
.mdi-close-circle::before{
  margin-right: 20px;
}
.v-snack__content{
  text-align: center !important;
}
</style>
<script>
import VueBase64FileUpload from 'vue-base64-file-upload';
import Footer from '../components/Footer.vue'
import axios from "axios";
export default {
  data: () => ({
    host:location.host,
    protocol:location.protocol + "//",
    screenName:"",
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    passwordAgain:"",
    //////////////////////
    timeout: 2000,
    bottom: true,
    txtDisabled:false,
    confirmError:"",
    file: "",
    img: "",
    ExiteAgreeDialog: false,
    DeleteImageDialog: false,
    value: 1,
    chip2: true,
    FavoriteDialog: false,
    DeleteFavoriteDialog: false,
    base64: "",
    items: [{title: 'خروج', icon: 'mdi-logout'},],
    data: [{x: [1, 3], y: [2, 4]}],
    layout: {
      autosize: false,
      width: 305,
      height: 400,
    },
    loginLink:"",
    snackbar:false,
    snackColor:"",
    snackText:"",
    snackIcon:""
  }),
components:{
  Footer,
  "vue-base64-file-upload":VueBase64FileUpload,
},
mounted() {
  let [h] = this.host.split(".");
  if(this.host==="localhost:8081" || this.host==="localhost:8080"){
    this.host = "https://192.168.100.193"
  }else {
    this.host = this.protocol + this.host.substring(h.length + 1)
  }
  this.img='https://lh3.googleusercontent.com/a-/AOh14GhY6x7qChB4xFpJHVjhH9memHPOxg733qCNmcj2PA=s288-p-rw-no';
  if(this.getCookie("phone")==="" || this.getCookie("phone")===undefined){
    this.items[1].title='ورود'
    this.txtDisabled=true;
    this.img = require('../assets/profile.svg');
    this.chip2=false;
  }
  this.GetPerson();
  console.log(this.getCookie("token"))

},
  methods:{
    profileMenu(id){
      if(id===0){
        this.ExiteAgreeDialog=true;
      }
      // else
      // if(id===1) {
      //   if(this.getCookie("phone")!=""){
      //     this.ExiteAgreeDialog=true;
      //   }else if(this.getCookie("phone")===""){
      //    window.location.href="#/App"
      //   }
      // }
    },
    AddProfilePhoto(){
      let b = this;
      var reader = new FileReader();
      reader.readAsDataURL(this.file)
      reader.onload = function(e) {
        const formData = new FormData();
        formData.append('userId', "20435");
        formData.append('mobileNumber', this.getCookie("phone"));
        formData.append('file', e.target.result);
        formData.append('imageName', b.file.name);
        formData.append('cmd', "{'/AmarManagement-portlet.person/add-profile-photo':{}}");
        for (var pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }
        axios.post( this.host + '/api/jsonws/invoke', formData,
        ).then(response => {
          console.log(response)
        }).catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
      }
    },
    SaveProfile(){
       if(this.PasswordConfirmation(true)) {
         console.log(this.PasswordConfirmation())
         const formData = new FormData();
         formData.append('userId', "20435");
         formData.append('mobileNumber', this.getCookie("phone"));
         formData.append('screenName', this.screenName);
         formData.append('firstName', this.firstName);
         formData.append('lastName', this.lastName);
         formData.append('password', this.password);
         formData.append('password2', this.passwordAgain);
         formData.append('cmd', "{'/AmarManagement-portlet.person/save-profile':{}}");
         for (var pair of formData.entries()) {
           console.log(pair[0] + ', ' + pair[1]);
         }
         axios.post( this.host + '/api/jsonws/invoke', formData,
         ).then(response => {
           this.snackColor="success";
           this.snackText="ذخیره شد";
           this.snackIcon="mdi-check-circle"
           this.snackbar=true;
           console.log(response)
         }).catch(error => {
           this.snackColor="red";
           this.snackText="خطای سرور";
           this.snackIcon="mdi-alert-circle"
           this.snackbar=true;
           this.errorMessage = error.message;
           console.error("There was an error!", error);
         });
       }
    },
    RemoveProfilePhoto(){
      const formData = new FormData();
      formData.append('companyId', "20155");
      formData.append('mobileNumber', this.phone);
      formData.append('cmd', "{'/AmarManagement-portlet.person/remove-profile-photo':{}}");
      axios.post( this.host + '/api/jsonws/invoke', formData,
      ).then(response => {
        console.log(response)
      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },
    setSession(){
      document.cookie = "token=";
      document.cookie = "phone=";
      this.items[0].title='ورود'
      this.firstName="";
      this.lastName="";
      this.$router.push("/Reports")
    },
    PasswordConfirmation(){
       if(this.password!=this.passwordAgain){
         this.confirmError='رمز عبور هماهنگ نیست'
         return false;
       }else if(this.password===this.passwordAgain){
         this.confirmError=''
         return true;
       }
    },
    GetPerson(){
      console.log(this.getCookie("phone"))
      const formData = new FormData();
      formData.append('mobileNumber', this.getCookie("phone"));
      formData.append('cmd', "{'/AmarManagement-portlet.person/get-person':{}}");
      axios.post( this.host + '/api/jsonws/invoke', formData,
      ).then(response => {
        console.log(response)
        this.firstName=response.data[0].firstName;
        this.lastName=response.data[0].familyName;
        this.screenName=response.data[0].screenName;
      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },
    getCookie(name) {
      let cookie = {};
      document.cookie.split(';').forEach(function(el) {
        let [k] = el.split('=');
        cookie[k.trim()] = el.substring(k.length + 1);
      })
      return cookie[name];
    }
  },



}
</script>