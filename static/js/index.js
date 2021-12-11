
function enableButtons(){
    $("#hideShowBtn").attr("disabled", false)
    $("#clearBtn").attr("disabled", false)
    $("#exportBtn").attr("disabled", false)
    $("#button-apply").attr("disabled", false)
    $("#deleteBtnId").attr("disabled", false)
    $("#selectFun").attr("disabled", false)
    $("#act1").attr("disabled", false)
    $("#infoId").attr("disabled", false)
}

function disableButtons(){
    $("#hideShowBtn").attr("disabled", true)
    $("#clearBtn").attr("disabled", true)
    $("#exportBtn").attr("disabled", true)
    $("#button-apply").attr("disabled", true)
    $("#deleteBtnId").attr("disabled", true)
    $("#selectFun").attr("disabled", true)
    $("#act1").attr("disabled", true)
    $("#infoId").attr("disabled", true)
}

//select the rule to apply and show the right number of combobox
function selectFunction(){
    var fun = document.getElementById("selectFun").value;
    var activity2 = document.getElementById("act2");
    if(fun == "Existence" || fun == "Absence" || fun == "Start" || fun == "End") deselectAct2(activity2);
    else activeAct2(activity2);
}

//take the rule inserted and check if it is valid
function takeFunction(){
    var fun = document.getElementById("selectFun").value;
    var act1 = document.getElementById("act1").value;
    var activity2 = document.getElementById("act2");
    var act2 = activity2.value;
    if(fun == "Existence" || fun == "Absence" || fun == "Start" || fun == "End"){
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
    var adding = document.getElementById("error_adding_rule");
    var duplicate = document.getElementById("error_duplicate_rule");
    var opposite = document.getElementById("error_opposite_rule");
    if(act1 == act2){
        adding.style.display = 'block';
        timeout("#error_adding_rule")
    }
    else{
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
                goToFunction(fun, act1, act2, 0, true)
                $.ajax({
                    type : "POST",
                    url : "/write_apply",
                    data: {fun: fun, act1: act1, act2: act2},
                });    
            }
            
        }
        else {
            duplicate.style.display = 'block';
            timeout("#error_duplicate_rule")
        }    
    } 
}

//call to server by the rule required
function goToFunction(fun, act1, act2, value, bool){
    switch(fun) {
        case "Start":
            if(bool == true) applyFunction(act1, null, '/start_activity');
            else applyDelFunction(act1, null, '/start_activity')
            if(value == 0) showRule(act1, null, fun)
            break;
        case "End":
            if(bool == true) applyFunction(act1, null, '/end_activity');
            else applyDelFunction(act1, null, '/end_activity');
            if(value == 0) showRule(act1, null, fun)
            break;
        case "Existence":
            if(bool == true) applyFunction(act1, null, '/existence');
            else applyDelFunction(act1, null, '/existence');
            if(value == 0) showRule(act1, null, fun)
            break;
        case "Absence":
            if(bool == true) applyFunction(act1, null, '/absence');
            else applyDelFunction(act1, null, '/absence');
            if(value == 0) showRule(act1, null, fun)
            break;    
        case "Choice":
            if(bool == true) applyFunction(act1, act2, '/choice');
            else applyDelFunction(act1, act2, '/choice');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "ExclusiveChoice":
            if(bool == true) applyFunction(act1, act2, '/exclusive_choice');
            else applyDelFunction(act1, act2, '/exclusive_choice');
            if(value == 0) showRule(act1, act2, fun);
            break; 
        case "RespondedExistence":
            if(bool == true) applyFunction(act1, act2, '/responded_existence');
            else applyDelFunction(act1, act2, '/responded_existence');
            if(value == 0) showRule(act1, act2, fun);
            break;  
        case "Response":
            if(bool == true) applyFunction(act1, act2, '/response');
            else applyDelFunction(act1, act2, '/response');
            if(value == 0) showRule(act1, act2, fun);
            break; 
        case "AlternateResponse":
            if(bool == true) applyFunction(act1, act2, '/alternate_response');
            else applyDelFunction(act1, act2, '/alternate_response');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "ChainResponse":
            if(bool == true) applyFunction(act1, act2, '/chain_response');
            else applyDelFunction(act1, act2, '/chain_response');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "Precedence":
            if(bool == true) applyFunction(act1, act2, '/precedence');
            else applyDelFunction(act1, act2, '/precedence');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "AlternatePrecedence":
            if(bool == true) applyFunction(act1, act2, '/alternate_precedence');
            else applyDelFunction(act1, act2, '/alternate_precedence');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "ChainPrecedence":
            if(bool == true) applyFunction(act1, act2, '/chain_precedence');
            else applyDelFunction(act1, act2, '/chain_precedence');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "CoExistence":
            if(bool == true) applyFunction(act1, act2, '/co_existence');
            else applyDelFunction(act1, act2, '/co_existence');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "Succession":
            if(bool == true) applyFunction(act1, act2, '/succession');
            else applyDelFunction(act1, act2, '/succession');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "AlternateSuccession":
            if(bool == true) applyFunction(act1, act2, '/alternate_succession');
            else applyDelFunction(act1, act2, '/alternate_succession');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "ChainSuccession":
            if(bool == true) applyFunction(act1, act2, '/chain_succession');
            else applyDelFunction(act1, act2, '/chain_succession');
            if(value == 0) showRule(act1, act2, fun);
            break;   
        case "NotCoExistence":
            if(bool == true) applyFunction(act1, act2, '/not_co_existence');
            else applyDelFunction(act1, act2, '/not_co_existence');
            if(value == 0) showRule(act1, act2, fun);
            break;
        case "NotSuccession":
            if(bool == true) applyFunction(act1, act2, '/not_succession');
            else applyDelFunction(act1, act2, '/not_succession');
            if(value == 0) showRule(act1, act2, fun);
            break;                                                 
        default:
            if(bool == true) applyFunction(act1, act2, '/not_chain_succession');
            else applyDelFunction(act1, act2, '/not_chain_succession');
            if(value == 0) showRule(act1, act2, fun); 
    }
}

//ajax function to server
function applyFunction(act1, act2, url){
    $.ajax({
        type : "POST",
        url : url,
        async: false,
        data: {act1: act1, act2: act2},
        success: function(response) {
            showResponse(response);}
    });    
}

function applyDelFunction(act1, act2, url){
    $.ajax({
        type : "POST",
        url : url,
        async: false,
        data: {act1: act1, act2: act2}
    });     

}

//show list of rules applied
var list_checkbox = []
function showRule(act1, act2, rule){
    var li = document.createElement("li")
    var label = document.createElement("label");
    label.className = "label"
    var checkbox = document.createElement("input");

    checkbox.type = "radio";
    checkbox.name = "radio-btn"; 
    checkbox.className = "radio";
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
        var res = $('<tr class="all"><td class="col-occ">'+ result[i][0] + '</td><td class="col-seg">' + result[i].slice(1) + '<td></tr>');   
        res.id = 'result'+i;
        $('#table-seg-body').append(res); 
        var hideRes = $('<tr class="hideAll" onclick="seeDiv(this)" id="hideResult'+i+'"><td>'+ result[i][0] + '</td><td>' + "segment_" + i + '</td></tr>');  
        hideRes.id = 'hideResult'+i; 
        $('#table-seg-body').append(hideRes);  
        showSeg(result[i], hideRes.id)
    }
    createFirstRowTable("table-del-seg");
    for(var i=0; i < remove.length; i++){
        var rem = $('<tr class="all"><td class="col-occ">'+ remove[i][0] + '</td><td class="col-seg">' + remove[i].slice(1) + '<td></tr>');   
        rem.id = 'remove'+i;
        $('#table-del-seg-body').append(rem); 
        var hideRem = $('<tr class="hideAll" onclick="seeDiv(this)" id="hideRemove'+i+'"><td>'+ remove[i][0] + '</td><td>' + "segment_" + lenRes + '</td></tr>');    
        hideRem.id = 'hideRemove'+i;
        $('#table-del-seg-body').append(hideRem);
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

function firstTimeSegments(){
    var table = document.getElementById("table-seg-body")
    var button = document.getElementById("hideShowBtn");
    var array = []
    for(var i = 0; i < table.rows.length; i++) {
        var objCells = table.rows.item(i).cells;
        var arr = []
        for (var j = 0; j < objCells.length; j++) {
            arr.push(objCells.item(j).innerHTML.replaceAll("\n",""))
        }
        array.push(arr)
    }
    $("#table-seg-body").empty()
    for(var elem = 0; elem < array.length; elem++){
        var res = $('<tr class="all"><td class="col-occ">'+ array[elem][0] + '</td><td class="col-seg">' + array[elem].slice(1) + '<td></tr>');   
        res.id = 'result'+elem;
        $('#table-seg-body').append(res); 
        var hideRes = $('<tr class="hideAll" onclick="seeDiv(this)" id="hideResult'+elem+'"><td>'+ array[elem][0] + '</td><td>' + "segment_" + elem + '</td></tr>');  
        hideRes.id = 'hideResult'+elem; 
        $('#table-seg-body').append(hideRes); 
        array_elem = array[elem][1].split(",")
        array_elem.unshift(array[elem][0])
        showSeg(array_elem, hideRes.id) 
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
    $("#"+tableId+"-body").empty()
    $("#"+tableId).empty()
    var row = $('<tr><th class="col-occ">Occurrence</th><th class="col-seg">Segment<th></tr>');   
    $('#'+tableId).append(row);
}

//when click delete button 
function deleteBtn(){
    error_no_rule = document.getElementById("error_no_rule");
    error_no_check_rule = document.getElementById("error_no_check_rule");
    var selectedCount = 0;
    $('.radio').each(function(){
        if ($(this).is(":checked")){
            selectedCount++;
        }
    })
    if(selectedCount == 0){
        error_no_check_rule.style.display = "block"
        timeout("#error_no_check_rule")
    }
    if(list_checkbox.length == 0){
        error_no_rule.style.display = "block"
        timeout("#error_no_rule")
    }
    else{
        for(var i = 0; i < list_checkbox.length; i++){
            if(document.getElementById(list_checkbox[i]).checked){
                var li = document.getElementById("li" + list_checkbox[i])
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
                delete_rule = array_rule.filter(function(f) { return f == list_checkbox[i] }) 
                array_rule = array_rule.filter(function(f) { return f !== list_checkbox[i] })
                list_checkbox = list_checkbox.filter(function(f) { return f !== list_checkbox[i] })
                li.parentNode.removeChild(li)
                
                var arr_del = delete_rule[0].split("-")
                var fun_del = arr_del[0]
                var act1_del = arr_del[1]
                var act2_del = null
                if(arr_del.length > 2) act2_del = arr_del[2]
                recomputeSegments(fun_del, act1_del, act2_del, array_rule)
            }
        }
    }    
}


//when delete some rule
function recomputeSegments(fun_del, act1_del, act2_del, array_rule){
    $.ajax({
        type : "POST",
        url : "/del_rule",
        success: function(){
            $.ajax({
                type : "POST",
                url : "/write_delete",
                data: {fun: fun_del, act1: act1_del, act2: act2_del},
                complete: reapplyFunctions(array_rule)
                 
            });
        }    
            
    });
    
}    

function reapplyFunctions(array_rule){
    if(array_rule.length > 1){
        for(var r = 0; r < array_rule.length; r++){
            var arr = array_rule[r].split("-")
            var fun = arr[0]
            var act1 = arr[1]
            var act2 = null
            if(arr.length > 2) act2 = arr[2]
            if(r+1 != array_rule.length) {
                goToFunction(fun, act1, act2, 1, false)
            }
            else goToFunction(fun, act1, act2, 1, true)  
        }
    }
    else if(array_rule.length == 1){
        var arr = array_rule[0].split("-")
        var fun = arr[0]
        var act1 = arr[1]
        var act2 = null
        if(arr.length > 2) act2 = arr[2]
        goToFunction(fun, act1, act2, 1, true)
    }
    else showStartSituation()
}

function showStartSituation(){
    $.ajax({
        type : "POST",
        url : "/show_trace",
        success: function(response) {
            showResponse(response);}
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
    document.getElementById("info_clear").style.display = "block"
    timeout("#info_clear")   
    disableButtons();
}

function exportFile(){
    $.ajax({
        url: "/download_file"
    }); 
    document.getElementById("download_info").style.display = "block"
    timeout("#download_info") 
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

function showInfo(){
    var fun = document.getElementById("selectFun").value;
    switch(fun) {
        case "Start":
            document.getElementById("groupConstraints").innerHTML = "Start/End constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Start(a):</b> filter by start activity a"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "acac"
            document.getElementById("re2").innerHTML = "acbbc"
            document.getElementById("we1").innerHTML = "bcc"
            document.getElementById("we2").innerHTML = "c"
            $('#divInfo').show()
            break;
        case "End":
            document.getElementById("groupConstraints").innerHTML = "Start/End constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>End(a):</b> filter by end activity a"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "bcca"
            document.getElementById("re2").innerHTML = "cca"
            document.getElementById("we1").innerHTML = "bcc"
            document.getElementById("we2").innerHTML = "c"
            $('#divInfo').show()
            break;    
        case "Existence":
            document.getElementById("groupConstraints").innerHTML = "Existence and Choice constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Existence(a):</b> a occurs at least once"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "bcac"
            document.getElementById("re2").innerHTML = "bcaac"
            document.getElementById("we1").innerHTML = "bcc"
            document.getElementById("we2").innerHTML = "c"
            $('#divInfo').show()
            break;
        case "Absence":
            document.getElementById("groupConstraints").innerHTML = "Existence and Choice constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Absence(a):</b> a never occur"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "bcc"
            document.getElementById("re2").innerHTML = "ccc"
            document.getElementById("we1").innerHTML = "bcac"
            document.getElementById("we2").innerHTML = "bcaca"
            $('#divInfo').show()
            break;    
        case "Choice":
            document.getElementById("groupConstraints").innerHTML = "Existence and Choice constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Choice(a,b):</b> a or b eventually occur"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "bcc"
            document.getElementById("re2").innerHTML = "bcac"
            document.getElementById("we1").innerHTML = "c"
            document.getElementById("we2").innerHTML = "ccc"
            $('#divInfo').show()
            break;
        case "ExclusiveChoice":
            document.getElementById("groupConstraints").innerHTML = "Existence and Choice constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Exclusive Choice(a,b):</b> a or b eventually occur, but not together"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "bcc"
            document.getElementById("re2").innerHTML = "acc"
            document.getElementById("we1").innerHTML = "bcac"
            document.getElementById("we2").innerHTML = "c"
            $('#divInfo').show()
            break; 
        case "RespondedExistence":
            document.getElementById("groupConstraints").innerHTML = "Relation constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Responded Existence(a,b):</b> if a occurs in the trace, then b occurs as well"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "bcaac"
            document.getElementById("re2").innerHTML = "bcc"
            document.getElementById("we1").innerHTML = "caac"
            document.getElementById("we2").innerHTML = "acc"
            $('#divInfo').show()
            break;  
        case "Response":
            document.getElementById("groupConstraints").innerHTML = "Relation constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Response(a,b):</b> if a occurs, then b occurs after a"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "caacb"
            document.getElementById("re2").innerHTML = "bcc"
            document.getElementById("we1").innerHTML = "caac"
            document.getElementById("we2").innerHTML = "bacc"
            $('#divInfo').show()
            break; 
        case "AlternateResponse":
            document.getElementById("groupConstraints").innerHTML = "Relation constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Alternate Response(a,b):</b> each time a occurs, then b occurs immediately afterwards, before a recurs"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "cacb"
            document.getElementById("re2").innerHTML = "abcabc"
            document.getElementById("we1").innerHTML = "caacb"
            document.getElementById("we2").innerHTML = "bacacb"
            $('#divInfo').show()
            break;
        case "ChainResponse":
            document.getElementById("groupConstraints").innerHTML = "Relation constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Chain Response(a,b):</b> each time a occurs, then b occurs immediately afterwards"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "cabb"
            document.getElementById("re2").innerHTML = "abcab"
            document.getElementById("we1").innerHTML = "cacb"
            document.getElementById("we2").innerHTML = "bca"
            $('#divInfo').show()
            break;
        case "Precedence":
            document.getElementById("groupConstraints").innerHTML = "Relation constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Precedence(a,b):</b> b occurs only if preceded by a"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "cacbb"
            document.getElementById("re2").innerHTML = "acc"
            document.getElementById("we1").innerHTML = "ccbb"
            document.getElementById("we2").innerHTML = "bacc"
            $('#divInfo').show()
            break;
        case "AlternatePrecedence":
            document.getElementById("groupConstraints").innerHTML = "Relation constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Alternate Precedence(a,b):</b> each time b occurs, it is preceded by a and no other b can recur in between"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "cacba"
            document.getElementById("re2").innerHTML = "abcaacb"
            document.getElementById("we1").innerHTML = "cacbba"
            document.getElementById("we2").innerHTML = "abbabcb"
            $('#divInfo').show()
            break;
        case "ChainPrecedence":
            document.getElementById("groupConstraints").innerHTML = "Relation constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Chain Precedence(a,b):</b> each time b occurs, then a occurs immediately beforehand"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "abca"
            document.getElementById("re2").innerHTML = "abbabc"
            document.getElementById("we1").innerHTML = "bca"
            document.getElementById("we2").innerHTML = "baacb"
            $('#divInfo').show()
            break;
        case "CoExistence":
            document.getElementById("groupConstraints").innerHTML = "Mutual relation constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Co Existence(a,b):</b> if b occurs, then a occurs, and vice-versa"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "cacbb"
            document.getElementById("re2").innerHTML = "bcca"
            document.getElementById("we1").innerHTML = "cac"
            document.getElementById("we2").innerHTML = "bcc"
            $('#divInfo').show()
            break;
        case "Succession":
            document.getElementById("groupConstraints").innerHTML = "Mutual relation constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Succession(a,b):</b> a occurs if and only if it is followed by b"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "cacbb"
            document.getElementById("re2").innerHTML = "accb"
            document.getElementById("we1").innerHTML = "bac"
            document.getElementById("we2").innerHTML = "bcca"
            $('#divInfo').show()
            break;
        case "AlternateSuccession":
            document.getElementById("groupConstraints").innerHTML = "Mutual relation constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Alternate Succession(a,b):</b> a and b if and only if the latter immediately follows the former, and they alternate each other in the trace"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "cacbab"
            document.getElementById("re2").innerHTML = "abcabc"
            document.getElementById("we1").innerHTML = "caacbb"
            document.getElementById("we2").innerHTML = "bac"
            $('#divInfo').show()
            break;
        case "ChainSuccession":
            document.getElementById("groupConstraints").innerHTML = "Mutual relation constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Chain Succession(a,b):</b> a and b occur if and only if the latter immediately follows the former"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "cabab"
            document.getElementById("re2").innerHTML = "ccc"
            document.getElementById("we1").innerHTML = "cacb"
            document.getElementById("we2").innerHTML = "cbac"
            $('#divInfo').show()
            break;   
        case "NotCoExistence":
            document.getElementById("groupConstraints").innerHTML = "Negative relation constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Not Co Existence(a,b):</b> a and b never occur together"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "cccbbb"
            document.getElementById("re2").innerHTML = "ccac"
            document.getElementById("we1").innerHTML = "accbb"
            document.getElementById("we2").innerHTML = "bcac"
            $('#divInfo').show()
            break;
        case "NotSuccession":
            document.getElementById("groupConstraints").innerHTML = "Negative relation constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Not Succession(a,b):</b> a can never occur before b"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "bbcaa"
            document.getElementById("re2").innerHTML = "cbbca"
            document.getElementById("we1").innerHTML = "aacbb"
            document.getElementById("we2").innerHTML = "abb"
            $('#divInfo').show()
            break;                                                 
        default:
            document.getElementById("groupConstraints").innerHTML = "Negative relation constraints"
            document.getElementById("nameConstraint").innerHTML = "<b>Not Chain Succession(a,b):</b> a and b occur if and only if the latter does not immediately follows the former"
            document.getElementById("examples").innerHTML = "<b>Example:</b>"
            document.getElementById("re1").innerHTML = "acbacb"
            document.getElementById("re2").innerHTML = "bbaa"
            document.getElementById("we1").innerHTML = "abcab"
            document.getElementById("we2").innerHTML = "cabc" 
            $('#divInfo').show()
    }

}

function close_error_adding_rule(){ document.getElementById("error_adding_rule").style.display = 'none'; }

function close_error_duplicate_rule(){ document.getElementById("error_duplicate_rule").style.display = 'none'; }

function close_error_opposite_rule(){ document.getElementById("error_opposite_rule").style.display = 'none'; }

function close_flash(){ document.getElementById("error_flash").style.display = 'none';}

if(document.getElementById("error_flash").style.display != 'none'){ 
    timeout("#error_flash"); 
    enableButtons();
    firstTimeSegments();
}

function close_infoBtn(){ document.getElementById("divInfo").style.display = 'none'; }

function close_error_no_rule(){ document.getElementById("error_no_rule").style.display = 'none'; }

function close_error_no_check_rule(){ document.getElementById("error_no_check_rule").style.display = 'none'; }

function close_info_clear(){ document.getElementById("info_clear").style.display = 'none'; }

function close_download_info(){ document.getElementById("download_info").style.display = 'none'; }

function close_diSegBtn(){
    document.getElementById("divSeg").style.display = 'none';
    $('#divSeg').empty();
}

function closeDiv(){ 
    document.getElementById("info_start").style.display = 'block';
    timeout("#info_start")
    
}

function close_info_start(){document.getElementById("info_start").style.display = 'none'; }
