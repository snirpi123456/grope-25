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

function updateLoginLogoutButton() {
    const button = document.getElementById('loginLogoutButton');
    if (checkIfUserLoggedIn()) {
        button.innerText = 'התנתקות';
    } else {
        button.innerText = 'התחברות/הרשמה';
    }
    button.style.display = 'block';
}

function redirectToPersonalAreaOrLogin() {
    if (checkIfUserLoggedIn()) {
        window.location.href = 'lawyer_profile.html';
    } else {
        window.location.href = 'login.html';
    }
}

function openForum() {
    window.location.href = "forum.html";
}

function openReviews() {
    window.location.href = "review.html";
}

function openEmployment() {
    window.location.href = "תעסוקה.html";
}

document.addEventListener('DOMContentLoaded', function() {
    updateLoginLogoutButton();
    document.getElementById('personalAreaButton').addEventListener('click', redirectToPersonalAreaOrLogin);
});
