const apiKey = 'zFw4SlBr50zQc9NzKjb6zxkSGRlZGH05yLmjTwykySR4VbDTGc8NGx5Q';
let pageNumber = 1;
const pageSize = 20;
let htmlString = '';
let apiURL = `https://api.pexels.com/v1/curated?page=${pageNumber}&per_page=${pageSize}`;

const loadMore = document.querySelector('#load-more');
const searchTarget = document.querySelector('#search-filter');
const searchBtn = document.querySelector('#search-btn');

let img_link = "";      // for storing image link to download.

// Function to get images and append the images into HTML.
function getImages(URL) {
    loadMore.classList.add("disabled");
    loadMore.textContent = "Loading...";

    fetch(URL, {
        headers: { Authorization: apiKey }
    })
        .then(response => response.json())
        .then((data) => {
            for (let i = 0; i < (data.photos).length; i++) {        // Loop for getting the image url and making a image inside li tag
                // Creating the html for the photos
                htmlString += ` <li class="card" onclick="show_preview('${data.photos[i].src.large2x}', '${data.photos[i].photographer}');">
                <img src="${data.photos[i].src.large2x}" alt="img">
                </li>`
            }
            console.log(document.querySelector('.images').innerHTML);
            document.querySelector('.images').innerHTML += htmlString;      // Appending the fetched photos to the gallery.

            loadMore.classList.add("enabled");
            loadMore.textContent = "Load More";
        });
}


/* -----------  Function to implement the functionality of load-more button --------------- */
function load_more_function() {
    loadMore.classList.add("disabled");
    loadMore.textContent = "Loading...";

    pageNumber++;
    let apiURL = `https://api.pexels.com/v1/curated?page=${pageNumber}&per_page=${pageSize}`;
    getImages(apiURL);

    loadMore.classList.add("enabled");
    loadMore.textContent = "Load More";
}


/* ----------- Function to filter images by searched keyword ----------------- */
function getSearchedImages() {
    let target = document.querySelector('#search-filter').value;
    if (target) {
        htmlString = "";
        document.querySelector('.images').innerHTML = "";
        let apiURL = `https://api.pexels.com/v1/search?query=${target}?page=1&per_page=20`;
        getImages(apiURL);
    }
    else {
        alert("Search field cannot be empty!!");
    }
}

/* ------------ Function to show preview of image clicked --------------- */
function show_preview(img, photographer) {
    let preview = document.querySelector('.wrapper');
    preview.querySelector("img").src = img;
    preview.querySelector("span").innerText = photographer;
    document.querySelector('.preview-container').style.display = "block";
    console.log(photographer);
    img_link = img;
}

// To hide the preview of the image.
document.querySelector('#exit-btn').addEventListener("click", () => {
    document.querySelector('.preview-container').style.display = "none";
})


/* ------------  Function to download the image ------------- */
function downloadImg(imageUrl) {
    fetch(imageUrl)
        .then(res => res.blob())
        .then(file => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = "image.jpeg"; // Set a default filename with extension
            link.click();
        })
        .catch(() => {
            alert("Failed to download image!!");
        });
}

getImages(apiURL);
loadMore.addEventListener("click", load_more_function);
searchBtn.addEventListener("click", getSearchedImages);