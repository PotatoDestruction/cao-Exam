const userLogin = async (login) => {
    const response = await fetch(`http://localhost:8080/v1/users/login`, {
     method: 'POST',
     headers : {
         "Content-type": "application/json"
         
     },
     body: JSON.stringify(login)
    });

    const data = await response.json();
 
    if(data.error) {
     document.getElementById('error').textContent = data.error
     return
    };

 
    localStorage.setItem('token', data.token);
    console.log(data.token); // token 
    console.log(data.user_id); // user id

    window.location.href = '../groups/index.html';

 };

 document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('error').textContent = '';

    let elements = e.target.elements;

    let userLoginObj = {
        email: elements.email.value,
        password: elements.password.value
    };

    userLogin(userLoginObj);

    elements.email.value = '';
    elements.password.value = '';
 });

 localStorage.clear();