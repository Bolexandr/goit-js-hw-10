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
  console.log(rej);
Notiflix.Notify.failure("Oops, there is no country with that name12222221");
})

}  ;

input.addEventListener('input', debounce(eventHandler,500));