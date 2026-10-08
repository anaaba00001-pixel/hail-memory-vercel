import {api} from './api-client.js';
const form=document.getElementById('login-form'),status=document.getElementById('login-status');
form.onsubmit=async e=>{e.preventDefault();const button=form.querySelector('button');button.disabled=true;status.textContent='جارٍ التحقق…';try{const data=await api('login',{email:form.email.value,password:form.password.value});form.password.value='';location.assign('/'+data.user.role+'/dashboard.html');}catch(error){status.textContent=error.message;}finally{button.disabled=false;}};
