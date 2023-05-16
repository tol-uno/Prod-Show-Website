/*

JSON Data for each project and designer
    Full Name
    Personal Bio
    Instagram
    Email
    Website
    Project Title
    Project Description
    Project Youtube Video URL


Assets in individual folders (EACH IMAGE MUST BE UNDER 250KB)
    Headshot Image
    Thumbnail Image (512 x 512)
    Project Hero Image
    Project Suplement Image 1
    Project Suplement Image 2

*/



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

// LOOP THROUGH JSON DATA AND ADD PROJECTS THUMBNAILS TO PROJECTS SECTION
async function renderProjects() {
    let jsonData = await getJsonData();
    const projectsGrid = document.querySelector(".projects-grid");

    // ADD THE PROJECT ITEM HTML
    jsonData.Designers.forEach(designer => {
        // console.log(designer);

        let newProjectItem = document.createElement("a");
        newProjectItem.classList.add("project-item");
        newProjectItem.href = "#sec-crew"; // Needs to point to correct project page.
       
        // This works just need to figure out slugs
        // projectPageLink = "https://you" + "tube.com" + designer["Full Name"];
        // console.log(projectPageLink);

        newProjectItem.innerHTML = `
                        <img src="assets/images/${designer["Full Name"]}/thumbnail.jpg" alt="project thumbnail missing">
                        <h3>${designer["Project Title"]}</h3>
                        <h4>${designer["Full Name"]}</h4>`;

        projectsGrid.appendChild(newProjectItem);
    });
}

renderProjects();





// LOAD THE CORRECT ASPECT RATIO VIDEO
//get all vids on the page
var video =  document.querySelectorAll('video')

//add source to video tag
function addSourceToVideo(element, src) {
    var source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';
    // console.log(src);
    element.appendChild(source);
}

//determine screen size and select mobile or desktop vid
function whichSizeVideo(element, src) {
    var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    if (windowWidth > 768) {
        addSourceToVideo( element, src.dataset.desktopVid);
    } else {
        addSourceToVideo(element, src.dataset.mobileVid);
    }
}

//init only if page has videos
function videoSize() {
    if (video !== undefined) {
    video.forEach(function(element, index) {
            whichSizeVideo(
                element, //element
                element  //src locations
            );	
        });
    }
}
videoSize();
