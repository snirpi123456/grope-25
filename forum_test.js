
const { openInquiryButtonTestFunction } = require('./forum');
//my test
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

//test AI

// Unit tests for the button click event listener
describe('Button click event listener', () => {
    it('Should display the contact form when button is clicked', () => {
        document.getElementById("btn2").click();
        expect(document.getElementById("contactForm").style.display).toBe("block");
    });
});

// Unit tests for the submit button click event listener
describe('Submit button click event listener', () => {
    it('Should save the question in localStorage when all fields are filled', () => {
        document.getElementById("categorySelect").value = "שיכון";
        document.getElementById("subjectInput").value = "כותרת נושא";
        document.getElementById("questionInput").value = "זו השאלה שלי";
        document.getElementById("submitBtn").click();
        const storedQuestions = localStorage.getItem('questions');
        // Check if the question is saved in localStorage
        expect(storedQuestions).toContain("קטגוריה: שיכון");
        expect(storedQuestions).toContain("נושא: כותרת נושא");
        expect(storedQuestions).toContain("שאלה: זו השאלה שלי");
    });

    it('Should show an alert when category is not selected', () => {
        document.getElementById("categorySelect").value = "";
        document.getElementById("submitBtn").click();
        // Check if an alert is shown
        expect(window.alert).toHaveBeenCalled();
    });
});