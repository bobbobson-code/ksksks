import { application } from "express"


function mostrarErro(error){
    if (error.status === 401) {
        location.href = "login.html"
    } else {
        alert("error.message")
    }
}

const nomeUsuario = document.getElementById("userName");
async function load(){
    const user = await api("/api/auth/logado");
    nomeUsuario.textContent = user.usuario.nome;

    const listaReserva = document.getElementById("listaReserva");
    const guia = document.getElementById("guia");

    const resp = await api("/api/reserva");
    listaReserva.innerHTML = "";
    
    if(resp.reservas.length === 0){
        guia.innerHTML = "nenhuma reserva."
        return;
    } else{
        guia.innerHTML = "";
        for(const item of resp.reservas) {
            const x = document.createElement("article");
            x.className = "itemReserva";
            x.innerHTML = "";
            x.innerHTML = `
            <p> ${item.dia} -- ${item.hora} -- ${item.pacote}
            `
            listaReserva.appendChild(x)
        }
    }
}

const btnSair = document.getElementById("btnSair");
btnSair.addEventListener("click", async () => {
    try{
        await api("/api/auth/logout", "POST");
    }
    finally{
        location.href = "index.html"
    }
})

load().catch(mostrarErro)

const formReservaPista = document.getElementById("reservaPista");
formReservaPista.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dia = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const pacote = document.getElementById("pacote").value;

    try{
        await api("/api/reserva", "POST", {
            data: dia,
            hora: hora,
            pacote: pacote
        });
        alert("reserva criada");
        formReservaPista.reset();
        await load();
    }
    catch(error){
        mostrarErro(error)
    }
})