const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// החלפת מצב ההפעלה של הקונטיינר
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// שמירת נתוני המשתמש
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

// אימות המשתמש
function authenticateUser() {
    const enteredEmail = document.getElementById('loginEmail').value;
    const enteredPassword = document.getElementById('loginPassword').value;

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData.email === enteredEmail && userData.password === enteredPassword) {
        alert('התחברת בהצלחה!');
    } else {
        alert('כתובת האימייל או הסיסמה שגויים');
    }
}

document.getElementById('registerButton').addEventListener('click', saveUserData);
document.getElementById('loginButton').addEventListener('click', authenticateUser);
