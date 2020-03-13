<template>
    <div class="mt-5 bg-dark">
        <div class="container border border-dark rounded py-3 text-white">
            <h3 style="text-align: center;">Edit Form</h3>
            <!-- <span class="text-center" v-if="error" style="color: red;">{{ error_msg }} </span> -->
            <form @submit.prevent="editTask">
                <div class="form-group">
                    <label for="exampleFormControlInput1">Title</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" v-model="edit_title">
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="edit_desc"></textarea>
                </div>
                <button class="btn btn-primary" type="submit">Edit</button>
                <button class="btn btn-danger" type="button" @click="sendBack">Cancel</button>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:['editID'],
    data() {
        return {
            edit_title: null,
            edit_desc: null,
            id: null
        }
    },
    watch: {
        editID: function (id) {
            this.getForm(id)
        }
    },

    created() {
        this.getForm(this.editID)
        this.id = this.editID
    },
    methods: {
        editTask() {
            axios({
            method: "PUT",
            url: `https://protected-crag-71554.herokuapp.com/tasks/edit/${this.id}`,
            headers: { access_token: localStorage.access_token },
            data: {
                title: this.edit_title,
                description: this.edit_desc
            }
        })
            .then(data => {
                this.$emit('edited')
            })
            .catch(err => {
                console.log(err)
            });
        
        },
        getForm(id) {
            axios({
            method: "GET",
            url: `https://protected-crag-71554.herokuapp.com/tasks/${this.editID}`,
            headers: { access_token: localStorage.access_token }
        })
            .then(data => {
                this.edit_title = data.data.title
                this.edit_desc = data.data.description
                this.$emit('readyForm',{data:this.id})
            })
            .catch(err => {});
        },

        sendBack() {
            this.$emit('cancel')
        }
    }
}
</script>