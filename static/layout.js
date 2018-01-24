var temp = document.getElementById("accounts");
if (loggedIn){
  temp.innerHTML = `
<a>
  <i class="fa fa-user-circle"></i>
</a>
<a href="/logout">
  Log Out
</a>
`;
}
else{
  temp.innerHTML = `
<a href="javascript:;" onclick="openModal()">
Accounts
</a>
`;
  
}

function openRegister(){
  var lf = document.getElementById('lF');
  var rf = document.getElementById('rF');
  lf.style.maxHeight = '0px';
  rf.style.maxHeight = '400px'; 
}

function openLogin(){
  var lf = document.getElementById('lF');
  var rf = document.getElementById('rF');
  rf.style.maxHeight = '0px';
  lf.style.maxHeight = '250px'; 
}

function closeModal(){
  var m = document.getElementById('modalAccount');
  m.style.opacity = '0';
  m.style.pointerEvents = 'none';
}

function openModal(){
  var m = document.getElementById('modalAccount');
  m.style.opacity = '1';
  m.style.pointerEvents = 'auto';
}


function login(e){
  e.preventDefault();
  var user = document.getElementById('lUser').value;
  var pwd = document.getElementById('lPwd').value;
  var params = "email=" + user +"&pwd=" + pwd; 
  var xhr = new XMLHttpRequest();
  xhr.onload = function(){
    if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      var resp = JSON.parse(xhr.responseText);
      console.log(resp);
      if (!resp['success']){
        var errSpan = document.getElementById('lError');
        errSpan.innerHTML = "Error: " + resp['message']
        console.log(errSpan);
        var errDiv = document.getElementById('lErrDiv');
        errDiv.style.display = 'block';
      }
      else{
        var errDiv = document.getElementById('lErrDiv');
        errDiv.style.display = 'none';
        window.open('http://0.0.0.0',"_self")
      }

    } else {
      console.error(xhr.statusText);
    }
  }
  }
  xhr.open("POST",'http://0.0.0.0/login',true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params);
  
}

function register(e){
  e.preventDefault();

  var name = document.getElementById('rName').value;
  name = name.replace('&','\&');
  var no = document.getElementById('rNo').value;
  no = no.replace('&','\&');
  var email = document.getElementById('rEmail').value;
  eamil = email.replace('&','\&');
  var pwd = document.getElementById('rPwd').value;
  pwd = pwd.replace('&','\&');

  var params = "name=" + name +"&no=" + no + "&email=" + email +"&pwd=" + pwd; 

  var xhr = new XMLHttpRequest();

  xhr.onload = function(){
    if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      var resp = JSON.parse(xhr.responseText);
      console.log(resp);
      if (!resp['success']){
        var errSpan = document.getElementById('rError');
        errSpan.innerHTML = "Error: " + resp['message']
        console.log(errSpan);
        var errDiv = document.getElementById('rErrDiv');
        errDiv.style.display = 'block';
      }
      else{
        var errDiv = document.getElementById('rErrDiv');
        errDiv.style.display = 'none';
        window.open('http://0.0.0.0',"_self")
      }

    } else {
      console.error(xhr.statusText);
    }
  }
  }
  xhr.open("POST",'http://0.0.0.0/register',true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params);
}