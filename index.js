const op = ['\\*\\*', '\\*', '\\/', '\\+', '\\-']
const opName = ['pow', 'mul', 'div', 'plus', 'minus']

function calculate (expr){
  const br = expr.match(/\(([^()]+)\)/);
  if (br){
    const left = expr.slice(0, br.index);
    const right = expr.slice(br.index + br[1].length + 2);
    const e = getResult(br[1]);
    return calculate(left + e + right)
  } else {
    return(getResult(expr))
  }  
}

function getResult(expr){
  if(expr.match(/^[.0-9]*$/)) return expr;
  for(let i=0; i < op.length; ++i){
    const leftOp = expr.match(new RegExp(`([.0-9]*)${op[i]}[.0-9]*`))
    const rightOp = expr.match(new RegExp(`[.0-9]*${op[i]}([.0-9]*)`))
    let res;
    if (leftOp) {
      switch(opName[i]){
        case 'pow': res = Number(leftOp[1]) ** Number(rightOp[1])
          break;
        case 'mul': res = Number(leftOp[1]) * Number(rightOp[1])
          break;
        case 'div': res = Number(leftOp[1]) / Number(rightOp[1])
          break;
        case 'plus': res = Number(leftOp[1]) + Number(rightOp[1])
          break;
        case 'minus': res = Number(leftOp[1]) - Number(rightOp[1])
          break;
      }
      const left = expr.slice(0, leftOp.index);
      const right = expr.slice(leftOp.index + leftOp[0].length);
      return getResult(left + res + right)
    }
  }
}

console.log(calculate('1+(2/(4/5)+3)')) // 6.5