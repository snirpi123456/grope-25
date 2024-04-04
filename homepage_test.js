//בדיוקת יחידה עבור התחברות\התנתקות
describe('updateLoginLogoutButton function', () => {
    test('should set button text to "התחברות/הרשמה" when no user data exists in localStorage', () => {
      localStorage.removeItem('userData');//הסרת מידע של המשתמש
  
      const button = document.createElement('button');//יצירת מקום לכפתור
      button.id = 'loginLogoutButton';
      document.body.appendChild(button);
  
      updateLoginLogoutButton();//קראיה לפונקציה 
  
      expect(button.innerText).toBe('התחברות/הרשמה');//בדיקת שינוי טקסט
    });
  
    test('should set button text to "התנתקות" when user role is not admin', () => {
      const userData = { username: 'testuser', role: 'user' };//יצירת מידע של משתמש
      localStorage.setItem('userData', JSON.stringify(userData));
  
      const button = document.createElement('button');//יצירת מקום לכפתור
      button.id = 'loginLogoutButton';
      document.body.appendChild(button);
  
      updateLoginLogoutButton();//קראיה לפונקציה 
  
      expect(button.innerText).toBe('התנתקות');//בדיקת שינוי טקסט
  
      localStorage.removeItem('userData');//ניקוי לאחר בדיקה
    });
  
    test('should set button text to "התנתקות" when user role is admin', () => {
      // יצירת מידע על מנהל מערכת
      const userData = { username: 'admin', role: 'admin' };// יצירת מידע על מנהל מערכת
      localStorage.setItem('userData', JSON.stringify(userData));
  
      const button = document.createElement('button');
      button.id = 'loginLogoutButton';
      document.body.appendChild(button);
  
      updateLoginLogoutButton();
  
      expect(button.innerText).toBe('התנתקות');
  
      localStorage.removeItem('userData');
    });
  });
  
  //בדיקות יחידה עבור בדיקה של משתמש אם מחובר

const { checkIfUserLoggedIn } = require('./yourScript.js');

describe('checkIfUserLoggedIn function', () => {
  test('should return true when user data exists in localStorage', () => {
    // מגדירים מידע של משתמש ב-localStorage
    const userData = { username: 'testuser', role: 'user' };
    localStorage.setItem('userData', JSON.stringify(userData));

    // קריאה לפונקציה ובדיקה שהיא מחזירה ערך תקין (true)
    expect(checkIfUserLoggedIn()).toBe(true);

    // מסירים את המידע של המשתמש לאחר הבדיקה
    localStorage.removeItem('userData');
  });

  test('should return false when no user data exists in localStorage', () => {
    // מסירים את כל המידע שקשור למשתמש מה-localStorage
    localStorage.removeItem('userData');

    // קריאה לפונקציה ובדיקה שהיא מחזירה ערך תקין (false)
    expect(checkIfUserLoggedIn()).toBe(false);
  });
});

//בדיקה אם מחובר 

const { handleLoginLogout } = require('./yourScript.js');

describe('handleLoginLogout function', () => {
  test('should remove user data from localStorage and redirect to homepage when user is logged in', () => {
    // מגדירים מידע של משתמש ב-localStorage
    const userData = { username: 'testuser', role: 'user' };
    localStorage.setItem('userData', JSON.stringify(userData));

    // סימולציה של קריאה לפונקציה
    handleLoginLogout();

    // בדיקה שהמידע של המשתמש הוסר מ-localStorage
    expect(localStorage.getItem('userData')).toBeNull();
    
    // בדיקה שהופיעה ההודעה המתאימה
    expect(window.alert).toHaveBeenCalledWith('התנתקת בהצלחה');
    
    // בדיקה שהניווט בוצע לדף הבית
    expect(window.location.href).toBe('homepage.html');
  });

  test('should redirect to login page when user is not logged in', () => {
    // מסירים את כל המידע שקשור למשתמש מה-localStorage
    localStorage.removeItem('userData');

    // סימולציה של קריאה לפונקציה
    handleLoginLogout();

    // בדיקה שהניווט בוצע לדף ההתחברות
    expect(window.location.href).toBe('login.html');
  });
});

//בדיקות לניתוב

const { redirectToPersonalAreaOrLogin } = require('./yourScript.js');

describe('redirectToPersonalAreaOrLogin function', () => {
  test('should redirect to lawyer profile page when user is logged in', () => {
    // מגדירים מידע של משתמש ב-localStorage
    const userData = { username: 'testuser', role: 'user' };
    localStorage.setItem('userData', JSON.stringify(userData));

    // סימולציה של קריאה לפונקציה
    redirectToPersonalAreaOrLogin();

    // בדיקה שהניווט בוצע לדף הפרופיל של העורך דין
    expect(window.location.href).toBe('lawyer_profile.html');

    // מסירים את כל המידע שקשור למשתמש מה-localStorage
    localStorage.removeItem('userData');
  });

  test('should redirect to login page when user is not logged in', () => {
    // מסירים את כל המידע שקשור למשתמש מה-localStorage
    localStorage.removeItem('userData');

    // סימולציה של קריאה לפונקציה
    redirectToPersonalAreaOrLogin();

    // בדיקה שהניווט בוצע לדף ההתחברות
    expect(window.location.href).toBe('login.html');
  });
});

//בדיקות ניתוב לדף מיסים

const { openTaxes } = require('./yourScript.js');

describe('openTaxes function', () => {
  test('should redirect to tax page', () => {
    // סימולציה של קריאה לפונקציה
    openTaxes();

    // בדיקה שהניווט בוצע לדף המסים
    expect(window.location.href).toBe('tax.html');
  });
});

//בדיקת ניתוב לדף שיכון

const { openHousing } = require('./yourScript.js');

describe('openHousing function', () => {
  test('should redirect to housing page', () => {
    // סימולציה של קריאה לפונקציה
    openHousing();

    // בדיקה שהניווט בוצע לדף השיכון
    expect(window.location.href).toBe('שיכון.html');
  });
});

//בדיקת ניתוב לדף תעסוקה

const { openEmployment } = require('./yourScript.js');

describe('openEmployment function', () => {
  test('should redirect to employment page', () => {
    // סימולציה של קריאה לפונקציה
    openEmployment();

    // בדיקה שהניווט בוצע לדף התעסוקה
    expect(window.location.href).toBe('תעסוקה.html');
  });
});

//בדיקת ניתוב לדף מלגות

// בקובץ הבדיקות (לדוגמה tests.js):

const { openGrant } = require('./yourScript.js');

describe('openGrant function', () => {
  test('should redirect to grant page', () => {
    // סימולציה של קריאה לפונקציה
    openGrant();

    // בדיקה שהניווט בוצע לדף המלגות
    expect(window.location.href).toBe('מלגה.html');
  });
});

//בדיקת ניתוב לדף פורום

const { openForum } = require('./yourScript.js');

describe('openForum function', () => {
  test('should redirect to forum page when user is logged in', () => {
    // מגדירים מידע של משתמש ב-localStorage
    const userData = { username: 'testuser', role: 'user' };
    localStorage.setItem('userData', JSON.stringify(userData));

    // סימולציה של קריאה לפונקציה
    openForum();

    // בדיקה שהניווט בוצע לדף הפורום
    expect(window.location.href).toBe('forum.html');

    // מסירים את כל המידע שקשור למשתמש מה-localStorage
    localStorage.removeItem('userData');
  });

  test('should redirect to login page when user is not logged in', () => {
    // מסירים את כל המידע שקשור למשתמש מה-localStorage
    localStorage.removeItem('userData');

    // סימולציה של קריאה לפונקציה
    openForum();

    // בדיקה שהניווט בוצע לדף ההתחברות
    expect(window.location.href).toBe('login.html');
  });
});

//בדיקת ניתוב לדף ביקורות

const { openReviews } = require('./yourScript.js');

describe('openReviews function', () => {
  test('should redirect to reviews page', () => {
    // סימולציה של קריאה לפונקציה
    openReviews();

    // בדיקה שהניווט בוצע לדף הביקורות
    expect(window.location.href).toBe('review.html');
  });
});

//בדיקת יחידה אודות

const { openAbout } = require('./yourScript.js');

describe('openAbout function', () => {
  test('should redirect to about page', () => {
    // סימולציה של קריאה לפונקציה
    openAbout();

    // בדיקה שהניווט בוצע לדף האודות
    expect(window.location.href).toBe('אודות.html');
  });
});

//בדיקת יחידה צפייה בעורכי דין 

const { openLawyer } = require('./yourScript.js');

describe('openLawyer function', () => {
  test('should redirect to lawyer profile page', () => {
    // סימולציה של קריאה לפונקציה
    openLawyer();

    // בדיקה שהניווט בוצע לדף פרופיל עורכי דין
    expect(window.location.href).toBe('פרופיל עורכי דין.html');
  });
});

//בדיקת יחידה לבקרת אדמין

const { adminControl } = require('./yourScript.js');

describe('adminControl function', () => {
  test('should redirect to admin control page', () => {
    // סימולציה של קריאה לפונקציה
    adminControl();

    // בדיקה שהניווט בוצע לדף בקרת אדמין
    expect(window.location.href).toBe('admin_control_user.html');
  });
});

//בדיקת יחידה עובר משתנה אדמין לדף בקרת אדמין

describe('Admin Button', () => {
    test('Admin button should be visible when isAdmin is true', () => {
      // מיקום האלמנט ב- DOM
      document.body.innerHTML = '<button id="adminButton" style="display: none;"></button>';
  
      // קוד ה JavaScript
      var isAdmin = true;
      window.onload();
  
      // בדיקת האם הכפתור הוא גלוי
      expect(document.getElementById('adminButton').style.display).toBe('block');
    });
  
    test('Admin button should be hidden when isAdmin is false', () => {
      // מיקום האלמנט ב- DOM
      document.body.innerHTML = '<button id="adminButton" style="display: none;"></button>';
  
      // קוד ה JavaScript
      var isAdmin = false;
      window.onload();
  
      // בדיקת האם הכפתור מוסתר
      expect(document.getElementById('adminButton').style.display).toBe('none');
    });
  });