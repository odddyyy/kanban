<template>
    <div class="container" v-if="isLogin">
            <div class="text-right mt-5">
			    <button class="btn btn-danger btn-lg" v-if="isLogin" @click="logout()">Logout</button>
            </div>
			<h1 style="text-align: center; font-family:monospace; font-size: 100px;">KhanBan Board</h1>
            <button class="btn btn-success btn-sm mt-2" @click="addForm">Add New Task</button>
            <Add :isAdd="isAdd" @changeIsAdd="changeAdd"></Add>
			<div class="row mt-3 p-3" style="border: 1px solid black; background-image: url('/images/boardbackground.jpg'); background-repeat: no-repeat; background-size: cover; max-height:100vh;">
				<!-- BACKLOG TABLE -->
				<div class="col-3 p-3" style="text-align: center;">
					<h3 style="font-family: fantasy; color: white;">BACKLOG</h3>
					<div v-for="list in backlog" :key="list.id" class="row-12 mt-2">
						<div class="card shadow-lg rounded">
							<div class="card-body">
								<h5 class="mt-1" style="font-family:monospace; font-size: 20px;">{{ list.title }}</h5>	
								<hr>
								<p>{{ list.description }}</p>
							</div>
							<div class="card-text mt-1">
								<button class="btn btn-success mb-1 mt-1" @click.prevent="changeStatsNext(list.id, list.status)">></button>
							</div>
						</div>
					</div>
				</div>
	
	
				<!-- ON PROCESS TABLE -->
				<div class="col-3 p-3" style="text-align: center;">
					<h3 style="font-family: fantasy; color: white;">ON PROCESS</h3>
					<div v-for="list in onProcess" :key="list.id" class="row-12 mt-2">
						<div class="card">
							<div class="card-body">
								<h5 class="mt-1" style="font-family:monospace; font-size: 20px;">{{ list.title }}</h5>	
								<hr>
								<p>{{ list.description }}</p>
							</div>
							<div class="card-text mt-1">
								<button class="btn btn-danger mb-1 mt-1" @click.prevent="changeStatsBack(list.id, list.status)"><</button>
								<button class="btn btn-success mb-1 mt-1" @click.prevent="changeStatsNext(list.id, list.status)">></button>
							</div>
						</div>
					</div>	
				</div>
	
				<!-- ON REVIEWED TABLE -->
				<div class="col-3 p-3" style="text-align: center;">
					<h3 style="font-family: fantasy; color: white;">ON REVIEWED</h3>
					<div v-for="list in onReviewed" :key="list.id" class="row-12 mt-2">
						<div class="card">
							<div class="card-body">
								<h5 class="mt-1" style="font-family:monospace; font-size: 20px;">{{ list.title }}</h5>	
								<hr>
								<p>{{ list.description }}</p>
							</div>
							<div class="card-text mt-1">
								<button class="btn btn-danger mb-1 mt-1" @click.prevent="changeStatsBack(list.id, list.status)"><</button>
								<button class="btn btn-success mb-1 mt-1" @click.prevent="changeStatsNext(list.id, list.status)">></button>
							</div>
						</div>
						</div>
				</div>
	
				<!-- COMPLETED TABLE -->
				<div class="col-3 p-3" style="text-align: center;">
					<h3 style="font-family: fantasy; color: white;">COMPLETED</h3>
					<div v-for="list in completed" :key="list.id" class="row-12 mt-2">
						<div class="card">
							<div class="card-body">
								<h5 class="mt-1" style="font-family:monospace; font-size: 20px;">{{ list.title }}</h5>	
								<hr>
								<p>{{ list.description }}</p>
							</div>
							<div class="card-text mt-1">
								<button class="btn btn-danger mb-1 mt-1" @click.prevent="changeStatsBack(list.id, list.status)"><</button>
								<button class="btn btn-danger mb-1 mt-1" type="button" @click.prevent="deleteTask(list.id)">Delete</button>
							</div>
						</div>
					</div>
				</div>
			
			</div>
			
            
	</div>
</template>
<script>
import axios from 'axios'
import Add from './add'
export default {
    props:['isLogin'],
    components: {
        Add
    },
    created() {
        this.getData()
    },
    data() {
        return {
            listTask: null,
            backlog: null,
            onProcess: null,
            onReviewed: null,
            completed: null,
            isAdd: false
        }
    },
    methods: {
        getData() {
        axios({
            method: "GET",
            url: "https://protected-crag-71554.herokuapp.com/tasks",
            headers: { access_token: localStorage.access_token }
        })
            .then(data => {
                this.listTask = data.data;
                this.filter()
            })
            .catch(err => {});
        },

        filter() {
        this.listTask.sort((a, b) => a.id - b.id);
        this.backlog = this.listTask.filter(i => {
            return i.status == `Backlog`;
        });
        this.onProcess = this.listTask.filter(i => {
            return i.status == `On Process`;
        });
        this.onReviewed = this.listTask.filter(i => {
            return i.status == `On Reviewed`;
        });
        this.completed = this.listTask.filter(i => {
            return i.status == `Completed`;
        });
        },

        addForm() {
        if (this.isAdd){
            this.isAdd = false
        } else {
            this.isAdd = true
        }
        },

        changeAdd() {
            this.isAdd = false
            this.getData()
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
                url:`https://protected-crag-71554.herokuapp.com/tasks/edit/${id}`,
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
                url:`https://protected-crag-71554.herokuapp.com/tasks/edit/${id}`,
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
        },

        deleteTask(id) {
            axios({
                method:'DELETE',
                url:`https://protected-crag-71554.herokuapp.com/tasks/delete/${id}`,
                headers:{access_token:localStorage.access_token}
            })
            .then(data => {
                this.getData()
            })
            .catch(err => {
                console.log(err)
            })
        },

        logout() {
            localStorage.removeItem('access_token')
            this.$emit("changeIsLogin", { value:false })
        }
    }
}
</script>