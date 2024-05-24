// alert("1. Click on food-image for information about that food. \n 2.Click on Add to Favourites Button to add the item in your list.");
//ACCESSING HTML ELEMENTS=============================================================
const searchBox = document.querySelector(".searchBox");
const mealItems = document.querySelector(".mealItems");
const searchBtn = document.querySelector(".searchBtn");
const favItems = document.querySelector(".favItems");
const favBtn1 = document.querySelector(".favBtn1");
const favBtn2 = document.querySelector(".favBtn2");
const favContent = document.querySelector(".favContent");
const favMeals = JSON.parse(localStorage.getItem('favouriteMeals')) || [];
//======================================================================================
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes('fav.html')) {
      renderFavouriteMeals();
  }
});


//FETCHING DATA FROM API===========================================================
async function fetchmeal(query) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const data = await response.json();
  console.log(data);
  return data.meals;
}
//======================================================================================







//REDERING ALL ITEMS====================================================================
async function renderItems(query) {
  const meals = await fetchmeal(query);
  mealItems.innerHTML = "";
  if (!meals) {
    mealItems.innerHTML =
      "<h2>No Meals Found Related to Your Search.. &#128564; </h2>";
  }
  meals.forEach((meal) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    
            <center><h5 class="card-title">${meal.strMeal}</h5></center>
            <a href="${meal.strSource}" target='_blank'>
            <div class="img">
              <img
                class="card-img"
                src="${meal.strMealThumb}"
                alt="${meal.strMeal}"
              />
            </div>
            </a>
            <div class="card-body">
                <center><button class="add">Add to favourites</button></center>
            </div>
          `;
          const addbtn = card.querySelector(".add");
          if (addbtn) {
            addbtn.addEventListener("click", (event) => {
              // event.preventDefault(); 
              
              addFav(meal);
              
              
            });
          }
    mealItems.appendChild(card);
  });
}
//======================================================================================






//EVENTLISTENERS TO UPDATE THE SEARCH===================================================
searchBox.addEventListener("input", () => {
  const query = searchBox.value.trim();
  if (query) {
    renderItems(query);
  } else {
    mealItems.innerHTML =
      "<h1 class='content'>Find Your Meal at Meal-Box &#128525;</h1>";
  }
});





//FUCTION TO ADD FAV IN YOUR LIST======================================================
function addFav(meal) {
  const Meal = favMeals.find(item => item.idMeal === meal.idMeal);
  if(!Meal){
    const newMeal = meal;
    favMeals.push(newMeal);
    localStorage.setItem('favouriteMeals', JSON.stringify(favMeals));
  }
  renderFavouriteMeals();
}

//======================================================================================







function renderFavouriteMeals() {
  favItems.innerHTML="";
  if(favMeals.length==0){
    favItems.innerHTML="<h1 class='favContent'>Ain't Added Anything Yet &#128564;</h1>";
    return;
  }

  favMeals.forEach((meal) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    
            <center><h5 class="card-title">${meal.strMeal}</h5></center>
            <a href="${meal.strSource}">
            <div class="img">
              <img
                class="card-img"
                src="${meal.strMealThumb}"
                alt="${meal.strMeal}"
              />
            </div>
            </a>
            <div class="card-body">
                <center><button class="del">Remove Item</button></center>
            </div>
          `;
          const delbtn = card.querySelector(".del");
          if (delbtn) {
            delbtn.addEventListener("click", (event) => {
              removeItem(meal);
            
            });
          }
    favItems.appendChild(card);
  });
}







//FUNCTION TO REMOVE ITEM FROM FAV LIST ===============================================
function removeItem(meal){
  favItems.innerHTML = "";
  const newMeals = favMeals.filter(item => item.idMeal !== meal.idMeal)
  localStorage.setItem('favouriteMeals', JSON.stringify(newMeals));
  renderFavouriteMeals();
  location.reload();
}
//======================================================================================
