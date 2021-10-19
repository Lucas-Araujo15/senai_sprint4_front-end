import logo from './logo.svg';
import './App.css';
import React from 'react';

//Define um componente funcional DataFormatada que retorna o subtítulo com o valor a data e hora formatado
function DataFormatada(props) {
  return <h2>Horário atual:{props.date.toLocaleTimeString()}</h2>
}

//Componente de classe
//Define a classe Clock que será chamada dentro do App
class Clock extends React.Component {
  constructor(props) {
    super(props); //neste caso, permite que a classe tenha mais funcionalidades
    this.TimerPausar = this.TimerPausar.bind(this);
    this.TimerRetomar = this.TimerRetomar.bind(this);
    this.state = {
      // Define a propriedade date do state com o valor inicial como a data e hora daquele momento
      date: new Date(),
    }
  }
  // Ciclo de vida que ocorre quando o Clock é inserido na DOM (nascimento)
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.thick()
    }, 1000)
  }

  //Ciclo de vida que ocorre quando o Clock é retirado da DOM (morte)
  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  //Atualiza o state date com a data e hora deste momento, isto é, quando a função thick() for invocada
  thick() {
    this.setState({
      date: new Date()
    })
  }

  TimerPausar() {
    clearInterval(this.timerID)
    console.log(`Relógio ${this.timerID} pausado!`)
  }

  TimerRetomar() {
    this.timerID = setInterval(() => {
      this.thick()
    }, 1000);
    console.log("Relógio retomado")
    console.log(`Agora eu sou o relógio ${this.timerID}!`)
  }

  // Renderiza na tela o conteúdo do return
  render() {
    return (
      <div>
        <h1>Relógio</h1>
        <DataFormatada date={this.state.date} />
        <div className="btn">
          <button id="pausar" onClick={this.TimerPausar}>Pausar</button>
          <button id="retomar" onClick={this.TimerRetomar}>Retomar</button>
        </div>
      </div>
    )
  }
}

//Componente funcional
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clock />
        <Clock />
      </header>
    </div>
  );
}

//Declara que o componente App pode ser utilizado fora desse escopo
export default App;
