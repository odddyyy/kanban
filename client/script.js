const END_POINT = `https://protected-crag-71554.herokuapp.com/`

const loginPassword = $('#pass-login')
const loginEmail = $('#email-login')
const email = $('#email')
var token = localStorage.getItem('access_token')
console.log(token, `<<<<<< token`)

$(document).ready(() => {
    if (token) {

    } else {

    }
})


$('#login-form').on('submit', (event) => {
    event.preventDefault()
    $.ajax({
        method:'POST',
        url: `https://protected-crag-71554.herokuapp.com/users/login`,
        data: {
            email:loginEmail.val(),
            password:loginPassword.val()
        },
        success: (data) => {
            console.log(data)
            localStorage.setItem('access_token',data.access_token)
        },
        error: (response) => {
            $('#err-alert-login').text(response.responseJSON)
        }
    })
    
})

$('#login-page').show()