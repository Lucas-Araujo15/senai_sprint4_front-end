import { Component } from "react";
import './ListaGithub.css';


class ListaGithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaUserGit: [],
            nomeUser: '',
            titulo: '',
            teste:false
        }
    };

    atualizaEstadoNome = async (event) => {
        await this.setState({
            nomeUser: event.target.value
        })
    }

    buscarDadosUsuario = (event) => {

        event.preventDefault();

        this.setState({
            titulo: this.state.nomeUser,
            teste: true
        })

        fetch('https://api.github.com/users/' + this.state.nomeUser + '/repos?per_page=10&sort=created')

            .then(resposta => resposta.json())

            .then(repos => this.setState({ listaUserGit: repos }))

            .catch(erro =>
                console.log(erro),
                this.setState({
                    erro: true
                }))

            .then(console.log(this.state.listaUserGit.length))
    }

    limparDados = () => {
        this.setState({
            nomeUser: '',
            listaUserGit: [],
        })
    }

    render() {
        return (
            <main>
                <section className="secao-lista">
                    <h1>Faça uma busca</h1>
                    <form onSubmit={this.buscarDadosUsuario}>
                        <input type="text"
                            value={this.state.nomeUser}
                            placeholder="Digite o nome do usuário"
                            onChange={this.atualizaEstadoNome}
                        />
                        <button type="submit" disabled={this.state.nomeUser === '' ? 'none' : ''}>Buscar</button>
                    </form>
                    <h2 style={this.state.titulo === '' ? { display: 'none' } : { display: '' }}>Repositórios de {this.state.titulo}</h2>

                    {
                        this.state.listaUserGit.length > 0 ?
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Data de criação</th>
                                        <th>Tamanho</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.listaUserGit.map((listaRepositorio) => {
                                            return (
                                                <tr key={listaRepositorio.id}>
                                                    <td>{listaRepositorio.id}</td>
                                                    <td>{listaRepositorio.name}</td>
                                                    <td>{listaRepositorio.description}</td>
                                                    <td>{listaRepositorio.created_at}</td>
                                                    <td>{listaRepositorio.size}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            :

                            <h2 style={this.state.teste === false ? { display: 'none' } : { display: '' }}>Usuário não encontrado</h2>
                    }
                </section>
            </main>
        )
    }
}

export default ListaGithub;