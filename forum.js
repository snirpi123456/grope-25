// קוד הופך לברור יותר עם השימוש ב-const עבור הקבועים
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

    // יצירת מחרוזת המייצגת את השאלה
    const questionText = `קטגוריה: ${category}\nנושא: ${subject}\nשאלה: ${question}\n\n`;

    // משיכת השאלות מהאחסון המקומי
    let existingQuestions = localStorage.getItem('questions') || '';

    // הוספת השאלה החדשה לשאלות הקיימות
    existingQuestions += questionText;

    // שמירת השאלות באחסון המקומי
    localStorage.setItem('questions', existingQuestions);

    // איפוס טופס
    document.getElementById("categorySelect").selectedIndex = 0;
    document.getElementById("subjectInput").value = "";
    document.getElementById("questionInput").value = "";

    // הסתרת טופס היצירת שאלה
    document.getElementById("contactForm").style.display = "none";

    // הודעת הצלחה
    alert("השאלה נשמרה בהצלחה!");

    // הצגת רשימת הקטגוריות
    showCategories();
});

// פונקציה להצגת רשימת הקטגוריות
function showCategories() {
    // רשימת הקטגוריות
    const categories = ["שיכון", "מיסים", "מלגות", "תעסוקה"];
    
    // מצא את רשימת הקטגוריות ב-HTML
    const categoryList = document.getElementById("categoryList");

    // נקה את רשימת הקטגוריות
    categoryList.innerHTML = "";

    // צור פריטי רשימה לכל קטגוריה
    categories.forEach(function(category) {
        const listItem = document.createElement("li");
        listItem.textContent = category;
        listItem.classList.add("categoryItem");

        // הוסף אירוע ללחיצה עבור כל פריט כדי להציג את השאלות שלה
        listItem.addEventListener("click", function() {
            showQuestions(category);
        });

        // הוסף את הפריט לרשימת הקטגוריות
        categoryList.appendChild(listItem);
    });
}

// פונקציה להצגת השאלות בקטגוריה מסוימת
function showQuestions(category) {
    // משיכת השאלות מהאחסון המקומי
    const questions = localStorage.getItem('questions') || '';

    // הפיכת השאלות למערך
    const questionArray = questions.split('\n\n');

    // חיפוש והצגת השאלות המתאימות לקטגוריה
    const categoryQuestions = questionArray.filter(function(question) {
        return question.includes('קטגוריה: ' + category);
    });

    // אם אין שאלות בקטגוריה זו, הצג הודעה
    if (categoryQuestions.length === 0) {
        alert('אין שאלות מאוחסנות בקטגוריה זו.');
        return;
    }

   
   // הצגת השאלות באיזור המתאים בדף
    // הצגת השאלות באיזור המתאים בדף
    var questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = ''; // ניקוי תוכן קודם

    categoryQuestions.forEach(function(question, index) {
        var questionElement = document.createElement('div');
        questionElement.classList.add('question');
    
        // נושא השאלה
        var subjectText = document.createElement('span');
        subjectText.classList.add('storageTitle');
        subjectText.textContent = 'נושא: ';
        questionElement.appendChild(subjectText);
    
        var subject = document.createElement('span');
        subject.textContent = question.split('\n')[1].replace('נושא: ', '');
        questionElement.appendChild(subject);
    
        // השאלה עצמה
        var questionText = document.createElement('div');
        questionText.textContent = question.split('\n')[2].replace('שאלה: ', '');
        questionElement.appendChild(questionText);
    
        // הוספת רווח בין השאלות, חוץ מהשאלה האחרונה
        if (index < categoryQuestions.length - 1) {
            var spacer = document.createElement('br');
            questionElement.appendChild(spacer);
        }

    questionsContainer.appendChild(questionElement);
});
}

// טעינת רשימת הקטגוריות עם טעינת הדף הראשונית
showCategories();

