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

document.querySelectorAll('.replyBtn').forEach(function(button) {
    button.addEventListener('click', handleReply);
});

function handleReply(event) {
    const questionElement = event.target.parentNode;
    const replyInput = document.createElement('textarea');
    replyInput.classList.add('replyInput');
    const submitReplyBtn = document.createElement('button');
    submitReplyBtn.textContent = 'שלח תשובה';
    submitReplyBtn.classList.add('submitReplyBtn');

    submitReplyBtn.addEventListener('click', function() {
        const reply = replyInput.value.trim();
        if (reply !== '') {
            const replyText = document.createElement('div');
            replyText.textContent = 'תשובה: ' + reply;
            questionElement.appendChild(replyText);

            // Save the reply to local storage
            saveReplyToLocalStorage(reply, questionElement); // Pass the question element as an argument

            replyInput.value = '';

            const category = questionElement.getAttribute('data-category');
            showQuestions(category);
        } else {
            alert('נא להזין תשובה לפני השליחה.');
        }
    });

    questionElement.appendChild(replyInput);
    questionElement.appendChild(submitReplyBtn);
}

// Function to save the reply to local storage
function saveReplyToLocalStorage(reply, questionElement) {
    // Get the index of the question in the questions list
    const index = Array.from(questionElement.parentNode.children).indexOf(questionElement);
    // Create a unique key for the reply based on the question index
    const key = 'reply_' + index;
    let replies = JSON.parse(localStorage.getItem('replies')) || {};
    replies[key] = reply;
    localStorage.setItem('replies', JSON.stringify(replies));
}

function displayRepliesFromLocalStorage(questionElement) {
    const index = Array.from(questionElement.parentNode.children).indexOf(questionElement);
    const key = 'reply_' + index;
    const replies = JSON.parse(localStorage.getItem('replies')) || {};
    const reply = replies[key];
    if (reply) {
        const replyElement = document.createElement('div');
        replyElement.textContent = 'תשובה: ' + reply;
        questionElement.appendChild(replyElement);
    }
}

document.querySelectorAll('.question').forEach(function(question) {
    displayRepliesFromLocalStorage(question);
    
});