async function start(){
    let response = await fetch ('https://pixabay.com/api?key=42129869-dc478a785dd85fbec059c7ef2&q=yellow+flower&image_type=photo');
    let json= await response.json();

    let tag = json.total;
    let p = document.querySelector('p');
    p.textContent = tag;

    let imgElement = document.createElement('img');
    imgElement.src = 'https://media.istockphoto.com/id/183764567/sv/foto/colorful-daisies-focus-on-madeira-deep-rose-marguerite-daisy.jpg?s=1024x1024&w=is&k=20&c=8G6G4BCsepq-DbWsFRVHmY-rrhocYstqkh6yQV5EDpU='
    
    document.main.append(imgElement);
}

start();
