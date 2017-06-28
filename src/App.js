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
      score_melhor: 0,
      populacao: []
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
          indice_melhor: this.obterMelhor(populacao)
        });

        this.setState({
          score_melhor: this.obterPontuacao(populacao[this.state.indice_melhor])
        });

        this.setState({
          populacao: populacao
        });
      }, 10 * i);
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
        <div className="App-header" style={{marginBottom: 20}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Algoritmo Genético</h2>
        </div>
        <form>
          <label>
            Quantidade de genes:
          <input type="number" name="tam_genes" value={this.state.tam_genes} onChange={this.handleChange} />
          </label>
        </form>

        <form>
          <label>
            Tamanho da populacao:
          <input type="number" name="tam_pop" value={this.state.tam_pop} onChange={this.handleChange} />
          </label>
        </form>

        <form>
          <label>
            Tamanho do torneio:
          <input type="number" name="tam_torneio" value={this.state.tam_torneio} onChange={this.handleChange} />
          </label>
        </form>

        <form>
          <label>
            Quantidade de gerações:
          <input type="number" name="geracoes" value={this.state.geracoes} onChange={this.handleChange} />
          </label>
        </form>
        <form>
          <label>
            Probabilidade de mutação:
          <input type="number" name="prob_mut" value={this.state.prob_mut} onChange={this.handleChange} />
          </label>
        </form>
        <form>
          <label>
            Probabilidade de cruzamento:
          <input type="number" name="prob_cruz" value={this.state.prob_cruz} onChange={this.handleChange} />
          </label>
        </form>

        <button onClick={this.handleClick}>
          clica vei
          </button>

        <p style={{ fontSize: 30 }}>{"Fitness: " + this.state.score_melhor}</p>
        <div style={{ wordWrap: 'break-word', width: '65%', height: '80%', marginRight: 'auto', marginLeft: 'auto' }}>
          <p style={{ fontSize: 30 }}>{this.state.populacao[this.state.indice_melhor]}</p>
        </div>
      </div>
    );
  }
}

export default App;
