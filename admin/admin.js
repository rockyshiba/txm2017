// Initialize Firebase
function clicky(){
    console.log("another click");
}

(function($){

var config = {
    apiKey: "AIzaSyDej4PQCAKansvr7roC_71yq69F9ZIKppg",
    authDomain: "txm2017-2fa87.firebaseapp.com",
    databaseURL: "https://txm2017-2fa87.firebaseio.com",
    projectId: "txm2017-2fa87",
    storageBucket: "txm2017-2fa87.appspot.com",
    messagingSenderId: "941999093820"
};
firebase.initializeApp(config);

var mywhyDb = firebase.database();

displayApproved();

$(document).on('mouseover', '.btn-moderate', function(){
    $(".btn-approve").click(function(){
        var thisId = $(this).data('id');
        mywhyDb.ref('mywhy/' + thisId).update({ approved: true });
        //displayApproved();
        location.reload();
    });

    $(".btn-remove").click(function(){
        var thisId = $(this).data('id');
        mywhyDb.ref('mywhy/' + thisId).update({ approved: false });
        //displayApproved();
        location.reload();
    });

    $(".btn-delete").click(function(){
        var thisId = $(this).data('id');
        mywhyDb.ref('mywhy/' +  thisId).remove();
        location.reload();
    });
})

function displayApproved(){
    var liContent = "";

    $(".display-list").html("");

    mywhyDb.ref('mywhy/').once('value', function(snap){
        snap.forEach(function(child){
            var timeStamp = child.key;
            var timeStampDisplay = new Date(parseInt(timeStamp));
            timeStampDisplay = timeStampDisplay.toString();

            if(child.val().approved){
                liContent = 
                "<li id='" + timeStamp + "'>" + 
                    timeStampDisplay + 
                    "<br>" + 
                    child.val().userInput + 
                "</li>";
                document.getElementById("approved-list").innerHTML += liContent;
                makeButton(timeStamp, child.val().userInput, "Remove", "btn-remove btn-moderate");
            }
            else{
                liContent = 
                "<li id='" + timeStamp + "'>" + 
                    timeStampDisplay + 
                    "<br>" + 
                    child.val().userInput + 
                "</li>";
                document.getElementById("unapproved-list").innerHTML += liContent;
                makeButton(timeStamp, child.val().userInput, "Approve", "btn-approve btn-moderate");
                makeButton(timeStamp, child.val().userInput, "Delete", "btn-delete btn-moderate");
            }
        });
    });
}

function makeButton(id, incomingInput, btnText, btnClass){
    var newBtn = document.createElement('button');
    newBtn.innerHTML = btnText;
    newBtn.setAttribute("type", "button");
    newBtn.setAttribute("data-id", id);
    newBtn.setAttribute("data-input", incomingInput);
    newBtn.setAttribute("class", btnClass);
    newBtn.setAttribute("onclick", "clicky");
    document.getElementById(id).appendChild(newBtn);
}

function enableButtons(){
    $(".btn-approve").click(function(){
        //console.log("clicked");
        var thisId = $(this).data("id");
        console.log(thisId);
    });   
}


})(jQuery);