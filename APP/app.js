// Función para guardar los datos en localStorage
function saveDataToLocalStorage(data) {
    let storedData = JSON.parse(localStorage.getItem('usersClients')) || [];
    storedData.push(data);
    localStorage.setItem('usersClients', JSON.stringify(storedData));
}

// Función para cargar los datos de localStorage en la tabla
function loadDataFromLocalStorage() {
    const storedData = JSON.parse(localStorage.getItem('usersClients')) || [];
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; 

    storedData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="editable">${item.name}</td>
            <td class="editable">${item.email}</td>
            <td class="editable">${item.role}</td>
            <td class="action-buttons">
                <button class="edit" onclick="editRow(${index})">Editar</button>
                <button class="delete" onclick="deleteData(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para editar un dato
function editRow(index) {
    const storedData = JSON.parse(localStorage.getItem('usersClients')) || [];
    const row = document.querySelector(`#dataTable tbody tr:nth-child(${index + 1})`);
    
    // Poner las celdas en modo edición
    const cells = row.querySelectorAll('td.editable');
    cells.forEach(cell => {
        cell.contentEditable = true;
    });

    // Cambiar el botón de "Editar" a "Guardar"
    const editButton = row.querySelector('button.edit');
    editButton.innerText = "Guardar";
    editButton.classList.remove("edit");
    editButton.classList.add("save");
    editButton.setAttribute("onclick", `saveRow(${index})`);
}

// Función para guardar la edición de un dato
function saveRow(index) {
    const storedData = JSON.parse(localStorage.getItem('usersClients')) || [];
    const row = document.querySelector(`#dataTable tbody tr:nth-child(${index + 1})`);

    // Obtener los valores editados
    const updatedName = row.children[0].innerText;
    const updatedEmail = row.children[1].innerText;
    const updatedRole = row.children[2].innerText;

    // Actualizar el dato en localStorage
    storedData[index] = { name: updatedName, email: updatedEmail, role: updatedRole };
    localStorage.setItem('usersClients', JSON.stringify(storedData));

    // Poner las celdas en modo no editable
    const cells = row.querySelectorAll('td.editable');
    cells.forEach(cell => {
        cell.contentEditable = false;
    });

    // Cambiar el botón de "Guardar" de vuelta a "Editar"
    const saveButton = row.querySelector('button.save');
    saveButton.innerText = "Editar";
    saveButton.classList.remove("save");
    saveButton.classList.add("edit");
    saveButton.setAttribute("onclick", `editRow(${index})`);

    // Recargar la tabla con los datos actualizados
    loadDataFromLocalStorage();
}

// Función para eliminar un dato
function deleteData(index) {
    const storedData = JSON.parse(localStorage.getItem('usersClients')) || [];

    // Eliminar el dato
    storedData.splice(index, 1);

    // Guardar los datos actualizados en localStorage
    localStorage.setItem('usersClients', JSON.stringify(storedData));

    // Recargar la tabla con los datos actualizados
    loadDataFromLocalStorage();
}

// Función para agregar datos
function addData(e) {
    e.preventDefault(); // Prevenir el envío del formulario

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    // Crear un objeto con los datos ingresados
    const userClientData = { name, email, role };

    // Guardar los datos en localStorage
    saveDataToLocalStorage(userClientData);

    // Limpiar los campos del formulario
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('role').value = '';

    // Recargar la tabla con los nuevos datos
    loadDataFromLocalStorage();
}

// Manejar el envío del formulario para agregar
document.getElementById('dataForm').addEventListener('submit', addData);

// Cargar los datos cuando la página se carga
window.onload = loadDataFromLocalStorage;