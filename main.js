let main = document.querySelector('#main');
let footer = document.querySelector('#footer');
let searchForm = document.querySelector('#search-form');

async function search(){
    let searchPhrase = document.querySelector('#search-bar').value;
    let searchColor = document.querySelector('#color-selector').value;

    let response = await fetch ('https://pixabay.com/api?key=42129869-dc478a785dd85fbec059c7ef2&q='+ searchColor +'+' + searchPhrase +'&image_type=photo');
    let json= await response.json();

    

    for(let hit in json.hits){
        let img = json.hits[hit].previewURL;
        let tag = json.hits[hit].tags;
        let user = json.hits[hit].user;

        let imgElement = document.createElement('img');
        let tagParagraph = document.createElement('p');
        let userParagraph = document.createElement('p');

        imgElement.src = img;
        tagParagraph.textContent = tag;
        userParagraph.textContent = user;

        main.appendChild(tagParagraph);
        main.appendChild(userParagraph);
        main.appendChild(imgElement);

        /*let previousButton = document.createElement('button');
        let nextButton = document.createElement('button');

        footer.appendChild(previousButton);
        footer.appendChild(nextButton);*/
    }

    
}
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    search(); //Load image 

});