getIndividualDogBreed();

let dogBreedDefault;
let getBtnRefresh = document.querySelector('button');
getBtnRefresh.addEventListener('click', getIndividualDogBreed);
getBtnRefresh.textContent = "Ny bild!";

let getPlaceforImgs = document.querySelector('#insurtDogBreedImgs');
let createdLiForUl;

let getBreedPlace = document.querySelector('#headDogBreedsContainer'); 
let getAllDogBreeds;

getAllBreed();
function getAllBreed() {
  let requestBreed = new XMLHttpRequest();
  requestBreed.addEventListener('load', renderDogBreedMenue);
  let urlStr = 'https://dog.ceo/api/breeds/list/all';
  requestBreed.open('GET', urlStr);
  requestBreed.send();
}
function renderDogBreedMenue() {
  let getParsedListOfAllBreed = JSON.parse(this.responseText);
  getParsedListOfAllBreed = getParsedListOfAllBreed['message'];

  
  let checkIfAnyChildNode = document.querySelector('#headDogBreedsContainer').textContent;

  for (let listAllBreed in getParsedListOfAllBreed) {
    if (checkIfAnyChildNode === "") {
      getAllDogBreeds = listAllBreed;

      
      let getBigLetterAllDogBreeds = getAllDogBreeds.charAt(0).toUpperCase() + getAllDogBreeds.slice(1);

      createdLiForUl = document.createElement('li');
      createdLiForUl.setAttribute('class', 'dogBreedBox');

      
      let createdPForLiInUl = document.createElement('p');
      

      createdPForLiInUl.addEventListener('click', function(){
       window.location.hash = 'breed-' + listAllBreed;
       getIndividualDogBreed(getBigLetterAllDogBreeds);
      });

      createdPForLiInUl.textContent = getBigLetterAllDogBreeds;
      createdLiForUl.appendChild(createdPForLiInUl);
      getBreedPlace.appendChild(createdLiForUl);
    }
    getSubBreeds = getParsedListOfAllBreed[listAllBreed];
    let createdSubUlForLi = document.createElement('ul');
    createdSubUlForLi.setAttribute('class', 'subBreed');

      
      for (let i = 0; i < getSubBreeds.length; i++) {
      if (checkIfAnyChildNode === "") {
        let insurtSubBreeds = getSubBreeds[i];
        
        let insurtBigLetterSubBreeds = insurtSubBreeds.charAt(0).toUpperCase() + insurtSubBreeds.slice(1);

        let createdSubLiForUl = document.createElement('li');
        createdSubLiForUl.setAttribute('class', 'subBreedIteam');
          createdSubLiForUl.addEventListener('click', function(){
         window.location.hash = 'breed-' + listAllBreed + '/' + insurtSubBreeds;
         getIndividualDogBreed(insurtBigLetterSubBreeds);
        });
        createdSubLiForUl.textContent = insurtBigLetterSubBreeds;
        createdSubUlForLi.appendChild(createdSubLiForUl);
        createdLiForUl.appendChild(createdSubUlForLi);
      }
    }
  }
}

function getIndividualDogBreed(getBigLetterAllDogBreeds, insurtBigLetterSubBreeds){
  let urlStr;
  let getBreedStrAddressBar = location.hash;
  let getDogBreedsStrPlace = document.querySelector('#presentDogBreed');

  
  let getBreedStr = getBreedStrAddressBar.split('#breed-')[1];

  let requestImgs = new XMLHttpRequest();
  requestImgs.addEventListener('load', getIndividualDogBreedImgs);
  let getHeadDogStr;
  let getSubDogStr;

  if (getBreedStr) {
    let getBreedStrIntoArr = getBreedStr.replace("/", " ").split(' ');
    let getHeadDogBreedStr = getBreedStrIntoArr[0];
    let getHeadDogStr = getHeadDogBreedStr.charAt(0).toUpperCase() + getHeadDogBreedStr.slice(1);


    for (let i = 1; i < getBreedStrIntoArr.length; i++) {
      let getSubdDogBreedStr = getBreedStrIntoArr[i];
      getSubDogStr = getSubdDogBreedStr.charAt(0).toUpperCase() + getSubdDogBreedStr.slice(1);
    }
    if (getBreedStr.includes('/')) {
      getDogBreedsStrPlace.textContent = 'Bild på ' + getHeadDogStr + ' --> ' + getSubDogStr;
    }
    else getDogBreedsStrPlace.textContent = 'Bild på ' + getHeadDogStr;
    urlStr = 'https://dog.ceo/api/breed/' + getBreedStr + '/images/random';
  }
  else urlStr = 'https://dog.ceo/api/breeds/image/random';

  requestImgs.open('GET', urlStr);
  requestImgs.send();
}
function getIndividualDogBreedImgs() {
  let getParsedListOfAllBreed = JSON.parse(this.responseText);

  let getParsedImgsOfAllBreed = getParsedListOfAllBreed['message'];
  getPlaceforImgs.setAttribute('src', getParsedImgsOfAllBreed);
}
