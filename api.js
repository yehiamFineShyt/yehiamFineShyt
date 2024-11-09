import Country from "./Country.js";
window.onload = ()=> {
    renderLightBox();
    declareCloseLightBox();
    doApiSearchBar();
    doApi();



}
const doApiSearchBar = () =>{
    
    let searchInput = document.querySelector('form').querySelector('input');
    searchInput.addEventListener('input',()=>{
        doApi();   
        Country.makePages();
    });
    
    
}
const declareCloseLightBox = ()=>{
    let lightBox = document.querySelector('#id_lightbox');
    let lightBoxinside = document.querySelector(".lightbox-inside");
    let btn = lightBoxinside.querySelector('button'); 
    btn.addEventListener("click",()=>{
      lightBox.style.display = "none";
    })
}

const renderLightBox= ()=>{
  document.body.innerHTML += `
  <div id="id_lightbox" class="light-box">
  <div class="lightbox-inside">
   <div id="big-sector">
   <section id="section-1">
    <div id="map" style="width: 500px; height: 500px;"></div>
  </section>
  <section id="section-2">
  <img id="country-img"  src="images/layers-2x.png">
  <h2>Good cake</h2>
<div id="border-div">
        <p id="borders" class="display-6">border with States:</p>
 </div>
  <p id="Pop" class="display-6">ddd </p>
  <p id="region" class="display-6">ddd</p>
  <p id="Languages" class="display-6">ddd</p>
  <p id="Coin" class="display-6">ddd</p>
  <p id="Capital" class="display-6">dddd</p>
  </section>
  </div>
  <br>
<button id="closeBtn">close</button>
</div>`;

}   

const doApi = async() =>{
    let searchBar = document.querySelector('form').querySelector('input');
    let url = '';
    let data;
    let re = new RegExp('^[a-zA-Z\s]*$');
    // conditon if search bar is empty
    //if empty we dont change any
    //if not url is different than what we have now
    let localStorageHomeData = localStorage.getItem('countriesHome');
    if (localStorageHomeData && !searchBar.value.trim()){
        manageApi(JSON.parse(localStorageHomeData));
    }
    else if(localStorageHomeData && searchBar.value.trim()){
        if(re.test(searchBar.value.trim())){
            manageApi(JSON.parse(localStorageHomeData));
        }
        else{
            document.querySelector('#photos').innerHTML = '<h1 style="color: white;">Could not find the requested country... pls try again</h1>';

        }
    }
    else{
        console.log("test api request");
        
        
        if (re.test(searchBar.value.trim())){
        
        
            if(!searchBar.value.trim()){
                url = 'https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,population,cca3,currencies,region,capital,borders,latlng,languages';
                
            }
            else {
                url = `https://restcountries.com/v3.1/name/${searchBar.value}`;
                
            }
            
            let resp = await fetch(url);
            data = await resp.json();
            data = data.filter(e => e.name.common != 'Palestine');
        
        
                
                
            localStorage.setItem('countriesHome', JSON.stringify(data));
            manageApi(data);
                
            }  
        else            
            document.querySelector('#photos').innerHTML = '<h1 style="color: white;">Could not find the requested country... pls try again</h1>';

    }
       
        
        
    }
    // if(!localStorageHomeData){
    //     // console.log(searchBar.value);
        
    //     if(!searchBar.value.trim()){
    //         url = 'https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,population,cca3,currencies,region,capital,borders';
    //     }
    //     else{ 
    //         url = `https://restcountries.com/v3.1/name/${searchBar.value}`;
    // }
        
    //     let resp = await fetch(url);
    //     let data = await resp.json(); 
    //     localStorage.setItem('countriesHome', JSON.stringify(data));
    //     // console.log(data);
    //     manageApi(data);
    // }
    // else {
    //     // double call for apis with two different local storages
    //     document.querySelector("#photos").innerHTML = '';
    //     manageApi(JSON.parse(localStorageHomeData));
    // }
    

const manageApi = (j) =>{
    
    let searchBar = document.querySelector('form').querySelector('input');
    document.querySelector('#photos').innerHTML = ''; 
    if(!searchBar.value.trim()){
        let NamesArr = ["united states","united kingdom","israel","france","thailand"];
        let filterdJson =  j.filter(i =>
             NamesArr.includes(i.name.common.toLowerCase())
            );
        // console.log(filterdJson);
        moveApiToClass(filterdJson);
    }

    else{
        
        let filteredJson = j.filter(e => e.name.common.toLowerCase().includes(searchBar.value.toLowerCase()));
        // console.log(filteredJson);
        
        if(filteredJson.length == 0)
        {
            // console.log('dwd');
            
            document.querySelector('#photos').innerHTML = '<h1 style="color: white;">Could not find the requested country... pls try again</h1>';
        }
        else{
            moveApiToClass(filteredJson);
        }
           
     
    }
        
    
}
const moveApiToClass = (fjson) =>{
    fjson.forEach(element => {
        let c = new Country(element);
        c.render();
    });
    
    
}