/*document.getElementById("formFile").onclick = function () {
    var str = document.getElementById("formFile").value
    var splitString = str.split('\\')
    var file = splitString[2]
    console.log(file)
    //readFileXes(file)
   
};*/



function readFileXes(file){
    $.ajax({
        url: "/show",
        type: "POST",
        data: file,
        /*success: function(resp){
            $('div#seg-id-cont').text(resp);
        }*/
    });
}

