<<<<<<< HEAD
let calculatorValues = document.getElementById("CalculatorConteiner").getElementsByTagName("tr");
let expression = "";
let passForOperators = true; // in a string must be only one operator
let passForPoint = true; // mustnt be combined with the values (+.  3.2.1  *.  ..);
let operators = ["/","*","+","-"];
let keysOfCalculator = ["1","2","3","4","5","6","7","8","9","0",".",...operators,"="];


addActForEachTableElement(calculatorValues);
addEventsOnKeyboard(keysOfCalculator);

function addActForEachTableElement(calculatorValues) {
    for (let i = 1; i < calculatorValues.length; i++) {
        calculatorValues[i].addEventListener("mouseup", (element) => {
            let simbol = element.target.textContent;
            actProcessing(simbol);
        })
    }
} 


function addEventsOnKeyboard(keys) {
    window.addEventListener("keyup", (event) => {
        if (event.key == "Backspace") {
            actProcessing("C");
        }
        if (event.key == "Escape") {
            actProcessing("Clear");
        }
        if (event.key == "Enter") {
            actProcessing("=");
        }
        if (keys.includes(event.key)) {
            
            actProcessing(event.key);
        }
    });
}

function actProcessing(simbol) {
    if (expression == "Результат не определен") {
        expression = "";
    }// передать ресалт и сделать экспр = ""
    if (simbol == "x2") {
        expression = expression * expression;
        expression = expression.toString();
        displayingExpression(expression);
        return;
    }//желательно переделать
    if (simbol == "Clear") {
        expression = "";
        passForOperators = true;
        passForPoint = true;
        displayingExpression(expression);
        return;
    }
    if (simbol == "C") {
        if (operators.includes(expression.slice(-1))) passForOperators = true;
        if (expression.slice(-1) == ".") passForPoint = true;
        expression = expression.slice(0,expression.length - 1);
        displayingExpression(expression);
        return;
    }
    if (simbol == "-" && expression.length == 0) {
        expression += simbol;
        displayingExpression(expression);
        return;
    }


    if (simbol == ".") {
        if (operators.includes(expression.slice(-1))) {
            expression += "0.";
            passForPoint = false;
            displayingExpression(expression);
            return;
        }
        if (passForPoint) {
            passForPoint = false;
            expression += simbol;
            displayingExpression(expression);
            return;
        }
        else {
            return;
        }
    }

    if (/[+/*]/.test(simbol) && expression.length == 0) return;
    if (operators.includes(simbol)) {
        if (!passForOperators && operators.includes(expression.slice(-1))) { // replacing the last operator on new
            passForOperators = false;
            expression = expression.slice(0,expression.length - 1) + simbol;
            displayingExpression(expression);
            return;
        }
        if (passForOperators && expression.slice(-1) == ".") {
            expression = expression.slice(0,expression.length - 1) + simbol;
            passForOperators = false;
            passForPoint = true;
            displayingExpression(expression);
            return;
        }
        if (passForOperators) {
            passForOperators = false;
            passForPoint = true;
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
    if (!resultOfExp) {
        expression = "Результат не определен";
        displayingExpression(expression);
        return;
    }
    expression = resultOfExp.toString();
    displayingExpression(expression);
}




function displayingExpression(expression) {
    let displayBar = document.getElementById("js-display");
    displayBar.textContent = expression;
}

function displayingActivatedElements() {

}


=======
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



>>>>>>> 80e23eea05cdf29514da383d9e6fa172bcb4819d
