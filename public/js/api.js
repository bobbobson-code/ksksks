async function api(url, method="get", dados){
    const resp = await fetch(url, {
        method,
        headers: dados ? {"Content-Type":"application/json"} : {},
        body: dados ? JSON.stringify(dados) : undefined
    })
    const resultado = await resp.json().catch(() =>({}));

    if(!resp.ok){
        const error = new Error (resultado.error || "erro");
        error.status = resp.status;
        throw error;
    }
    return;
}