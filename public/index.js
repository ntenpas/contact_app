var infoForm = document.getElementById("infoForm");

function sendData() {
  var xhr = new XMLHttpRequest();
  var fd = new FormData(infoForm);

  xhr.addEventListener("load", function(event) {
    console.log(event);
  });

  xhr.addEventListener("error", function(event) {
    console.log("oops! error.");
  });

  xhr.open("POST", "http://localhost:8080/");

  xhr.send(fd);
}

infoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  sendData();
});