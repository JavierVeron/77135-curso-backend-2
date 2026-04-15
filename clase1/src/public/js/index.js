/* document.getElementById("btnEnviarCookie").addEventListener("click", async () => {
    const email = document.getElementById("email");
    const contrasena = document.getElementById("contrasena");

    const response = await fetch("http://localhost:8080/setCookieForm", {
        method:"POST",
        headers:{
            'Content-type': 'application/json; charset=UTF-8',
        },
        body:JSON.stringify({email:email.value, contrasena:contrasena.value})
    });
    const data = await response.json();
    console.log(data);
    email.value = "";
    contrasena.value = "";
});

document.getElementById("btnLeerCookie").addEventListener("click", async () => {
    const response = await fetch("http://localhost:8080/getCookieForm");
    const data = await response.json();
    console.log(data);
    console.log("Cookie Leída!");
}) */

const Login = async () => {    
    const email = document.getElementById("email");
    const contrasena = document.getElementById("contrasena");
    const usuario = {email:email.value, contrasena:contrasena.value};

    const response = await fetch("http://localhost:8080/login", {
        method:"POST",
        headers:{'Content-type': 'application/json; charset=UTF-8'},
        body:JSON.stringify(usuario)
    });
    const data = await response.json();

    if (data.status == "ok") {
        location.href = "/principal"
    }
}

document.getElementById("btnEnviar").addEventListener("click", Login);