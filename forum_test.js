
const { openInquiryButtonTestFunction } = require('./forum');

function testOpenContactFormButton() {
    const btn2 = document.getElementById("btn2");

    if (!btn2) {
        console.error("Button 'Open Contact Form' is missing.");
    } else {
        btn2.click();
        console.log("Button 'Open Contact Form' was clicked.");
        openInquiryButtonTestFunction(); 
    }
}
