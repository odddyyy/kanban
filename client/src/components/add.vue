<template>
    <div id="addnew" v-if="isAdd" class="mt-5">
			<div class="container border border-dark rounded py-3">
				<h3 style="text-align: center;">Add new Task</h3>
                <span class="text-center" v-if="error" style="color: red;">{{ error_msg }} </span>
				<form @submit.prevent="addNewTask">
					<div class="form-group">
					  <label for="exampleFormControlInput1">Title</label>
					  <input type="text" class="form-control" id="exampleFormControlInput1" v-model="add_title">
					</div>
					<div class="form-group">
					  <label for="exampleFormControlTextarea1">Description</label>
					  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="add_desc"></textarea>
					</div>
					<button class="btn btn-primary" type="submit">add</button>
					<button class="btn btn-danger" type="reset">clear</button>
				</form>
			</div>

		  </div>
</template>
<script>
import axios from 'axios'
export default {
    props:['isAdd'],
    data() {
        return {
            add_title: ``,
            add_desc: ``,
            error : false,
            error_msg: null
        }
    },
    methods: {
        addNewTask() {
            axios({
                method:'POST',
                url:`https://protected-crag-71554.herokuapp.com/tasks/add`,
                headers:{access_token:localStorage.access_token},
                data:{
                    title: this.add_title,
                    description: this.add_desc
                }
            })
            .then(data => {
                this.add_title= ``
                this.add_desc= ``
                this.$emit("changeIsAdd", {value:false})
            })
            .catch(err => {
                this.error_msg = err.response.data
                this.error = true
            })
        }
    }
}
</script>