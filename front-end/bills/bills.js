const url = new URL(document.location);
const getGroupId = url.searchParams.get('id');
console.log(getGroupId)

if(getGroupId == null){
  window.location.href = '../login/index.html'   
}

let groupId = getGroupId


var groupBills = async () => {
    const res = await fetch(`http://localhost:8080/v1/bills/${groupId}`)
    const data = await res.json();

    var tbody = document.querySelector('tbody');

    if(!data.length) {
        tbody.textContent = 'This group has no bills. Fill form below to add new bill for this group . . . ';
        return
    };
    
    tbody.textContent = ''
    data.forEach(bill => {

    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td')

    td1.textContent = bill.id;
    td2.textContent = bill.description;
    td3.textContent = `$${bill.amount}`

    tbody.append(tr);
    tr.append(td1, td2, td3)

    });
};

groupBills();


const addBill = async (bill) => {
    const response = await fetch(`http://localhost:8080/v1/bills`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json' 
        },
        body: JSON.stringify(bill)
    })

    groupBills();
};

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();

    let elements = e.target.elements;
    let amount = Number(elements.amount.value)
    

    let billObj = {
        group_id: groupId,
        amount: amount,
        description: elements.description.value
    };


    addBill(billObj);

    elements.amount.value = '';
    elements.description.value = '';
});