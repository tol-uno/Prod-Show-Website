

// COOL TEMPLATING FUNCTION. NOT NEEDED THOUGH

// async function getTemplatedHTML() {
//     fetch("test.html")
//         .then(response => {
//             return response.text()
//         })
//         .then(data => {
//             document.querySelector(".include-test").innerHTML = data;
//         });
// }




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
        newProjectItem.href = `project.html?designer=${designer["Full Name"]}`; // Needs to point to correct project page.
       
        
        newProjectItem.innerHTML = `
                        <img src="assets/images/${designer["Full Name"]}/thumbnail.jpg" alt="project thumbnail missing">
                        <h4>${designer["Project Title"]}</h4>
                        <h5>${designer["Full Name"]}</h5>`;

        projectsGrid.appendChild(newProjectItem);
    });
}

// renderProjects();





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
