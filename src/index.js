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
 const longStringHtml =  listHtmlString(arr);


if (Number(arr.length) === 1){

  arr[0].languages = Object.values(arr[0].languages);
    console.log(itemHtmlString(arr[0]));
    countryInfo.innerHTML=itemHtmlString(arr[0])
return
}

countriyList.innerHTML = longStringHtml;
}


function eventHandler(e){
  countriyList.innerHTML='';
  countryInfo.innerHTML='';
console.log(e.target.value)

if (e.target.value.trim().length === 0){
  countriyList.innerHTML='';
  countryInfo.innerHTML='';
  return
 }
 console.log(e.target.value)

fetchCountries(e.target.value.trim())
.then(res => {
  console.log(res)
  if(res.length <= 10){
    domElemCreater(res)
  }else{
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
  }
})
.catch(rej =>{
  console.log(rej);
Notiflix.Notify.failure("Oops, there is no country with that name");
})

}  ;

input.addEventListener('input', debounce(eventHandler,500));