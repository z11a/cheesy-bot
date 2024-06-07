const puppeteer = require('puppeteer');

async function getMenu(dining_hall) {
    // create browser and page objects
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // load website
    await page.goto("https://dineoncampus.com/northwestern/whats-on-the-menu", {
        waitUntil: "domcontentloaded"
    });

    // select dropdown
    await page.click('menu-location-selector');

    // select proper dining hall
    await page.waitForSelector('menu-location-selector__BV_toggle_');     

    await browser.close();
};

module.export = {getMenu}