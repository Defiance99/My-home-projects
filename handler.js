var calculatorValues = document.getElementById("CalculatorConteiner").getElementsByTagName("td");
let expression = "";

addActForEachElement(calculatorValues);


function addActForEachElement(calculatorValues) {
    for (let i = 0; i < calculatorValues.length; i++) {
        calculatorValues[i].addEventListener("mouseup", () => {
            let simbol = calculatorValues[i].textContent;
            actProcessing(simbol);
        })
    }
}

function actProcessing(simbol) {
    if (simbol == "Clear") {
        expression = "";
        displayingexpression(expression);
        return;
    }
    if (simbol == "C") {
        expression = expression.slice(0,expression.length - 1);
        displayingexpression(expression);
        return;
    }
    if (simbol == "/" || simbol == "*" || simbol == "+" || simbol == "-") {
        if (/\/|\+|\-|\*/.test(expression.slice(-1))) return; //checking two operators in a row
    }

    if (simbol == "=") {
        executeExpression(expression);
        return;
    }

    if (expression.length > 21) return;
    expression = expression + simbol;
    displayingexpression(expression);
}


function executeExpression(exp) {
    let operatorsArr = exp.split(/[+-/*]/).filter(el => el != ""); 
    let valueArr = exp.split(/[^-+/*]/).filter(el => el != "");
    console.log(operatorsArr);
    console.log(valueArr);
    let resultOfExp = 0;
    
    for (let i = 0; i < valueArr.length; i++) {
        if (valueArr[i] == "+") {
            resultOfExp = +operatorsArr[0] + +operatorsArr[1];
            operatorsArr.shift();
            operatorsArr[0] = resultOfExp;
        }
        if (valueArr[i] == "-") {
            resultOfExp = +operatorsArr[0] - +operatorsArr[1];
            operatorsArr.shift();
            operatorsArr[0] = resultOfExp;
        }
    }

    displayingexpression(resultOfExp);
}

function displayingexpression(expression) {
    let displayBar = document.getElementById("js-display");
    displayBar.textContent = expression;
}



