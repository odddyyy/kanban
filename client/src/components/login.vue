<template>
    <div v-if="!isLogin">
        <div class="sidenav">
         <div class="login-main-text">
            <h2>Application<br> Login Page</h2>
            <p>Login or register from here to access.</p>
         </div>
      </div>
      <div class="main">
          
         <div class="col-md-6 col-sm-12">
            <div class="login-form">
               <span class="text-center" v-if="error" style="color: red;">{{ error_msg }} </span>
               <form @submit.prevent="postLogin()">
                  <div class="form-group">
                     <label>Email</label>
                     <input type="text" class="form-control" v-model="email_login">
                  </div>
                  <div class="form-group">
                     <label>Password</label>
                     <input type="password" class="form-control" v-model="pass_login">
                     
                  </div>
                  <button type="submit" class="btn btn-black">Login</button>
                  <button type="submit" class="btn btn-secondary">Register</button>
               </form>
            </div>
         </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
export default ({
    props:['isLogin'],
    data() {
        return {
            email_login: null,
            pass_login: null,
            error: false,
            error_msg: null
        }
    },
    created() {

    },
    methods: {
        postLogin() {
            axios.post(`https://protected-crag-71554.herokuapp.com/users/login`, {
                email: this.email_login,
                password: this.pass_login
            })
            .then(data => {
                let token = data.data.access_token
                this.email_login = ``
                this.pass_login = ``
                localStorage.setItem('access_token', token)
                this.$emit('changeIsLogin', { value:true })
            })
            .catch(err => {
                this.error_msg = err.response.data
                this.error = true
                
            })
        }
    }
})
</script>