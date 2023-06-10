
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
    
    document.querySelector("#hero-image").src = `assets/images/${designerObject["Full Name"]}/image1.jpg`;


    var imageContainer = document.querySelector("#images-container");

    function createImages() { // Loops through images and deletes ones that throw errors
        for (let i = 2; i <= 12; i++) {
            var img = document.createElement('img');
            img.src = `assets/images/${designerObject["Full Name"]}/image${i}.jpg`;
            imageContainer.appendChild(img);

            img.onerror = function() {
                // image did not load
                imageContainer.removeChild(imageContainer.lastElementChild)
            }
        }
    }

    createImages();

    // document.querySelector("#images-container").innerHTML = `
    //     <img src="assets/images/${designerObject["Full Name"]}/image2.jpg" alt="image 2">
    //     <img src="assets/images/${designerObject["Full Name"]}/image3.jpg" alt="image 3">
    //     <img src="assets/images/${designerObject["Full Name"]}/image4.jpg" alt="image 4">
    //     <img src="assets/images/${designerObject["Full Name"]}/image5.jpg" alt="image 5">
    //     <img src="assets/images/${designerObject["Full Name"]}/image6.jpg" alt="image 6">
    //     <img src="assets/images/${designerObject["Full Name"]}/image7.jpg" alt="image 7">
    //     <img src="assets/images/${designerObject["Full Name"]}/image8.jpg" alt="image 8">
    //     <img src="assets/images/${designerObject["Full Name"]}/image9.jpg" alt="image 9">
    //     <img src="assets/images/${designerObject["Full Name"]}/image10.jpg" alt="image 10">
    //     <img src="assets/images/${designerObject["Full Name"]}/image10.jpg" alt="image 11">
    //     <img src="assets/images/${designerObject["Full Name"]}/image10.jpg" alt="image 12">
    // `;




    document.querySelector("#headshot").src = `assets/images/${designerObject["Full Name"]}/headshot.jpg`;

    document.querySelector("#designer-name").innerHTML = designerObject["Full Name"];
    document.querySelector("#personal-bio").innerHTML = designerObject["Personal Bio"];
    document.querySelector("#email").innerHTML = designerObject["Email"];
    if ("Website" in designerObject) {
            document.querySelector("#website").innerHTML = designerObject["Website"].replace("https://","");
            document.querySelector("#website").href = designerObject["Website"];
        } else {
            document.querySelector("#website").remove()
        }
    
        if ("Second Website" in designerObject) {
            document.querySelector("#website2").innerHTML = designerObject["Second Website"].replace("https://","");
            document.querySelector("#website2").href = designerObject["Second Website"];
        } else {
            document.querySelector("#website2").remove()
        }
    
    
    if ("Instagram" in designerObject) {
        document.querySelector("#instagram").innerHTML = `Instagram: @${designerObject["Instagram"]}`;
        document.querySelector("#instagram").href = `https://www.instagram.com/${designerObject["Instagram"]}`;
    } else {document.querySelector("#instagram").remove();}

    if ("LinkedIn" in designerObject) {document.querySelector("#linkedin").href = designerObject["LinkedIn"];} else {document.querySelector("#linkedin").remove();}
    

}


function onWindowResize() { // Set sizes of stuff

}

onWindowResize();
renderProjectPage();
