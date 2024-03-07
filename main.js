//Reaching elements with variables
const main = document.querySelector('#main');
const footer = document.querySelector('#footer');
const searchForm = document.querySelector('#search-form');

//Keys
const johnKey = '42129869-dc478a785dd85fbec059c7ef2';
const brianKey = '42149569-386fe2868d6733db199f6e4c1';

//Create content-container div
let contentContainer = document.createElement('div');
contentContainer.setAttribute('id', 'content-container');

//Create div for buttons
let buttonDiv = document.createElement('div');
buttonDiv.setAttribute('id', 'buttons');

//Designed buttons (not rly button)
let nextNotButton = document.createElement('a');
let nextNotButtonSpan = document.createElement('span');
let previousNotButton = document.createElement('a');
let previousNotButtonSpan = document.createElement('span');

//Attributes for notbuttons
nextNotButton.setAttribute('class', 'design-buttons');
previousNotButton.setAttribute('class', 'design-buttons');
nextNotButtonSpan.setAttribute('class', 'design-buttons-span');
previousNotButtonSpan.setAttribute('class', 'design-buttons-span');

// Picture load "counter"
let start = 0;
let stop = 9;
let allHits = [];
let perPage = 200;
let page = 1;


async function search() {
    //Reaching elements with variables
    let searchPhrase = document.querySelector('#search-bar').value;
    let searchColor = document.querySelector('#color-selector').value;

    if (searchColor == 'any color') {
        searchColor = 'red|black|orange|yellow|white|brown|blue|pink|purple|green|grey|turquoise';
    }
    //Api things
    for (let i = 0; i < 3; i++) {

        let response = await fetch(`https://pixabay.com/api/?key=${brianKey}&page=${page}&q=${searchPhrase}&colors=${searchColor}&image_type=photo&per_page=${perPage}`);
        let json = await response.json();
        allHits = allHits.concat(json.hits);
        page++;
    }


    console.log(allHits.length);
    //https://pixabay.com/api/?key=42149569-386fe2868d6733db199f6e4c1&q=red+cat&image_type=photo&per_page=200

    //Load content-container div
    main.appendChild(contentContainer);
}

async function load() {

    for (let i = start; i <= stop; i++) {

        //Find data from array
        let img = allHits[i].previewURL;
        let tag = allHits[i].tags;
        let user = allHits[i].user;
        //Create (invisible) elements
        let imgElement = document.createElement('img');
        let tagParagraph = document.createElement('p');
        let userParagraph = document.createElement('p');
        let pictureContainer = document.createElement('div');

        //Create divs for <p>s
        let picInfo = document.createElement('div');
        picInfo.setAttribute('class', 'text-info');

        //Attribute for <p>
        tagParagraph.setAttribute('class', 'tags');
        userParagraph.setAttribute('class', 'users')

        //Set attribue for div container
        pictureContainer.setAttribute('id', 'picture-container');

        //Set data for the invisible elements recently created
        imgElement.src = img;
        tagParagraph.textContent = "Tags: " + tag;
        userParagraph.textContent = "User: " + user;

        //Show elements
        pictureContainer.appendChild(imgElement);
        pictureContainer.appendChild(picInfo);
        picInfo.appendChild(tagParagraph);
        picInfo.appendChild(userParagraph);
        contentContainer.appendChild(pictureContainer);
    }
    footer.appendChild(buttonDiv);

    //New design "buttons"
    buttonDiv.appendChild(previousNotButton);
    buttonDiv.appendChild(nextNotButton);
    nextNotButton.appendChild(nextNotButtonSpan);
    previousNotButton.appendChild(previousNotButtonSpan);

    nextNotButtonSpan.textContent = 'Next';
    previousNotButtonSpan.textContent = 'Prev';
}

async function remove() {
    for (let i = 0; i < 10; i++) {
        let contentContainer = document.querySelector('#picture-container');

        if (contentContainer) {
            contentContainer.remove();
        }
    }
}

searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    start = 0;
    stop = 9;
    remove();
    await search(); //Get Json
    load(); // Load data
    checkButtons();

});
//Functions for buttons
nextNotButton.onclick = function () {
    if (stop < allHits.length - 1) {
        start = start + 10;
        stop = stop + 10;
        remove();
        load();
        checkButtons();
    }
};
previousNotButton.onclick = function () {
    if (start > 0) {
        start = start - 10;
        stop = stop - 10;
        remove();
        load();
        checkButtons();
    }
};

async function checkButtons() {
    if (start > 0) {
        previousNotButton.classList.remove('disabled');

    } else {
        previousNotButton.classList.add('disabled');
    }

    if (stop < allHits.length - 1) {
        nextNotButton.classList.remove('disabled');
    } else {
        nextNotButton.classList.add('disabled');
    }
}
