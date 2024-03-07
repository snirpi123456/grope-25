const puppeteer = require('puppeteer');

describe('בדיקת קישור "תעסוקה"', () => {
    it('צריך לנווט לדף התעסוקה בלחיצה על הקישור', async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto('הכתובת של הדף הראשי שלך כאן'); // לדוגמה http://localhost:3000
        await page.click('a[href="תעסוקה.html"]'); // לחץ על הקישור

        // המתן עד לניווט הדף
        await page.waitForNavigation();

        // בדוק אם הכתובת הנוכחית כוללת את "תעסוקה.html"
        expect(page.url()).toMatch('תעסוקה.html');

        await browser.close();
    }, 16000); // זמן תם מוגדל למקרה שהדף לוקח זמן לטעון
});
