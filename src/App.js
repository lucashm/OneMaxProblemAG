import React, { Component } from 'react';
import logo from './dna.svg';
import './App.css';

var LineChart = require("react-chartjs").Line;

var auxLabel = [];
var auxData = [];
var dataSet = {
            labels: auxLabel,
        datasets: [{
            label: "Genetic Algorythm",
            backgroundColor: '#2980b9',
            borderColor: '#2ecc71',
            data: auxData,
        }]
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numberOne: 0,
      numberTwo: 0,
      finalResult: 0,
      tam_genes: 100, // quantidade de genes
      tam_pop: 10, // quantidade de indivíduos da população
      tam_torneio: 20, // tamanho do torneio
      geracoes: 200, // quantidade de gerações
      prob_mut: 0.2, // probabilidade de mutação
      prob_cruz: 0.7, // probabilidade de cruzamento
      indice_melhor: 0,
      score_melhor: 0,
      populacao: [],
      intervalo: 25,
      currentGeneration: 0,
      reachedGeneration: 0,
      cont: 0
    };
  }

  inicializaPopulacao = () => {
    var populacao = [];
    for (var i = 0; i < this.state.tam_pop; i++) {
      var individuo = [];

      for (var j = 0; j < this.state.tam_genes; j++) {
        var num = Math.round(Math.random() % 2);
        individuo.push(num);

      }
      populacao.push(individuo);

    }

    return populacao;
  }


  cruzamento = (indice_pai1, indice_pai2, populacao) => {
    var ponto = Math.round((Math.random() * (this.state.tam_genes - 1)) % this.state.tam_genes);
    var filho = [];
    for (var i = 0; i <= ponto; i++) {
      // alert(populacao[0][i]);
      filho.push((populacao[indice_pai1][i]))
    }
    for (i = ponto + 1; i < this.state.tam_genes; i++) {
      filho.push((populacao[indice_pai2][i]))
    }

    return filho;
  }

  mutacao = (filho) => {
    // escolhe um gene aleatoriamente no intervalo [0, tam_genes - 1]
    var gene = Math.round((Math.random() * (this.state.tam_genes - 1)) % this.state.tam_genes);
    // modifica o valor do gene escolhido
    // console.log("filho: " + filho + " gene: " + gene);
    if (filho[gene] === 0)
      filho[gene] = 1;
    else
      filho[gene] = 0;

    //console.log(filho[gene]);
    return filho;
  }

  obterPontuacao = (individuo) => {
    // o score é a soma dos valores dos genes
    let soma = 0;

    for (var i = 0; i < this.state.tam_genes; i++)
      soma = soma + individuo[i];
    return soma;
  }


  obterMelhor = (populacao) => {
    var indice_melhor = 0;
    var score_melhor = this.obterPontuacao(populacao[0]);

    for (var i = 1; i < this.state.tam_pop; i++) {
      var score = this.obterPontuacao(populacao[i]);
      if (score > score_melhor) {
        indice_melhor = i;
        score_melhor = score;
      }
    }
    return indice_melhor;
  }

  mainCall = () => {
    Math.round(Math.random());
    var populacao = this.inicializaPopulacao();
    this.start(populacao);
  }

  start = (populacao) => {
    var filho = []
    for (var i = 0; i < this.state.geracoes; i++) {
      var interval = setTimeout(() => {
        clearInterval(interval);
        for (var j = 0; j < this.state.tam_torneio; j++) {
          // calcula a probabilidade de cruzamento
          var prob = ((Math.random()));
          //console.log("probabilidade: " + prob);
          if (prob < this.state.prob_cruz) {
            var indice_pai1 = Math.round(Math.random() % this.state.tam_pop);
            var indice_pai2;
            do {
              indice_pai2 = Math.round(Math.random() % this.state.tam_pop);
            }
            while (indice_pai1 === indice_pai2);

            //console.log("indice pai1: " + indice_pai1);
            //console.log("indice pai2: " + indice_pai2);

            filho = this.cruzamento(indice_pai1, indice_pai2, populacao);

            prob = (Math.random());

            if (prob < this.state.prob_mut) {
              filho = this.mutacao(filho)
            }
            var score_pai = this.obterPontuacao(populacao[indice_pai1]);
            //console.log("Score pai:" + score_pai);
            var score_filho = this.obterPontuacao(filho);
            //console.log("Score filho: " + score_filho);
            if (score_filho > score_pai) {
              // faz a cópia dos genes do filho para o pai
              for (var k = 0; k < this.state.tam_genes; k++)
                populacao[indice_pai1][k] = filho[k];
            }

          }

        }

        this.setState({
          currentGeneration: this.state.currentGeneration + 1
        });

        this.setState({
          indice_melhor: this.obterMelhor(populacao)
        });

        this.setState({
          score_melhor: this.obterPontuacao(populacao[this.state.indice_melhor])
        });

        this.setState({
          populacao: populacao
        });

        if (parseInt(this.state.tam_genes, 10) === parseInt(this.state.score_melhor, 10) && this.state.cont === 0) {
          this.setState({
            reachedGeneration: this.state.currentGeneration,
            cont: 1
          });
        }
        if(parseInt(this.state.currentGeneration%(this.state.geracoes/10), 10) === 1){
          auxLabel.push(this.state.currentGeneration);  
          auxData.push(this.state.score_melhor);
        }

        if(parseInt(this.state.currentGeneration+1, 10) === parseInt(this.state.geracoes, 10)){
          auxLabel.push(this.state.currentGeneration);
          auxData.push(this.state.score_melhor);
          this.forceUpdate();
        }

        
          var dataSet = {
            labels: auxLabel,
        datasets: [{
            label: "My First dataset",
            backgroundColor: '#2980b9',
            borderColor: '#2ecc71',
            data: auxData,
        }]
  }


      }, this.state.intervalo * i);
    }

  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleClick = (event) => {
    console.log("CLICADO MEN");
    this.mainCall();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header" style={{ marginBottom: 20 }}>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Algoritmo Genético - Máximos de 1</h2>
        </div>
        <div style={{ width: '20%', marginLeft: '22', marginRight: 'auto', textAlign: 'left', marginBottom: '2%', float: 'left' }}>
          <form style={{ marginBottom: 10 }}>
            <label>
              Quantidade de genes: {" "}
              <input type="number" name="tam_genes" value={this.state.tam_genes} onChange={this.handleChange} />
            </label>
          </form>

          <form style={{ marginBottom: 10 }}>
            <label>
              Tamanho da populacao:{" "}
              <input type="number" name="tam_pop" value={this.state.tam_pop} onChange={this.handleChange} />
            </label>
          </form>

          <form style={{ marginBottom: 10 }}>
            <label>
              Tamanho do torneio: {" "}
              <input type="number" name="tam_torneio" value={this.state.tam_torneio} onChange={this.handleChange} />
            </label>
          </form>

          <form style={{ marginBottom: 10 }}>
            <label>
              Quantidade de gerações: {" "}
              <input type="number" name="geracoes" value={this.state.geracoes} onChange={this.handleChange} />
            </label>
          </form>

          <form style={{ marginBottom: 10 }}>
            <label>
              Probabilidade de mutação: {" "}
              <input type="number" name="prob_mut" value={this.state.prob_mut} onChange={this.handleChange} />
            </label>
          </form>

          <form style={{ marginBottom: 10 }}>
            <label>
              Probabilidade de cruzamento: {" "}
              <input type="number" name="prob_cruz" value={this.state.prob_cruz} onChange={this.handleChange} />
            </label>
          </form>

          <form style={{ marginBottom: 10 }}>
            <label>
              Intervalo(milissegundos): {" "}
              <input type="number" name="intervalo" value={this.state.intervalo} onChange={this.handleChange} />
            </label>
          </form>

          <button className="btn" onClick={this.handleClick}>
            Iniciar!
          </button>
          <div style = {{width: 450}}>

          <pre style ={{float: 'left'}}>
              P{"\n"}o{"\n"}n{"\n"}t{"\n"}u{"\n"}a{"\n"}ç{"\n"}ã{"\n"}o
          </pre>
           <LineChart data={dataSet} options={{}} width="400%" height="250" redraw style = {{textAlign: 'left', backgroundColor: 'white', borderRadius: 10, marginLeft: 15 , marginTop: 15}}/>
          
           <pre style = {{marginLeft: 30, marginTop: 0}}> G e r a ç õ e s </pre>
           </div>
        </div>

        <p style={{ fontSize: 30 }}>{"Pontuação máxima: " + this.state.score_melhor}</p>
        <p style={{ fontSize: 30 }}>{"Geração atual: " + parseInt(this.state.currentGeneration + 1, 10)}</p>
        <p style={{ fontSize: 30 }}>{"Geração que alcançou o maior score: " + parseInt(this.state.reachedGeneration + 1, 10)}</p>
        <div style={{ wordWrap: 'break-word', width: '65%', height: '80%', marginLeft: 'auto', marginRight: '120' }}>
          <p style={{ fontSize: 44 }}>{this.state.populacao[this.state.indice_melhor]}</p>
        </div>
        
          
        
      </div>
    );
  }
}

export default App;
