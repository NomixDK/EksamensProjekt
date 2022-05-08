let currentScore = 0;
let click = 1;
let amount = 1;
let SPS = 0;
let tempDataTable;
//LEADERBOARD

/* DOESNT WORK
let dataTable = [
    { name: 'A', highscore: 1 },
    { name: 'B', highscore: 1 },
    { name: 'C', highscore: 1 },
    { name: 'D', highscore: 1 },
    { name: 'E', highscore: 1 },
];
*/ 

function loadTableData(dataTable) {
    const tableBody = document.getElementById("dataTable");
    let dataHtml = "";

    for (let user of dataTable) {
        dataHtml += `<tr><td>${user.name}</td><td>${user.score}</td></tr>`;
    }

    tableBody.innerHTML = dataHtml;
}

//SAVED VALUES
let name;
let currentScoreSaved;

//ON PAGE LOAD
function PageLoad() {

    //NAME ATTEMPT
    let tempname = localStorage.getItem("username");
    console.log(name);
    if (tempname == undefined) {
        console.log("new user");

        name = window.prompt("Enter name");
        while (name == null) {
            name = window.prompt("You didn't enter a new business name, enter new name");
        } if (name != null) {
            name = name + "'s flower business";
        }
        let tempHash = Math.random().toString(36).replace(/[^a-z, 0-9]+/g, '').substr(0, 20);
        localStorage.setItem("HashName", tempHash);
        document.getElementById("nameText").innerHTML = name;
        localStorage.setItem("username", name);
        insertHighscore();
    } else {
        name = localStorage.getItem("username");
        document.getElementById("nameText").innerHTML = name;
    }
    //LOAD OUR VALUES
    LoadValues();
}

//SUB FUNCTION TO LOAD VALUES
function LoadValues() {
    if (localStorage.getItem("tempcurrentScoreSaved") != undefined) {
        currentScore = parseInt(localStorage.getItem("tempcurrentScoreSaved"));
    }

    //LOAD UNITS
    if (localStorage.getItem("tempPlantContainers") != undefined) {
        PlantContainer.unitAmount = parseInt(localStorage.getItem("tempPlantContainers"));
    }
    if (localStorage.getItem("tempFrontGardens") != undefined) {
        FrontGarden.unitAmount = parseInt(localStorage.getItem("tempFrontGardens"));
    }
    
    if (localStorage.getItem("tempBackGardens") != undefined) {
        BackGarden.unitAmount = parseInt(localStorage.getItem("tempBackGardens"));
    }

    if (localStorage.getItem("tempGreenhouses") != undefined) {
        Greenhouse.unitAmount = parseInt(localStorage.getItem("tempGreenhouses"));
    }

    if (localStorage.getItem("tempCommunityGardens") != undefined) {
        CommunityGarden.unitAmount = parseInt(localStorage.getItem("tempCommunityGardens"));
    }

    if (localStorage.getItem("tempFields") != undefined) {
        Field.unitAmount = parseInt(localStorage.getItem("tempFields"));
    }

    if (localStorage.getItem("tempCountries") != undefined) {
        Country.unitAmount = parseInt(localStorage.getItem("tempCountries"));
    }

    if (localStorage.getItem("tempContinents") != undefined) {
        Continent.unitAmount = parseInt(localStorage.getItem("tempContinents"));
    }

    if (localStorage.getItem("tempPlanets") != undefined) {
        Planet.unitAmount = parseInt(localStorage.getItem("tempPlanets"));
    }
    console.log("LOADED");
    Update();
}

//SAVE
function Save() {
    localStorage.setItem("tempcurrentScoreSaved", currentScore);
    localStorage.setItem("tempPlantContainers", PlantContainer.unitAmount);
    localStorage.setItem("tempFrontGardens", FrontGarden.unitAmount);
    localStorage.setItem("tempBackGardens", BackGarden.unitAmount);
    localStorage.setItem("tempGreenhouses", Greenhouse.unitAmount);
    localStorage.setItem("tempCommunityGardens", CommunityGarden.unitAmount);
    localStorage.setItem("tempFields", Field.unitAmount);
    localStorage.setItem("tempCountries", Country.unitAmount);
    localStorage.setItem("tempContinents", Continent.unitAmount);
    localStorage.setItem("tempPlanets", Planet.unitAmount);

    updateHighscore();
    window.alert("Saved");
    console.log("SAVED");
}

//SCORE SYSTEM
function insertHighscore() {

    let data = {
        name: localStorage.getItem("username"),
        score: localStorage.getItem("tempPlantContainers"),
        hash: localStorage.getItem("HashName")
    }

    fetch('./highscore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Highscore inserted:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function updateHighscore() {

    let data = {
        name: localStorage.getItem("username"),
        score: localStorage.getItem("tempPlantContainers"),
        hash: localStorage.getItem("HashName")
    }

    fetch('./highscore', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Highscore updated:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function getHighscores() {
    fetch('./highscores')
        .then(response => response.json())
        .then(data => alert(JSON.stringify(data)));
}


//RENAME
function Rename() {
    name = window.prompt("Enter new name");
        while (name == null) {
            name = window.prompt("You didn't enter a new business name, enter new name");
    } if (name != null) {
        name = name + "'s flower business";
    }
    document.getElementById("nameText").innerHTML = name;
    localStorage.setItem("username", name);
}

//CLEAR STORAGE
function ClearStorage() {
    let answer = window.prompt("Enter 'CONFIRM' if you are sure.");
    if (answer == "CONFIRM") {
        localStorage.clear();

        console.log("STORAGE CLEARED");
        window.alert("Progress wiped");
    } else {
        window.alert("Your progress remains");
    }
}

//CANVAS
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
console.log(canvas);
const flower1 = document.getElementById('source1');

//
class FallingFlower {
    constructor(x,y, speed) {
        this.x = x;
        this.y = y;
        this.speed;
    }

    draw() {
        ctx.drawImage(flower1, this.x, this.y-10, 20, 10)

    }

    update() {

        this.y += 1;
    }

}

const flowers = [];
function animate() {
    requestAnimationFrame(animate)
    flowers.forEach((flower, flowerIndex) => {
        flower.update();
        flower.draw();

        let dy = _flower1.y;
        if (dy > canvas.height) {
            flowers.splice(flowerIndex, 1)
            console.log("flowerdeleted");
        }
    })
 
}
animate()

//CLASS FOR OUR UNITS
class Unit {
    constructor(unitPrice, unitMultiplier, unitAmount) {
        this.unitAmount = unitAmount;
        this.unitPrice = unitPrice;
        this.unitMultiplier = unitMultiplier;
    }

    generate() {
        currentScore += this.unitAmount * this.unitMultiplier;
        Update();
    }

    buy() {
        if (currentScore >= (1 + .15 * (this.unitAmount + amount)) * this.unitPrice * amount) {
            console.log("Bought unit: " + amount + " For: " + (1 + .15 * (this.unitAmount + amount)) * this.unitPrice * amount);
            currentScore -= (1 + .15 * (this.unitAmount + amount)) * this.unitPrice  * amount;
                this.unitAmount += amount;
                Update();
                console.log(this.unitAmount);
        }

    }

}
//FLOWERS
let _flower1 = new FallingFlower(0, 0)
_flower1.draw()
//DEFINE OUR UNITS
let PlantContainer = new Unit(100,1,0)
let FrontGarden = new Unit(1100, 8, 0)
let BackGarden = new Unit(12000, 47, 0)
let Greenhouse = new Unit(130000, 260, 0)
let CommunityGarden = new Unit(1400000, 1400, 0)
let Field = new Unit(20000000, 7800, 0)
let Country = new Unit(330000000, 44000, 0)
let Continent = new Unit(5100000000, 260000, 0)
let Planet = new Unit(75000000000, 1600000, 0)

//AMOUNT CHANGE
function AmountChange() {
    if (amount == 1) {
        amount = 10;
    } else if (amount == 10) {
        amount = 100;
    } else {
        amount = 1;
    }
    Update();
    console.log(amount);
    document.getElementById("amountBtn").innerHTML = "Buy amount: " + amount;
}

//CLICK ON IMAGE
function Clicker() {
    currentScore += click;
    Update();
    let tempx = Math.floor(Math.random() * canvas.width) + 1;
    flowers.push(
        new FallingFlower(tempx,
            0,
            20,
            10,
            5)
    )
    console.log("CLICKING");
}

//UPDATE
function Update() {

    //SCORE UPDATE
    document.getElementById("ScoreText").innerHTML = parseInt(currentScore);
    SPS = 10 * (PlantContainer.unitAmount * PlantContainer.unitMultiplier +
        FrontGarden.unitAmount * FrontGarden.unitMultiplier +
        BackGarden.unitAmount * BackGarden.unitMultiplier +
        Greenhouse.unitAmount * Greenhouse.unitMultiplier +
        CommunityGarden.unitAmount * CommunityGarden.unitMultiplier +
        Field.unitAmount * Field.unitMultiplier +
        Country.unitAmount * Country.unitMultiplier +
        Continent.unitAmount * Continent.unitMultiplier +
        Planet.unitAmount * Planet.unitMultiplier);

    document.getElementById("ScoreText2").innerHTML = "SPS: " + parseInt(SPS);

    //SHOP UPDATE
    document.getElementById("amountBtn").innerHTML = "Buy amount: " + amount;

    document.getElementById("PlantContainerText").innerHTML = parseInt((1 + .15 * (amount + PlantContainer.unitAmount)) * PlantContainer.unitPrice * amount);
    document.getElementById("PlantContainerText2").innerHTML = PlantContainer.unitAmount;

    document.getElementById("FrontGardenText").innerHTML = parseInt((1 + .15 * (amount + FrontGarden.unitAmount)) * FrontGarden.unitPrice * amount);
    document.getElementById("FrontGardenText2").innerHTML = FrontGarden.unitAmount;

    document.getElementById("BackGardenText").innerHTML = parseInt((1 + .15 * (amount + BackGarden.unitAmount)) * BackGarden.unitPrice * amount);
    document.getElementById("BackGardenText2").innerHTML = BackGarden.unitAmount;

    document.getElementById("GreenhouseText").innerHTML = parseInt((1 + .15 * (amount + Greenhouse.unitAmount)) * Greenhouse.unitPrice * amount);
    document.getElementById("GreenhouseText2").innerHTML = Greenhouse.unitAmount;

    document.getElementById("CommunityGardenText").innerHTML = parseInt((1 + .15 * (amount + CommunityGarden.unitAmount)) * CommunityGarden.unitPrice * amount);
    document.getElementById("CommunityGardenText2").innerHTML = CommunityGarden.unitAmount;

    document.getElementById("FieldText").innerHTML = parseInt((1 + .15 * (amount + Field.unitAmount)) * Field.unitPrice * amount);
    document.getElementById("FieldText2").innerHTML = Field.unitAmount;

    document.getElementById("CountryText").innerHTML = parseInt((1 + .15 * (amount + Country.unitAmount)) * Country.unitPrice * amount);
    document.getElementById("CountryText2").innerHTML = Country.unitAmount;

    document.getElementById("ContinentText").innerHTML = parseInt((1 + .15 * (amount + Continent.unitAmount)) * Continent.unitPrice * amount);
    document.getElementById("ContinentText2").innerHTML = Continent.unitAmount;

    document.getElementById("PlanetText").innerHTML = parseInt((1 + .15 * (amount + Planet.unitAmount)) * Planet.unitPrice * amount);
    document.getElementById("PlanetText2").innerHTML = Planet.unitAmount;
}
Update();

//GENERATE
function Generation() {

    PlantContainer.generate();
    FrontGarden.generate();
    BackGarden.generate();
    Greenhouse.generate();
    CommunityGarden.generate();
    Field.generate();
    Country.generate();
    Continent.generate();
    Planet.generate();
    Update();
}


var myInterval = setInterval(function () {
    Generation();
    console.log("looping")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}, 100);

var myInterval2 = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}, 1000/60);