import { Clientes, ListaDeClientes } from "./classes.js"

const listaDeClientes = new ListaDeClientes

//Puxa as informações do banco de dados ao carregar a página e mostra na tela
window.onload = () => listaDeClientes.carregarClientes()


//cria no banco de dados as informações ao clicar no botão cadastrar
document.getElementById('cadastrar').addEventListener('click', () => {
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value

    const cliente = new Clientes(nome, email)

    listaDeClientes.cadastrarCliente(cliente)
}) 




