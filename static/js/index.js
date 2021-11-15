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
    if(fun == "Existence" || fun == "Absence") deselectAct2(activity2);
    else activeAct2(activity2);
    
    switch(fun) {
        case "Existence":
            applyFunction(act1, null, '/existence');
            showRule(act1, null, fun)
            break;
        case "Absence":
            applyFunction(act1, null, '/absence');
            showRule(act1, null, fun)
            break;    
        case "Choice":
            applyFunction(act1, act2, '/choice');
            showRule(act1, act2, fun);
            break;
        case "ExclusiveChoice":
            applyFunction(act1, act2, '/exclusive_choice');
            showRule(act1, act2, fun);
            break; 
        case "RespondedExistence":
            applyFunction(act1, act2, '/responded_existence');
            showRule(act1, act2, fun);
            break;    
        default:
            text = "To do"; 
    }
}

function applyFunction(act1, act2, url){
    $(document).ready(function(){
        $.ajax({
            type : "POST",
            url : url,
            data: {act1: act1, act2: act2},
            success: function(response) {
                showResponse(response);}
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
    if(act2 != null)
        $(".divRule").append('<p>' + rule + "(" + act1 + "," + act2 + ")" + '<p>');
    else $(".divRule").append('<p>' + rule + "(" + act1 + ")" + '<p>');
       
}


function showResponse(response){
    var result = response.result
    var remove = response.remove
    $(".Divtext").empty()
    for(var i=0; i < result.length; i++){
        $(".Divtext").append('<p>'+result[i] + '<br>' +'</p>')
    }
    $(".DivtextDel").empty()
    for(var i=0; i < remove.length; i++){
        $(".DivtextDel").append('<p>'+remove[i] + '<br>' +'</p>')
    }

}

function clearDiv(){
    $(".Divtext").empty()
    $(".DivtextDel").empty()
    $(".divRule").empty()
    $.ajax({
        url: "/clear"
    });    
}