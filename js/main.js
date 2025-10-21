// Example: handle login form
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  const absenceForm = document.getElementById('absenceForm');
  if (absenceForm) {
    absenceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Absence submitted (dummy frontend only).');
    });
  }
});

const loginBtnHandler=(e)=>{
  e.preventDefault();
  const email=document.getElementById('email').value;
     const password=document.getElementById('password').value;
     
     const role=document.getElementById('role').value;
     const now=new Date();
     const nineAm=new Date(now.getFullYear(),now.getMonth(),now.getDate(),9,0,0);
     const millis=nineAm.getTime();
    const  currenttime=new Date().getTime();
    if(role=='teacher'){
     if(currenttime<millis)
     {
       //api call to check whether the user exists or not
      findIfUserPresent(email,password,role);
   }else{
    alert("unsuccesfull");
   }}
   else{
    findIfUserPresent(email,password,role);
   }
} 


 const findIfUserPresent = async(email,password,role) => {
 const response= await fetch(`http://localhost:5000/api/getUser?email=${email}&password=${password}&role=${role}`);
 const res = await response.json();
     if(res.success){
      if(role=="admin"){
        window.location.href = 'dashboard.html';
      }
      else if(role=="teacher"){
        if(res.isAlreadyLoggedIn){
          alert("You have already loggd in for the day");
        }
        else{
        alert("You have succesfully logged ");
        }
      }

     }
     else{
      console.log(res);
      alert("Invalid Email or Password");
     }
      

    }