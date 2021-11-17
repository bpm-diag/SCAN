function selectFunction(){
    var fun = document.getElementById("selectFun").value;
    var activity2 = document.getElementById("act2");
    if(fun == "Existence" || fun == "Absence") deselectAct2(activity2);
    else activeAct2(activity2);
}

function takeFunction(){
    var fun = document.getElementById("selectFun").value;
    var act1 = document.getElementById("act1").value;
    var activity2 = document.getElementById("act2");
    var act2 = activity2.value;
    if(fun == "Existence" || fun == "Absence"){
        deselectAct2(activity2);
        checkActivities(act1, null, fun)
    } 
    else{
        activeAct2(activity2);
        checkActivities(act1, act2, fun)
    }    
}

function goToFunction(act1, act2, fun){
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
        case "Response":
            applyFunction(act1, act2, '/response');
            showRule(act1, act2, fun);
            break; 
        case "AlternateResponse":
            applyFunction(act1, act2, '/alternate_response');
            showRule(act1, act2, fun);
            break;
        case "ChainResponse":
            applyFunction(act1, act2, '/chain_response');
            showRule(act1, act2, fun);
            break;
        case "Precedence":
            applyFunction(act1, act2, '/precedence');
            showRule(act1, act2, fun);
            break;
        case "AlternatePrecedence":
            applyFunction(act1, act2, '/alternate_precedence');
            showRule(act1, act2, fun);
            break;
        case "ChainPrecedence":
            applyFunction(act1, act2, '/chain_precedence');
            showRule(act1, act2, fun);
            break;
        case "CoExistence":
            applyFunction(act1, act2, '/co_existence');
            showRule(act1, act2, fun);
            break;
        case "Succession":
            applyFunction(act1, act2, '/succession');
            showRule(act1, act2, fun);
            break;
        case "AlternateSuccession":
            applyFunction(act1, act2, '/alternate_succession');
            showRule(act1, act2, fun);
            break;
        case "ChainSuccession":
            applyFunction(act1, act2, '/chain_succession');
            showRule(act1, act2, fun);
            break;   
        case "NotCoExistence":
            applyFunction(act1, act2, '/not_co_existence');
            showRule(act1, act2, fun);
            break;
        case "NotSuccession":
            applyFunction(act1, act2, '/not_succession');
            showRule(act1, act2, fun);
            break;                                                 
        default:
            applyFunction(act1, act2, '/not_chain_succession');
            showRule(act1, act2, fun); 
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
        $(".Divtext").append('<p>'+result[i][0] + '&nbsp;&nbsp;(' + result[i].slice(1) + ")" +'</p>')
    }
    $(".DivtextDel").empty()
    for(var i=0; i < remove.length; i++){
        $(".DivtextDel").append('<p>'+remove[i][0]+ '&nbsp;&nbsp;(' + remove[i].slice(1) + ")" +'</p>')
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

var array_rule = []
var rule = []
function checkActivities(act1, act2, fun){
    var error = document.getElementById("error_adding_rule");
    var duplicate = document.getElementById("error_duplicate_rule");
    if(act1 == act2){
        error.style.display = 'block';
    }
    else{
        error.style.display = 'none';
        rule = [fun, act1, act2]
        if(isArrayInArray(array_rule, rule) == false){
            array_rule.push(rule)
            goToFunction(act1, act2, fun)
            duplicate.style.display = 'none';
        }
        else duplicate.style.display = 'block';
    } 
}

function isArrayInArray(arr, item){
    var item_as_string = JSON.stringify(item);
  
    var contains = arr.some(function(ele){
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
  }

function close_error_adding_rule(){
    document.getElementById("error_adding_rule").style.display = 'none';
}

function close_error_duplicate_rule(){
    document.getElementById("error_duplicate_rule").style.display = 'none';
}

function close_flash(){
    document.getElementById("error_flash").style.display = 'none';
}