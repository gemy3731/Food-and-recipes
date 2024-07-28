// ----------------------SideBar--------------------
let closs = $(".clossIcon");
let open = $(".openIcon");
$(closs).on("click",function(){
   $("nav").animate({left :`-${$(".sideBar").innerWidth()}px`},500)
   $(closs).addClass("d-none")
   $(open).removeClass("d-none")
});
$(open).on("click",function(){
   $("nav").animate({left :`0px`},500)
   $(open).addClass("d-none")
   $(closs).removeClass("d-none")
});

// ------------------Home------------------

async function homeMeals(){
   $(".loader").addClass("d-flex")
   $(".loader").removeClass("d-none")
   let myHttps = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
   let data = await myHttps.json();
   if (data) {
      load()
      displayMeals(data.meals);
      $("main .item").on("click",function(e){
      detailMeals(e.currentTarget.id);
   });
   }
   
}
homeMeals()
function displayMeals(data) {
   let container = "";
   for (let i = 0; i < data.length; i++) {
      container += `<div class="col-md-3">
                    <div id="${data[i].idMeal}" class="position-relative item itemHovered overflow-hidden rounded-3">
                        <img src="${data[i].strMealThumb}" class="w-100 rounded-3" alt="">
                        <div class="layer position-absolute start-0 end-0 top-0 bottom-0 bg-light bg-opacity-75 ">
                            <h4 class="d-flex align-items-center text-black h-100 ms-2">${data[i].strMeal}</h4>
                        </div>
                    </div>
                </div>`
   }
   $(".mainMeals").html(container);
}
// ---------------------Details-------------------
async function detailMeals(id){
   $(".loader").addClass("d-flex")
   $(".loader").removeClass("d-none")
   let myHttps = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
   let data = await myHttps.json();
   if (data) {
      load();
      displayDetails(data.meals[0]);
   }
}

function displayDetails(data) { 
   $("main").addClass("d-none");
   $("#ingredient").addClass("d-none");
   $("#areaMeal").addClass("d-none");
   $("#area").addClass("d-none");
   $("#onecategory").addClass("d-none");
   $("#categories").addClass("d-none");
   $("#ingredientMeal").addClass("d-none");
   $("#contact").addClass("d-none");
   $("#search").addClass("d-none");
   $("#details").removeClass("d-none")
   let ingredient = '';
   for (let i = 0; i < 20; i++) {
      if (data[`strIngredient${i}`]) {
         ingredient +=  `<span class="badge text-bg-secondary me-4 mb-3 text-black bg-white">${data[`strIngredient${i}`]}</span>`
      }
   }
      let container = `<div class="col-md-4">
      <img src="${data.strMealThumb}" class="w-100" alt="">
      <h3>${data.strMeal}</h3>
   </div>
   <div class="col-md-8">
      <h3>Instructions</h3>
      <p>${data.strInstructions}</p>
      <h4>Area : ${data.strArea}</h4>
      <h4>Category : ${data.strCategory}</h4>
      <h4>Recipes :
          <div class="mt-3">
              ${ingredient}
          </div>
      </h4>
      <h4>Tags :
          <div class="mt-3">
              <a  class="text-decoration-none" target = "_blanck" href="${data.strSource}">
                  <button class="btn btn-success">Source</button>
              </a>
              <a class="text-decoration-none" target = "_blanck" href="${data.strYoutube}">
                  <button class="btn btn-danger">Youtube</button>
              </a>
          </div>
      </h4>
   </div>`
   $(".detailMeals").html(container);
 }


// --------------------categories----------------


async function catMeals() {
   $(".loader").addClass("d-flex")
   $(".loader").removeClass("d-none")
   let myHttps = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
   let data = await myHttps.json();
   if (data) {
      load();
      displayCat (data.categories);
   }
   
}

function displayCat (data){
   $("main").addClass("d-none");
   $("#ingredient").addClass("d-none");
   $("#areaMeal").addClass("d-none");
   $("#area").addClass("d-none");
   $("#onecategory").addClass("d-none");
   $("#details").addClass("d-none");
   $("#ingredientMeal").addClass("d-none");
   $("#contact").addClass("d-none");
   $("#search").addClass("d-none");
   $("#categories").removeClass("d-none");
   let container = "";
   for (let i = 0; i < data.length; i++) {
      container += `<div class="col-md-3 col-12">
                       <div id="${data[i].strCategory}" class="catItem itemHovered position-relative overflow-hidden">
                        <img src="${data[i].strCategoryThumb}" class="w-100" alt="">
                        <div class="layer text-black text-center position-absolute bottom-0 top-0 end-0 start-0 bg-light bg-opacity-75 p-2">
                            <h3>${data[i].strCategory}</h3>
                            <p>${data[i].strCategoryDescription.split(" ").splice(0,20).join(" ")}</p>
                        </div>
                       </div>
                </div>`
   }
   $(".catMeals").html(container);
   $(".catItem").on("click",function(e){
      oneCat(e.currentTarget.id)
   })
}




$("#catLink").click(function(){
   catMeals();
})





async function oneCat(cat) {
   $(".loader").addClass("d-flex")
   $(".loader").removeClass("d-none")
   let myHttps = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
   let data = await myHttps.json();
   if (data) {
      load()
      displayOneCat(data.meals.slice(0,20));
      $(".oneCatItem").on("click",function(e){
         detailMeals(e.currentTarget.id);
      });
   }
}
function displayOneCat(data){
   $("main").addClass("d-none");
   $("#ingredient").addClass("d-none");
   $("#areaMeal").addClass("d-none");
   $("#area").addClass("d-none");
   $("#categories").addClass("d-none");
   $("#details").addClass("d-none");
   $("#ingredientMeal").addClass("d-none");
   $("#contact").addClass("d-none");
   $("#search").addClass("d-none");
   $("#onecategory").removeClass("d-none");
   console.log(data);
   let container = "";
   for (let i = 0; i < data.length; i++) {
      container +=`<div class="col-md-3 col-12">
                    <div id="${data[i].idMeal}" class="oneCatItem itemHovered position-relative overflow-hidden">
                        <img src="${data[i].strMealThumb}" class="w-100" alt="">
                        <div class="layer text-black text-center position-absolute bottom-0 top-0 end-0 start-0 bg-light bg-opacity-75 p-2 d-flex align-items-center">
                            <h3>${data[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`
   }
   $(".oneCatMeals").html(container);
}


// ------------------------Area----------------

async function area() {
   $(".loader").addClass("d-flex")
   $(".loader").removeClass("d-none")
   let myHttps = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
   let data = await myHttps.json();
   if (data) {
      load()
      displayArea(data.meals)
   }

}
$("#areaLink").on("click",function(){
   area()
})
function displayArea(data){ 
   $("main").addClass("d-none");
   $("#ingredient").addClass("d-none");
   $("#areaMeal").addClass("d-none");
   $("#onecategory").addClass("d-none");
   $("#categories").addClass("d-none");
   $("#details").addClass("d-none");
   $("#ingredientMeal").addClass("d-none");
   $("#contact").addClass("d-none");
   $("#search").addClass("d-none");
   $("#area").removeClass("d-none");
   let container = "";
   for (let i = 0; i < data.length; i++) {
      container +=`<div class="col-md-3">
                        <div id="${data[i].strArea}" class="areaSelected text-center d-flex align-items-center justify-content-center flex-column">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>${data[i].strArea}</h3>
                        </div>
                    </div>`
   }
   $(".area").html(container);
   $(".areaSelected").on("click",function(e){
      areaMeals(e.currentTarget.id)
   })
 }

 async function areaMeals(area) {
   $(".loader").addClass("d-flex")
   $(".loader").removeClass("d-none")
   let myHttps = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
   let data = await myHttps.json();
   if(data){
      load()
      displayAreaMeals(data.meals.slice(0,20))
      $(".areaItem").on("click",function(e){
         detailMeals(e.currentTarget.id);
      });
   }
   }
function displayAreaMeals(data) {
   $("main").addClass("d-none");
   $("#ingredient").addClass("d-none");
   $("#area").addClass("d-none");
   $("#onecategory").addClass("d-none");
   $("#categories").addClass("d-none");
   $("#details").addClass("d-none");
   $("#ingredientMeal").addClass("d-none");
   $("#contact").addClass("d-none");
   $("#search").addClass("d-none");
   $("#areaMeal").removeClass("d-none");
   let container = "";
   for (let i = 0; i < data.length; i++) {
      container += `<div class="col-md-3">
                        <div id="${data[i].idMeal}" class="areaItem itemHovered position-relative overflow-hidden">
                            <img src="${data[i].strMealThumb}" class="w-100" alt="">
                            <div class="layer text-black text-center position-absolute bottom-0 top-0 end-0 start-0 bg-light bg-opacity-75 p-2 d-flex align-items-center">
                                <h3>${data[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>`
   }
   $(".areaMeal").html(container);
}


// ----------------------Ingredient--------------------


async function ingredient(){ 
   $(".loader").addClass("d-flex")
   $(".loader").removeClass("d-none")
   let myHttps = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
   let data = await myHttps.json();
   if (data) {
      load()
      displayIngredient(data.meals.slice(0,20))
   }
 }

 $("#IngredientLink").on("click",function(){
   ingredient()
})

 function displayIngredient(data) {
   $("main").addClass("d-none");
   $("#areaMeal").addClass("d-none");
   $("#area").addClass("d-none");
   $("#onecategory").addClass("d-none");
   $("#categories").addClass("d-none");
   $("#details").addClass("d-none");
   $("#contact").addClass("d-none");
   $("#search").addClass("d-none");
   $("#ingredientMeal").addClass("d-none");
   $("#ingredient").removeClass("d-none");
   let container = "";
   for (let i = 0; i < data.length; i++) {
      container += `<div class="col-md-3">
                <div id="${data[i].strIngredient}" class="ingredientItem d-flex flex-column justify-content-center align-items-center text-center">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${data[i].strIngredient}</h3>
                    <p>${data[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
                </div>
            </div>`
   }
   $(".ingredient").html(container);
   $(".ingredientItem").on("click",function(e){
      ingredientMeal(e.currentTarget.id)
   })
 }

 async function ingredientMeal(ingredient){ 
   $(".loader").addClass("d-flex")
   $(".loader").removeClass("d-none")
   let myHttps = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
   let data = await myHttps.json();
   if (data) {
      load()
      displayIngredientMeal(data.meals.slice(0,20))
      $(".ingredientItem").on("click",function(e){
         detailMeals(e.currentTarget.id);
      });
   }
 }
 
 function displayIngredientMeal(data){
   $("main").addClass("d-none");
   $("#areaMeal").addClass("d-none");
   $("#area").addClass("d-none");
   $("#onecategory").addClass("d-none");
   $("#categories").addClass("d-none");
   $("#details").addClass("d-none");
   $("#ingredient").addClass("d-none");
   $("#contact").addClass("d-none");
   $("#search").addClass("d-none");
   $("#ingredientMeal").removeClass("d-none");
   let container = "";
   for (let i = 0; i < data.length; i++) {
      container +=`<div class="col-md-3">
                <div id="${data[i].idMeal}" class="ingredientItem itemHovered position-relative overflow-hidden">
                    <img src="${data[i].strMealThumb}" class="w-100" alt="">
                    <div class="layer text-black text-center position-absolute bottom-0 top-0 end-0 start-0 bg-light bg-opacity-75 p-2 d-flex align-items-center">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
   }
   $(".ingredientMeal").html(container);
 }



// -------------------search---------------


let searchByNameInput = $(".searchByName")
let searchByLetterInput = $(".searchByFirstLetter")
$("#searchLink").on("click",function(e){
   $("main").addClass("d-none");
   $("#areaMeal").addClass("d-none");
   $("#area").addClass("d-none");
   $("#onecategory").addClass("d-none");
   $("#categories").addClass("d-none");
   $("#details").addClass("d-none");
   $("#ingredient").addClass("d-none");
   $("#ingredientMeal").addClass("d-none");
   $("#contact").addClass("d-none");
   $("#search").removeClass("d-none");
})
 async function searchByName(value){ 
   $(".loader").addClass("d-flex")
   $(".loader").removeClass("d-none")
   let myHttps = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
   let data = await myHttps.json();
   if (data) {
      load()
      displaySearchResult(data.meals);
      $(".searchItem").on("click",function(e){
         detailMeals(e.currentTarget.id);
      });
   }
 }

 $(searchByNameInput).on("input",function(e){
   searchByName($(e.target).val());
})

function displaySearchResult(data) {
   let container = "";
   for (let i = 0; i <data.length; i++) {
      container += `<div class="col-md-3">
                <div id="${data[i].idMeal}" class="searchItem itemHovered position-relative overflow-hidden">
                    <img src="${data[i].strMealThumb}" class="w-100" alt="">
                    <div class="layer text-black text-center position-absolute bottom-0 top-0 end-0 start-0 bg-light bg-opacity-75 p-2 d-flex align-items-center">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
      
   }
   $(".searchResult").html(container);
}


async function searchByFirstLetter(value){ 
   $(".loader").addClass("d-flex")
   $(".loader").removeClass("d-none")
   let x= value;
   let myHttps = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x=x==undefined?"a":x}`);
   let data = await myHttps.json();
   if (data) {
      load()
      displaySearchResult(data.meals)
      $(".searchItem").on("click",function(e){
         detailMeals(e.currentTarget.id);
      });

   }
 }

 $(searchByLetterInput).on("input",function(e){
   searchByFirstLetter($(e.target).val());
})




// -------------------------contact Us---------------


 let userName = $(".userName")
 let userEmail = $(".userEmail");
 let userPhone = $(".userPhone");
 let userAge = $(".userAge");
 let userPass = $(".userPass");
 let userRepass = $(".userRepass");

 let isNameValide = false;
 let isEmailValide = false;
 let isPhoneValide = false;
 let isAgeValide = false;
 let isPassValide = false;
 let isRepassValide = false;


 let nameRegex = /^[a-zA-Z\s]+$/;
 $(userName).on("input",function(){
    if (nameRegex.test(userName.val())) {
      userName.next().addClass("d-none");
      isNameValide = true;
    }else{
      userName.next().removeClass("d-none");
      isNameValide = false;
    }
    validation()
 })


 let emailRegex = /^([a-zA-Z0-9_\-\?]+)\@(yahoo|gmail)\.(com|net)$/;
 $(userEmail).on("input",function(){
   if (emailRegex.test(userEmail.val())) {
      userEmail.next().addClass("d-none");
      isEmailValide = true;
   }else{
      userEmail.next().removeClass("d-none");
      isEmailValide = false;
   }
   validation()
})

let phoneRegex = /^(\+2|2)?(010|012|011|015)[0-9]{8}$/;
$(userPhone).on("input",function(){
   if (phoneRegex.test(userPhone.val())) {
      userPhone.next().addClass("d-none");
      isPhoneValide = true;
   }else{
      userPhone.next().removeClass("d-none");
      isPhoneValide = false;
   }
   validation()
})

let ageRegex = /^([1-9]|[1-9][0-9])$/;
$(userAge).on("input",function(){
   if (ageRegex.test(userAge.val())) {
      userAge.next().addClass("d-none");
      isAgeValide = true;
   }else{
      userAge.next().removeClass("d-none");
      isAgeValide = false;
   }
   validation()
})

let passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
$(userPass).on("input",function(){
   if (passRegex.test(userPass.val())) {
      userPass.next().addClass("d-none");
      isPassValide = true;
   }else{
      userPass.next().removeClass("d-none");
      isPassValide = false;
   }
   validation()
})


$(userRepass).on("input",function(){
   
   if (userRepass.val()==userPass.val()) {
      userRepass.next().addClass("d-none");
      isRepassValide = true;
   }else{
      userRepass.next().removeClass("d-none");
      isRepassValide = false;
   }
   validation()
   
})


function validation(){
   
   if (isRepassValide&&isPassValide&&isAgeValide&&isPhoneValide&&isEmailValide&&isNameValide) {
      $(".submitBtn").removeClass("disabled");
   }else{
      $(".submitBtn").addClass("disabled");
   }
   
};

$("#contactLink").on("click",function(){
   $("main").addClass("d-none");
   $("#areaMeal").addClass("d-none");
   $("#area").addClass("d-none");
   $("#onecategory").addClass("d-none");
   $("#categories").addClass("d-none");
   $("#details").addClass("d-none");
   $("#ingredient").addClass("d-none");
   $("#ingredientMeal").addClass("d-none");
   $("#search").addClass("d-none");
   $(".loader").removeClass("d-flex")
   $(".loader").addClass("d-none")
   $("#contact").removeClass("d-none");
})
// --------------loading-------------
function load(){ 
      $(".loader").fadeOut(1000,function(){
         $(".loader").removeClass("d-flex")
      })
}







