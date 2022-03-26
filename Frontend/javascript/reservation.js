const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = 99;


/*function populateUI() {
    
          seat.classList.add("selected");
        }
        movieSelect.addEventListener("change", (e) => {
          ticketPrice = +e.target.value;
          setMovieData(e.target.selectedIndex, e.target.value);
          updateSelectedCount();
        });
        */
        
        container.addEventListener("click", (e) => {
          if (
            e.target.classList.contains("seat") &&
            !e.target.classList.contains("sold")
          ) {
            e.target.classList.toggle("selected");
            alert(e.target.classList);
        
            updateSelectedCount();
          }
        });
        movieSelect.addEventListener("change", (e) => {
          ticketPrice = +e.target.value;
          setMovieData(e.target.selectedIndex, e.target.value);
          updateSelectedCount();
        });
        
       /* container.addEventListener("click", (e) => {
          if (
            e.target.classList.contains("seat") &&
            !e.target.classList.contains("sold")
          ) {
            e.target.classList.toggle("selected");
        
            updateSelectedCount();
          }
        });
        */
        function updateSelectedCount() {
          const selectedSeats = document.querySelectorAll(".row .seat.selected");
        
        
        
          const selectedSeatsCount = selectedSeats.length;
        
          count.innerText = selectedSeatsCount;
          total.innerText = selectedSeatsCount * ticketPrice;
        
        }

        for(var i=0; i<document.querySelectorAll(".seat").length; i++){
          document.querySelectorAll(".seat")[i].addEventListener("click", function(e){
            if (
              !e.target.classList.contains("sold")
            ) {
              e.target.classList.toggle("selected");
          
              updateSelectedCount();
            }
          
        
        });
        }
        
        

      
    


     