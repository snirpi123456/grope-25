document.getElementById("btn2").addEventListener("click", function() {
    document.querySelector("input[type='text']").removeAttribute("disabled");
    let textValue = document.querySelector("input[type='text']").value
    document.getElementById("btn1").style.display = "inline-block";
});
document.getElementById("btn1").onclick=function(){
    document.getElementById("btn1").innerHTML="נשלח";
    document.getElementById("par1").innerHTML="שאלתך נשמרה במערכת";
    document.getElementById("parQF").value+=textValue;

}
var categories = ["מלגות", "תעסוקה", "שיכון", "מיסים"];

var categoryBar = document.createElement("div");
categoryBar.id = "categoryBar";

categories.forEach(function(category) {
    var categoryButton = document.createElement("button");
    categoryButton.textContent = category;
    categoryButton.addEventListener("click", function() {
        document.querySelector("input[type='text']").removeAttribute("disabled");
        document.getElementById("btn1").style.display = "inline-block";
        document.getElementById("par1").textContent = "קטגוריה: " + category;
    });
    categoryBar.appendChild(categoryButton);
});

document.body.insertBefore(categoryBar, document.getElementById("btn2"));

