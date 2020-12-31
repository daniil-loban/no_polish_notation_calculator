const op = ['\\*\\*', '\\*', '\\/', '\\+', '\\-']
const opName = ['pow', 'mul', 'div', 'plus', 'minus']

function calculate (expr){
  const brackets = expr.match(/\(([^()]+)\)/);         // deep bracket
  if (brackets){
    const left = expr.slice(0, brackets.index);        // before bracket 
    const right = expr
      .slice(brackets.index + brackets[1].length + 2); // after bracket
    const bracketsValue = getResult(brackets[1]);      // evaluate bracket
    return calculate(left + bracketsValue + right)
  } else {
    return(getResult(expr))
  }  
}

function getResult(expr){
  if(expr.match(/^[.0-9]*$/)) return expr;
  for(let i=0; i < op.length; ++i){ // get operation by priority
    const leftOperand = expr.match(new RegExp(`([.0-9]*)${op[i]}[.0-9]*`)) 
    const rightOperand = expr.match(new RegExp(`[.0-9]*${op[i]}([.0-9]*)`))
    let operationResult;
    if (leftOperand) {
      switch(opName[i]){
        case 'pow': operationResult = Number(leftOperand[1]) ** Number(rightOperand[1])
          break;
        case 'mul': operationResult = Number(leftOperand[1]) * Number(rightOperand[1])
          break;
        case 'div': operationResult = Number(leftOperand[1]) / Number(rightOperand[1])
          break;
        case 'plus': operationResult = Number(leftOperand[1]) + Number(rightOperand[1])
          break;
        case 'minus': operationResult = Number(leftOperand[1]) - Number(rightOperand[1])
          break;
      }
      const left = expr.slice(0, leftOperand.index);       // before current operation
      const right = expr
        .slice(leftOperand.index + leftOperand[0].length); // after current operation
      return getResult(left + operationResult + right)
    }
  }
}

console.log(calculate('(2**2+3)*2+1')) // result 15
