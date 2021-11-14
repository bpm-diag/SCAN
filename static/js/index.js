function selectFunction(){
    var fun = document.getElementById("selectFun").value;
    var activity2 = document.getElementById("act2");
    if(fun == "Existence") deselectAct2(activity2);
    else activeAct2(activity2);
}

function takeFunction(){
    var fun = document.getElementById("selectFun").value;
    var act1 = document.getElementById("act1").value;
    var activity2 = document.getElementById("act2");
    var act2 = activity2.value;
    if(fun == "Existence") deselectAct2(activity2);
    else activeAct2(activity2);
    
    switch(fun) {
        case "Existence":
           // deselectAct2(activity2);
            applyFunctionOneElem(act1, '/existence');
            break;
        case "Choice":
            applyFunctionTwoElem(act1, act2, '/choice');
            showRule(act1, act2, fun);
            break;
        default:
            text = "To do"; 
    }
}

function applyFunctionOneElem(act1, url){
    $(document).ready(function(){
        $.ajax({
            type : "POST",
            url : url,
            data: {act1: act1},
            success: function(response) {
                $(".Divtext").html('<p>'+response.result+'</p>')
                $(".DivtextDel").html('<p>'+response.remove+'</p>');}
        });     
    });
}

function applyFunctionTwoElem(act1, act2, url){
    $(document).ready(function(){
        $.ajax({
            type : "POST",
            url : url,
            data: {act1: act1, act2: act2},
            success: function(response) {
                $(".Divtext").html('<p>'+response.result+'</p>')
                $(".DivtextDel").html('<p>'+response.remove+'</p>');}
        });     
    });
}

function deselectAct2(activity2){
    activity2.disabled = true;
    activity2.style.opacity = "0.5";   
}

function activeAct2(activity2){
    activity2.disabled = false;
    activity2.style.opacity = "1";   
}


function showRule(act1, act2, rule){
    
    $(".divRule").append('<p>' + rule + "(" + act1 + ", " + act2 + ")" + '<p>');
       
}
/*
function fixSegments(segments){
    var s = segments.split("\n")
    console.log(s)
}*/
