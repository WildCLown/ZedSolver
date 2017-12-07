function readFormula(fileName) {
  let fs = require("fs")
  let text = fs.readFileSync('C:\Users\gtsa\Desktop\sat-master\simple0.cnf').toString();
  text = text.split('\n');
  var clauses = readClauses(text)
  var variables = readVariables(clauses, text)
  let specOk = checkProblemSpecification(text, clauses, variables)
  let result = { 'clauses': [], 'variables': [] }
  if (specOk) {
    result.clauses = clauses
    result.variables = variables
  }
  return result
}
function readClauses(text){
  let arrayClauses = [];
  for (let i = 0; i < text.length; i++) {
    let a = text[i]
    if(a.charAt(0) == "c" ){
    }else if(a.charAt(0) == "p"){
      /* tenho ciencia que pode nao comecar com p, e mesmo assi, ter que rodar o sat, mas nao consegui voltar a este ponto, pois estava a tentar organizar as outras funcoes*/
      /* bem intuitivo, acredito eu, explicarei se pedir*/
      let aux = a.split(' ')
      for (let i = 0, x = 0; i < aux.length; i++) {
        /* ira passar todas as strings, menos as vazias ('') para frente, logo, a posiçao do array em 2 e 3 serao numeros, caso nao queira trollar*/
        if(aux[i] != ''){
          aux[x] = aux[i]
          x++
        }
      }
      /* p cnf #vars #clauses */
      var clausesNumber = aux[3]
      var clausesLenght = aux[2]
      let found = false;
      let x = 0 /* contadores */
      let y = 0

      while (clausesNumber>y){ /* forma de armazenar as variaveis em clausulas*/
        i++
        let a = text[i]
        if(a.charAt(0) == "c" ){
          /* como disse antes, o medo de possuir um comentario dentre as clausulas fora grande, logo, implementei dessa forma*/
          /* apenas para pular este text[i]*/
        }else{
          arrayClauses[y] = []
          let aux = a.split(' ')
          while(!found){
           let number = aux[x] 
           if(number == 0){
            found = true
          }else if(number == null){
            i++
            let a = text[i]
            let aux = a.split(' ')
          }else{
            /* para facilitar na hora de substituir valores, pois caso false, !false = true*/
            arrayClauses[y][x] =  number.replace('-','!')
          }
          x++
        }
        x = 0
        found = false
        y++
      }
    }
  }
}
return arrayClauses
} 
function readVariables(clauses, text){
  let arrayVariables = [];
  let aux = clauses.length
  for (let i = 0; i < aux ; i++) {
    let aux2 = clauses[i].length
    for (var j = 0; j <aux2; j++){
      let varAux = (clauses[i][j]).replace('!','')
      let counter = arrayVariables.length
      let achou = false
      for(k = 0; (k< counter+1) && (!achou); k++){
        if(arrayVariables[k] == varAux){
          achou = true
        }else if(arrayVariables[k] == null){
          arrayVariables[k] = varAux
        }else {
          /* apenas para pular este [k]*/
        }
      }
    }
  }
  /* inicialmente devolverá todos os numeros que há dentro das clausulas, ignorando ser negativo */
  return arrayVariables
}
function checkProblemSpecification(text, clauses, variables){
  for (let i = 0; i < text.length; i++) {
    let a = text[i].toString();
    if(a.charAt(0) == "c" ){
      /* apenas para pular a leitura do comentário citado*/
    }else if(a.charAt(0) == "p"){
      let aux = a.split(' ')
      for (let j = 0, x = 0; j < aux.length; j++) {
        if(aux[j] != ''){
          aux[x] = aux[j]
          x++
        }
      }
      /* p cnf #vars #clauses */
      var clausesNumber = aux[3]
      var clausesLenght = aux[2]
      let found = false;
      let x = 0 /* contadores */
      let y = 0
    }
  }
  /* checa se o tamanho do array de variaveis possui o mesmo tamanho do numero de variaveis fornecido no cnf*/
  if(variables.length != clausesLenght){
    return false
      /* checa se o tamanho do array de clausulas possui o mesmo tamanho de numero de clausulas forneido no cnf */

  }else if(clauses.length != clausesNumber){
    return false
  }
  else{
    return true
  }
}
function nextAssignment(variables){
  /* Apresentação com o criador necessária . . . N sei explicar em 1 linha */
  let i = variables.length
  let achou = false
  if(variables[0] != false  && variables[0] != true){
    for (var i = variables.length - 1; i >= 0; i--) {
      variables[i] = false
    }
    return variables
    
  }else{

    while (!achou){
      if(variables[i-1] == false){
        variables[i-1] = true
        achou = true
        if(i != variables.length){
          i++
          while(i <= variables.length){
            variables[i-1] = false
            i++
          }
          return variables
        }else{
          return variables
        }
      }
      else if(i==0){ /* não testei, mas acredito que poderia comparar i==1*/
        return variables
      }
      else{
        i--
      }
    }
  }
}
function doSolve(clauses , variables){
  let isSat = false
  let satisfyingAssignment = null
  while(!isSat){
    
  }

  return satisfyingAssignment , isSat
}
