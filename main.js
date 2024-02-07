//Reaching elements with variables
const main = document.querySelector('#main');
const footer = document.querySelector('#footer');
const searchForm = document.querySelector('#search-form');
//Keys
const johnKey = '42129869-dc478a785dd85fbec059c7ef2';
const brianKey = '42149569-386fe2868d6733db199f6e4c1';
//Create the invisble buttons
let previousButton = document.createElement('button');
let nextButton = document.createElement('button');
previousButton.setAttribute('class', 'bottom-buttons');
nextButton.setAttribute('class', 'bottom-buttons');
//Create content-container div
let contentContainer = document.createElement('div');
contentContainer.setAttribute('id', 'content-container');
//Create div for buttons
let buttonDiv = document.createElement('div');
buttonDiv.setAttribute('id', 'buttons');
// Picture load "counter"
let start = 0; 
let stop = 9; 
//create json to be able assign it in search() and use it in load()
let json = null;

async function search(){
    //Reaching elements with variables
    let searchPhrase = document.querySelector('#search-bar').value;
    let searchColor = document.querySelector('#color-selector').value;
    //Api things
    let response = await fetch ('https://pixabay.com/api?key='+brianKey+'&q='+ searchColor +'+' + searchPhrase +'&image_type=photo');
    let json= await response.json();

    //Load content-container div
    main.appendChild(contentContainer);
    return json;
}

async function load(json){
    
    for(let i = start; i <= stop; i++){
        
        //Find data from array
        let img = json.hits[i].webformatURL;
        let tag = json.hits[i].tags;
        let user = json.hits[i].user;
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
        pictureContainer.appendChild(picInfo);
        picInfo.appendChild(userParagraph);
        picInfo.appendChild(tagParagraph);  
        pictureContainer.appendChild(imgElement);
        contentContainer.appendChild(pictureContainer);
    }
    //Append div
    footer.appendChild(buttonDiv);
    //Text for buttons
    previousButton.textContent = 'Previous page';
    nextButton.textContent = 'Next page';
    //Show buttons
    buttonDiv.appendChild(previousButton);
    buttonDiv.appendChild(nextButton); 
}

async function remove(){
    for(let i = 0; i < 10; i++){
        let contentContainer = document.querySelector('#picture-container'); 

        if(contentContainer){
            contentContainer.remove();
        }
    }  
}

searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    start = 0;
    stop = 9;
    remove();
    json = await search(); //Get Json
    load(json); // Load data

});
//Functions for buttons
nextButton.onclick = function(){
    if(stop < json.hits.length -1){
        console.log("Next");
        start = start + 10; 
        stop = stop + 10; 
        remove();
        load(json);
    }
};
previousButton.onclick = function(){
    console.log("Previous");
    if(start > 0){
        start = start - 10; 
        stop = stop - 10; 
        remove();
        load(json);
    }
};

//1. Any color!!!!
//2. Css