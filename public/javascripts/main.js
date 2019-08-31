$(document).ready(function () {
    $(".removed").click(function (event) {
        $(this).parent().parent().hide('slow')
    });
});
