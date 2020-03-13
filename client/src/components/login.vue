<template>
<div>
    <div v-if="!isLogin && !register">
        <div class="sidenav">
         <div class="login-main-text">
             <h1 class="mt-5 text-center">Welcome To Kanban</h1>
             <h5 class="text-center">Please log in to continue</h5>
             <h5 class="text-center">Or</h5>
             <h5 class="text-center">Register to use the app</h5>
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
                  <button type="submit" class="btn btn-primary">Login</button>
                  <button type="button" class="btn btn-secondary" @click.prevent="doRegister()">Register</button>
               </form>
               <div class="text-left mt-3">
                  <button type="button" class="btn btn-light" @click.prevent="gSign()">Sign with Google</button>

               </div>
            </div>
         </div>
      </div>
    </div>
    <!-- REGISTER -->
    <div class="container mt-5" v-if="!isLogin && register">
      <div class="col-md-6 mx-auto text-center">
         <div class="header-title">
            <h2 class="wv-heading--subtitle">
               Register Form
            </h2>
            <span class="text-center" v-if="error" style="color: red;">{{ error_msg }} </span>
         </div>
      </div>
      <div class="row">
         <div class="col-md-4 mx-auto">
            <div class="myform form ">
               <form @submit.prevent="postRegister()">
                  <div class="form-group">
                     <input type="text" name="name"  class="form-control my-input" id="name" placeholder="Name" v-model="name_reg">
                  </div>
                  <div class="form-group">
                     <input type="email" name="email"  class="form-control my-input" id="email" placeholder="Email" v-model="email_reg">
                  </div>
                  <div class="form-group">
                     <input type="password" class="form-control my-input" placeholder="Password" v-model="pass_reg">
                  </div>
                  <div class="text-center ">
                     <button type="submit" class=" btn btn-success">Register</button>
                  </div>
                  <div class="text-center mt-1">
                     <button type="button" class="btn btn-secondary" @click="doLog()">Back to Login</button>
                  </div>
               </form>
            </div>
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
            email_login: ``,
            pass_login: ``,
            error: false,
            error_msg: ``,
            register: false,
            pass_reg: ``,
            name_reg: ``,
            email_reg: ``
        }
    },
    mounted() {
       gapi.signin2.render('google-signin-button', {
       onsuccess: this.onSignIn
       })
       
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
        },
        doRegister() {
            this.empty()
            this.register = true
        },
        doLog() {
           this.empty()
            this.register = false
        },
        postRegister() {
            axios.post(`https://protected-crag-71554.herokuapp.com/users/register`, {
                
                    name: this.name_reg,
                    email: this.email_reg,
                    password: this.pass_reg
                
            })
            .then(data => {
                let token = data.data.access_token
                localStorage.setItem('access_token', token)
                this.$emit('changeIsLogin', { value:true })
            })
            .catch(err => {
               err.response.data.forEach(i => {
                  this.error_msg += `${i}\n`
               })
               this.error = true
            })
        },

        empty() {
            this.email_login = ``,
            this.pass_login = ``,
            this.error = false,
            this.error_msg = ``,
            this.register = false,
            this.pass_reg = ``,
            this.name_reg = ``,
            this.email_reg = ``
        },

        onSignIn(par_token) {
           axios.post(`https://protected-crag-71554.herokuapp.com/users/googleSign`,{
              data: {
                 access_token: par_token
              }
           })
           .then(data => {
              let token = data.data.access_token
               localStorage.setItem('access_token', token)
               this.$emit('successGSign', { value:true })
           })
           .catch(err => {
              console.log(err)
           })
        },

        gSign() {
           this.$gAuth.signIn()
            .then(GoogleUser => {
            let token = GoogleUser.uc.id_token
            this.isSignIn = this.$gAuth.isAuthorized
            this.onSignIn(token)
            })
            .catch(error  => {

            })
        }
    }
})
</script>