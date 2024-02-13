//Global Variables
const dogBar = document.querySelector("div#dog-bar");
const goodDogBtn = document.querySelector('button#good-dog-filter');
const dogCard = document.querySelector('div#dog-info');
let puppies = document.querySelectorAll('div#dog-bar span');

//Add Event Listeners
document.addEventListener("DOMContentLoaded", init())
goodDogBtn.addEventListener('click', (e) => {
    switchButton(e);
    sortDogs();
})

//Functions
function init() {
    //Code to run after DOM has loaded
    fetchPups();
}
function fetchPups() {
    fetch(`http://localhost:3000/pups`)
    .then(res => res.json())
    .then(pups => {
        for (let pup of pups) {
            doggoBtn(pup);
        }
    })
}
function doggoBtn(doggo) {
    let btn = document.createElement("span");
    btn.innerText = doggo.name;
    btn.id = doggo.id;
    btn.name = doggo.name;
    btn.isGoodDog = doggo.isGoodDog;
    btn.image = doggo.image;
    btn.addEventListener('click', postDog)
    dogBar.appendChild(btn);
}
function switchButton(e) {
    if (e.target.innerText === 'Filter good dogs: OFF') {
        e.target.innerText = 'Filter good dogs: ON';
    } else {
        e.target.innerText = 'Filter good dogs: OFF';
    }
}
function sortDogs() {
    if (goodDogBtn.innerText === 'Filter good dogs: ON') {
        for (let pup of puppies) {
            if (pup.isGoodDog === false) {
                pup.style.display = 'none';
            }
        }
    } else {
        for (let pup of puppies) {
            pup.style.display = '';
        }
    }
}
function postDog(e) {
    dogCard.innerHTML = "";
    dogCard.number = e.target.id;
    let name = document.createElement('h2')
    name.innerText = e.target.innerText;
    dogCard.appendChild(name);
    let image = document.createElement('img');
    image.src = e.target['image'];
    dogCard.appendChild(image);
    let btn = document.createElement('button');
    if (e.target['isGoodDog']) {
        btn.innerText = 'Good Dog'
    } else {
        btn.innerText = 'Bad Dog'
    }
    dogCard.appendChild(btn);
    btn.addEventListener('click', rateDog)
}
function rateDog(e) {
    let puppy = e.target.parentNode;
    if (e.target.innerText === 'Good Dog') {
        e.target.innerText = 'Bad Dog';
    } else {
        e.target.innerText = 'Good Dog'
        puppy.isGoodDog = true;
    }
    console.log(puppy);
    fetch(`http://localhost:3000/pups/${puppy.number}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(puppy)
    })
    .then(response => response.json())
    .then(object => console.log(object))
    sortDogs();
}