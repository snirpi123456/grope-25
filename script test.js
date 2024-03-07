describe('User Authentication', () => {
    beforeEach(() => {
        // הגדרת localStorage מתוך jest
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
