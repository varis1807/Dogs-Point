const puppy = require("puppeteer");
const prompt = require('prompt-sync')();
const cheerio =  require("cheerio");
const request = require("request");
const fs = require("fs");

var breed1;
var breed2;
var breed3;
var location;

choiceFun();

////////////////////////////////////////////////

async function main(choice) {
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false
    });

    let tabs = await browser.pages();
    let tab = tabs[0];
    if(choice == 8 || choice == 14)
    {
        await tab.goto("https://www.google.com");
        await tab.waitForSelector(".gLFyf.gsfi");
        await tab.click(".gLFyf.gsfi");
    }

    if (choice == 14) {
        await tab.type(".gLFyf.gsfi", "vet in " + location);
        await tab.keyboard.press("Enter");
        await tab.waitForSelector(".MXl0lf.mtqGb.EhIML", { visible: true });
        await tab.click(".MXl0lf.mtqGb.EhIML");
    }
    else if (choice == 8) {
        await tab.type(".gLFyf.gsfi", "dog shop in " + location);
        await tab.keyboard.press("Enter");
        await tab.waitForSelector(".MXl0lf.mtqGb.EhIML", { visible: true });
        await tab.click(".MXl0lf.mtqGb.EhIML");
    }
    else if (choice == 12) {
        await tab.goto("https://headsupfortails.com/");
    }
    else if (choice == 13) {
        await tab.goto("https://www.thesprucepets.com/dog-diseases-and-disorders-4162137");
    }
    else if (choice == 10) {
        await tab.goto("https://www.rspcapetinsurance.org.au/pet-care/dog-care/what-should-feed-dog#:~:text=It%20is%20entirely%20acceptable%20to,need%20to%20be%20aware%20of.");
    }
}

//////////////////////////////////////////

async function compare(count) {
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false
    });

    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://dogell.com/en/compare-dog-breeds");
    await tab.waitForSelector("#select2-compare-breed1-container", { visible: true });
    await tab.click("#select2-compare-breed1-container");
    await tab.waitForSelector(".select2-search__field", { visible: true });
    await tab.type(".select2-search__field", breed1);
    await tab.waitForSelector(".select2-results__option.select2-results__option--highlighted", { visible: true });
    await tab.keyboard.press("Enter");

    await tab.click("#select2-compare-breed2-container");
    await tab.type(".select2-search__field", breed2);
    await tab.waitForSelector(".select2-results__option.select2-results__option--highlighted", { visible: true });
    await tab.keyboard.press("Enter");

    if(count == 3)
    {
        await tab.click("#select2-compare-breed3-container");
        await tab.type(".select2-search__field" , breed3);
        await tab.waitForSelector(".select2-results__option.select2-results__option--highlighted" , {visible : true});
        await tab.keyboard.press("Enter");        
    }

    await tab.click(".btn.btn-blue");
}


///////////////////////////////////////////

function allNames(err , res , html)
{
    if(!err)
    {
        let $ = cheerio.load(html);
        let dogsName = $(".list-item-title");
        fs.writeFileSync("Dogs-name.txt" , "");
        for(let i = 0 ; i < dogsName.length ; i++)
        {
            fs.appendFileSync("Dogs-name.txt" , $(dogsName[i]).text() + "\n");
        }        
    }
    else
    {
        console.log(err);
    }
}



function breedDetails2(err , res , html)
{
    if(!err)
    {
        let $ = cheerio.load(html);
        let stats = $(".vital-stat-box");
        fs.writeFileSync("Breed-Details.txt" , "");
        fs.appendFileSync("Breed-Details.txt" , "Some stats about this breed :-\n");
        for(let i = 0 ; i < stats.length ; i++)
        {
            fs.appendFileSync("Breed-Details.txt" , $(stats[i]).text() + "\n");
        }

        fs.appendFileSync("Breed-Details.txt" , "\nCharacteristics :-\n\n");
        let characteristics = $(".characteristic-title");
        let stars = $(".characteristic-star-block");
        for(let i = 0 ; i < characteristics.length ; i++)
        {
            fs.appendFileSync("Breed-Details.txt",$(characteristics[i]).text() + "  -->  " + $(stars[i]).text() + "/5" + "\n");
            if(i == 0 || i == 6 || i == 7 || i == 11 || i == 12 || i == 18 || i == 19 || i == 25 || i ==26 || i == 30)
            {
                fs.appendFileSync("Breed-Details.txt" , "\n");
            }
        }
    }
    else
    {
        console.log(err);
    }
}

function breedDetails()
{
    let breedName = prompt('Enter breed name ->');
    breedName = editName(breedName);
    let url = "https://dogtime.com/dog-breeds/" + breedName;
    request(url , breedDetails2);    
}
function editName(name)
{
    let words = name.split(' ').length;
    for(let i = 0 ; i < words - 1 ; i++)
    {
        name = name.replace(" " , "-");
    }
    return name;
}

/////////////////////////////////////////

async function findName()
{
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false
    });

    let tabs = await browser.pages();
    let tab = tabs[0];
    
    await tab.goto("https://www.cosmopolitan.com/lifestyle/a28381186/best-dog-names/");
    for(let i = 0 ; i < 4 ; i++)
    {
        await tab.keyboard.press("PageDown");
    } 
}

////////////////////////////////////////

async function seeImages(breed)
{
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false
    });

    let tabs = await browser.pages();
    let tab = tabs[0];

    await tab.goto("https://www.google.com");
    await tab.waitForSelector(".gLFyf.gsfi");
    await tab.click(".gLFyf.gsfi");
    await tab.type(".gLFyf.gsfi" , breed + " dog images");
    await tab.keyboard.press("Enter");
    await tab.waitForSelector('[data-hveid="CAEQAw"]' , {visible : true});
    await tab.click('[data-hveid="CAEQAw"]');
}

//////////////////////////////////////////

async function training(option)
{
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false
    });

    let tabs = await browser.pages();
    let tab = tabs[0];
    
    if(option == 'A' || option == 'a')
    {
        await tab.goto("https://www.thesprucepets.com/steps-to-train-your-dog-1118273");
    } 
    else if(option == 'V' || option == 'v')
    {
        await tab.goto("https://www.youtube.com");
        setTimeout(() => {
            tab.click("#search-input #search");
        }, 1000);
        await tab.type("#search-input #search" , "how to train a dog");
        await tab.keyboard.press("Enter");
    }
}

////////////////////////////////////////////////

async function benefits()
{
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false
    });

    let tabs = await browser.pages();
    let tab = tabs[0];
    
    await tab.goto("https://www.lifehack.org/articles/lifestyle/10-surprising-benefits-having-dog-you-didnt-know-about.html");
    await tab.keyboard.press("PageDown"); 
}

////////////////////////////////////////////////

async function checkPrice(breed)
{
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false
    });

    let tabs = await browser.pages();
    let tab = tabs[0];

    await tab.goto("https://www.google.com");
        await tab.waitForSelector(".gLFyf.gsfi");
        await tab.click(".gLFyf.gsfi");        
        await tab.type(".gLFyf.gsfi", breed + " dog price");
        await tab.keyboard.press("Enter");
}

////////////////////////////////////////////////

async function cost()
{
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false
    });

    let tabs = await browser.pages();
    let tab = tabs[0];
    
    
    await tab.goto("https://www.thesprucepets.com/the-cost-of-dog-ownership-1117321");
    for(let i = 0 ; i < 2 ; i++)
    {
        await tab.keyboard.press("PageDown");
    } 
}

//////////////////////////////////////////

function choiceFun() {
    console.log("Press 1 to know the benefits of a dog!!\n");
    console.log("Press 2 to download almost every dog breed name!!\n");
    console.log("Press 3 to know some characterstics of a breed!!\n");
    console.log("Press 4 to see images of a perticular dog breed!!\n");
    console.log("Press 5 to check the price of a dog breed!!\n");
    console.log("Press 6 to compare 2 or 3 dog breeds!!\n");
    console.log("Press 7 to know the estimated yearly cost of owning a dog!!\n");
    console.log("Press 8 to find a dog shop near you!!\n");
    console.log("Press 9 to find a name for your dog!!\n");
    console.log("Press 10 to know what should you feed your dog!!\n");
    console.log("Press 11 to know how to train a dog!!\n");
    console.log("Press 12 to buy any dog product!!\n");
    console.log("Press 13 to know some common diseases in dogs and their treatment!!\n");
    console.log("Press 14 to find a vet(doctor for animals) near you!!\n");

    const choice = prompt('Enter your choice -> ');

    callMe(choice);
}

///////////////////////////////////////////

function callMe(choice)
{
    if(choice == 1)
    {
        benefits();
    }
    else if(choice == 2)
    {
        request("https://dogtime.com/dog-breeds/profiles" , allNames);
    }
    else if(choice == 3)
    {
        breedDetails();
    }
    else if(choice == 4)
    {
        let breed = prompt('Enter breed --> ');
        seeImages(breed);
    }
    else if(choice == 5)
    {
        let breed = prompt('Enter breed -> ');
        checkPrice(breed);
    }
    else if (choice == 6) {
        let count = prompt('How many breeds do you want to compare?(2 or 3) ->')
        if(count == 2 || count == 3)
        {
            breed1 = prompt('Enter breed1 ->');
            breed2 = prompt('Enter breed2 ->');
            if(count == 3)
            {
                breed3 = prompt('Enter breed3 ->');
            }
            compare(count);
        }
        else{
            console.log("Please enter valid input(2 or 3)!!");
        }
        
    }
    else if(choice == 7)
    {
        cost();
    }
    else if (choice == 8 || choice == 14 || choice == 12 || choice == 13 || choice == 10) {
        if (choice == 8 || choice == 14) {
            location = prompt('Enter the location -> ');
        }
        main(choice);
    }
    else if(choice == 9)
    {
        findName();
    }
    else if(choice == 11)
    {
        let option = prompt('Press "A" to learn from article or press "V" to to learn from video -> ');
        if(option == 'A' || option == 'a' || option == 'V' || option == 'v')
        {
            training(option);
        }
        else
        {
            console.log("Please press the valid key!!");
        }
    }
    else {
        console.log("Please enter a valid choice!!");
    }
}

