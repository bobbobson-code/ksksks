const formCadastro = document.getElementById("cadastroForm");

formCadastro.addEventListener("submit", async (e) =>{
    e.preventDefault();

    const nomeCadastro = document.getElementById("nomeCadastro").value;
    const telefoneCadastro = document.getElementById("telefoneCadastro").value;
    const emailCadastro = document.getElementById("emailCadastro").value;
    const senhaCadastro = document.getElementById("senhaCadastro").value;
    const confirmarSenhaCadastro = document.getElementById("confirmarSenhaCadastro").value;

    if(confirmarSenhaCadastro === senhaCadastro){
        try{
            await api("/api/auth/cadastro", "POST", {
                nome: nomeCadastro,
                telefone: telefoneCadastro,
                email: emailCadastro,
                senha: senhaCadastro,
            })
            location.href = "painel.html"
        }
        catch(error){
            console.log(error.message);
        }
    }
    else{
        alert("senha não coincidem")
    }
})