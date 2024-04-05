function isUserAdmin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.role === 'admin' && currentUser.userType != 'regular' && currentUser.userType != 'lawyer';
}
function isUserAdmin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData && userData.isAuthenticated && userData.role === 'admin';
}

function isUserAdmin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData && userData.role === 'admin';
}

document.addEventListener('DOMContentLoaded', function() {
    if (isUserAdmin()) {
        loadUsers(); // טעינת והצגת רשימת המשתמשים
    } else {
        alert('אינך מורשה לגשת לעמוד זה!');
        window.location.href = 'homePage.html'; // הפנייה לדף ההתחברות
    }
});

// טעינת והצגת רשימת המשתמשים

function loadUsers() {
    const usersTableBody = document.querySelector('#usersTable tbody');
    usersTableBody.innerHTML = ''; 
    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.forEach((user, index) => {
        const row = usersTableBody.insertRow();
        const nameCell = row.insertCell(0);
        const roleCell = row.insertCell(1);
        const actionsCell = row.insertCell(2);

        nameCell.textContent = user.name;
        roleCell.textContent = user.userType === 'lawyer' ? 'עורך דין' : 'משתמש רגיל';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'מחק';
        deleteButton.onclick = function() { deleteUser(index); };
        actionsCell.appendChild(deleteButton);
    });
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users)); 
    loadUsers();
}

