function loadSegments(){
    $(document).ready(function(){
        $.ajax({
            type : "POST",
            url : "/load_segments",
            success: function(response) {
                showResponse(response);}
        });     
    });
}

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

var array_rule = []
function checkActivities(act1, act2, fun){
    var error = document.getElementById("error_adding_rule");
    var duplicate = document.getElementById("error_duplicate_rule");
    if(act1 == act2){
        error.style.display = 'block';
        timeout("#error_adding_rule")
    }
    else{
        error.style.display = 'none';
        if(act2 != null) rule = fun + act1 + act2
        else rule = fun + act1;

        if(array_rule.includes(rule) == false){
            array_rule.push(rule)
            goToFunction(act1, act2, fun)
            duplicate.style.display = 'none';
        }
        else {
            duplicate.style.display = 'block';
            timeout("#error_duplicate_rule")
        }    
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

var list_checkbox = []
function showRule(act1, act2, rule){
    var label = document.createElement("label");
    var checkbox = document.createElement("input");

    checkbox.type = "checkbox"; 
    if(act2 != null){
        var description = document.createTextNode(" " + rule + "(" + act1 + "," + act2 + ")");
        checkbox.id = rule + act1 + act2;
        label.id = "label" + rule + act1 + act2
        label.value = rule + "-" + act1 + "-" + act2
        list_checkbox.push(checkbox.id) 
    } 
    else {
        var description = document.createTextNode(" " + rule + "(" + act1 + ")");
        checkbox.id = rule + act1; 
        label.id = "label" + rule + act1
        label.value = rule + "-" + act1
        list_checkbox.push(checkbox.id) 
    } 
    label.appendChild(checkbox);   
    label.appendChild(description);

    document.getElementById('ruleId').append(label);
    document.getElementById('ruleId').append(document.createElement('br'));
}

function showResponse(response){
    var result = response.result
    var lenRes = result.length
    var remove = response.remove
    var button = document.getElementById("hideShowBtn");
    $(".Divtext").empty()
    for(var i=0; i < result.length; i++){
        var res = $('<div class="all">'+ result[i][0] + '&nbsp;&nbsp;(' + result[i].slice(1) + ")" + '</div>');
        $('.Divtext').append(res);    
        res.attr('id', 'result'+i);
        var hideRes = $('<div class="hideAll" onclick="see();">'+ result[i][0] + '&nbsp;&nbsp;(' + "segment_" + i + ")" + '</div>');
        $('.Divtext').append(hideRes);    
        hideRes.attr('id', 'hideResult'+i); 
        showSeg(result[i].slice(1), hideRes.id)  
    }
    $(".DivtextDel").empty()
    for(var i=0; i < remove.length; i++){
        var rem = $('<div class="all">' + remove[i][0] + '&nbsp;&nbsp;(' + remove[i].slice(1) + ")" + '</div>');
        $('.DivtextDel').append(rem);    
        rem.attr('id', 'remove'+i);
        var hideRem = $('<div class="hideAll">'+ remove[i][0] + '&nbsp;&nbsp;(' + "segment_" + lenRes + ")" + '</div>');
        $('.DivtextDel').append(hideRem);    
        hideRem.attr('id', 'hideRemove'+i);
        lenRes++; 
    }
    if(button.value == "Hide"){
        $(".all").show();
        $(".hideAll").hide();
    }
    else{
        $(".all").hide();
        $(".hideAll").show();
    }    

}

function deleteBtn(){
    for(var i = 0; i < list_checkbox.length; i++){
        if(document.getElementById(list_checkbox[i]).checked){
            var label = document.getElementById("label" + list_checkbox[i])
            var value = label.value
            label.remove()
            array_rule = array_rule.filter(function(f) { return f !== list_checkbox[i] })
            list_checkbox = list_checkbox.filter(function(f) { return f !== list_checkbox[i] })
            var arr = value.split("-")
            var fun = arr[0]
            var act1 = arr[1]
            var act2 = null
            if(arr.length > 2){
                act2 = arr[2]
            }
            recomputeSegments(fun, act1, act2)
        }
    }
}

function recomputeSegments(fun, act1, act2){
    switch(fun) {
        case "Existence":
            applyFunction(act1, null, '/del_existence');
            break;
        case "Absence":
            applyFunction(act1, null, '/del_absence');
            break;    
        case "Choice":
            applyFunction(act1, act2, '/del_choice');
            break;
        case "ExclusiveChoice":
            applyFunction(act1, act2, '/del_exclusive_choice');
            break; 
        case "RespondedExistence":
            applyFunction(act1, act2, '/del_responded_existence');
            break;  
        case "Response":
            applyFunction(act1, act2, '/del_response');
            break; 
        case "AlternateResponse":
            applyFunction(act1, act2, '/del_alternate_response');
            break;
        case "ChainResponse":
            applyFunction(act1, act2, '/del_chain_response');
            break;
        case "Precedence":
            applyFunction(act1, act2, '/del_precedence');
            break;
        case "AlternatePrecedence":
            applyFunction(act1, act2, '/del_alternate_precedence');
            break;
        case "ChainPrecedence":
            applyFunction(act1, act2, '/del_chain_precedence');
            break;
        case "CoExistence":
            applyFunction(act1, act2, '/del_co_existence');
            break;
        case "Succession":
            applyFunction(act1, act2, '/del_succession');
            break;
        case "AlternateSuccession":
            applyFunction(act1, act2, '/del_alternate_succession');
            break;
        case "ChainSuccession":
            applyFunction(act1, act2, '/del_chain_succession');
            break;   
        case "NotCoExistence":
            applyFunction(act1, act2, '/del_not_co_existence');
            break;
        case "NotSuccession":
            applyFunction(act1, act2, '/del_not_succession');
            break;                                                 
        default:
            applyFunction(act1, act2, '/del_not_chain_succession');
    }
}

function deselectAct2(activity2){
    activity2.disabled = true;
    activity2.style.opacity = "0.5";   
}

function activeAct2(activity2){
    activity2.disabled = false;
    activity2.style.opacity = "1";   
}

function clearDiv(){
    $(".Divtext").empty()
    $(".DivtextDel").empty()
    $(".divRule").empty()
    $(".title_file").empty()
    array_rule = []
    $.ajax({
        url: "/clear"
    });    
}

function exportFile(){
    $.ajax({
        url: "/download_file"
    }); 
}

function hideShow(){
    var button = document.getElementById("hideShowBtn");
    if(button.value == "Hide"){
        button.value = "Show";
        button.innerHTML = "SHOW"
        $(".all").hide();
        $(".hideAll").show();
        
    }
    else{
        button.value = "Hide";
        button.innerHTML = "HIDE"
        $(".all").show();
        $(".hideAll").hide();
    }  
}

function showSeg(segment, id){
    html = '<div class="showDiv"><ul>';
    for(var i = 0; i < segment.length; i++){
        html+= "<li>"+ segment[i]+"</li>";
    }
    html+= '</ul></div>';
    $('#divSeg').append(html);
  
    
}

function see(){
    $(document).ready(function(){
        $(this).click(function() {
            console.log("aaaaaaa")
            $('#divSeg').show();
        });
    });
}

function timeout(id){
    setTimeout(function () {
        $(id).fadeTo(2000, 500).slideUp(500, function () {
            $(id).remove();
        });
      }, 4000);//4000=4 seconds 
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

function close_success_download(){
    document.getElementById("success_download").style.display = 'none';
}

 


  
