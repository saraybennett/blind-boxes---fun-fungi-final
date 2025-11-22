console.log("Hello!");

//variables in global scope
let imgOne = "./images/img1.png";
let imgTwo = "./images/img2.png";
let imgThree = "./images/img3.png";
let imgFour = "./images/img4.png";
let imgSecret = "./images/secret.png";

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
  console.log("this has been clicked");
  showPopup();
});

const showPopup = () => {
  let popup = document.getElementById("center_popup");
  popup.style.visibility = "visible";

  let overlay = document.getElementById("overlay");
  overlay.style.visibility = "visible";

  //choose random image using chance library
  let randomFungi = chance.weighted(fungiImages, [1, 1, 1, 1, 0.01612903225]);
  console.log(randomFungi);

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
    // location.reload();
    popup.style.visibility = "hidden";
    overlay.style.visibility = "hidden";
    // const elementToRemove = document.getElementById("#img");
    // elementToRemove.remove();
    document.getElementById("#pop_up").clear();
  });
};

//function to track if something has been unboxed
function fungiUnboxed() {
  if ((randomFungi = imgOne)) {
    console.log("imgOne picked");
    imgOneUnboxed = true;
  }
}
