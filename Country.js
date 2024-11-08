let map;
let lngArr = '';
let lngStr ='';

export default class Country{
    constructor(element)
    {
        this.name = element.name.common;
        this.pop = element.population;
        this.currency = element.currencies;
        // console.log(this.currency);
        this.currency =  Object.keys(this.currency)[0];
        // console.log(this.currency);
        this.borders = element.borders;
        this.region = element.region;
        this.capital = element.capital[0];
        this.image = element.flags.png;
        this.latlng  = element.latlng;
        this.language = Object.keys(element.languages).join(',').split(',');
        // console.log(this.language);
        
        this.language.forEach((lng,i)=>{
            // console.log(lng);
            // console.log(this.language.length);
            
            if (i != this.language.length - 1 && this.language.length > 1)
                lngStr+= `${element.languages[lng]},`;
            else lngStr+= element.languages[lng];

        })
        // console.log(lngStr);
        
        this.language = lngStr;
        lngStr = '';
            
     
        
        
        

        
    }

        
    
    render(){
        let lsdata = localStorage.getItem('countriesHome');
        let div = document.createElement('div');
        // div.style.height ='fit-content';
        div.className =  'col-4 mb-5 '; 
        let innerDiv = document.createElement('div');
        innerDiv.className = 'bg-css border border-2 ';
        innerDiv.style.width = 'fit-content';
        innerDiv.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 1), 0 -3px 5px rgba(255, 255, 255, 0.3)";
        let p = document.createElement('p');
        p.innerText = this.name;
        p.style.color = 'black';
        let i = document.createElement('img');
        i.width = "160";
        i.height = "140";
        i.alt = this.name;
        i.src = this.image;
        innerDiv.append(i,p);
        div.append(innerDiv);
        document.querySelector("#photos").append(div);
        

        innerDiv.addEventListener('click',()=>{
            document.querySelector('#borders').innerHTML = '';
            showLightBox(this.image, this.name,this.latlng);
        })
        const showLightBox = (_src,_alt,_latlng) =>{
            
            // console.log("test");
            // document.querySelector('#borders').innerHTML = '';

            let lightBox = document.querySelector("#id_lightbox");
            lightBox.style.display = "flex";
            this.borders = this.borders.filter(border => border != 'PSE');
            this.borders.forEach(e => {
                let a = document.createElement('a');
                
                a.href = '#';
                a.innerText = e;
                a.style.padding = '5px';
                a.style.textDecoration = 'underline';
                
                
                let filterdData = JSON.parse(lsdata).filter(i=>i.cca3 == e );
                // console.log(filterdData);
                
                a.innerText = filterdData[0].name.common;
                document.querySelector('#borders').append(a);

                a.addEventListener('click',()=>Country.lightboxRender(e));
                
                
                
                
            });
            lightBox.querySelector("#country-img").src = _src;
            lightBox.querySelector("h2").innerHTML = _alt;
            lightBox.querySelector('#Pop').innerText = `population : ${this.pop}`;
            lightBox.querySelector('#region').innerText = `region : ${this.region}`;
            lightBox.querySelector('#Languages').innerText = `languages : ${this.language}`;
            lightBox.querySelector('#Coin').innerText = `Coin : ${this.currency}`;
            lightBox.querySelector('#Capital').innerText = `Capital : ${this.capital}`;


            Country.mapCreate(this.latlng[0],this.latlng[1],this.name);
            
          
          }

        // let closeBtn = document.querySelector('#closeBtn');
        // closeBtn.addEventListener('click',() => map.remove()); 
        
        
        
          
        
    }
    static makePages(){
        let bigDiv = document.querySelector('#photos');
        let countryNodeList = bigDiv.querySelectorAll('.col-4');

        console.log(countryNodeList);
        if(countryNodeList.length > 9)
        {
            document.querySelector('main').style.cssText = 'background-repeat: repeat;  background-size: contain; height:auto;';
        }
        else document.querySelector('main').style.cssText = 'background-repeat: no-repeat;  background-size: cover; height:100vh;';

        

    }
    handleBorders(arr){
       
        let a = document.createElement('a');
        a.href = '#';
        a.innerText = arr.name.common;
        a.style.padding = '5px';
        a.style.textDecoration = 'underline';
        
        document.querySelector('#borders').append(a);
        a.addEventListener('click',()=>Country.lightboxRender(arr.cca3))
        
        
    }
    static lightboxRender(e){
        document.querySelector('#borders').innerHTML = '';
                    
                    let filterdData = JSON.parse(localStorage.getItem('countriesHome')).filter(i=>i.cca3 == e );
                    let c = new Country(filterdData[0]);
                    filterdData = JSON.parse(localStorage.getItem('countriesHome')).filter(i=>c.borders.includes(i.cca3));
                    console.log(filterdData);
                    
                    filterdData.forEach(i=>c.handleBorders(i));
                    let lightBox = document.querySelector("#id_lightbox");
                    lightBox.querySelector("#country-img").src = c.image;
                    lightBox.querySelector("h2").innerHTML = c.name;
                    lightBox.querySelector('#Pop').innerText = `population : ${c.pop}`;
                    lightBox.querySelector('#region').innerText = `region : ${c.region}`;
                    
             
                    lightBox.querySelector('#Languages').innerText = `languages : ${c.language}`;
                    lngStr = '';
                    lightBox.querySelector('#Coin').innerText = `Coin : ${c.currency}`;
                    lightBox.querySelector('#Capital').innerText = `Capital : ${c.capital}`;

                    Country.mapCreate(c.latlng[0],c.latlng[1],c.name);

    }
    static mapCreate(lat,lon,name){

        if(map) map.remove();    
        map = L.map('map').setView([lat, lon], 4);
        
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri, OpenStreetMap contributors'}).addTo(map);
        
        L.marker([lat, lon]).addTo(map)
        .bindPopup(`you in ${name}`)
        .openPopup();
        } 
        


        

}