//Reaching elements with variables
let main = document.querySelector('#main');
let footer = document.querySelector('#footer');
let searchForm = document.querySelector('#search-form');
//Keys
let johnKey = '42129869-dc478a785dd85fbec059c7ef2';
let brianKey = '42149569-386fe2868d6733db199f6e4c1';
//Create the invisble buttons
let previousButton = document.createElement('button');
let nextButton = document.createElement('button');

async function search(){
    //Reaching elements with variables
    let searchPhrase = document.querySelector('#search-bar').value;
    let searchColor = document.querySelector('#color-selector').value;
    //Api things
    let response = await fetch ('https://pixabay.com/api?key='+brianKey+'&q='+ searchColor +'+' + searchPhrase +'&image_type=photo');
    let json= await response.json();

    for(let hit in json.hits){
        //Find data from array
        let img = json.hits[hit].previewURL;
        let tag = json.hits[hit].tags;
        let user = json.hits[hit].user;
        //Create (invisible) elements
        let imgElement = document.createElement('img');
        let tagParagraph = document.createElement('p');
        let userParagraph = document.createElement('p');
        let contentContainer = document.createElement('div');

        //Set attribue for div container
        contentContainer.setAttribute('class', 'content-container');

        //Set data for the invisible elements recently created
        imgElement.src = img;
        tagParagraph.textContent = tag;
        userParagraph.textContent = user;

        //Show elements
        contentContainer.appendChild(tagParagraph);
        contentContainer.appendChild(userParagraph);
        contentContainer.appendChild(imgElement);
        main.appendChild(contentContainer);
    }
    //Text for buttons
    previousButton.textContent = 'Previous page';
    nextButton.textContent = 'Next page';
    //Show buttons
    footer.appendChild(previousButton);
    footer.appendChild(nextButton); 
}
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    search(); //Load image 

});
//Functions for buttons
nextButton.onclick = function(){
    console.log("Next");
};
previousButton.onclick = function(){
    console.log("Previous");
};