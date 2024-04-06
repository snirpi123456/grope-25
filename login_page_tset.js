describe('User Authentication', () => {
    beforeEach(() => {
        const localStorageMock = (function() {
            let store = {};
            return {
                getItem: function(key) {
                    return store[key] || null;
                },
                setItem: function(key, value) {
                    store[key] = value.toString();
                },
                clear: function() {
                    store = {};
                }
            };
        })();
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    });

    it('should authenticate user successfully as regular user', () => {
        // דמה שמירת משתמש רגיל ב-localStorage
        const regularUser = { email: "user@example.com", password: "123456", userType: "regular" };
        localStorage.setItem('userData', JSON.stringify(regularUser));
        
        // בדוק אימות משתמש רגיל
        expect(authenticateUser("user@example.com", "123456")).toBe('התחברת בהצלחה!');
    });

    it('should authenticate user successfully as lawyer', () => {
        // דמה שמירת עורך דין ב-localStorage
        const lawyerUser = { email: "lawyer@example.com", password: "abcdef", userType: "lawyer" };
        localStorage.setItem('userData', JSON.stringify(lawyerUser));
        
        // בדוק אימות עורך דין
        expect(authenticateUser("lawyer@example.com", "abcdef")).toBe('התחברת בהצלחה!');
    });
});
// tests for lawyer user from AI:
it('should not authenticate lawyer with wrong password', () => {
  const lawyerUser = { email: "lawyer@example.com", password: "abcdef", userType: "lawyer" };
  localStorage.setItem('userData', JSON.stringify(lawyerUser));

  expect(authenticateUser("lawyer@example.com", "wrongpass")).toBe('כתובת האימייל או הסיסמה שגויים'); 
});

it('should not authenticate lawyer with wrong email', () => {
  const lawyerUser = { email: "lawyer@example.com", password: "abcdef", userType: "lawyer" };
  localStorage.setItem('userData', JSON.stringify(lawyerUser));

  expect(authenticateUser("wrong@email.com", "abcdef")).toBe('כתובת האימייל או הסיסמה שגויים');
});

it('should authenticate lawyer after successful registration', () => {
  const lawyerUser = { name: "John Doe", email: "lawyer2@example.com", password: "ghijkl", userType: "lawyer" };
  
  saveUserData(lawyerUser);
  
  expect(authenticateUser("lawyer2@example.com", "ghijkl")).toBe('התחברת בהצלחה!');
});

//tests for regular user from AI: 
it('should not authenticate regular user with wrong password', () => {
  const regularUser = { email: "user@example.com", password: "123456", userType: "regular" };
  localStorage.setItem('userData', JSON.stringify(regularUser));

  expect(authenticateUser("user@example.com", "wrongpass")).toBe('כתובת האימייל או הסיסמה שגויים');
});

it('should not authenticate regular user with wrong email', () => {
  const regularUser = { email: "user@example.com", password: "123456", userType: "regular" };
  localStorage.setItem('userData', JSON.stringify(regularUser));

  expect(authenticateUser("wrong@email.com", "123456")).toBe('כתובת האימייל או הסיסמה שגויים');  
});

it('should authenticate regular user after successful registration', () => {
  const regularUser = { name: "Jane Doe", email: "user2@example.com", password: "abcdef", userType: "regular" };
  
  saveUserData(regularUser);
  
  expect(authenticateUser("user2@example.com", "abcdef")).toBe('התחברת בהצלחה!');
});
