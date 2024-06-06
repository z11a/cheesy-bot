const {puppeteer} = require('puppeteer-core')

const getItems = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });

    const page = await browser.newPage();

    await page.goto("https://dineoncampus.com/northwestern/whats-on-the-menu", {
        waitUntil: "domcontentloaded"
    });

    const items = await page.evaluate(() => {
        const mainPage = document.querySelectorAll("*");
        //const page2 = mainPage.querySelector("div.container-fluid");
        
        for (const item of mainPage.entries()) {
            console.log(item);
        }

        return mainPage;
    });

    console.log(items);

    //console.log(items);

    await browser.close();
};

getItems();