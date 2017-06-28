import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numberOne: 0,
      numberTwo: 0,
      finalResult: 0,
      tam_genes: 100, // quantidade de genes
      tam_pop: 50, // quantidade de indivíduos da população
      tam_torneio: 20, // tamanho do torneio
      geracoes: 500, // quantidade de gerações
      prob_mut: 0.2, // probabilidade de mutação
      prob_cruz: 0.7, // probabilidade de cruzamento
      indice_melhor: 0,
      score_melhor: 0
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

    var filho = []

    var populacao = this.inicializaPopulacao();
    //console.log(populacao);
    for (var i = 0; i < this.state.geracoes; i++) {
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
          console.log("Score pai:" + score_pai);
          var score_filho = this.obterPontuacao(filho);
          console.log("Score filho: " + score_filho);
          if (score_filho > score_pai) {
            // faz a cópia dos genes do filho para o pai
            for (var k = 0; k < this.state.tam_genes; k++)
              populacao[indice_pai1][k] = filho[k];
          }

        }

      }

      this.setState({
        indice_melhor: this.obterMelhor(populacao)
      });

      this.setState({
        score_melhor: this.obterPontuacao(populacao[this.state.indice_melhor])
      });

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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <form>
          <label>
            A:
          <input type="number" name="numberOne" value={this.state.numberOne} onChange={this.handleChange} />
          </label>
        </form>

        <form>
          <label>
            B:
          <input type="number" name="numberTwo" value={this.state.numberTwo} onChange={this.handleChange} />
          </label>
        </form>

        <button onClick={this.handleClick}>
          clica vei
          </button>

        <p>{this.state.numberOne + " + " + this.state.numberTwo}</p>
        <p>{parseInt(this.state.numberOne, 10) + parseInt(this.state.numberTwo, 10)}</p>
        <p>{"score melhor: " + this.state.score_melhor}</p>
        <p>{"indice melhor: " + this.state.indice_melhor}</p>

      </div>
    );
  }
}

export default App;
