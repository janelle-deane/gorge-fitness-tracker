console.log("im linked")

$(document).ready(function () {

    $("#newNew").on("click", function (event) {
        event.preventDefault();

        const newActivityUser = {
            name: $("#name").val(),
            date: $("#date").val(),
            activityName: $("#activityName").val(),
            activityDes: $("#activity-des").val(),
            rigor: $("#rigor").val(),
            mileage: $("#mileage").val(),
            duration: $("#duration").val(),
        }

        console.log(newActivityUser);
        $.ajax({
            method: "POST",
            url: "/newnew",
            data: newActivityUser
        }).then(apiRes => {
            console.log(apiRes);
            window.location.href = "/"
        });
    });


})

