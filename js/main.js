let submitBtn
$(document).ready(()=>{
  searchFullName().then()
  $(".loading").fadeOut(700)
  $("body").css("overflow","visible")
  $(".inner-loading").fadeOut(500)

})
function openSide() {
  $("#sideNav").animate({left:"0px"},300);
    $("#open").addClass("d-none")
    $("#close").removeClass("d-none")
    for (let i = 0; i < 6; i++) {
      $(".links li").eq(i).animate({top:0},(i+6)*100)
    }
}

function closeSide() {
  let outerWidth = $(".nav-links").outerWidth();
    $("#sideNav").animate({left:-outerWidth},300);
    $("#open").removeClass("d-none")
    $("#close").addClass("d-none")
    $(".links li").animate({top:300},500)
 }
 closeSide()
$(".icon-nav").click(()=>{
  if ($("#sideNav").css("left")=="0px"){
    closeSide()
  }
  else{
    openSide()
  }
}) 
async function searchFullName() {
    $(".inner-loading").fadeIn(500)
  let response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
  let myData = await response.json()
  displayMeals(myData.meals) 
  closeSide()
  document.getElementById("searchContainer").innerHTML=""
  $(".inner-loading").fadeOut(500)
}
function displayMeals(arr){
    let temp =""
    for (let i = 0; i < arr.length; i++) {
        temp+=`<div class="col-md-3">
        <div onclick="mealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <div class="item">
          <img src="${arr[i].strMealThumb}" class="w-100 rounded">
          <div class="layer d-flex align-items-center ">
            <h3>${arr[i].strMeal}</h5>
            </span>
          </div>
          </div>
          </div>
        </div>`
    }
    document.getElementById("rowData").innerHTML=temp
}
searchFullName()
async function getCategories() {
  $(".inner-loading").fadeIn(500)
   let response = await fetch (`https://www.themealdb.com/api/json/v1/1/categories.php`)
   let myData = await response.json()
   displayCategories(myData.categories)
   closeSide()
   document.getElementById("searchContainer").innerHTML=""
   $(".inner-loading").fadeOut(500)
}
function displayCategories(arr){
    let temp = ""
    for (let i = 0; i < arr.length; i++) {
      temp+=`<div class="col-md-3">
      <div onclick="getCategoriesDetails('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
      <div class="item">
        <img src="${arr[i].strCategoryThumb}" class="w-100 rounded">
        <div class="layer">
          <h3>${arr[i].strCategory}</h3>
          <p>${(arr[i].strCategoryDescription)?arr[i].strCategoryDescription.split(" ").splice(0,20).join(" "):"Loremipsumdolorsitametconsecteturadipisicingelit. Tempora, at."}</p>
          </span>
        </div>
        </div>
      </div>
      </div>`
    }
    document.getElementById("rowData").innerHTML=temp
    document.getElementById("contact").innerHTML=""
 document.getElementById("searchContainer").innerHTML=""
}
async function getArea(){
  $(".inner-loading").fadeIn(500)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  let myData = await response.json()
  displayArea(myData.meals)
  closeSide()
  document.getElementById("searchContainer").innerHTML=""
  $(".inner-loading").fadeOut(500)
}
function displayArea(arr){
    let temp=""
    for (let i = 0; i < arr.length; i++) {
      temp+=`
      <div class="col-md-3">
                <div onclick="getAreaDetails('${arr[i].strArea}')" class="rounded-2 color text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>`
}
document.getElementById("rowData").innerHTML=temp
document.getElementById("contact").innerHTML=""
document.getElementById("searchContainer").innerHTML=""
}
async function getIngredients(){
  $(".inner-loading").fadeIn(500)
  let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
  let myData=await response.json()
  displayIngredients(myData.meals)
  closeSide()
  document.getElementById("searchContainer").innerHTML=""
  $(".inner-loading").fadeOut(500)
}
function displayIngredients(arr){
    let temp =""
    for (let i = 0; i < arr.length; i++) {
        temp+=`<div class="col-md-3 color text-center " onclick="getIngredientsDetails('${arr[i].strIngredient}')">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${arr[i].strIngredient}</h3>
        <p> ${(arr[i].strDescription)?arr[i].strDescription.split(" ").splice(0,10).join(" "):" Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, in?"}</p>
    </div>`
    }
    document.getElementById("rowData").innerHTML=temp
    document.getElementById("contact").innerHTML=""
 document.getElementById("searchContainer").innerHTML=""
}

async function getCategoriesDetails(category) {
  $(".inner-loading").fadeIn(500)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  let myData = await response.json()
  displayMeals(myData.meals)
  closeSide()
  document.getElementById("searchContainer").innerHTML=""
  $(".inner-loading").fadeOut(500)
}

async function getAreaDetails (area){
  $(".inner-loading").fadeIn(500)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  let myData = await  response.json()
  displayMeals(myData.meals);
  closeSide()
  document.getElementById("searchContainer").innerHTML=""
  $(".inner-loading").fadeOut(500)
}
async function getIngredientsDetails(meal) {
      $(".inner-loading").fadeIn(500)
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`)
      let myData = await response.json()
      displayMeals(myData.meals)
      closeSide()
      document.getElementById("searchContainer").innerHTML=""
      $(".inner-loading").fadeOut(500)
    }
async function mealDetails(mealID) {
  $(".inner-loading").fadeIn(500)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  let myData = await response.json()
  displayMealDetails(myData.meals[0]);
  closeSide()
  document.getElementById("searchContainer").innerHTML=""
  $(".inner-loading").fadeOut(500)
}
function displayMealDetails(meal) {
  let ingredients=[]
  for (let i = 0; i < 20; i++) {
   if (meal[`strIngredient${i}`]) {
    ingredients+=`<li class="alert alert-info m-2 p-1">${meal[`strIngredient${i}`]}</li>`
   }
  }
  let tags = meal.strTags?.split(",")
  if(!tags) tags=[]
  let tagsStr=""
  for (let i = 0; i < tags.length; i++) {
   tagsStr+=`<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
  }
    let temp=""
    temp+=` 
    <div class="col-md-4 text-white">
      <img src="${meal.strMealThumb}" class="w-100 rounded-3">
      <h2 >${meal.strMeal}</h2>
    </div>
    <div class="col-md-8 text-white">
      <h3>Instructions</h3>
      <p>${meal.strInstructions}</p>
      <h3><span>Area :${meal.strArea} </span></h3>
      <h3><span>Category : ${meal.strArea}</span></h3>
      <h3><span>Recipes :</span></h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap ">
          ${ingredients}
      </ul>
      <h3>Tags :</h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap ">
          ${tagsStr}
      </ul>
      <h3>Links : </h3>
      <a href="${meal.strSource}" target="_blank" class="btn btn-success ">Source</a>
      <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
    </div>`
    document.getElementById("rowData").innerHTML=temp
    document.getElementById("contact").innerHTML=""
 document.getElementById("searchContainer").innerHTML=""
}
function showSearchInput() {
  $(".inner-loading").fadeIn(500)
  closeSide()
  let temp=""
  temp+=`
    <div class="row my-3">
        <div class="col-md-6">
    <input type="text" onkeyup="searchByName(this.value)" class="form-control m-2  bg-transparent text-white" id="fullName" placeholder="Search By Name" >
    </div>
    <div class="col-md-6">
        <input type="text" onkeyup="searchByletter(this.value)" class="form-control m-2 bg-transparent text-white"  id="firstName" placeholder="Search By First Letter">
    </div>`
    $(".inner-loading").fadeOut(500)
    document.getElementById("searchContainer").innerHTML=temp
    document.getElementById("contact").innerHTML=""
    document.getElementById("rowData").innerHTML=""
}
async function searchByName(term){
  $(".inner-loading").fadeIn(500)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
  let myData = await response.json()
  myData.meals? displayMeals(myData.meals) :displayMeals([])
  $(".inner-loading").fadeOut(500)
}
async function searchByletter(term){
  $(".inner-loading").fadeIn(500)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
  let myData = await response.json()
  displayMeals(myData.meals)
  $(".inner-loading").fadeOut(500)
}
function displayContactUs() {
  $(".inner-loading").fadeIn(500)
  closeSide()
  let temp=""
  temp+=`
  <div class="display min-vh-100">
     <div class="container  text-center">
      <div class="row g-3">
          <div class="col-md-6">
              <input id="userName"  onkeyup="inputsValdiation()" type="text" placeholder="Enter Your Name" class="form-control bg-white" >
              <div id="name-alert" class="alert alert-danger mt-2 w-100 d-none">
                  Special characters and numbers not allowed / Mohamed
              </div>
          </div>
          <div class="col-md-6">
              <input id="email" onkeyup="inputsValdiation()" type="email" placeholder="Enter Your Email" class="form-control bg-white" >
              <div id="email-alert" class="alert alert-danger mt-2 w-100 d-none">
                 Email not valid / example@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneNumber" onkeyup="inputsValdiation()" type="number" placeholder="Enter Your Phone Number" class="form-control bg-white" >
              <div id="phone-alert" class="alert alert-danger mt-2 w-100 d-none">
                  Phone not valid / 0123456789
              </div>
          </div>
          <div class="col-md-6">
              <input id="age" onkeyup="inputsValdiation()" type="number" placeholder="Enter Your Age" class="form-control bg-white" >
              <div id="age-alert" class="alert alert-danger mt-2 w-100 d-none">
              Age not valid / 23
              </div>
          </div>
          <div class="col-md-6">
              <input id="password" onkeyup="inputsValdiation()" type="password" placeholder="Enter Your Password" class="form-control bg-white" >
              <div id="password-alert" class="alert alert-danger mt-2 w-100 d-none">
              Password not valid / Zxc123@
              </div>
          </div>
          <div class="col-md-6">
              <input id="repassword" onkeyup="inputsValdiation()" type="password" placeholder="Re-Enter Your Password" class="form-control bg-white" >
              <div id="repassword-alert" class="alert alert-danger mt-2 w-100 d-none">
              Password not match 
              </div>
          </div>
      </div>   
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3  ">Submit</button>
     </div>
      </div>
 </div>`
 $(".inner-loading").fadeOut(500)
 document.getElementById("contact").innerHTML=temp
 document.getElementById("rowData").innerHTML=""
 document.getElementById("searchContainer").innerHTML=""
 submitBtn = document.getElementById("submitBtn")
 document.getElementById("userName").addEventListener("focus", () => {
   userNameTouched = true
 })
 
 document.getElementById("email").addEventListener("focus", () => {
   emailTouched = true
 })
 
 document.getElementById("phoneNumber").addEventListener("focus", () => {
   phoneNumberTouched = true
 })
 
 document.getElementById("age").addEventListener("focus", () => {
   ageTouched = true
 })
 
 document.getElementById("password").addEventListener("focus", () => {
   passwordTouched = true
 })
 
 document.getElementById("repassword").addEventListener("focus", () => {
   repasswordTouched = true
 })
}
userNameTouched = false
emailTouched =false
phoneNumberTouched =false
ageTouched =false
passwordTouched =false
repasswordTouched =false
function inputsValdiation() {
  if (userNameTouched) {
    if (nameValidation()) {
      document.getElementById("name-alert").classList.replace("d-block","d-none")
    }
    else{
      document.getElementById("name-alert").classList.replace("d-none","d-block")
    }
  }
  if (emailTouched) {
    if (emailValidation()) {
      document.getElementById("email-alert").classList.replace("d-block","d-none")
    }
    else{
      document.getElementById("email-alert").classList.replace("d-none","d-block")
    }
  }
 if (phoneNumberTouched) {
  if (phoneValidation()) {
    document.getElementById("phone-alert").classList.replace("d-block","d-none")
  }
  else{
    document.getElementById("phone-alert").classList.replace("d-none","d-block")
  }
 }
  if (ageTouched) {
    if (ageValidation()) {
      document.getElementById("age-alert").classList.replace("d-block","d-none")
    }
    else{
      document.getElementById("age-alert").classList.replace("d-none","d-block")
    }
  }
  if (passwordTouched) {
    if (passwordValidation()) {
      document.getElementById("password-alert").classList.replace("d-block","d-none")
    }
    else{
      document.getElementById("password-alert").classList.replace("d-none","d-block")
    }
  }
 if (repasswordTouched) {
  if (repasswordValidation()) {
    document.getElementById("repassword-alert").classList.replace("d-block","d-none")
  }
  else{
    document.getElementById("repassword-alert").classList.replace("d-none","d-block")
  }
 }
  if(nameValidation()&&
  emailValidation()&&
  phoneValidation()&&
  ageValidation()&&
  passwordValidation()&&
  repasswordValidation()){
    submitBtn.removeAttribute("disabled")
  }
  else{
    submitBtn.setAttribute("disabled",true)

  }
}
function nameValidation(){
  return (/^[a-zA-Z ]+$/.test(document.getElementById("userName").value))
}
function emailValidation(){
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("email").value))
}
function phoneValidation(){
  return  (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneNumber").value))
}
function ageValidation(){
  return (/^\S[0-9]{0,3}$/.test(document.getElementById("age").value))
}
function passwordValidation(){
  return(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(document.getElementById("password").value))
}
function repasswordValidation(){
  return (document.getElementById("repassword").value) == (document.getElementById("password").value)
}
