'use strict';

var app;
app = angular.module('Sei-Saude');

app.controller('elementoCtrl', function($http, $window) {

    var elemento = this;
    elemento._novoElemento = {};
    elemento._mensagem = {};
    
    var url;

    elemento.cadastrar = async function cadastraElemento(tipo) {
        var novoElemento;
        switch (tipo) {
            case 1:
                novoElemento = elemento.dadosComportamento();
                url = '/comportamento';
                break;
            case 2:
                novoElemento = elemento.dadosRemedio();
                url = '/remedio';
                break;
            case 3:
                novoElemento = elemento.dadosAlimento();
                url = '/alimento';
                break;
        }

        $http({
            method: 'POST',
            data: novoElemento,
            url: 'https://sei-saude.herokuapp.com/elemento' + url
        }).then(function (success){
            console.log(success);
            alert(success.data.name + " cadastrado com sucesso!");
        },function (error){
            console.log(error);
            if (error.status == 300) {
                alert("Não foi possível cadastrar o elemento.\nEsse nome já está em uso.");
            }
        }); 
        

    }

    elemento.dadosComportamento = function dadosComportamento() {
        var novoElemento = {
            cadastradoPor: elemento._novoElemento.cadastradoPor,
            descricao: elemento._novoElemento.descricao,
            name: elemento._novoElemento.name,
            tipo: 1,
        };
        return novoElemento;
    }

    elemento.dadosRemedio = function dadosRemedio() {
        var novoElemento = {
            cadastradoPor: elemento._novoElemento.cadastradoPor,
            descricao: elemento._novoElemento.descricao,
            fabricante: elemento._novoElemento.fabricante,
            name: elemento._novoElemento.name,
            tipo: 2,
        };
        return novoElemento;
    }

    elemento.dadosAlimento = function dadosAlimentos() {
        var novoElemento = {
            cadastradoPor: elemento._novoElemento.cadastradoPor,
            descricao: elemento._novoElemento.descricao,
            fabricante: elemento._novoElemento.fabricante,
            name: elemento._novoElemento.name,
            tipo: 3,
        };
        return novoElemento;
    }

    elemento.searchName = function searchName(){
        var nomeElemento = {
            name: elemento._novoElemento.name
        }

        return nomeElemento;
    }

    elemento.listaElementos = function() {
        
        $http({
            method: 'GET',
            url: 'https://sei-saude.herokuapp.com/all_elemento'
        }).then(function (success){
            console.log({success});

        },function (error){
            console.log({error});
        });
    }

    //Total máximo de campos que você permitirá criar em seu site:
    var totalCampos = 10;

    elemento.totalCampos = function() {
        return totalCampos;
    }

    //Não altere os valores abaixo, pois são variáveis controle;
    var iLoop = 1;
    var iCount = 0;
    var linhaAtual;
    var linhasOcultas;


    elemento.addCampos = function AddCampos() {
    var hidden1 = document.getElementById("hidden1");
    var hidden2 = document.getElementById("hidden2");

    //Executar apenas se houver possibilidade de inserção de novos campos:
    if (iCount < totalCampos) {

    //Limpar hidden1, para atualizar a lista dos campos que ainda estão vazios:
    hidden2.value = "";

    //Atualizando a lista dos campos que estão ocultos.
    //Essa lista ficará armazenada temporiariamente em hidden2;
    for (iLoop = 1; iLoop <= totalCampos; iLoop++) {
            if (document.getElementById("linha"+iLoop).style.display == "none") {
                    if (hidden2.value == "") {
                            hidden2.value = "linha"+iLoop;
                    }else{
                            hidden2.value += ",linha"+iLoop;
                    }
            }
    }
    //Quebrando a lista que foi armazenada em hidden2 em array:

    linhasOcultas = hidden2.value.split(",");


            if (linhasOcultas.length > 0) {
                    //Tornar visível o primeiro elemento de linhasOcultas:
                    document.getElementById(linhasOcultas[0]).style.display = "block"; iCount++;
                    
                    //Acrescentando o índice zero a hidden1:
                    if (hidden1.value == "") {
                            hidden1.value = linhasOcultas[0];
                    }else{
                            hidden1.value += ","+linhasOcultas[0];
                    }
                    
                    /*Retirar a opção acima da lista de itens ocultos: <-------- OPCIONAL!!!
                    if (hidden2.value.indexOf(","+linhasOcultas[0]) != -1) {
                            hidden2.value = hidden2.value.replace(linhasOcultas[0]+",","");
                    }else if (hidden2.indexOf(linhasOcultas[0]+",") == 0) {
                            hidden2.value = hidden2.value.replace(linhasOcultas[0]+",","");
                    }else{
                            hidden2.value = "";
                    }
                    */
            }
    }
    }

    elemento.removeCampos = function RemoverCampos(id) {
    //Criando ponteiro para hidden1:        
    var hidden1 = document.getElementById("hidden1");

    //Pegar o valor do campo que será excluído:
    var campoValor = document.getElementById("arq"+id).value;
            //Se o campo não tiver nenhum valor, atribuir a string: vazio:
            if (campoValor == "") {
                    campoValor = "vazio";
            }

            if(confirm("O campo que contém o valor:\n» "+campoValor+"\nserá excluído!\n\nDeseja prosseguir?")){
                    document.getElementById("linha"+id).style.display = "none"; iCount--;
                    
                    //Removendo o valor de hidden1:
                    if (hidden1.value.indexOf(",linha"+id) != -1) {
                            hidden1.value = hidden1.value.replace(",linha"+id,"");
                    }else if (hidden1.value.indexOf("linha"+id+",") == 0) {
                            hidden1.value = hidden1.value.replace("linha"+id+",","");
                    }else{
                            hidden1.value = "";
                    }
            }
    }

});