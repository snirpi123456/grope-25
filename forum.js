document.getElementById("btn2").addEventListener("click", function() {
    document.getElementById("contactForm").style.display = "block";
});

document.getElementById("submitBtn").addEventListener("click", function() {
    var category = document.getElementById("categorySelect").value;
    var subject = document.getElementById("subjectInput").value;
    var question = document.getElementById("questionInput").value;
    
    if (!category || !subject.trim() || !question.trim()) {
        alert("Please fill in all fields.");
        return;
    }

    // Handle sending the request (you can implement this part as needed)
    alert("Request sent successfully!");
    
    // Clear form inputs
    document.getElementById("categorySelect").selectedIndex = 0;
    document.getElementById("subjectInput").value = "";
    document.getElementById("questionInput").value = "";

    // Hide the contact form
    document.getElementById("contactForm").style.display = "none";
});