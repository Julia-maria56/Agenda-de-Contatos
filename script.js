const modal = document.querySelector("#modal");
const blur = document.getElementById("blur");
const lista = document.querySelector("#contatos_lista ul")

function abrirModal(){
    modal.classList.add("active")
    blur.classList.add("mostrar")
}

function fecharModal(){
    modal.classList.remove("active");
    blur.classList.remove("mostrar");
}

function buscarTarefas(){
    fetch("http://localhost:3000/contatos")
    .then(res => res.json())
    .then( res =>{
        inserirContatos(res)
    }
    )
}

buscarTarefas()

function inserirContatos(listaDeContatos){
    if(listaDeContatos.length > 0){
        lista.innerHTML = "";
        listaDeContatos.map(contato => {
            lista.innerHTML += `
            <li>
                    <img src= "${contato.imagem}" alt="">
                    <h3>${contato.nome}</h3>
                    <div class="infos-contatos">
                        <h4>Telefone: <p>${contato.telefone}</p></h4>
                        <h4>Email: <p>${contato.email}</p></h4>
                    </div>
                </li> 
            `
        })
    }
}

function novoContato(){
    
    event.preventDefault();
    let contato = {
        imagem: document.getElementById("titulo").value,
        nome: document.getElementById("nome").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value
    }

    fetch("http://localhost:3000/contatos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(contato)
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        alert("clicou");
        fecharModal();
        buscarTarefas();
    })
}

function pesquisarContato(){
    let busca = document.getElementById("pesquisar_contato");
    const lis = document.querySelectorAll(" #contatos_lista ul li")
    console.log(lis)
    if(busca.value.length > 0){
        lis.forEach(li => {
            if(!li.children[1].innerHTML.includes(busca.value)){
                li.classList.add('oculto')
            } else {
                li.classList.remove('oculto')
            }
        })
    } else{
        lis.forEach( li => {
            li.classList.remove('oculto')
        })
    }
}