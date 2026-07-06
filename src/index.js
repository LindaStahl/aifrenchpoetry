const recipeElement = document.querySelector("#recipe");
const submitButton = document.querySelector("#recipe-generator-form button");
const topicInput = document.querySelector("#topic");
const apiKey = "8c50bt322daeoeaf091b2f13c5a404ce";

function displayRecipe(response) {
  submitButton.disabled = false;
  submitButton.innerHTML = "Generate recipe";
  recipeElement.classList.remove("loading");
  recipeElement.innerHTML = "";

  new Typewriter("#recipe", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function displayError() {
  submitButton.disabled = false;
  submitButton.innerHTML = "Generate recipe";
  recipeElement.classList.remove("loading");
  recipeElement.innerHTML =
    "Sorry, the recipe could not be generated right now. Please try again.";
}

function generateRecipe(event) {
  event.preventDefault();

  let topic = topicInput.value.trim();
  recipeElement.classList.remove("placeholder");
  recipeElement.classList.add("loading");
  recipeElement.innerHTML = '<span class="loader"></span>';
  let loadingText = document.createElement("span");
  loadingText.textContent = `Creating a recipe for ${topic}...`;
  recipeElement.appendChild(loadingText);
  submitButton.disabled = true;
  submitButton.innerHTML = "Generating...";

  let prompt = `Generate a simple recipe using or inspired by ${topic}.`;
  let context =
    "You are a helpful cooking expert. Return only the recipe. Include a recipe name, a short ingredient list, and numbered steps. Use <br /> tags for line breaks. Keep it concise and beginner-friendly.";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  axios.get(apiUrl).then(displayRecipe).catch(displayError);
}

let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);
