const Login = async () => {
    const resultado = document.getElementById("resultado");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const usuario = {email:email.value, password:password.value};

    const response = await fetch("http://localhost:8080/api/users/login", {
        method:"POST",
        headers:{'Content-type':'application/json; charset=UTF-8'},
        body:JSON.stringify(usuario)
    });
    const data = await response.json();

    if (data.status == "ok") {
        location.href = "/current";
    } else {
        resultado.innerHTML = `<div class="alert alert-danger" role="alert">${data.message}</div>`;
    }
}

document.getElementById("btnEnviar").addEventListener("click", Login);