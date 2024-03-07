
document.getElementById("btn2").addEventListener("click", function() {
    document.getElementById("contactForm").style.display = "block";
    
});

document.getElementById("submitBtn").addEventListener("click", function() {
    var category = document.getElementById("categorySelect").value;
    var subject = document.getElementById("subjectInput").value;
    var question = document.getElementById("questionInput").value;
    
    if (!category) {
        alert("לא נבחרה קטגוריה!");
        return;
    } else if (!subject.trim()) {
        alert("חסר נושא!");
        return;
    } else if (!question.trim()) {
        alert("אנא רשום את השאלה שלך");
        return;
    }

    // Create a string with the question data
    var questionText = `קטגוריה: ${category}\nנושא: ${subject}\nשאלה: ${question}\n\n`;

    // Check if there are already questions in localStorage
    var existingQuestions = localStorage.getItem('questions');
    if (!existingQuestions) {
        existingQuestions = '';
    }

    // Append the new question to the existing questions
    var updatedQuestions = existingQuestions + questionText;

    // Save the updated questions to localStorage
    localStorage.setItem('questions', updatedQuestions);

    // Clear form inputs
    document.getElementById("categorySelect").selectedIndex = 0;
    document.getElementById("subjectInput").value = "";
    document.getElementById("questionInput").value = "";

    // Hide the contact form
    document.getElementById("contactForm").style.display = "none";

    alert("השאלה נשמרה בהצלחה!");
    document.getElementById("storedQuestions").innerText = localStorage.getItem('questions');
});