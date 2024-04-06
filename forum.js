const btn2 = document.getElementById("btn2");
const submitBtn = document.getElementById("submitBtn");

btn2.addEventListener("click", function() {
    // בדיקה האם המשתמש הוא משתמש מסוג "עורך דין"
    const userDataString = localStorage.getItem('userData'); // או מנגנון אחר לקבלת מידע המשתמש
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        const userType = userData.userType;
        if (userType === 'regular') {
            // פתיחת טופס הפניה
            document.getElementById("contactForm").style.display = "block";
        } else {
            alert("אין לך הרשאה לפתוח טופס פניה.");
        }
    } else {
        alert("יש להתחבר כדי לפתוח טופס פניה.");
    }
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

    let questionText = `קטגוריה: ${category}\nנושא: ${subject}\nשאלה: ${question}\n\n`;


    let existingQuestions = localStorage.getItem('questions') || '';
    existingQuestions += questionText;
    localStorage.setItem('questions', existingQuestions);

    document.getElementById("categorySelect").selectedIndex = 0;
    document.getElementById("subjectInput").value = "";
    document.getElementById("questionInput").value = "";
    document.getElementById("fileInput").value = "";

    document.getElementById("contactForm").style.display = "none";

    alert("השאלה נשמרה בהצלחה!");
    listItem.classList.add('active');

    showCategories();
});

function showCategories() {
    const categories = ["שיכון", "מיסים", "מלגות", "תעסוקה"];
    
    const categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = "";
    let previousCategory = null
    categories.forEach(function(category) {
        const listItem = document.createElement("li");
        listItem.textContent = category;
        listItem.classList.add("categoryItem");

        listItem.addEventListener("click", function() {
            
            if (previousCategory) {
                previousCategory.classList.remove('active');
            }

            // הוספת הסיווג 'active' לקטגוריה הנוכחית
            listItem.classList.add('active');

            // השמת הקטגוריה הנוכחית כקטגוריה קודמת
            previousCategory = listItem;
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
    submitReplyBtn.textContent = 'שלח תשובה';
    submitReplyBtn.classList.add('submitReplyBtn');

    submitReplyBtn.addEventListener('click', function() {
        const reply = replyInput.value.trim();
        const userDataString = localStorage.getItem('userData');
        const userData = JSON.parse(userDataString);
        const username = userData.name;

        if (reply !== '') {
            const replyText = document.createElement('div');
            replyText.textContent = `עורך דין < ${username} >\n\n תשובה: ${reply}\n`;
            replyText.classList.add('reply-text');
            questionElement.appendChild(replyText);

            // Get the question text from the question element
            const questionText = questionElement.querySelector('.questionText').textContent;

            // Save the reply to local storage using the question text as the key
            saveReplyToLocalStorage(questionText, reply);

            // Add the answer to the question
            addAnswer(questionElement, reply);

            // Remove the reply input and submit button after sending the reply
            questionElement.removeChild(replyInput);
            questionElement.removeChild(submitReplyBtn);

            // Clear the reply input
            replyInput.value = '';
        } else {
            alert('נא להזין תשובה לפני השליחה.');
        }
    });

    questionElement.appendChild(replyInput);
    questionElement.appendChild(submitReplyBtn);

    // Remove the "השב" button after adding the reply input and submit button
    questionElement.removeChild(event.target);
}


