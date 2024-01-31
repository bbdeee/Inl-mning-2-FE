async function start(){
    let response = await fetch ('https://pixabay.com/api?key=42129869-dc478a785dd85fbec059c7ef2&q=yellow+flower&image_type=photo');
    let json= await response.json();

    let tag = json.total;
    let p = document.querySelector('p');
    p.textContent = tag;

    let firstimg= json.hits[0];

    let imgElement = document.createElement('img');
    imgElement.src = firstimg.previewURL;
    
    document.body.append(imgElement);
}

start();
