const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(e);

    const emailLogin = document.getElementById("emailLogin").value;
    const senhaLogin = document.getElementById("senhaLogin").value;

    try{
        await api("/api/auth/login", "POST", {
            email: emailLogin,
            senha: senhaLogin
        })
        location.href = "painel.html"
    }
    catch(error){
        console.log(error.message)
    }
})