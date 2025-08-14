const url = 'https://crudcrud.com/api/8d759434b14f44028142422fe34bb762/clientes'
const nomeInformado = document.getElementById('nome')
const emailInformado = document.getElementById('email')

function mostrarResultado(dado){
    const main = document.querySelector('main')
    const cliente = document.createElement('div')
    cliente.setAttribute('data-id', dado._id)
    cliente.innerHTML = `<p>Nome: ${dado.nome}</p>
                        <p>E-mail: ${dado.email}</p>
                        <button onclick = "removerCliente('${dado._id}')">Excluir cadastro</button>`
    main.append(cliente)
    //limpa os inputs
    nomeInformado.value = ''
    emailInformado.value = ''
}


function cadastrarCliente(){
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeInformado.value,
            email: emailInformado.value
        })
    })
    .then(response => response.json())
    .then(dado => mostrarResultado(dado))
    .catch(error => {
        console.error('Erro:', error)
        alert('Falha ao cadastrar cliente.')
    })
}

function carregarClientes() {
    fetch(url)
    .then(response => response.json())
    .then(clientes => {
        clientes.forEach(dado => mostrarResultado(dado))
    })
    .catch(error => {console.error('Erro:', error)})
}

window.onload = carregarClientes()

function removerCliente(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        const clienteDiv = document.querySelector(`div[data-id='${id}']`)
        if (clienteDiv) clienteDiv.remove()
    })
}