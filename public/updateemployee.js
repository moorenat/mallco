function updateemployee(id) {
    $.ajax({
        url: '/employee/' + id,
        type: 'PUT',
        data: $('#update-employee').serialize(),
        success: function (result) {
            window.location.replace("./");
        }
    })
};