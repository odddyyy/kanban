const END_POINT = `https://thawing-harbor-36087.herokuapp.com`

$('#btn-add').on('click', () => {
    $.ajax({
        method:'GET',
        url: `${END_POINT}/`,
        success: (data) => {
            $('#name').append(data.message)
        }
    })
})

$('#btn-clear').on('click', () => {
    $('#name').empty()
})