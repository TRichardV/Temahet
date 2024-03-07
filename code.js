document.getElementById("toggleButton").addEventListener("click", function() {
    var content = document.getElementById("content");
    var button = document.getElementById("toggleButton");
    var text = document.getElementById("shuu");
    
    if (content.style.display === "none") {
        content.style.display = "block";
        button.style.display = "none"; 
        text.style.display = "none"; 

    } else {
        content.style.display = "none";
    }
});