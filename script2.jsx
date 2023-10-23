const generateForm = document.querySelector(".generate-form");
const generateBtn = generateForm.querySelector(".generate-btn");
const imageGallery = document.querySelector(".image-gallery");

const OPENAI_API_KEY = "sk-LaO7oxQXGfBUpaDQ6ehqT3BlbkFJ0tA8t3IGgreuL6IotpP5q" //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
let isImageGenerating = false;

const updateImageCard = (imgDataArray) => {
  imgDataArray.forEach((imgObject, index) => {
    const imgCard = imageGallery.querySelectorAll(".img-card")[index];
    const imgElement = imgCard.querySelector("img");
    const downloadBtn = imgCard.querySelector(".download-btn");
    
    // Set the image source to the AI-generated image data
    const aiGeneratedImage = `data:image/jpeg;base64,${imgObject.b64_json}`;
    imgElement.src = aiGeneratedImage;
    
    // When the image is loaded, remove the loading class and set download attributes
    imgElement.onload = () => {
      imgCard.classList.remove("loading");
      downloadBtn.setAttribute("href", aiGeneratedImage);
      downloadBtn.setAttribute("download", `${new Date().getTime()}.jpg`);
    }
  });
}





const generateAiImages = async (userPrompt, userImgQuantity) => {
  try {
    // Send a request to the OpenAI API to generate images based on user inputs
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: userPrompt,
        n: userImgQuantity,
        size: "512x512",
        response_format: "b64_json"
      }),
    });

    // Throw an error message if the API response is unsuccessful
    if(!response.ok) throw new Error("Failed to generate AI images. Make sure your API key is valid.");

    const { data } = await response.json(); // Get data from the response
    updateImageCard([...data]);
  } catch (error) {
    alert(error.message);
  } finally {
    generateBtn.removeAttribute("disabled");
    generateBtn.innerText = "Generate";
    isImageGenerating = false;
  }
}

const handleImageGeneration = (e) => {

  e.preventDefault();
  if(isImageGenerating) return;

  // Get user input and image quantity values
  const userPrompt = e.srcElement[0].value;
  const userImgQuantity = parseInt(e.srcElement[1].value);
  
  // Disable the generate button, update its text, and set the flag
  generateBtn.setAttribute("disabled", true);
  generateBtn.innerText = "Generating";
  isImageGenerating = true;
  
  // Creating HTML markup for image cards with loading state
  const imgCardMarkup = Array.from({ length: userImgQuantity }, () => 
      `<div class="img-card loading">
        <img src="images/loader.svg" alt="AI generated image">
        <a class="download-btn" href="#">
          <img src="images/download.svg" alt="download icon">
        </a>
      </div>`
  ).join("");

  imageGallery.innerHTML = imgCardMarkup;
  generateAiImages(userPrompt, userImgQuantity);
}

generateForm.addEventListener("submit", handleImageGeneration);
const myArray = ['an armchair in the shape of an avocado',
'a surrealist dream-like oil painting by Salvador Dalí of a cat playing checkers',
'teddy bears shopping for groceries in Japan, ukiyo-e',
'an oil painting by Matisse of a humanoid robot playing chess',
'panda mad scientist mixing sparkling chemicals, digital art',
"a macro 35mm photograph of two mice in Hawaii, they're each wearing tiny swimsuits and are carrying tiny surf boards, digital art",
'3D render of a cute tropical fish in an aquarium on a dark blue background, digital art',
'an astronaut lounging in a tropical resort in space, vaporwave',
'an oil painting portrait of a capybara wearing medieval royal robes and an ornate crown on a dark background',
'a stained glass window depicting a hamburger and french fries',
'a pencil and watercolor drawing of a bright city in the future with flying cars',
'a sunlit indoor lounge area with a pool with clear water and another pool with translucent pastel pink water, next to a big window, digital art',
'a fortune-telling shiba inu reading your fate in a giant hamburger, digital art',
'"a sea otter with a pearl earring" by Johannes Vermeer',
'an oil pastel drawing of an annoyed cat in a spaceship',
'a painting of a fox in the style of Starry Night',
'a bowl of soup that looks like a monster, knitted out of wool',
'A plush toy robot sitting against a yellow wall',
'A synthwave style sunset above the reflecting water of the sea, digital art',
'Two futuristic towers with a skybridge covered in lush foliage, digital art',
'A 3D render of a rainbow colored hot air balloon flying above a reflective lake',
'A comic book cover of a superhero wearing headphones',
'A centered explosion of colorful powder on a black background',
'A photo of a Samoyed dog with its tongue out hugging a white Siamese cat',
'A photo of a white fur monster standing in a purple room',
"A photo of Michelangelo's sculpture of David wearing headphones djing",
'A Samurai riding a Horse on Mars, lomography.',
'A modern, sleek Cadillac drives along the Gardiner expressway with downtown Toronto in the background, with a lens flare, 50mm photography',
'A realistic photograph of a young woman with blue eyes and blonde hair',
'A man standing in front of a stargate to another dimension',
'Spongebob Squarepants in the Blair Witch Project',
'A velociraptor working at a hotdog stand, lomography',
'A man walking through the bustling streets of Kowloon at night, lit by many bright neon shop signs, 50mm lens',
'A BBQ that is alive, in the style of a Pixar animated movie',
'A futuristic cyborg dance club, neon lights',
'The long-lost Star Wars 1990 Japanese Anime',
'A hamburger in the shape of a Rubik’s cube, professional food photography',
'A Synthwave Hedgehog, Blade Runner Cyberpunk',
'An astronaut encountering an alien life form on a distant planet, photography',
'A Dinosaur exploring Cape Town, photography',
'A Man falling in Love with his Computer, digital art',
'A photograph of a cyborg exploring Tokyo at night, lomography',
'Dracula walking down the street of New York City in the 1920s, black and white photography',
'Synthwave aeroplane',
'A man wanders through the rainy streets of Tokyo, with bright neon signs, 50mm',
'A Space Shuttle flying above Cape Town, digital art',];
// Array with values


// Function to shuffle an array randomly (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Shuffle the array
shuffleArray(myArray);

// Function to get and remove the last value from the shuffled array
function getRandomUniqueValue() {
  if (myArray.length === 0) {
    // If all values have been used, you can reshuffle the array if needed
    shuffleArray(myArray);
  }
  return myArray.pop();
}

// Example usage
const randomValue1 = getRandomUniqueValue();
const randomValue2 = getRandomUniqueValue();
const randomValue3 = getRandomUniqueValue();

console.log(randomValue1, randomValue2, randomValue3);


