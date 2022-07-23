const token =  localStorage.getItem("token");
console.log(token);

if(token) {
    var getMyGroups = async () => {
        const res = await fetch(`http://localhost:8080/v1/accounts`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await res.json();
        
        console.log(data);

        let mainContainer = document.querySelector('.main-container');
        mainContainer.textContent = ''

        if (!data.length){
            mainContainer.textContent = 'You dont have any groups...';

           
        }else{
        data.forEach(group => {
            
            let groupBox = document.createElement('div');
            groupBox.classList.add('group-box');

            let boxId = document.createElement('h2');
            boxId.textContent = `ID: ${group.group_id}`

            let groupName = document.createElement('p');
            groupName.textContent = group.name

            mainContainer.append(groupBox);
            groupBox.append(boxId, groupName);

            groupBox.addEventListener('click', () => {
                window.location.href = `../bills/index.html?id=${group.group_id}`
            });
        });
    }
    }

    getMyGroups();


}else {
    window.location.href = "../login/index.html"
}



let select = document.querySelector('select')
const selectGroupDb = async () => {
    const res = await fetch(`http://localhost:8080/v1/groups`);

    const allGroups = await res.json();

    allGroups.forEach(group => {

    let option = document.createElement('option');
    option.textContent = `ID:${group.id} ${group.name}`
    option.value = group.id

    select.append(option)//Rodys visas esamas grupes is DB.

    })
}
selectGroupDb()

const addUserToGroup = async (group) => {
    const response = await fetch(`http://localhost:8080/v1/accounts`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(group)
    })

    const data = await response.json();
  
    console.log(data)
    getMyGroups();
};

document.querySelector('#select').addEventListener('submit', e => {
    e.preventDefault();

    let groupId = select.value;

    let newGroup = {
        group_id: groupId
    };
    
    addUserToGroup(newGroup);
    
});