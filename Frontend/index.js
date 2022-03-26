const myApiKey="api_key=b8863baa788ec6a72b2dc119ebe4b22d";
const baseUrl="https://api.themoviedb.org/3/";
const myApiUrl=baseUrl + "discover/movie?sort_by=popularity.desc&" + myApiKey;
const imageUrl="https://image.tmdb.org/t/p/w500/";
const main=document.querySelector("#main");
const form=document.querySelector("#form");
const search=document.querySelector("#search");
const searchUrl=baseUrl+ "search/movie?&" +myApiKey;
const highRatedMovie=document.querySelector(".highlyratedmovies");
const screenings=document.querySelector(".screenings");
const trailers=document.querySelector(".trailers");
const bookticket=document.querySelector("BookTicket");
let movieclicked=document.querySelectorAll(".movie");
let descriptionTitle=document.querySelector(".titlefromdatabase");
let releaseDate=document.querySelector(".releasedatefromdatabase");
let originalLanguage=document.querySelector(".originallanguagefromdatabase");
let popularity=document.querySelector(".popularityfromdatabase");
let paragraph=document.querySelector(".movietext");
let mainTitle=document.querySelector(".mainTitle");
let movieClicked=document.querySelector(".movieclicked");
let date;
let time;
let title;
let price;
let theatre;
let email;
let sitstatus;
let counter;




async function loadAllMovies(route){
    let rawData=await fetch(route);
    let products=await rawData.json();
    console.log(products);


    
    main.innerHTML="";
      for(let product of products){
         
      
        const firstMovie=document.createElement("div");
        
        firstMovie.classList.add("movie");
        t=product.title;
       
        firstMovie.innerHTML=`
        <button type="button" onclick="myFunction(event)" class="btn btn-success buttonImage">${product.title}</button>
                <img src="${imageUrl+product.poster_path}" alt="${product.title}">

        
        
        <div class="movieDescription" ">
        <h3 class="movieh3">${product.title}</h3>
        <span >${product.vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
           ${product.overview};
        </div>
        `
        main.appendChild(firstMovie);
        
    }


}
    
    loadAllMovies("/api/availablemovies");
    
    
    
    
    
    
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const searchTerm=search.value;
        console.log(searchTerm);
        if(searchTerm){
            seePopularMovies(searchUrl+"&query="+searchTerm);
        }
    });



    async function checkHighRate(){
        let rawData=await fetch("/movies.json");
        let products=await rawData.json(); 
        main.innerHTML="";
          for(let product of products){
              console.log(product.vote_average);
            if(product.vote_average>7){
                
            
          
            const firstMovie=document.createElement("div");
            firstMovie.classList.add("movie");
            firstMovie.innerHTML=`<img src="${imageUrl+product.poster_path}" alt="${product.title}">
    
            
            
            <div class="movieDescription">
            <h3>${product.title}</h3>
            <span >${product.vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
               ${product.overview};
            </div>
            `
            main.appendChild(firstMovie);
    }
        
        
    
}
    }
    


    highRatedMovie.addEventListener("click", checkHighRate);





    function myFunction(e){
        window.scrollBy(0, 2000);
        e.target.innerHTML;
        loadMovieDescription( `/api/movies/availablemovies/${e.target.innerHTML} `);
       
        
       
    }
    async function loadMovieDescription(route){
        let rawData=await fetch(route);
        let products=await rawData.json();    
          paragraph.innerHTML=products.overview;
          mainTitle.innerHTML=products.title;
            descriptionTitle.innerHTML=products.title;
            releaseDate.innerHTML=products.release_date;
            originalLanguage.innerHTML=products.original_language;
            popularity.innerHTML=products.vote_average;
            movieClicked.style.visibility = "visible";

          }


          function bookingFunction(){
            window.scrollTo(0, 0);
            
            checkScreeningAndBook("/api/screenings");
             
             

        }


//load cubana salong for the particular movie
        async function checkScreeningAndBook(route){

          let rawData = await fetch(route);
    
    let products = await rawData.json();
  
   
  
    
    let html = `<div class="screeningsbody">

    <div class="cubanasalong" >
    <button class="theatreButton" onclick="bookingFunction2()" >view oforSalong</button>
     <h1 class="screeningh1"><span>Cubana Salong screening times</span>
     <br>
     <span>For ${mainTitle.innerText}
     </h1>`;
    for (let product of products) {
      if(product.film!=mainTitle.innerText|| product.theatre=="ofor salong")
      continue;
      
     
      html += `
        <div class="screeningcontent">
        <br>
        <span class="screenlabel">Movie: </span><span class="screendatafilm">${product.film}</span>
        <br>
        <span class="screenlabel">ScreenTime: </span><span class="screendatatime">${product.time}</span>
        <br>
        <span class="screenlabel">ScreenDate: </span><span class="screendatadate">${product.date}</span>
        <br>
        <span class="screenlabel">Theatre: </span><span class="screendatatheatre">${product.theatre}</span>
        <br>
        <span class="screenlabel">Price: </span><span class="screendataprice">${product.price}</span>
        <br>
        <button id="${product.id}" type="button"  class="btn btn-success cubanaSelect" onclick="booker(this)">select</button>


         

        </div>
      `;
    }

  html=html+ "</div>"
  main.innerHTML=html;
        }



   //on click for ofor salong screenings for the particular movie  
  async function updateOforSalong(route){

    let rawData = await fetch(route);

let products = await rawData.json();




let html2 = `<div class="screeningsbody">

<div class="oforsalong">
<button class="theatreButton" onclick="bookingFunction()" >view cubana salong</button>

<h1 class="screeningh1"><span>Ofor Salong screening times</span>
<br>
<span>For ${mainTitle.innerText}
</h1>`;
for (let product of products) {
if(product.film!=mainTitle.innerText|| product.theatre=="cubana salong")
continue;


html2 += ` 
  <div class="screeningcontent">
  <br>
  <span class="screenlabel">Movie: </span><span class="screendatafilm">${product.film}</span>
  <br>
  <span class="screenlabel">ScreenTime: </span><span class="screendatatime">${product.time}</span>
  <br>
  <span class="screenlabel">ScreenDate: </span><span class="screendatadate">${product.date}</span>
  <br>
  <span class="screenlabel">Theatre: </span><span class="screendatatheatre">${product.theatre}</span>
  <br>
  <span class="screenlabel">Price: </span><span class="screendataprice">${product.price}</span>
  <button type="button" id="${product.id}" class="btn btn-success oforSelect" onclick="booker(this)" >select</button>

  </div>
`;
}

html2=html2+ "</div>"

main.innerHTML=html2;
}
//used to update ofor salong
function bookingFunction2(){
 
  
  updateOforSalong("/api/screenings");
   
   

}


function booker(element){
  requiredid=element.id;
  
 
      checkseats( "/api/screenings/"+requiredid);
     let compare1=document.querySelector(".ploginStatus").innerText;
     let compare2="you are not logged in yet"
     if(compare1==compare2){
alert("you are not logged in yet")
     }
     

      
      else{
        document.querySelector(".container").innerHTML="";
        createSeats();
        window.scroll(0,4000);
      }
      
}
     
async function checkseats(route){
  let rawData=await fetch(route);
    let products=await rawData.json();
     date=products.date;
 time=products.time;
 title=products.
 price;
 theatre;
 email;
 sitstatus
   
    
      
}


function createSeats(){
  let col;
for( let j=1; j<9;j++){
const mainRowDiv=document.createElement("div");
mainRowDiv.classList.add("row");
mainRowDiv.classList.add(`row${j}`);


for(let i=1;i<9;i++){
  counter=counter+1;
 col=document.createElement("div");
 
col.classList.add("seat");
col.classList.add(`column${i}`);

col.classList.add(`seat${i}`);

mainRowDiv.appendChild(col);
document.querySelector(".container").appendChild(mainRowDiv);

}

}





let alldivs=document.querySelectorAll(".row");
console.log(alldivs);
}




/*
 let requestBody2 = {};
    requestBody2[element.name] = ;


*/









