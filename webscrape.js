const puppeteer = require('puppeteer');

// create map of dining halls and ids
const dining_hall_ToId = new Map();
dining_hall_ToId.set('Allison Dining Commons', 1);
dining_hall_ToId.set('Sargent Dining Commons', 2);
dining_hall_ToId.set('Foster Walker Plex West', 3);
dining_hall_ToId.set('Foster Walker Plex East', 4);
dining_hall_ToId.set('Elder Dining Commons', 5);

/**
 * foodSection class, foods is array of foodItem objects
*/
class foodSection {
    constructor(name, foods) {
        this.name = name;
        this.foods = foods;
    }
}

// create foodItem class
class foodItem {
    constructor(name, portion, calories) {
        this.name = name;
        this.portion = portion;
        this.calories = calories;
    }
}

async function getFood(foodSection) {
    var finalFoods = [];

    const rowsArea = await foodSection.$('tbody[role="rowgroup"]');
    const rows = await rowsArea.$$('tr[role="row"]');

    for (const row of rows) {
        // name
        const foodName = await row.$eval('.menu-item', (element) => element.textContent)

        // portion
        const foodPortionOutside = await row.$('td[data-label="Portion"]');
        const foodPortion = await foodPortionOutside.$eval('div', element => element.textContent);

        // calories
        const foodCaloriesOutside = await row.$('td[data-label="Calories"]');
        const foodCalories = await foodCaloriesOutside.$eval('div', element => element.textContent);

        finalFoods.push(new foodItem(foodName, foodPortion, foodCalories));
    }

    return finalFoods;
}

/**
 * returns an array of foodSection objects
*/
async function getMenu(dining_hall, meal_name) {
    console.log('getMenu executed...');
    
    // create final array of foodSection objects
    var finalFoodSections = [];

    // create browser and page objects
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    
    // load website
    await page.goto("https://dineoncampus.com/northwestern/whats-on-the-menu");
    // Set screen size.
    await page.setViewport({width: 1080, height: 1024});

    // test rn cuz its down
    await page.locator('#menuDatePicker').click();
    const date = await page.locator('::-p-xpath(//*[@id="menuDatePicker"]/div[2]/div[26])');
    await date.click();

    // click dropdown
    await page.locator('#menu-location-selector').click();

    // find dining hall
    let dining_hall_id = dining_hall_ToId.get(dining_hall);
    const hall = await page.$(`
        ::-p-xpath(//*[@id="building_6113ef5ae82971150a5bf8ba"]/li[${dining_hall_id}]/button)
        `);
    await hall.click()

    // wait for menus to load
    await page.waitForNetworkIdle();

    // first select the meals navigation tab
    const navTab = await page.$('.nav.nav-tabs')

    // check each tab for correct meal we want
    await navTab.$$eval('.nav-link', (navButtons, meal_name) => {
        for (const navButton of navButtons) {
            if (navButton.textContent == meal_name) {
                navButton.click();
                break;
            }
        }
    }, meal_name);

    // wait for menu to load again
    await page.waitForNetworkIdle();
    
    // create array of ElementHandles each foodSection
    const foodSectionElements = await page.$$('.table.b-table.menu-items.b-table-caption-top.b-table-stacked-md');

    // get captions and food for each foodSection
    for (const foodSectionElement of foodSectionElements) {
        const captionElement = await foodSectionElement.$('caption');
        // had to use evaluate because each element is an elementHandle and we can't directly use textContent to retrive caption text
        const caption = await page.evaluate(element => element.textContent, captionElement);
        // add new foodSection object to our final array
        finalFoodSections.push(new foodSection(caption, await getFood(foodSectionElement)));
    }

    console.log('end of getMenu');
    return finalFoodSections;
};

module.exports = getMenu;