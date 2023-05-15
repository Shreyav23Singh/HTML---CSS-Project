var selectedRow = null;

document.getElementById("form1").addEventListener("submit", function(event) {
    event.preventDefault();
    const Name = event.target.name.value;
    const Dish = event.target.dish.value;
    const Price = event.target.price.value;
    const Table = event.target.table.value;

    const obj = {
        Name,
        Dish,
        Price,
        Table
    };
    save(obj);
});

window.addEventListener("DOMContentLoaded", async() => {
    try {
        const response = await axios.get("https://crudcrud.com/api/29bf98701ecc4f468829f45c6e8a3d67/data");
        for (let i = 0; i < response.data.length; i++) {
            show(response.data[i]);
        }
    } catch (error) {
        console.log(error)
    }
});

async function save(obj) {
// console.log(obj);
    try {
        const response = await axios.post("https://crudcrud.com/api/29bf98701ecc4f468829f45c6e8a3d67/data", obj);
        obj.id = response.data.id;
        // show(obj);
    } catch (error) {
        console.log(error);
    }

    if (selectedRow == null) {
        show(obj);
    } else {
        updateRecord(obj);
    }
}

function deleteData(id, tr) {
    axios.delete(`https://crudcrud.com/api/29bf98701ecc4f468829f45c6e8a3d67/data/${id}`)
        .then((response) => {
            console.log(response);
            //remove the row from the table
            tr.remove();
        }).catch((err) => {
            console.log(err);
        });
}

function show(obj) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = obj.Name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = obj.Dish;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = obj.Price;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = obj.Table;
    cell4 = newRow.insertCell(4);
    
    const editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    cell4.appendChild(editButton);
    editButton.addEventListener('click', () => onEdit(editButton.parentElement.parentElement));

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    cell4.appendChild(deleteButton);
    console.log("GetdataDeleteID",obj._id);
    deleteButton.addEventListener('click', () => deleteData(obj._id, newRow));

}

function onEdit(row) {
     selectedRow = row;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("dish").value = selectedRow.cells[1].innerHTML;
    document.getElementById("price").value = selectedRow.cells[2].innerHTML;
    document.getElementById("table").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(obj) {
    selectedRow.cells[0].innerHTML = obj.Name;
    selectedRow.cells[1].innerHTML = obj.Dish;
    selectedRow.cells[2].innerHTML = obj.Price;
    selectedRow.cells[3].innerHTML = obj.Table;

    axios.put(`https://crudcrud.com/api/29bf98701ecc4f468829f45c6e8a3d67/data/${obj.id}`, obj)
        .then((response) => {
            console.log(response);
            selectedRow = null;
        }).catch((err) => {
            console.log(err);
        });
}