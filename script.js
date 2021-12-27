const TELA = document.getElementById("tela")
const TELA_RESULTADO = document.getElementById("resultado")

const LIMPAR = function() { // Função para limpar todos os valores da calculadora.
    TELA.value = " "
    TELA_RESULTADO.value = " "
    calculo.valorSalvo = null
    calculo.funcaoCalcular = null
}

const DEL = function() {  // Função para apagar um a um os valores na tela.
    let num = TELA.value.slice(0, TELA.value.length - 1)
    if (TELA.value){
        TELA.value = num
    }
}

let calculo = {  // Guarda o valor dos calculos e a função a ser calculada.
    valorSalvo: null,
    funcaoCalcular: null,
}


window.addEventListener("load", function(){atribuirEventos()}) // Ao carregar a tela vai iniciar a função de atribuir evento aos botões.


    //Atribui os eventos a todos os botões da calculadora.
function atribuirEventos() {

    //Atribui eventos aos números.
    document.getElementById("botao0").addEventListener("click", inserirNumeroNaTela);
    document.getElementById("botao1").addEventListener("click", inserirNumeroNaTela);
    document.getElementById("botao2").addEventListener("click", inserirNumeroNaTela);
    document.getElementById("botao3").addEventListener("click", inserirNumeroNaTela);
    document.getElementById("botao4").addEventListener("click", inserirNumeroNaTela);
    document.getElementById("botao5").addEventListener("click", inserirNumeroNaTela);
    document.getElementById("botao6").addEventListener("click", inserirNumeroNaTela);
    document.getElementById("botao7").addEventListener("click", inserirNumeroNaTela);
    document.getElementById("botao8").addEventListener("click", inserirNumeroNaTela);
    document.getElementById("botao9").addEventListener("click", inserirNumeroNaTela);

    // Atribui valor ao Del, Clear e Igual
    document.getElementById("clear").addEventListener("click", LIMPAR)
    document.getElementById("del").addEventListener("click", DEL) 
    document.getElementById("igual").addEventListener("click", clicaResultado)   

    //Atribui valor aos botões de operação
    document.getElementById("somar").addEventListener("click", clicaOperador)
    document.getElementById("subtrair").addEventListener("click", clicaOperador)
    document.getElementById("dividir").addEventListener("click", clicaOperador)
    document.getElementById("multiplicar").addEventListener("click", clicaOperador)

    // Atribui valor a ponto
    document.getElementById("ponto").addEventListener("click", inserirPonto)
}


// Adiciona o número na tela
function inserirNumeroNaTela() {
    // Se o valor na tela não for um número ou for 0, substitui pelo número/valor do botão
    if (isNaN(TELA.value) || (TELA.value == 0)) {TELA.value = event.target.textContent;} 
    else {TELA.value += event.target.textContent;}
    
}

// Função para inserir ponto
function inserirPonto (){
    if(TELA.value === " " || isNaN(TELA.value)){TELA.value = "0."}
    else if (!TELA.value.includes(".")){TELA.value = TELA.value + "."}
}


function somar(valor1, valor2){ // Função para somar 
    return valor1 + valor2
}

function subtrair(valor1, valor2){ // Função para subtrair
    return valor1 - valor2
}

function multiplicar(valor1, valor2){ // função parar multiplicar 
    return valor1 * valor2
}

function dividir(valor1, valor2){ // Função para dividir
    if(valor2 == 0){alert("Erro, divisão por 0") // essa parte verifica se o divisor é 0, se for, alertará um erro pois qualquer número dividido por 0 resulta num número infinito.
    return 0}
    else {return valor1 / valor2}
}


function clicaOperador (){ // Ao clicar no operador
    if(!isNaN(TELA.value)){ // verificar se o valor clicado é numérico

        if(calculo.valorSalvo == null){ // se for, verificamos se o valor salvo é igual a "null", com isso saberemos se estamos no meio de uma operação ou começando uma.

            calculo.valorSalvo = Number(TELA.value) // se for igual a "null", o valor salvo será o valor que está na tela 

        }else if(calculo.funcaoCalcular != null){ // se for diferente, e a função para calcular está preenchida, o valor salvo será o o resultado da operação entre o valor já salvo e o valor que está na tela.
            calculo.valorSalvo = calculo.funcaoCalcular(calculo.valorSalvo, Number(TELA.value))
        }
    }

    let operador = event.target.textContent //Se não for numérico, adicionamos o operador na função
    direcionarOperadores(operador)          // direciona operadores como parâmetro na função "direcionar operadores" 
    TELA.value = operador                   // mostra o operador na tela
}
    
// Atribui operação a "funçãoCalcular" dentro do objeto "calculo"
function direcionarOperadores (operador){
    if (operador == "+"){calculo.funcaoCalcular = somar}
    else if (operador == "-"){calculo.funcaoCalcular = subtrair}
    else if (operador == "/"){calculo.funcaoCalcular = dividir}
    else if (operador == "*"){calculo.funcaoCalcular = multiplicar}
}


// Mostra o resltado quando o botão "=" é clicado
function clicaResultado (){
    if(!isNaN(TELA.value) && (calculo.funcaoCalcular != null)){
        let resultado = calculo.funcaoCalcular(calculo.valorSalvo, Number(TELA.value))

        TELA_RESULTADO.value = resultado 
        calculo.valorSalvo = resultado

        calculo.funcaoCalcular = null
    }
}
