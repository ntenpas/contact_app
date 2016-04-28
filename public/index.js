var infoForm = document.getElementById("infoForm");
var showContacts = document.getElementById('showContacts');

function sendData() {
  var xhr = new XMLHttpRequest();
  var fd = new FormData(infoForm);

  xhr.addEventListener("load", function(event) {
    //console.log(event);
  });

  xhr.addEventListener("error", function(event) {
    console.log("oops! error.");
  });

  xhr.open("POST", "http://localhost:8080/signup");

  xhr.send(fd);
}

function displayData(data) {
  var contacts;
  contacts = JSON.parse(data);
  for (var person of contacts) {
    var table = document.getElementById('contactsTable');
    var tr = document.createElement('tr');
    var fnametd = document.createElement('td');
    var lnametd = document.createElement('td');
    var emailtd = document.createElement('td');
    var messagetd = document.createElement('td');
    fnametd.appendChild(document.createTextNode(person.first_name));
    lnametd.appendChild(document.createTextNode(person.last_name));
    emailtd.appendChild(document.createTextNode(person.email));
    messagetd.appendChild(document.createTextNode(person.message));
    tr.appendChild(fnametd);
    tr.appendChild(lnametd);
    tr.appendChild(emailtd);
    tr.appendChild(messagetd);
    table.appendChild(tr);
  }
}

function getData() {
  var xhr = new XMLHttpRequest();
  function reqListener() {
    displayData(this.response);
  }
  xhr.addEventListener('load', reqListener);
  xhr.addEventListener("error", function(event) {
    console.log("oops! error.");
  });
  xhr.open('GET', 'http://localhost:8080/contacts');
  xhr.send();
}

function removeTableData() {
  var ctable = document.getElementById('contactsTable');
  var remindicies = [];
  rows = ctable.childNodes;
  for (var i = 0; i < rows.length; ++i) {
    //console.log(rows[i].tagName);
    if (rows[i].tagName == 'TR')
      remindicies.push(i);
  }
  while (remindicies.length > 0) {
    var index = remindicies.pop();
    ctable.removeChild(rows[index]);
  }
}

infoForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var inputs = document.getElementsByTagName('input');
  var warning = document.getElementById('warning');
  var missingData = false;
  for (var i = 0; i < inputs.length; ++i) {
    var value = inputs[i].value;
    if (value === "") {
      missingData = true;
      break;
    }
  }
  if (!missingData) {
    sendData();
    warning.style.display = 'none';
  }
  else
    warning.style.display = 'inline';
});

showContacts.addEventListener('click', function(event) {
  removeTableData();
  getData();
});