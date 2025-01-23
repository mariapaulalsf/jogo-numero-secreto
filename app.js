// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto'; // inner é como se fosse dentro, coloca em aspas para substituir o texto no html

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número de 1 a 10';
//para evitar repetir codigos criamos uma funcao
let listaDeNumerosSorteados = [];
let numeroLimite = 100
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',
    {rate: 1.2});
}
function exibirMensagemInicial(params) {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');

}
exibirMensagemInicial();
function verificarChute() { //sempre que for criar uma funcao(determinar alguma acão) usar function e ser descritiva
    let chute = document.querySelector('input').value;
   
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        //como tem um atributo desativando o botao 'novo jogo'vamos desativar utilizando o getElementById (Id - especificar o botao) encrevemos o nome do botaoe .removeAttribute
        document.getElementById('reiniciar').removeAttribute('disabled'); //depois tem que entre ('') escrever oq quer remover do html
        
    } else {
        if (chute > numeroSecreto){
        exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
        exibirTextoNaTela('p', 'O número secreto é maior');
    }
    tentativas++;
    limparCampo()
}
}   
//para o numero gerado volte para a gnt usamos o return, ao contrario das outras funcoes essa devolve para a gnt
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = []; //comecar a lista novamente por isso o colchetes vazio [significa lista ]
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { //includes é para conferir se o elemento ta na lista, sendo verdadeiro vai tomar outra acao
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido)
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();;
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);//setAttribute é para desabilitar algo
}
