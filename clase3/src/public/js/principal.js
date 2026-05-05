const logout = async () => {
    const response = await fetch("http://localhost:8080/api/sessions/logout");
    const data = await response.json();

    if (data.status == "ok") {
        location.href = "/";
    }
}

document.getElementById("btnSalir").addEventListener("click", logout);