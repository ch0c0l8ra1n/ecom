var loggedIn = false;

var temp = document.getElementById("accounts");
if (loggedIn){
  temp.innerHTML = `
<a>
  <i class="fa fa-user-circle"></i>
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

function register(){
  var lf = document.getElementById('lF');
  var rf = document.getElementById('rF');
  lf.style.maxHeight = '0px';
  rf.style.maxHeight = '400px'; 
}

function login(){
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