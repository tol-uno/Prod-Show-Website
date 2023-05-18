
let designer = new URL(document.location).searchParams.get("designer");
var titleLength = 0;


// PARSE JSON DATA. FUNCTION USED BY renderProjects()
async function getJsonData() { // Taken from: https://www.javascripttutorial.net/javascript-fetch-api/
    let url = "assets/designer-data.json";
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}



// GET CORRECT DESIGNER JSON DATA. LOAD THEIR PROJECTS TEXT AND IMAGES
async function renderProjectPage() {
    let jsonData = await getJsonData();

    designerObject = (jsonData.Designers.find(object => object["Full Name"] === designer));
    console.log(designerObject);

    // ADJUST SIZE OF TITLE TEXT TO FILL SPACE BUT NOT WRAP
    var titleLength = designerObject["Project Title"].length;
    document.querySelector("#project-title").style.fontSize = getTitleSize(titleLength);
    function getTitleSize(length) { 
        let string = 180/length;
        if (string > 16) {string = 16}
        if (string < 11) {string = 11}
        string = string + "vw";
        return string;
    }
    

    document.querySelector("#designer").innerHTML = `By ${designer}`;
    document.querySelector("#project-title").innerHTML = designerObject["Project Title"];
    // document.querySelector("#project-summary").innerHTML = designerObject["Project Summary"];
    document.querySelector("#project-description").innerHTML = designerObject["Project Description"];

    // Get how many images are in the folder then create a for loop to add them? 
    //Or just test if image exists before trying to add it
    
    document.querySelector("#hero-image").src = `assets/images/${designerObject["Full Name"]}/image1.jpg`;

    document.querySelector("#images-container").innerHTML = `
        <img src="assets/images/${designerObject["Full Name"]}/image2.jpg" alt="image 2">
        <img src="assets/images/${designerObject["Full Name"]}/image3.jpg" alt="image 3">
    `;

    document.querySelector("#designer-name").innerHTML = designerObject["Full Name"];
    document.querySelector("#headshot").src = `assets/images/${designerObject["Full Name"]}/headshot.jpg`;

}


function onWindowResize() { // Set sizes of stuff

}

onWindowResize();
renderProjectPage();
