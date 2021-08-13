const OPERATIONS = {
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: '*',
    DIVISION: '/'
}
const BRACKETS = {
    OPEN: '(',
    CLOSE: ')'
}

function eval(operands, operation) {
    // Do not use eval!!!
    let a = Number.parseFloat(operands[0].split(' ').join('')), 
        b = Number.parseFloat(operands[1].split(' ').join(''));
    console.log(a, b);
    if (operation == OPERATIONS.ADDITION) {
        return a + b;
    } else if (operation == OPERATIONS.SUBTRACTION) {
        return a - b;
    } else if (operation == OPERATIONS.MULTIPLICATION) {
        return a * b;
    } else if (operation == OPERATIONS.DIVISION) {
        if (b == 0) {
            throw new TypeError("TypeError: Division by zero.");
        }
        return a / b;
    }

    return 0;
}

function expressionCalculator(expr) {
    // write your solution here
    expr = expr.split(' ').join('');
    console.log(expr);

    let get_operands = (expr, operation_index) => {
        let previous_operand = [], next_operand = [],
            operations = Object.values(OPERATIONS);
        for (let i = operation_index+1; i < expr.length; i++) {
            let ch = expr.charAt(i);
            if (i === operation_index+1 && ch === OPERATIONS.SUBTRACTION) {
                next_operand.push(ch);
            } else if (operations.includes(ch)) {
                break;
            } else {
                next_operand.push(ch);
            }
        }

        for (let i = operation_index-1; i >= 0; i--) {
            let ch = expr.charAt(i);
            if (operations.includes(ch)) {
                if (ch == OPERATIONS.SUBTRACTION) {
                    previous_operand.unshift(OPERATIONS.SUBTRACTION);
                }
                break;
            } else {
                previous_operand.unshift(ch);
            }
        }

        return [previous_operand.join(''), next_operand.join('')];
    };

    while (expr.indexOf(BRACKETS.OPEN) >= 0 || expr.indexOf(BRACKETS.CLOSE) >= 0 ) {
        let inner_expr = '', paired = 0;
        for (let i = expr.indexOf(BRACKETS.OPEN); i < expr.length; i++) {
            inner_expr += expr.charAt(i);
            if (expr.charAt(i) === BRACKETS.OPEN) {
                paired += 1;
            } else if (expr.charAt(i) === BRACKETS.CLOSE) {
                paired -= 1;
                
                if (!paired) {
                    inner_expr_result = expressionCalculator(inner_expr.substring(1, inner_expr.length - 1));
                    expr = expr.replace(inner_expr, inner_expr_result);
                    if (inner_expr_result < 0) {
                        expr = expr.replace('+-', '-');
                        expr = expr.replace('--', '+');
                    }
                    break;
                };
            }
        }

        if (paired != 0) {
            throw Error("ExpressionError: Brackets must be paired");
        }
        console.log("--Expr: ", expr);
    }
    

    [OPERATIONS.DIVISION, OPERATIONS.MULTIPLICATION, OPERATIONS.SUBTRACTION, OPERATIONS.ADDITION].forEach(operation => {
        while (expr.indexOf(operation, 1) > 0) {

            let operation_index = expr.indexOf(operation, 1);
            console.log("Operation index:", operation_index);
    
            let operands = get_operands(expr, operation_index);
            console.log("Operands: ", operands);
    
            let regex = operands.join(expr.charAt(operation_index));
            let operation_result = eval(operands, operation);
            console.log("Operation result: ", operation_result);

            expr = expr.replace(regex, operation_result);
            if (operation_result < 0) {
                expr = expr.replace('+-', '-');
                expr = expr.replace('--', '+');
            }
    
            // console.log(regex);
            console.log("**Expr: ", expr);
        }
    });
    
    return Number(expr);
}

module.exports = {
    expressionCalculator
}