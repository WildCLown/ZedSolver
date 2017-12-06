function readFormula(fileName) {
  let fs = require("fs")
    // To read the file, it is possible to use the 'fs' module.
    // Use function readFileSync and not readFile.
    // First read the lines of text of the file and only afterward use the auxiliary functions.
    let text = fs.readFileSync('C:\Users\gtsa\Desktop\sat-master\simple0.cnf').toString();
    text = text.split('\n');
    let clauses = readClauses(text)
    let variables = readVariables(clauses)
    
    // In the following line, text is passed as an argument so that the function
    // is able to extract the problem specification.
    let specOk = checkProblemSpecification(clauses, variables)

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
        /* apenas para pular a leitura do comentário citado*/
      }else if(a.charAt(0) == "p"){
        let aux = a.split(' ')
        for (let i = 0, x = 0; i < aux.length; i++) {
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
              arrayClauses[y][x] =  number
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
      let varAux = Math.abs(clauses[i][j])
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
  let auxiliar = arrayVariables.length
  for (let u = 0; u < auxiliar; u++) {
    arrayVariables[u] = 0
  }

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
  if(variables.length != clausesLenght){
    return false
  }else if(clauses.length != clausesNumber){
    return false
  }
  else{
    return true
  }
}
a = readFormula()
console.log(a)