[8:46 אחה״צ, 3.4.2024] Vika🌻: const btn2 = document.getElementById("btn2");
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

    let questionText = קטגוריה: ${category}…
[8:59 אחה״צ, 3.4.2024] Vika🌻: const btn2 = document.getElementById("btn2");
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

    let questionText = קטגוריה: ${category}\nנושא: ${subject}\nשאלה: ${question}\n\n;


    let existingQuestions = localStorage.getItem('questions') || '';
    existingQuestions += questionText;
    localStorage.setItem('questions', existingQuestions);

    document.getElementById("categorySelect").selectedIndex = 0;
    document.getElementById("subjectInput").value = "";
    document.getElementById("questionInput").value = "";
    document.getElementById("fileInput").value = "";

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
    // משיכת השאלות מהאחסון המקומי
    const questions = localStorage.getItem('questions') || '';

    // חיפוש והצגת השאלות המתאימות לקטגוריה
    const categoryQuestions = questions.split('\n\n').filter(function(question) {
        return question.includes('קטגוריה: ' + category);
    });

    // אם אין שאלות בקטגוריה זו, הצג הודעה
    if (categoryQuestions.length === 0) {
        alert('אין שאלות מאוחסנות בקטגוריה זו.');
        return;
    }

    // הצג את השאלות באיזור המתאים בדף
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = ''; // ניקוי תוכן קודם

    categoryQuestions.forEach(function(question, index) {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');

        // נושא השאלה
        const subjectText = document.createElement('span');
        subjectText.classList.add('storageTitle');
        subjectText.textContent = 'נושא: ';
        questionElement.appendChild(subjectText);

        const subject = document.createElement('span');
        subject.textContent = question.split('\n')[1].replace('נושא: ', '');
        questionElement.appendChild(subject);

        // השאלה עצמה
        const questionText = document.createElement('div');
        questionText.textContent = question.split('\n')[2].replace('שאלה: ', '');
        questionElement.appendChild(questionText);

        // הוספת כפתור השב
        const replyBtn = document.createElement('button');
        replyBtn.textContent = 'השב';
        replyBtn.classList.add('replyBtn');
        replyBtn.addEventListener('click', handleReply);
        questionElement.appendChild(replyBtn);

        // הוספת רווח בין השאלות, חוץ מהשאלה האחרונה
        if (index < categoryQuestions.length - 1) {
            const spacer = document.createElement('br');
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
    submitReplyBtn.textContent = 'שלח תשובה'; // שינוי הטקסט לכפתור
    submitReplyBtn.classList.add('submitReplyBtn');

    submitReplyBtn.addEventListener('click', function() {
        const reply = replyInput.value.trim();
        const userDataString = localStorage.getItem('userData');
        const firstItem = userDataArray[0]
        if (reply !== '') {
            const replyText = document.createElement('div');
            replyText.textContent = '<' + userData + '>'+ 'תשובה:'+ reply;
            questionElement.appendChild(replyText);

            // Save the reply to local storage
            saveReplyToLocalStorage(reply, questionElement); // Pass the question element as an argument

            replyInput.value = '';

            const category = questionElement.getAttribute('data-category');
            showQuestions(category);
            
            // Remove the reply input and submit button after sending the reply
            questionElement.removeChild(replyInput);
            questionElement.removeChild(submitReplyBtn);
        } else {
            alert('נא להזין תשובה לפני השליחה.');
        }
    });

    questionElement.appendChild(replyInput);
    questionElement.appendChild(submitReplyBtn);

    // Remove the "השב" button after adding the reply input and submit button
    questionElement.removeChild(event.target);
}

function displayRepliesFromLocalStorage(questionElement) {

    // אחזור מפתח התשובה בהתאם לאינדקס השאלה
  
    const index = questionElement.getAttribute('data-index'); 
    const key = 'reply_' + index;
  
    // אחזור את האובייקט התשובות מהlocalStorage
    const replies = JSON.parse(localStorage.getItem('replies'));
  
    // אחזור את התשובה לשאלה הנוכחית
    const reply = replies[key];
  
    // אם יש תשובה, הצג אותה 
    if (reply) {
        const replyElement = document.createElement('div');
        replyElement.textContent = reply;
        questionElement.appendChild(replyElement);
    }
  
  }


