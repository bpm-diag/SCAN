document.getElementById("formFile").onchange = function () {
    var str = document.getElementById("formFile").value
    var splitString = str.split('\\')
    var name = splitString[2]
    console.log(name)
};