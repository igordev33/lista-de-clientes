import { limpaInput } from "./utils.js"

export class Clientes {
    #nome
    #email
    constructor (nome, email) {
        this.#nome = nome
        this.#email = email
    }

    get nome() {
        return this.#nome
    }

    get email() {
        return this.#email
    }
}

export class ListaDeClientes {
    constructor () {
        this.url = 'https://crudcrud.com/api/c21b475154c84b24a760747f37e62f32/clientes'
    }

    mostrarResultado(dado){
        const main = document.querySelector('main')
        const cliente = document.createElement('div')
        cliente.setAttribute('data-id', dado._id)
        cliente.innerHTML = `<p>Nome: ${dado.nome}</p>
                            <p>E-mail: ${dado.email}</p>`

        const btnExcluir = document.createElement('button')
        btnExcluir.textContent = 'Excluir cadastro'
        
        btnExcluir.addEventListener('click', () => {
            this.removerCliente(dado._id)
        })

        main.append(cliente)
        cliente.appendChild(btnExcluir)
    
        limpaInput('nome')
        limpaInput('email')
    }

    cadastrarCliente(cliente){
        fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: cliente.nome,
                email: cliente.email
            })
        })
        .then(response => response.json())
        .then(dado => this.mostrarResultado(dado))
        .catch(error => {
            console.error('Erro:', error)
            alert('Falha ao cadastrar cliente.')
        })
    }

    carregarClientes() {
        fetch(this.url)
        .then(response => response.json())
        .then(clientes => {
            clientes.forEach(dado => this.mostrarResultado(dado))
        })
        .catch(error => {console.error('Erro:', error)})
    }

    removerCliente(id) {
        fetch(`${this.url}/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            const clienteDiv = document.querySelector(`div[data-id='${id}']`)
            if (clienteDiv) clienteDiv.remove()
        })
    }
}