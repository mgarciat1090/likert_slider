//main
$(document).ready(function(){
    console.log("make likert");

    $("#likert-scale-01").slider({});
    $("#likert-scale-02").slider({
        random : true
    });
    $("#likert-scale-03").slider({
        animate: true,
        random : false
    });
})
