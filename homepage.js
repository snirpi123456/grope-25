document.addEventListener('DOMContentLoaded', function () {
    updateLoginLogoutButton();
    document.getElementById('personalAreaButton').addEventListener('click', redirectToPersonalAreaOrLogin);
});

// פונקציה לעדכון כפתור ההתחברות/התנתקות לפי מצב המשתמש
function updateLoginLogoutButton() {
    const button = document.getElementById('loginLogoutButton');
    const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;

    if (userData) {
        // אם נמצאו נתוני משתמש, בודקים את תפקיד המשתמש
        if (userData.role === 'admin') {
            // אם המשתמש הוא אדמין, מעדכנים את הטקסט להתנתקות
            button.innerText = 'התנתקות';
        } else {
            // עבור משתמש רגיל, גם מעדכנים להתנתקות כי המשתמש כבר מחובר
            button.innerText = 'התנתקות';
        }
    } else {
        // אם לא נמצאו נתוני משתמש, משמע המשתמש לא מחובר
        button.innerText = 'התחברות/הרשמה';
    }
    button.style.display = 'block';
}

// פונקציה לבדיקה אם המשתמש מחובר
function checkIfUserLoggedIn() {
    return localStorage.getItem('userData') !== null;
}

// פונקציה לטיפול בהתחברות/התנתקות
function handleLoginLogout() {
    if (checkIfUserLoggedIn()) {
        localStorage.removeItem('userData');
        alert('התנתקת בהצלחה');
        window.location.href = 'homepage.html';
    } else {
        window.location.href = 'login.html';
    }
}

// פונקציה להפניה לאזור האישי או לעמוד התחברות בהתאם למצב המשתמש
function redirectToPersonalAreaOrLogin() {
    if (checkIfUserLoggedIn()) {
        window.location.href = 'lawyer_personal_area.html';
    } else {
        window.location.href = 'login.html';
    }
}
function openTaxes() {
    window.location.href = "tax.html";
}

function openHousing() {
    window.location.href = "שיכון.html";
}

function openEmployment() {
    window.location.href = "תעסוקה.html";
}

function openGrant() {
    window.location.href = "מלגה.html";
}
// פונקציות להפניות לעמודים שונים
function openForum() {
    window.location.href = "forum.html";
}

function openReviews() {
    window.location.href = "review.html";
}


