console.log("Hello!");

//variables in global scope
let imgOne = "./images/img1.png";
let imgTwo = "./images/img2.png";
// let imgThree = "./images/img3.png";
// let imgFour = "./images/img4.png";
// let imgSecret = "./images/secret.png";

let popup = document.getElementById("center_popup");

let secretProbability;

// Array of fungi cohort - update this as appropriate!
const fungiImages = [
  "./images/img1.png",
  "./images/img2.png",
  // "./images/img3.png",
  // "./images/img4.png",
  // "./images/secret.png",
];

const unboxedImages = [];
let hasCollectedAll = false;

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
  popup.style.visibility = "visible";

  let overlay = document.getElementById("overlay");
  overlay.style.visibility = "visible";

  //pop off old image
  const oldImage = popup.querySelector("img");
  if (oldImage) oldImage.remove();

  //choose random image using chance library
  // probability = 0.01612903225; - can work on making this a slider that the users can control to highlight the way that this mechanism works and how hard it really is to get the secrets
  secretProbability = 1;
  let randomFungi = chance.weighted(fungiImages, [1, secretProbability]);

  const unboxedImage = document.querySelector(`img[src='${randomFungi}']`);
  unboxedImage.classList.add("unboxed");

  unboxedImages.push(randomFungi);
  console.log(unboxedImages);

  //display results in popup window
  let fungiImagePick = document.createElement("img");
  fungiImagePick.src = randomFungi;
  fungiImagePick.width = 200;
  fungiImagePick.height = 200;
  popup.appendChild(fungiImagePick);

  //not doing anything currently, figure out if this is even necessary
  // let resultDisplayOne = document.getElementById("popup_text");
};

let continueButton = document.getElementById("continue_button");
continueButton.addEventListener("click", function () {
  popup.style.visibility = "hidden";
  overlay.style.visibility = "hidden";

  //see if all the characters have been unboxed. when they have, display a "yay, you've caught them all message"
  hasCollectedAll =
    fungiImages.filter((x) => unboxedImages.includes(x)).length ==
    fungiImages.length;

  if (hasCollectedAll == true) {
    alert("you've caught them all!!");
    location.reload();
  }
  console.log(hasCollectedAll);
});
