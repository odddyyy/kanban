<template>
    <div>
        <KanbanTable v-if="isLogin" :isLogin="isLogin" @changeIsLogin="checkLogin"></KanbanTable>
        <Login :isLogin="isLogin" @changeIsLogin="checkLogin"></Login>
        <!-- <register :isRegister="isRegister"></register> -->
    </div>
</template>

<script>
import axios from "axios";
import Login from './components/login'
import KanbanTable from './components/kanbanTable'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import register from './components/register'

export default {
    components: {
        Login,
        KanbanTable
        // register
    },
  data() {
    return {
      
      isLogin: null,
      isAdd: false,
      isRegister: false
    };
  

  },
  created() {
      this.checkLogin()
  },
  methods:{
      checkLogin() {
          if (localStorage.access_token) {
            this.isLogin = true
          } else {
            this.isLogin = false
          }
      },

      changeLogin() {
          this.checkLogin()
      },

      checkRegister() {

      }
  }

    

    


  
};
</script>

<style scoped></style>
