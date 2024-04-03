function addSampleUsersToLocalStorage() {
    const sampleUsers = [
        { userId: 1, name: "אליזבת סול", email: "elizabeth@example.com", role: "lawyer" },
        { userId: 2, name: "יעקב כהן", email: "yaakov@example.com", role: "regular" },
        { userId: 3, name: "מיכל יונתן", email: "michal@example.com", role: "lawyer" },
        { userId: 4, name: "דניאל עמר", email: "daniel@example.com", role: "regular" }
    ];

    localStorage.setItem('users', JSON.stringify(sampleUsers));
}

document.addEventListener('DOMContentLoaded', function() {
    if (!isUserAdmin()) {
        alert('אינך מורשה לגשת לעמוד זה!');
        window.location.href = 'homepage.html'; // הפנייה לדף הבית או לדף התחברות
        return;
    }
    
    addSampleUsersToLocalStorage(); // הוספת משתמשים לדוגמה, אפשר להסיר לאחר בדיקה
    loadUsers();
});

function isUserAdmin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData && userData.role === 'admin';
}

function loadUsers() {
    const usersTableBody = document.querySelector('#usersTable tbody');
    usersTableBody.innerHTML = ''; // ניקוי הטבלה לפני הטעינה
    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.forEach((user, index) => {
        const row = usersTableBody.insertRow();
        const nameCell = row.insertCell(0);
        const roleCell = row.insertCell(1);
        const actionsCell = row.insertCell(2);

        nameCell.textContent = user.name;
        roleCell.textContent = user.role === 'lawyer' ? 'עורך דין' : 'משתמש רגיל';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'מחק';
        deleteButton.onclick = function() { deleteUser(user.userId); };
        actionsCell.appendChild(deleteButton);
    });
}

function deleteUser(userId) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(user => user.userId !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    alert('המשתמש נמחק בהצלחה');
    loadUsers(); // רענון הטבלה
}
