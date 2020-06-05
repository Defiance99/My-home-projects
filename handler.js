let calculatorValues = document.getElementById("CalculatorConteiner").getElementsByTagName("tr");
console.log(calculatorValues);
let expression = "";
let pass = true; // in a string must be only one operator
let operators = ["/","*","+","-"];


addActForEachElement(calculatorValues);


function addActForEachElement(calculatorValues) {
    for (let i = 0; i < calculatorValues.length; i++) {
        calculatorValues[i].addEventListener("mouseup", (element) => {
            let simbol = element.target.textContent;
            actProcessing(simbol);
        })
    }
} 


function actProcessing(simbol) {
    if (simbol == "Clear") {
        expression = "";
        pass = true;
        displayingExpression(expression);
        return;
    }
    if (simbol == "C") {
        if (operators.includes(expression.slice(-1))) pass = true;
        expression = expression.slice(0,expression.length - 1);
        displayingExpression(expression);
        return;
    }
    if (simbol == "-" && expression.length == 0) {
        expression += simbol;
        displayingExpression(expression);
        return;
    }
    if (operators.includes(simbol)) {
        if (!pass && operators.includes(expression.slice(-1))) {
            expression = expression.slice(0,expression.length - 1) + simbol;
            pass = false;
            displayingExpression(expression);
            return;
        }
        if (pass) {
            pass = false;
        }
        else return;
    }

    if (simbol == "=") {
        executeExpression(expression);
        return;
    }

    if (expression.length > 21) return;
    expression = expression + simbol;
    displayingExpression(expression);
}


function executeExpression(exp) {
    let resultOfExp = 0;

    for (let i = 1; i < exp.length; i++) {
        if (exp[i] == "*") resultOfExp = +exp.slice(0,i) * +exp.slice(i + 1);
        if (exp[i] == "/") resultOfExp = +exp.slice(0,i) / +exp.slice(i + 1);
        if (exp[i] == "+") resultOfExp = +exp.slice(0,i) + +exp.slice(i + 1);
        if (exp[i] == "-") resultOfExp = +exp.slice(0,i) - +exp.slice(i + 1);
    }

    console.log(exp,resultOfExp);

    pass = true;
    expression = String(resultOfExp);
    displayingExpression(resultOfExp);
}


function displayingExpression(expression) {
    let displayBar = document.getElementById("js-display");
    displayBar.textContent = expression;
}



