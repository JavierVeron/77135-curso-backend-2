const Login = async () => {
    const resultado = document.getElementById("resultado");
    const validacion = validarCampos();

    if (!validacion) {
        resultado.innerHTML = `<div class="alert alert-danger" role="alert">Falta completar los Campos!</div>`;
        return false;
    }

    const email = document.getElementById("email");
    const contrasena = document.getElementById("contrasena");
    const usuario = {email:email.value, contrasena:contrasena.value};

    const response = await fetch("http://localhost:8080/api/sessions/login", {
        method:"POST",
        headers:{'Content-type':'application/json; charset=UTF-8'},
        body:JSON.stringify(usuario)
    });
    const data = await response.json();

    if (data.status == "ok") {
        location.href = "/principal";
    } else {
        resultado.innerHTML = `<div class="alert alert-danger" role="alert">${data.message}</div>`;
    }
}

const validarCampos = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("contrasena").value;

    if (email == "" && password == "") {
        return false;
    }

    return true;
}

document.getElementById("btnEnviar").addEventListener("click", Login);