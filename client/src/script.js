const dev_url = 'http://localhost:3000'
const heroku_url = 'https://protected-crag-71554.herokuapp.com'

new Vue ({
    el:'#app',
    data: {
        contoh:[],
        backlog: null,
        onProcess:null,
        onReviewed:null,
        completed:null,
        isLogin: false,
        email_login: ``,
        pass_login: ``,
        name_reg:``,
        email_reg:``,
        pass_reg:``,
        err:false,
        error_msg:``,
        isAdd: false,
        add_desc:``,
        add_title:``

    },
    created() {
        this.doLog()
        this.getData()
    },
    methods:{
        getData() {
            // console.log(`masuk get data`)
            axios({
                method:'GET',
                url:`${heroku_url}/tasks`,
                headers:{access_token:localStorage.access_token}
            })
            .then(data => {
                this.contoh = data.data
                this.filter()
            })
            .catch(err => {
                console.log(err)
            })
        },

        filter() {
            this.contoh.sort((a,b) => a.id-b.id)
            this.backlog = this.contoh.filter((i) => {
                return i.status == `Backlog`
            })
            this.onProcess = this.contoh.filter((i) => {
                return i.status == `On Process`
            })
            this.onReviewed = this.contoh.filter((i) => {
                return i.status == `On Reviewed`
            })
            this.completed = this.contoh.filter((i) => {
                return i.status == `Completed`
            })
            
        },

        doLog() {
            if (localStorage.access_token) {
                this.isLogin = true
            } else {
                this.isLogin = false
            }
        },

        postLogin() {
            axios.post(`${heroku_url}/users/login`, {
                email: this.email_login,
                password: this.pass_login
            })
            .then(data => {
                let token = data.data.access_token
                localStorage.setItem('access_token', token)
                this.getData()
                this.doLog()
            })
            .catch(err => {
                console.log(err.response.data)
                this.err = true
                this.error_msg = err.response.data
            })
        },

        logout() {
            localStorage.removeItem('access_token')
            this.empty()
            this.doLog()
        },

        empty() {
            this.contoh = []
            this.backlog = []
            this.onProcess =[]
            this.onReviewed =[]
            this.completed =[]
            this.email_login = ``
            this.pass_login = ``
            this.error_msg = ``
            this.add_title = ``
            this.add_desc = ``
        },

        register() {
            axios.post(`${heroku_url}/users/register`, {
                
                    name: this.name_reg,
                    email: this.email_reg,
                    password: this.pass_reg
                
            })
            .then(data => {
                let token = data.data.access_token
                localStorage.setItem('access_token', token)
                this.doLog()
                this.getData()
            })
            .catch(err => {

            })
        },

        addForm() {
            this.isAdd = true
        },

        addNewTask() {
            axios({
                method:'POST',
                url:`${heroku_url}/tasks/add`,
                headers:{access_token:localStorage.access_token},
                data:{
                    title: this.add_title,
                    description: this.add_desc
                }
            })
            .then(data => {
                this.isAdd = false
                this.getData()
            })
            .catch(err => {
                console.log(err)
            })
        },

        deleteTask(id) {
            axios({
                method:'DELETE',
                url:`${heroku_url}/tasks/delete/${id}`,
                headers:{access_token:localStorage.access_token}
            })
            .then(data => {
                this.getData()
            })
            .catch(err => {
                console.log(err)
            })
        },

        changeStatsNext(id, status) {
            let changed = ``
            if (status == `Backlog`) {
                changed = `On Process`
            } else if (status == `On Process`){
                changed = `On Reviewed`
            } else if (status == `On Reviewed`) {
                changed = `Completed`
            }
            axios({
                method:'PUT',
                url:`${heroku_url}/tasks/edit/${id}`,
                headers:{access_token:localStorage.access_token},
                data:{
                    status: changed
                }
            })
            .then(data => {
                this.getData()
            })
            .catch(err => {
                console.log(err)
            })
        },

        changeStatsBack(id, status) {
            let back = ``
            if (status == `Completed`) {
                back = `On Reviewed`
            } else if (status == `On Reviewed`){
                back = `On Process`
            } else if (status == `On Process`) {
                back = `Backlog`
            }
            axios({
                method:'PUT',
                url:`${heroku_url}/tasks/edit/${id}`,
                headers:{access_token:localStorage.access_token},
                data:{
                    status: back
                }
            })
            .then(data => {
                this.getData()
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})