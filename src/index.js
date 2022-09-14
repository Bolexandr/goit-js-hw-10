import './css/styles.css';
import { fetchCountries } from "./js/fetchCountries";
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import listHtmlString from './templates/list.hbs';
import itemHtmlString from './templates/item.hbs';

const input = document.querySelector('input');
const countriyList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
 
function domElemCreater (arr){
  countriyList.innerHTML='';
  countryInfo.innerHTML='';

     const longStringHtml = arr.map(obj => `<li class="countryItem"><img class="countryItem_img" src="${obj.flags.svg}"><p class="countryItem_text">${obj.name.official}</p></li>`).join('');


if (Number(arr.length) === 1){
  console.log(arr[0])
  countryInfo.innerHTML=`<span class="countryName"><span><img class="countryImg" width="70" src="${arr[0].flags.svg}"></span><span><h2>${arr[0].name.official}</h2></span></span>
  <p class="countryData"><span class="countryData_bold">Capital: </span>${arr[0].capital}</p>
  <p class="countryData"><span class="countryData_bold">Population: </span>${arr[0].population}</p>
  <p class="countryData"><span class="countryData_bold">Languages:</span>${Object.values(arr[0].languages).join(',')}</p>`
return
}

countriyList.innerHTML = longStringHtml;
}

function alertNotiflixBild(arr){
  if(arr.length>=10){
    Notiflix.Notify.info('Cogito ergo sum')
  }
}

function eventHandler(e){
  countriyList.innerHTML='';
  countryInfo.innerHTML='';
console.log(e.target.value)

 if (e.target.value.trim().length === 1){
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
  countriyList.innerHTML='';
  countryInfo.innerHTML='';
  return
 }

fetchCountries(e.target.value.trim())

.then(res => {
  if(res.length >=10){
     Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
     let newRes = []
     for (let i = 0; i<10; i+=1){
newRes.push(res[i])
     }
     domElemCreater(newRes)
  }else{
    domElemCreater(res)
  }
 

})
.catch(rej =>{
Notiflix.Notify.failure("Oops, there is no country with that name");
})

}  ;

input.addEventListener('input', debounce(eventHandler,500));