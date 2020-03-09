const END_POINT = `http://localhost:3000`

$('#btn').on('click', () => {
    $.ajax({
        method:'GET',
        url: `${END_POINT}/`,
        success: (data) => {
            $('#name').empty()
            $('#name').append(data.message)
        }
    })
})