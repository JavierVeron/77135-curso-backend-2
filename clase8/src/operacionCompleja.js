const operacionCompleja = () => {
    let total = 0;
    let i;

    for (i=0; i<10000000000; i++) {
        total += i;
    }

    return total;
}

//export default operacionCompleja

process.on("message", () => {
    const resultado = operacionCompleja();
    process.send(resultado);
})