const breedsList = document.getElementById('breedsList')
const imageList = document.getElementById('imageList')

const allbreeds = []
fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(data => {
        let out = ''
        const keys = Object.keys(data.message)
        keys.forEach(eachbreed => {

            allbreeds.push(eachbreed)
            i = 0;
            out += `
                <div class="col-lg-2">
                    <a href="#show" class="btn btn-outline-primary mt-3" onClick="exe('${eachbreed}')"">${eachbreed}</a>
                </div>
            `;
            i += 1;
        });
        breedsList.innerHTML = out;
    })

async function exe(breed) {
    await fetch(`https://dog.ceo/api/breed/${breed}/images/random/10`)
        .then(res => res.json())
        .then(data => {
            let result = ""
            if (!data.status === 'success') {
                result += `
                    <h3>Sorry no images found</h3>
                `;
            }

            let selectedBreed = document.getElementById('selectedBreed')
            selectedBreed.innerHTML = `${breed}`
            document.querySelector('#show .container').insertBefore(selectedBreed, document.querySelector('#show .container').childNodes[0])


            const imageData = Object.values(data.message);
            result = "";
            imageData.forEach(img => {
                result += `
                <div class="col-lg-6 mt-3">
                    <img src="${img}" alt="" class="img-fluid img-thumbnail">
                </div>
            
                `;
            })
            imageList.innerHTML = result;

        })
}

const breedForm = document.getElementById('breedForm')


breedForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const breedInput = document.getElementById('breedInput').value;
    fetch(`https://dog.ceo/api/breed/${breedInput}/images/random/10`)
        .then(res => {
            if (res.status >= 200 && res.status <= 299) {
                return res.json()
            } else {
                throw Error(res.statusText)
            }
        })
        .then(data => {
            document.getElementById('dogNotFound').innerHTML = ""
            let selectedBreed = document.getElementById('selectedBreed')
            selectedBreed.innerHTML = `${breedInput}`
            document.querySelector('#show .container').insertBefore(selectedBreed, document.querySelector('#show .container').childNodes[0])


            const imageData = Object.values(data.message);
            result = "";
            imageData.forEach(img => {
                result += `
            <div class="col-lg-6 mt-3">
                <img src="${img}" alt="" class="img-fluid img-thumbnail">
            </div>
        
            `;
            })
            imageList.innerHTML = result;
        })
        .catch(err => {
            document.getElementById('dogNotFound').innerHTML = "dog not found try searching other breed"
        })

})