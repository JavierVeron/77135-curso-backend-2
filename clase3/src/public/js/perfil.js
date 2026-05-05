const modificarUsuario = async () => {
    const resultado = document.getElementById("resultado");
    const validacion = validarCampos();

    if (!validacion) {
        resultado.innerHTML = `<div class="alert alert-danger" role="alert">Falta completar los Campos!</div>`;
        return false;
    }

    const first_name = document.getElementById("nombre").value;
    const last_name = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("edad").value;
    const password = document.getElementById("contrasena").value;
    const user = {first_name, last_name, email, age, password};

    const response = await fetch("http://localhost:8080/api/sessions/modificar/", {
        method:"PUT",
        headers:{'Content-type':'application/json; charset=UTF-8'},
        body:JSON.stringify(user)
    });
    const data = await response.json();

    if (data.status == "ok") {
        resultado.innerHTML = `<div class="alert alert-success" role="alert">${data.message}</div>`;
        limpiarCampos();
    } else {
        resultado.innerHTML = `<div class="alert alert-danger" role="alert">${data.message}</div>`;
    }
}

const validarCampos = () => {
    const first_name = document.getElementById("nombre").value;
    const last_name = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("edad").value;
    const password = document.getElementById("contrasena").value;

    if (first_name == "" && last_name == "" && email == "" && age == "" && password == "") {
        return false;
    }

    return true;
}

const limpiarCampos = () => {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("email").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("contrasena").value = "";
}

document.getElementById("btnModificar").addEventListener("click", modificarUsuario);