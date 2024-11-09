window.onload = () => doApi();
const doApi = async() =>{
    let url = 'https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,population,cca3,currencies,region,capital,borders';
    let resp = await fetch(url);
    let data = await resp.json(); 
    // console.log(data);
    
    
    manageApi(data);
    
}
const manageApi = (j) =>{
    let NamesArr = ["united states","united kingdom","israel","france","thailand"];
    let filterdJson =  j.filter(i =>
         NamesArr.includes(i.name.common.toLowerCase())
    );
    
    
    const nodeList = document.querySelectorAll('img');
    console.log(nodeList[0].src);
    
    nodeList.forEach((n,i)=>{
        i = i%5;
        n.width = '50';
        n.src = filterdJson[i].flags.png;
        

    })
    const searchBar = ()=>{
        let input = document.getElementById('#input-control');
        console.log(input);
        
        
        
    }
 
    
    
    // nodeList.forEach((node,index) =>{
    //     node.src = filterdJson.flags.png;
    //     console.log(node.src);
        
    // }
    // )

}