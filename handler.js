let calculatorValues = document.getElementById("CalculatorConteiner").getElementsByTagName("tr");
console.log(calculatorValues);
let expression = "";
let passForOperators = true; // in a string must be only one operator
let passForPoint = true; // mustnt be combined with the operators (+. /. *.  ..);
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
    if (simbol == "x2") {
        expression = expression * expression;
        displayingExpression(expression);
        return;
    }
    if (/[+/*]/.test(simbol) && expression.length == 0) return;
    if (simbol == "Clear") {
        expression = "";
        passForOperators = true;
        displayingExpression(expression);
        return;
    }
    if (simbol == "C") {
        if (operators.includes(expression.slice(-1))) passForOperators = true;
        expression = expression.slice(0,expression.length - 1);
        displayingExpression(expression);
        return;
    }
    //if (simbol == "." && expression.slice(-1) == ".") return;
    if (simbol == "-" && expression.length == 0) {
        expression += simbol;
        displayingExpression(expression);
        return;
    }


    if (simbol == "." && !passForOperators) ;
    if (operators.includes(simbol)) {
        if (!passForOperators && operators.includes(expression.slice(-1))) {
            expression = expression.slice(0,expression.length - 1) + simbol;
            passForOperators = false;
            displayingExpression(expression);
            return;
        }
        if (passForOperators) {
            passForOperators = false;
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

    passForOperators = true;
    resultOfExp = resultOfExp.toFixed(3); // floating point
    expression = String(resultOfExp);
    displayingExpression(resultOfExp);
}


function displayingExpression(expression) {
    let displayBar = document.getElementById("js-display");
    displayBar.textContent = expression;
}



