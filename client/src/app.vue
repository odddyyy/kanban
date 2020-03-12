<template>
    <div>
    <KanbanTable :isLogin="isLogin" @changeIsLogin="checkLogin"></KanbanTable>
    <Login :isLogin="isLogin" @changeIsLogin="checkLogin"></Login>
    </div>
</template>

<script>
import axios from "axios";
import Login from './components/login'
import KanbanTable from './components/kanbanTable'

export default {
    components: {
        Login,
        KanbanTable
    },
  data() {
    return {
      
      isLogin: null,
      isAdd: false
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
      }
  }

    

    


  
};
</script>

<style scoped></style>
