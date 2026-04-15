
document.getElementById("btnSalir").addEventListener("click", async () => {
    const response = await fetch("http://localhost:8080/logout");
    const data = await response.json();

    if (data.status == "ok") {
        location.href = "/";
    }
})