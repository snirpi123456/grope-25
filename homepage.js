document.addEventListener('DOMContentLoaded', function () {
    updateLoginLogoutButton();
    document.getElementById('personalAreaButton').addEventListener('click', redirectToPersonalAreaOrLogin);
});

function updateLoginLogoutButton() {
    const button = document.getElementById('loginLogoutButton');
    const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;

    if (userData) {
        if (userData.role === 'admin') {
            button.innerText = 'התנתקות';
        } else {
            button.innerText = 'התנתקות';
        }
    } else {
        button.innerText = 'התחברות/הרשמה';
    }
    button.style.display = 'block';
}

function checkIfUserLoggedIn() {
    return localStorage.getItem('userData') !== null;
}

function handleLoginLogout() {//בדיקה אם מחובר או לא 
    if (checkIfUserLoggedIn()) {
        localStorage.removeItem('userData');
        alert('התנתקת בהצלחה');
        window.location.href = 'homepage.html';
    } else {
        window.location.href = 'login.html';
    }
}

function redirectToPersonalAreaOrLogin() {//מנהלת את הניתוב של המשתמש
    if (checkIfUserLoggedIn()) {
        window.location.href = 'lawyer_profile.html';
    } else {
        window.location.href = 'login.html';
    }
}

function openTaxes() {//הפניה לדף מיסים
    window.location.href = "tax.html";
}

function openHousing() {//הפניה לדף שיכון
    window.location.href = "שיכון.html";
}

function openEmployment() {//הפניה לדף תעסוקה
    window.location.href = "תעסוקה.html";
}

function openGrant() {//הפניה לדף מלגות
    window.location.href = "מלגה.html";
}

function openForum() {//הפניה לדף פורום
    if (checkIfUserLoggedIn()) {
        window.location.href = "forum.html";
    } else {
        window.location.href = "login.html";
    }
}

function openReviews() {//הפניה לדף ביקורות
    window.location.href = "review.html";
}

function openAbout() {//הפניה לדף אודות
    window.location.href = "אודות.html";
}

function openLawyer() {// הפניה לדף צפייה בעורכי דין
    window.location.href = "פרופיל עורכי דין.html";
}

function adminControl() {//הפניה לדף בקרת אדמין
    window.location.href = "admin_control_user.html";
}

//

var isAdmin = true;

window.onload = function () {
    var adminButton = document.getElementById("adminButton");

    if (isAdmin) {
        adminButton.style.display = "block";
    } else {
        adminButton.style.display = "none";
    };
}

function showPersonalAreaButton() {//תנאי כניסה לאיזור אישי 
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        const userType = userData.userType;
        if (userType === 'lawyer') {
            document.getElementById("personalAreaButton").style.display = "block";
        } else {
            alert("אין לך הרשאה.");
        }
    } else {
        alert("אנא התחבר למערכת.");
    }
}