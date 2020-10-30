console.log("im linked")

$(document).ready(function () {

    // When you click new new, form and newnew submit shows
    $("#newNew").on("click", function (event) {
        event.preventDefault();

    });

    // When you click newnew submit, new user and activity are created
    $("#newNew-submit").on("click", function (event) {
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

    // When you click view, all users and all activities are shown 
    $("#view").on("click", function (event) {
        event.preventDefault();
        $.ajax({
            method: "GET",
            url: "/all",
        }).then(apiRes => {
            console.log(apiRes);
            window.location.href = "/"
        });
    });
    
        // When you click newOld form and newOld submit shows***
        $("#newOld").on("click", function (event) {
            event.preventDefault();
    
        });


         // When you click newOld submit, previous user and new activity are created
    $("#newOld-submit").on("click", function (event) {
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
            url: "/update/:id",
            data: newActivityUser
        }).then(apiRes => {
            console.log(apiRes);
            window.location.href = "/"
        });
    });

})

