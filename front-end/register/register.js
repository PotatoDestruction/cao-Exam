var date = new Date();
var dd = String(date.getDate()).padStart(2, '0');
var mm = String(date.getMonth() + 1).padStart(2, '0');
var yyyy = date.getFullYear();

date = yyyy + '-' + mm + '-' + dd;
console.log(date)

const addUser = async (user) => {
    const response = await fetch(`http://localhost:8080/v1/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json' 
        },
        body: JSON.stringify(user)
    })

    const data = await response.json();

    if(data.error) {
        document.getElementById('error').textContent = data.error
        return
       };

       window.location.href = "../login/index.html";
};

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();

    let elements = e.target.elements;


    if(elements.password.value != elements.password2.value){
        let error = document.getElementById('error');
        error.textContent = 'Your passwords does not match...';
    }else {

        let newUser = {
            full_name: `${elements.name.value} ${elements.lastName.value}`,
            email: elements.email.value,
            password: elements.password.value,
            reg_timestamp: date
        };

        addUser(newUser);
        
        elements.name.value = "";
        elements.lastName.value = "";
        elements.email.value = "";
        elements.password.value = "";
        elements.password2.value = "";

        error.textContent = "";

    };
    
});

localStorage.clear();

