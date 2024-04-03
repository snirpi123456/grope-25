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

function handleLoginLogout() {
    if (checkIfUserLoggedIn()) {
        localStorage.removeItem('userData');
        alert('התנתקת בהצלחה');
        window.location.href = 'homepage.html';
    } else {
        window.location.href = 'login.html';
    }
}

function redirectToPersonalAreaOrLogin() {
    if (checkIfUserLoggedIn()) {
        window.location.href = 'lawyer_profile.html';
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
function openForum() {
    if (checkIfUserLoggedIn()) {
        window.location.href = "forum.html";
    } else {
        window.location.href = "login.html";
    }
}

function openReviews() {
    window.location.href = "review.html";
}

function openAbout() {
    window.location.href = "אודות.html";
}

function openLawyer() {
    window.location.href = "פרופיל עורכי דין.html";
}
function adminControl() {
    window.location.href = "admin_control_user.html";
}

var isAdmin = true;

window.onload = function () {
    var adminButton = document.getElementById("adminButton");

    if (isAdmin) {
        adminButton.style.display = "block";
    } else {
        adminButton.style.display = "none";
    };
}

