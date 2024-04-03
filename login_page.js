const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
    role: "admin"
};

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');


registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


function saveUserData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let userType;
    if (document.getElementById('userTypeLawyer').checked) {
        userType = 'lawyer';
    } else {
        userType = 'regular';
    }

    const userData = {
        name: name,
        email: email,
        password: password,
        userType: userType
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    alert('נתוני המשתמש נשמרו בהצלחה');
}
function authenticateUser() {
    const enteredEmail = document.getElementById('loginEmail').value;
    const enteredPassword = document.getElementById('loginPassword').value;

    if (enteredEmail === adminUser.email && enteredPassword === adminUser.password) {
        alert('התחברת בהצלחה כאדמין!');
        localStorage.setItem('currentUser', JSON.stringify({ email: enteredEmail, role: 'admin', isAuthenticated: true }));
        window.location.href = 'homePage.html'; 
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('userData')) || [];
    const user = users.find(user => user.email === enteredEmail && user.password === enteredPassword);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify({ ...user, isAuthenticated: true }));
        if (user.role === 'lawyer') {
            alert('התחברת בהצלחה כעורך דין!');
            window.location.href = 'homePage.html';
        } else {
            alert('התחברת בהצלחה כמשתמש רגיל!');
            window.location.href = 'homePage.html'; 
        }
    } else {
        alert('כתובת האימייל או הסיסמה שגויים. אנא נסה שנית.');
    }
}

document.getElementById('registerButton').addEventListener('click', saveUserData);
document.getElementById('loginButton').addEventListener('click', authenticateUser);