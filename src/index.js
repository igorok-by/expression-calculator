function eval() {
    // Do not use eval!!!
    return;
}

const splitExpressionToArray = (expr) => {
  arrayFromExpr = expr.split('');

  for (let i = 0; i < arrayFromExpr.length; i++) {
    if (arrayFromExpr[i] === '+' || arrayFromExpr[i] === '-' || arrayFromExpr[i] === '*' || arrayFromExpr[i] === '/' || arrayFromExpr[i] === '(' || arrayFromExpr[i] === ')') {
      arrayFromExpr[i] = ' ' + arrayFromExpr[i] + ' ';
    };
  };

  arrayFromExpr = arrayFromExpr.join('').split(' ');

  for (let i = 0; i < arrayFromExpr.length; i++) {
    if (arrayFromExpr[i] === '') {
      arrayFromExpr.splice(i, 1);
      i--;
    } else if (!isNaN(arrayFromExpr[i])) {
      arrayFromExpr[i] = +arrayFromExpr[i];
    } else {
      arrayFromExpr[i] = arrayFromExpr[i];
    };
  };

  return arrayFromExpr;
};

const handleOperationWithNumbs = (operator, firstNumb, secondNumb) => {
  switch (operator) {
    case '*':
      return firstNumb * secondNumb;
      break;
    case '/': {
      if (secondNumb == 0) {
        throw new Error('TypeError: Division by zero.');
      } else {
        return firstNumb / secondNumb;
      };
      break;
    };
  case '+': {
    return firstNumb + secondNumb;
    break;
  };
  case '-': {
    return firstNumb - secondNumb;
    break;
  };
  };
};

function expressionCalculator(expr) {
  const checkParentheses = (checkedExpr) => {
    let countOpenParentheses = 0;
    let countCloseParentheses = 0;

    for (let i = 0; i < checkedExpr.length; i++) {
      if (checkedExpr[i] == '(') countOpenParentheses++;
      if (checkedExpr[i] == ')') countCloseParentheses++;
    };
    return (countOpenParentheses == countCloseParentheses) ? true : false;
  };

  if (checkParentheses(expr) === false) {
    throw new Error('ExpressionError: Brackets must be paired');
  };
  
  let arrFromExpr = splitExpressionToArray(expr);
  let operatorStack = [];
  let numberStack = [];
  const operationPriority = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };

  for (var i = 0; i < arrFromExpr.length; i++) {

    if (numberStack.length === 0 || operatorStack.length === 0) {

      if (/[0-9]/.test(arrFromExpr[i])) {
        numberStack.push(arrFromExpr[i]);
      } else {
        operatorStack.push(arrFromExpr[i]);
      };

    } else if (/[0-9]/.test(arrFromExpr[i])) {
      numberStack.push(arrFromExpr[i]);

    } else if (operationPriority[arrFromExpr[i]] > operationPriority[operatorStack[operatorStack.length - 1]] || arrFromExpr[i] === '(' || operatorStack[operatorStack.length - 1] === '(') {
      operatorStack.push(arrFromExpr[i]);

    } else if (operationPriority[arrFromExpr[i]] <= operationPriority[operatorStack[operatorStack.length - 1]]) {

      while (operationPriority[arrFromExpr[i]] <= operationPriority[operatorStack[operatorStack.length - 1]] || operationPriority[operatorStack[operatorStack.length - 1]] === '(') {

        let result = handleOperationWithNumbs(operatorStack[operatorStack.length - 1], numberStack[numberStack.length - 2], numberStack[numberStack.length - 1]);

        numberStack.splice(numberStack.length - 2, 2);
        numberStack.push(result);
        operatorStack.splice(operatorStack.length - 1, 1);
      };
      operatorStack.push(arrFromExpr[i]);

    } else if (arrFromExpr[i] === ')') {

      while (operatorStack[operatorStack.length - 1] !== '(') {

        let result = handleOperationWithNumbs(operatorStack[operatorStack.length - 1], numberStack[numberStack.length - 2], numberStack[numberStack.length - 1]);

        numberStack.splice(numberStack.length - 2, 2);
        numberStack.push(result);
        operatorStack.splice(operatorStack.length - 1, 1);
      };

      operatorStack.splice(operatorStack.length - 1, 1);
    };

  };

  while (numberStack.length > 1) {
    let result = handleOperationWithNumbs(operatorStack[operatorStack.length - 1], numberStack[numberStack.length - 2], numberStack[numberStack.length - 1]);

    numberStack.splice(numberStack.length - 2, 2);
    numberStack.push(result);
    operatorStack.splice(operatorStack.length - 1, 1);
  };

  return numberStack[0];
}

module.exports = {
    expressionCalculator
}