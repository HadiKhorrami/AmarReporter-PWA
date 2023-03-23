<template>
<footer>
  <v-row justify="center">
    <v-dialog
        v-model="ExiteAgreeDialog"
        max-width="290"
        style="font-family: IranSans;text-align: center;padding-top: 20px;" eager
    >
      <v-card>
        <v-card-text style="font-family: IranSans;text-align: center;padding-top: 20px">
          از حساب کاربری خارج شدید<br><br> میخواهید وارد شوید؟
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
          <v-btn color="green darken-1" text @click="GoToLogin()">
            بله
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <v-bottom-navigation
      id="footer"
      v-model="value"
      :background-color="color"
      dark

  >

<!--    <a :href="ProfilePath" style="text-decoration: none;width: 50%;max-width: 100%">-->
      <v-btn  style="height: 100%;color: white;width: 33%;max-width: 100%;" @click="MyProfileClick()">
        <span style="color: white">پروفایل من</span>

        <v-icon style="color: white">mdi-account</v-icon>
      </v-btn>
<!--    </a>-->
    <router-link style="text-decoration: none;width: 33%;max-width: 100%" to="/Reports">
      <v-btn style="height: 100%;color: white;width: 100%;max-width: 100%">
        <span style="color: white">گزارشات</span>
        <v-icon v-text="chartlogo" style="color: white"></v-icon>
      </v-btn>
    </router-link>
    <router-link style="text-decoration: none;width: 33%;max-width: 100%" to="/Favorite">
      <v-btn style="height: 100%;color: white;width: 100%;max-width: 100%">
        <span style="color: white">علاقه مندی ها</span>
        <v-icon style="color: white">mdi-heart</v-icon>
      </v-btn>
    </router-link>

  </v-bottom-navigation>
</footer>
</template>

<script>
import { mdiChartLine } from '/node_modules/@mdi/js';
export default {
  name: "Footer",
  data: () => ({
  chartlogo:mdiChartLine,
    ProfilePath:"",
    ExiteAgreeDialog:false
  }),
  mounted() {

  },
  methods:{
    getCookie(name) {
      let cookie = {};
      document.cookie.split(';').forEach(function(el) {
        let [k] = el.split('=');
        cookie[k.trim()] = el.substring(k.length + 1);
      })
      console.log(cookie[name]);
      return cookie[name];
    },
    MyProfileClick(){
      if(this.getCookie("token")==="" || this.getCookie("token")===undefined){
        this.ExiteAgreeDialog=true
      }else{
        this.$router.push("/Profile")
      }
    },
    GoToLogin(){
      location.href="/#/App"
    }
  }
}
</script>

<style scoped>
#footer{
  position: fixed;
  bottom: 0;
  padding: 0;
  font-family: IranSans;
  box-shadow: 5px 5px 5px 5px #282828;
  background-color: teal;
}
</style>