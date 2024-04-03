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
        localStorage.setItem('userData', JSON.stringify({ ...adminUser, isAuthenticated: true }));
        window.location.href = 'homePage.html';
        return;
    }else{
        alert('שם משתמש או סיסמא שגויים ')
    }

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData.email === enteredEmail && userData.password === enteredPassword) {
        alert('התחברת בהצלחה!');
        window.location.href = 'homePage.html';

        localStorage.setItem('userData', JSON.stringify({ ...adminUser, isAuthenticated: true }));
        window.location.href = 'homePage.html';
    }else{
        alert('שם משתמש או סיסמא שגויים ')
    }
    
}

document.getElementById('registerButton').addEventListener('click', saveUserData);
document.getElementById('loginButton').addEventListener('click', authenticateUser);