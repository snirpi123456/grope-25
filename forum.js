const btn2 = document.getElementById("btn2");
const submitBtn = document.getElementById("submitBtn");

btn2.addEventListener("click", function() {
    document.getElementById("contactForm").style.display = "block";
});

submitBtn.addEventListener("click", function() {
    const category = document.getElementById("categorySelect").value;
    const subject = document.getElementById("subjectInput").value;
    const question = document.getElementById("questionInput").value;
    
    if (!category) {
        alert("לא נבחרה קטגוריה!");
        return;
    } 
    if (!subject.trim()) {
        alert("חסר נושא!");
        return;
    } 
    if (!question.trim()) {
        alert("אנא רשום את השאלה שלך");
        return;
    }

    const questionText = `קטגוריה: ${category}\nנושא: ${subject}\nשאלה: ${question}\n\n`;

    let existingQuestions = localStorage.getItem('questions') || '';

    existingQuestions += questionText;

    localStorage.setItem('questions', existingQuestions);

    document.getElementById("categorySelect").selectedIndex = 0;
    document.getElementById("subjectInput").value = "";
    document.getElementById("questionInput").value = "";

    document.getElementById("contactForm").style.display = "none";

    alert("השאלה נשמרה בהצלחה!");

    showCategories();
});

function showCategories() {
    const categories = ["שיכון", "מיסים", "מלגות", "תעסוקה"];
    
    const categoryList = document.getElementById("categoryList");

    categoryList.innerHTML = "";

    categories.forEach(function(category) {
        const listItem = document.createElement("li");
        listItem.textContent = category;
        listItem.classList.add("categoryItem");

        listItem.addEventListener("click", function() {
            showQuestions(category);
        });

        categoryList.appendChild(listItem);
    });
}

function showQuestions(category) {
    const questions = localStorage.getItem('questions') || '';

    const questionArray = questions.split('\n\n');

    const categoryQuestions = questionArray.filter(function(question) {
        return question.includes('קטגוריה: ' + category);
    });

    if (categoryQuestions.length === 0) {
        alert('אין שאלות מאוחסנות בקטגוריה זו.');
        return;
    }

   
    var questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = ''; 

    categoryQuestions.forEach(function(question, index) {
        var questionElement = document.createElement('div');
        questionElement.classList.add('question');
    
        var subjectText = document.createElement('span');
        subjectText.classList.add('storageTitle');
        subjectText.textContent = 'נושא: ';
        questionElement.appendChild(subjectText);
    
        var subject = document.createElement('span');
        subject.textContent = question.split('\n')[1].replace('נושא: ', '');
        questionElement.appendChild(subject);
    
        var questionText = document.createElement('div');
        questionText.textContent = question.split('\n')[2].replace('שאלה: ', '');
        questionElement.appendChild(questionText);
    
        if (index < categoryQuestions.length - 1) {
            var spacer = document.createElement('br');
            questionElement.appendChild(spacer);
        }

    questionsContainer.appendChild(questionElement);
});
}

showCategories();

