//load segments from file the first time
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

//select the rule to apply and show the right number of combobox
function selectFunction(){
    var fun = document.getElementById("selectFun").value;
    var activity2 = document.getElementById("act2");
    if(fun == "Existence" || fun == "Absence") deselectAct2(activity2);
    else activeAct2(activity2);
}

//take the rule inserted and check if it is valid
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

//check if the rule is valid and create the array of rules
var array_rule = []
function checkActivities(act1, act2, fun){
    var error = document.getElementById("error_adding_rule");
    var duplicate = document.getElementById("error_duplicate_rule");
    var opposite = document.getElementById("error_opposite_rule");
    if(act1 == act2){
        error.style.display = 'block';
        timeout("#error_adding_rule")
    }
    else{
        error.style.display = 'none';
        if(act2 != null) rule = fun + "-" + act1 + "-" + act2
        else rule = fun + "-" + act1;

        if(array_rule.includes(rule) == false){
            if(fun == "Existence" && array_rule.includes("Absence-"+act1) || 
                fun  == "Absence" && array_rule.includes("Existence-"+act1)){
                opposite.style.display = 'block';
                timeout("#error_opposite_rule")
            }        
            else{
                array_rule.push(rule)
                goToFunction(fun, act1, act2, 0)
                opposite.style.display = 'none';
            }
            
        }
        else {
            duplicate.style.display = 'block';
            timeout("#error_duplicate_rule")
        }    
    } 
}

//call to server by the rule required
function goToFunction(fun, act1, act2, value){
    console.log(fun, act1, act2)
    switch(fun) {
        case "Existence":
            applyFunction(act1, null, '/existence');
            if(value == 0) showRule(act1, null, fun)
            break;
        case "Absence":
            applyFunction(act1, null, '/absence');
            if(value == 0) showRule(act1, null, fun)
            break;    
        case "Choice":
            applyFunction(act1, act2, '/choice');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "ExclusiveChoice":
            applyFunction(act1, act2, '/exclusive_choice');
            if(value == 0) showRule(act1, act2, fun);
            break; 
        case "RespondedExistence":
            applyFunction(act1, act2, '/responded_existence');
            if(value == 0) showRule(act1, act2, fun);
            break;  
        case "Response":
            applyFunction(act1, act2, '/response');
            if(value == 0) showRule(act1, act2, fun);
            break; 
        case "AlternateResponse":
            applyFunction(act1, act2, '/alternate_response');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "ChainResponse":
            applyFunction(act1, act2, '/chain_response');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "Precedence":
            applyFunction(act1, act2, '/precedence');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "AlternatePrecedence":
            applyFunction(act1, act2, '/alternate_precedence');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "ChainPrecedence":
            applyFunction(act1, act2, '/chain_precedence');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "CoExistence":
            applyFunction(act1, act2, '/co_existence');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "Succession":
            applyFunction(act1, act2, '/succession');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "AlternateSuccession":
            applyFunction(act1, act2, '/alternate_succession');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "ChainSuccession":
            applyFunction(act1, act2, '/chain_succession');
            if(value == 0) showRule(act1, act2, fun);
            break;   
        case "NotCoExistence":
            applyFunction(act1, act2, '/not_co_existence');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "NotSuccession":
            applyFunction(act1, act2, '/not_succession');
            if(value == 0) showRule(act1, act2, fun);
            break;                                                 
        default:
            applyFunction(act1, act2, '/not_chain_succession');
            if(value == 0) showRule(act1, act2, fun); 
    }
}

//ajax function to server
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

//show list of rules applied
var list_checkbox = []
function showRule(act1, act2, rule){
    var li = document.createElement("li")
    var label = document.createElement("label");
    label.className = "label"
    var checkbox = document.createElement("input");

    checkbox.type = "checkbox"; 
    if(act2 != null){
        var description = document.createTextNode(" " + rule + "(" + act1 + "," + act2 + ")");
        checkbox.id = String(rule + "-" + act1 + "-" + act2);
        label.id = "label" + rule + "-" + act1 + "-" + act2;
        label.value = String(rule + "-" + act1 + "-" + act2);
        li.id = "li" + rule + "-" + act1 + "-" + act2
        list_checkbox.push(checkbox.id) 
    } 
    else {
        var description = document.createTextNode(" " + rule + "(" + act1 + ")");
        checkbox.id = String(rule + "-" + act1); 
        label.id = "label" + rule + "-" + act1;
        label.value = String(rule + "-" + act1);
        console.log(label.value)
        li.id = "li" + rule + "-" + act1
        list_checkbox.push(checkbox.id) 
    } 
    label.appendChild(checkbox);   
    label.appendChild(description);
    li.append(label)
    
    document.getElementById('ruleId').append(li);
}

//show result of rule in segments and not accepted segments
function showResponse(response){
    var result = response.result
    var lenRes = result.length
    var remove = response.remove
    var button = document.getElementById("hideShowBtn");
    createFirstRowTable("table-seg");
    for(var i=0; i < result.length; i++){
        var res = $('<tr class="all"><td>'+ result[i][0] + '</td><td>' + result[i].slice(1) + '<td></tr>');   
        res.id = 'result'+i;
        $('#table-seg').append(res); 
        var hideRes = $('<tr class="hideAll" onclick="seeDiv(this)" id="hideResult'+i+'"><td>'+ result[i][0] + '</td><td>' + "segment_" + i + '</td></tr>');  
        hideRes.id = 'hideResult'+i; 
        $('#table-seg').append(hideRes);  
        showSeg(result[i], hideRes.id)
    }
    createFirstRowTable("table-del-seg");
    for(var i=0; i < remove.length; i++){
        var rem = $('<tr class="all"><td>'+ remove[i][0] + '</td><td>' + remove[i].slice(1) + '<td></tr>');   
        rem.id = 'remove'+i;
        $('#table-del-seg').append(rem); 
        var hideRem = $('<tr class="hideAll" onclick="seeDiv(this)" id="hideRemove'+i+'"><td>'+ remove[i][0] + '</td><td>' + "segment_" + lenRes + '</td></tr>');    
        hideRem.id = 'hideRemove'+i;
        $('#table-del-seg').append(hideRem);
        lenRes++; 
        showSeg(remove[i], hideRem.id) 
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

function createFirstRowTable(tableId){
    $("#"+tableId).empty()
    var row = $('<tr><th class="col-occ">Occurrence</th><th class="col-seg">Segment<th></tr>');   
    $('#'+tableId).append(row);
}

//when click delete button 
function deleteBtn(){
    for(var i = 0; i < list_checkbox.length; i++){
        if(document.getElementById(list_checkbox[i]).checked){
            var li = document.getElementById("li" + list_checkbox[i])
            var label = document.getElementById("label" + list_checkbox[i])
            var value = String(label.value)
            $(".label").each(function () {
                var $this = $(this);
                if ($this.is(":empty")) {
                    var $nextItem = $this.nextAll().not(':empty').first();
                    if($nextItem.length){
                        $this.html($nextItem.html());
                        $nextItem.empty();
                    }
                }
            });
            li.parentNode.removeChild(li)
            console.log("arr", array_rule)
            console.log("li", list_checkbox[i])
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
    for(var r = 0; r < array_rule.length; r++){
        rule = array_rule[r]
        var arr = rule.split("-")
        var fun = arr[0]
        var act1 = arr[1]
        var act2 = null
        if(arr.length > 2) act2 = arr[2]
        goToFunction(fun, act1, act2, 1)
    }
}

//when delete some rule
function recomputeSegments(fun, act1, act2){
    applyFunction(act1, act2, '/del_rule');
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
    createFirstRowTable("table-seg")
    createFirstRowTable("table-del-seg")
    $(".divRule").empty()
    $(".title_file").empty()
    $("#act1").empty()
    $("#act2").empty()
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

//hide/show segments and button
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

var d = {}
function showSeg(segment, id){
    i = id+"see";
    d[i] = segment
}

//div shown onclick with the activity of the segment
function seeDiv(elem){
    var id = $(elem).attr("id");
    var hid = id+"see"
    $('#'+id)
    .css('cursor', 'pointer')
    .click(
        function(){
            var button = document.createElement("BUTTON");
            button.className= "btn-close"
            button.id = "divSegBtn"
            button.addEventListener("click", close_diSegBtn);
            $('#divSeg').append(button)
            if(hid in d){
                for(var i = 1; i < d[hid].length; i++){
                    $('#divSeg').append("&nbsp;&nbsp;"+d[hid][i]+"</br>"); 
                }
            }
            viewDiv();
        }   
    )
}

function viewDiv(){
    if(document.getElementById("divSeg").style.display == 'none')  
        document.getElementById("divSeg").style.display = 'block'   
    else {
        document.getElementById("divSeg").style.display = 'none'
        $('#divSeg').empty(); 
    }      
}    


//alert's timeout
function timeout(id){
    setTimeout(function () {
        $(id).fadeTo(2000, 500).slideUp(500, function () {
            $(id).hide();
        });
      }, 3000);//3000=3 seconds 
}

function close_error_adding_rule(){
    document.getElementById("error_adding_rule").style.display = 'none';
}

function close_error_duplicate_rule(){
    document.getElementById("error_duplicate_rule").style.display = 'none';
}

function close_error_opposite_rule(){
    document.getElementById("error_opposite_rule").style.display = 'none';
}

function close_flash(){
    document.getElementById("error_flash").style.display = 'none';
}

if(document.getElementById("error_flash").style.display != 'none'){
    timeout("#error_flash")
}

function close_success_download(){
    document.getElementById("success_download").style.display = 'none';
}

function close_diSegBtn(){
    document.getElementById("divSeg").style.display = 'none';
    $('#divSeg').empty();
}
 

  
