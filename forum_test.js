
const { openInquiryButtonTestFunction } = require('./forum');
//my test
export function testOpenContactFormButton() {
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
// Test openInquiryButtonTestFunction is called
test('calls openInquiryButtonTestFunction', () => {
    document.body.innerHTML = '<button id="btn2">Open Form</button>';
  
    const openInquiryButtonTestFunction = jest.fn();
  
    testOpenContactFormButton();
  
    expect(openInquiryButtonTestFunction).toHaveBeenCalled();
  });
  
  // Test error logged if no btn2
  test('logs error if no btn2', () => {
    const spy = jest.spyOn(console, 'error');
    
    testOpenContactFormButton();
  
    expect(spy).toHaveBeenCalledWith("Button 'Open Contact Form' is missing.");
  }); 
  
  // Test btn2 click logged
  test('logs btn2 click', () => {
    document.body.innerHTML = '<button id="btn2">Open Form</button>';
  
    const spy = jest.spyOn(console, 'log');
  
    testOpenContactFormButton();
  
    expect(spy).toHaveBeenCalledWith("Button 'Open Contact Form' was clicked.");
  });

