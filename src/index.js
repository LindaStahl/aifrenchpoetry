const poemElement = document.querySelector("#poem");
const submitButton = document.querySelector("#poem-generator-form button");
const apiKey = "8c50bt322daeoeaf091b2f13c5a404ce";

function displayPoem(response) {
  submitButton.disabled = false;
  submitButton.innerHTML = "Generate poem";
  poemElement.classList.remove("loading");
  poemElement.innerHTML = "";

  new Typewriter("#poem", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function displayError() {
  submitButton.disabled = false;
  submitButton.innerHTML = "Generate poem";
  poemElement.classList.remove("loading");
  poemElement.innerHTML =
    "Sorry, the poem could not be generated right now. Please try again.";
}

function generatePoem(event) {
  event.preventDefault();

  poemElement.classList.remove("placeholder");
  poemElement.classList.add("loading");
  poemElement.innerHTML =
    '<span class="loader"></span><span>Composing your French poem...</span>';
  submitButton.disabled = true;
  submitButton.innerHTML = "Generating...";

  let prompt = "Generate a short French poem in 4 lines.";
  let context =
    "You are a romantic French poet. Return only the poem text. Separate each line with a <br /> tag. Do not include a title or explanation.";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  axios.get(apiUrl).then(displayPoem).catch(displayError);
}

let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem);
