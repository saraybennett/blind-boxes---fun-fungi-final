console.log("Hello!");

//variables in global scope
let imgOne = "./images/img1.png";
let imgTwo = "./images/img2.png";
let imgThree = "./images/img3.png";
let imgFour = "./images/img4.png";
let imgSecret = "./images/secret.png";

let secretProbability;

//booleans to handle if a fungi has been unboxed or not
let imgOneUnboxed = false;
let imgTwoUnboxed = false;
let imgThreeUnboxed = false;
let imgFourUnboxed = false;
let imgSecretUnboxed = false;

// Array of fungi cohort
const fungiImages = [
  "./images/img1.png",
  "./images/img2.png",
  "./images/img3.png",
  "./images/img4.png",
  "./images/secret.png",
];

const unboxedImages = [];

//Initialize and connect socket
let socket = io();

//Listen for confirmation of connection
socket.on("connect", () => {
  console.log("Connected");
});

//Listen for an event named 'message-share' from the server
socket.on("message-share", (data) => {
  console.log(data);
});

//set up random fungi selector - figure out how this will work with socket

let unboxFungiButton = document.querySelector("#unbox-button");
unboxFungiButton.addEventListener("click", function () {
  showPopup();
});

const showPopup = () => {
  let popup = document.getElementById("center_popup");
  popup.style.visibility = "visible";

  let overlay = document.getElementById("overlay");
  overlay.style.visibility = "visible";

  //pop off old image
  const oldImage = popup.querySelector("img");
  if (oldImage) oldImage.remove();

  //choose random image using chance library
  // probability = 0.01612903225; - can work on making this a slider that the users can control to highlight the way that this mechanism works and how hard it really is to get the secrets
  secretProbability = 0.5;
  let randomFungi = chance.weighted(fungiImages, [
    1,
    1,
    1,
    1,
    secretProbability,
  ]);
  console.log(randomFungi);

  const unboxedImage = document.querySelector(`img[src='${randomFungi}']`);
  unboxedImage.classList.add("unboxed");

  unboxedImages.push(randomFungi);
  console.log("unboxed images:" + unboxedImages);

  //display results in popup window
  let fungiImagePick = document.createElement("img");
  fungiImagePick.src = randomFungi;
  fungiImagePick.width = 200;
  fungiImagePick.height = 200;
  popup.appendChild(fungiImagePick);

  //not doing anything currently, figure out if this is necessary
  let resultDisplayOne = document.getElementById("popup_text");

  let continueButton = document.getElementById("continue_button");
  continueButton.addEventListener("click", function () {
    popup.style.visibility = "hidden";
    overlay.style.visibility = "hidden";
  });
};

//function to track if something has been unboxed
function fungiUnboxed() {
  if ((randomFungi = imgOne)) {
    console.log("imgOne picked");
    imgOneUnboxed = true;
  }
}
