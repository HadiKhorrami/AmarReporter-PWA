<template>
  <v-form id="form" ref="entryForm" @submit.prevent="submitHandler" style="margin-top:70%">
    <v-container>
      <v-row>
        <v-text-field class="phonetext" v-model="phone" :rules="numberRules" label="شماره موبایل خود را وارد کنید" required rounded filled reverse clearable dense style="width: 100%;max-width: 100%;direction: rtl"></v-text-field>
      </v-row>
      <v-row>
        <v-btn large rounded type="submit" color="#596E79" id="subminbtn">ورود</v-btn>
      </v-row>
    </v-container>
    <v-alert type="error" v-model="error" style="direction: rtl;font-family: IranSans;position: fixed;top:0;width: 100%;left: 0;text-align: right">
      {{ errormsg }}
    </v-alert>
    <v-alert v-model="success" type="success" style="direction: rtl;font-family: IranSans;position: fixed;top:0;width: 100%;left: 0;text-align: right">
      ورود با موفقیت انجام شد
    </v-alert>
    <v-bottom-sheet v-model="sheet" eager >
      <v-sheet class="text-center" height="250px"  style="font-family: IranSans; text-align: center;align-content: center;background-color:#414141;color: white;padding: 10px; ">
        <form>
          <div class="py-3">
            <h5>کد ارسال شده را وارد نمایید</h5>
            <br>
            <label id="sendagain">{{ countDown  }}</label>
            <div class="form-group">
              <!-- <label style="color:red;overflow: hidden;">خطای ارتباط با سرور</label> -->
              <input type="" class="form-control form-control-lg" id="confirmtext"/>
            </div>
            <!--          <router-link style="text-decoration: none; width: 33%;" to="/Profile">-->
            <v-btn  class="btn btn-dark btn-lg btn-block" :loading="loading" :disabled="loading" dark id="confirmbtn" @click="loader = 'loading';ConfirmCode();" >تایید
            </v-btn>
            <!--          </router-link>-->
            <v-btn class="btn btn-dark btn-lg btn-block" id="sendagainbtn" @click="countDownTimer();ResendCode()" >ارسال مجدد</v-btn>
          </div>
        </form>
      </v-sheet>
    </v-bottom-sheet>
<!--    <router-view></router-view>-->
  </v-form>

</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  name: "LoginForm",
  data: () => ({
    host:location.host,
    protocol:location.protocol + "//",
    numberRules: [],
    phone: "",
    valid:false,
    sheet:false,
    loading: false,
    countDown :60,
    success:false,
    error:false,
    errormsg:"",
    code:"",

  }),
  components:{

  },
  mounted() {
this.phone="";
    let [h] = this.host.split(".");
    if(this.host==="localhost:8081" || this.host==="localhost:8080" || this.host==="192.168.100.9:8080" || this.host==="192.168.100.9:8081"){
      this.host = "https://192.168.100.193"
    }else {
      this.host = this.protocol + this.host.substring(h.length + 1)
    }
    console.log(this.host)
  },
  methods:{
    submitHandler () {
      this.numberRules = [
        v => !!v || 'شماره وارد نشده است',
        v => /^\d+$/.test(v) || 'کیبورد را به حالت انگلیسی قرار دهید',
      ]
      let self = this
      setTimeout(function () {
        if (self.$refs.entryForm.validate()){
          self.sheet=true;
          self.countDownTimer();
          self.sendConfirmationMessage();
        }
      })
    },
    countDownTimer() {
      document.getElementById("sendagain").textContent=this.countDown;
      document.getElementById("sendagain").style.fontSize = "15px";
      document.getElementById("sendagainbtn").disabled = true;
      if(this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }else if(this.countDown === 0){
        document.getElementById("sendagainbtn").disabled = false;
        document.getElementById("sendagain").textContent = "در صورت عدم دریافت پیامک دکمه ی ارسال مجدد را انتخاب کنید";
        document.getElementById("sendagain").style.fontSize = "12px";
        this.ClearCode();
        this.countDown = 60;
      }
    },
    sendConfirmationMessage(){
      const formData = new FormData();
      formData.append('companyId', "20155");
      formData.append('mobileNumber',this.phone);
      formData.append('cmd', "{'/AmarManagement-portlet.person/send-confirmation-message':{}}");

      axios.post( this.host + '/api/jsonws/invoke', formData,
      ).then(response => {
        console.log(response)
        this.code=response.data[0].code;
      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
      $("#confirmtext").val("");
    },
    ConfirmCode(){
      const l = this.loader
      this[l] = !this[l];
      const formData = new FormData();
      formData.append('code', this.code);
      formData.append('mobileNumber', this.phone);
      formData.append('cmd', "{'/AmarManagement-portlet.person/confirm-login':{}}");

      axios.post(this.host + '/api/jsonws/invoke', formData,
      ).then(response => {
        console.log(response)
        this[l] = false;
        this.loader = null
        if(response.data[0].login==="ok"){
          this.error=false;
          this.success=true;
          this.sheet=false;
          let a = this;
          setTimeout(function() {a.$router.push("/Profile");a.success=false;}, 1000);
          // this.$session.set("token",response.data[0].token)
          // this.$session.set("phone",this.phone)
          // this.setCookie("phone",this.phone,36500)
          document.cookie = "phone="+this.phone + ";expires=Thu, 18 Dec 9999 12:00:00 UTC";
          document.cookie = "token="+response.data[0].token + ";expires=Thu, 18 Dec 9999 12:00:00 UTC";
        }else if (response.data[0].login==="fail" && response.data[0].msg==="not-connect-to-server-please-try-again") {
          this.errormsg="ارتباط با سرور برقرار نشد. دوباره سعی کنید";
          this.error=true;
        }else if (response.data[0].login==="fail" && response.data[0].msg==="code-is-invalid") {
          this.errormsg="کد وارد شده نادرست است";
          this.error=true;
        }
      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
    },
    ResendCode(){
      const formData = new FormData();
      formData.append('userId', "20435");
      formData.append('mobileNumber', this.phone);
      formData.append('cmd', "{'/AmarManagement-portlet.person/resend-code':{}}");
      axios.post( this.host + '/api/jsonws/invoke', formData,
      ).then(response => {
        console.log(response)
      }).catch(error => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
      $("#confirmtext").val("");
    },
    ClearCode(){
      const formData = new FormData();
      formData.append('mobileNumber',this.phone);
      formData.append('cmd', "{'/AmarManagement-portlet.person/clear-code':{}}");
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
    },
    getCookie(name) {
      let cookie = {};
      document.cookie.split(';').forEach(function(el) {
        let [k] = el.split('=');
        cookie[k.trim()] = el.substring(k.length + 1);
      })
      console.log(cookie[name]);
      return cookie[name];
    },
    setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  },
  watch: {
    'phone' (val) {
      this.numberRules = []
    }
  },
}
</script>

<style scoped>
@media screen and (max-device-height : 640px){
  #form {
    margin-top: 50% !important;
  }
  #confirmbtn{
    margin-top: 20px;
  }
  #sendagainbtn{
    margin-top: 20px;
  }
}
#subminbtn{
  margin-top: 10px;
  background-color: #596E79;
  color: white;
  width: 100%;
  border: hidden;
}
#confirmtext{
  height: 40px;
  width: 70%;
  min-height: 0;
  text-align: center;
  margin-left: 15%;
  margin-top: 30px;
}
#confirmbtn{
  background-color: #54d35b;
  margin-top: 20px;
  color: white;
}
#sendagainbtn{
  background-color: #d55360;
  margin-top: 20px;
  color: white;
  margin-left: 5px;
}
</style>