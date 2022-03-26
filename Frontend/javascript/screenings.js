



async function loadOforScreenings(route) {

   
    let rawData = await fetch(route);
    
    let products = await rawData.json();
  
   
  
    
    let html = ' <h1 class="screeningh1">Ofor Salong</h1>';
    for (let product of products) {
      if(product.theatre=="cubana salong")
      continue;
      
     
      html += `
        <div class="screeningcontent">
        <span class="screenlabel">Movie: </span><span class="screendata">${product.film}</span>
        <br>
        <span class="screenlabel">ScreenTime: </span><span class="screendata">${product.time}</span>
        <br>
        <span class="screenlabel">ScreenDate: </span><span class="screendata">${product.date}</span>
        <br>
        <span class="screenlabel">Theatre: </span><span class="screendata">${product.theatre}</span>
        <br>
        <span class="screenlabel">Price: </span><span class="screendata">${product.price}</span>

        


         

        </div>
      `;
    }

  
    // grab the DOM element that has the class products
    // and replace its contents with our newly created html
    document.querySelector('.oforsalong').innerHTML = html;
  }
  
  async function loadCubanaScreenings(route) {

   
    let rawData = await fetch(route);
    
    let products = await rawData.json();
  
   
  
    
    let html = ' <h1 class="screeningh1">cubana Salong</h1>';
    for (let product of products) {
      if(product.theatre=="ofor salong")
      continue;
     
      html += `
        <div class="screeningcontent">
        <span class="screenlabel">Movie: </span><span class="screendata">${product.film}</span>
        <br>
        <span class="screenlabel">ScreenTime: </span><span class="screendata">${product.time}</span>
        <br>
        <span class="screenlabel">ScreenDate: </span><span class="screendata">${product.date}</span>
        <br>
        <span class="screenlabel">Theatre: </span><span class="screendata">${product.theatre}</span>
        <br>
        <span class="screenlabel">Price: </span><span class="screendata">${product.price}</span>
        


         

        </div>
      `;
    }

  
    
    document.querySelector('.cubanasalong').innerHTML = html;
  }

  loadCubanaScreenings("/api/screenings");
  loadOforScreenings("/api/screenings");

  
  