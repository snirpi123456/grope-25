
const { openInquiryButtonTestFunction } = require('./forum');

function testOpenContactFormButton() {
    const btn2 = document.getElementById("btn2");

    if (!btn2) {
        console.error("Button 'Open Contact Form' is missing.");
        alert("Button 'Open Contact Form' is missing.")
    } else {
        btn2.click();
        console.log("Button 'Open Contact Form' was clicked.");
        alert("Button 'Open Contact Form' was clicked.")

        openInquiryButtonTestFunction(); 
    }
}


describe('Button click event listener', () => {
    it('Should display the contact form when button is clicked', () => {
        document.getElementById("btn2").click();
        expect(document.getElementById("contactForm").style.display).toBe("block");
    });
});


describe('Button click event listener', () => {
    it('Should display the contact form when button is clicked', () => {
        document.getElementById("btn2").click();
        expect(document.getElementById("contactForm").style.display).toBe("block");
    });
});


describe('Submit button click event listener', () => {
    it('Should save the question in localStorage when all fields are filled', () => {
        document.getElementById("categorySelect").value = "שיכון";
        document.getElementById("subjectInput").value = "כותרת נושא";
        document.getElementById("questionInput").value = "זו השאלה שלי";
        document.getElementById("submitBtn").click();
        const storedQuestions = localStorage.getItem('questions');
        
        expect(storedQuestions).toContain("קטגוריה: שיכון");
        expect(storedQuestions).toContain("נושא: כותרת נושא");
        expect(storedQuestions).toContain("שאלה: זו השאלה שלי");
    });

    it('Should show an alert when category is not selected', () => {
        document.getElementById("categorySelect").value = "";
        document.getElementById("submitBtn").click();
    
        expect(window.alert).toHaveBeenCalled();
    });
});


function testHandleReply() {
    const questionElementMock = document.createElement('div');
    const replyInputMock = document.createElement('textarea');
    const submitReplyBtnMock = document.createElement('button');
    const eventMock = {
        target: {
            parentNode: questionElementMock
        }
    };

    replyInputMock.value = ''; // תגובה ריקה
    handleReply(eventMock); // קריאה לפונקציה עם תגובה ריקה
    assert.strictEqual(questionElementMock.childNodes.length, 2, 'Should not add reply text if reply is empty');

    replyInputMock.value = 'תשובה חדשה'; // תשובה חדשה
    handleReply(eventMock); // קריאה לפונקציה עם תשובה חדשה
    assert.strictEqual(questionElementMock.childNodes.length, 4, 'Should add reply text if reply is not empty');
}

// בדיקת יחידה עבור פונקציה saveReplyToLocalStorage:
function testSaveReplyToLocalStorage() {
    const questionTextMock = 'זוהי שאלת דוגמה';
    const replyMock = 'תשובה לשאלת דוגמה';

    localStorage.clear(); // איפוס האחסון המקומי לפני כל בדיקה
    saveReplyToLocalStorage(questionTextMock, replyMock); // שמירת תגובה
    const storedReplies = JSON.parse(localStorage.getItem('replies')); // קריאה לתגובה שנשמרה
    assert.strictEqual(storedReplies[questionTextMock], replyMock, 'Should save reply to local storage');

    const updatedReplyMock = 'תשובה עודכנת לשאלת דוגמה';
    saveReplyToLocalStorage(questionTextMock, updatedReplyMock); // עדכון תגובה
    const updatedStoredReplies = JSON.parse(localStorage.getItem('replies')); // קריאה לתגובה שעודכנה
    assert.strictEqual(updatedStoredReplies[questionTextMock], updatedReplyMock, 'Should update existing reply in local storage');
}

// הרצת כל הבדיקות היחידה:
function runUnitTests() {
    testHandleReply();
    testSaveReplyToLocalStorage();
    console.log("All unit tests passed successfully!");
}

// קריאה לריצת הבדיקות:
runUnitTests();
