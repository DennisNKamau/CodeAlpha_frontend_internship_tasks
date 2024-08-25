document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');

    // Add event listeners to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button.textContent);
        });
    });

    function handleButtonClick(value) {
        // Handle different button clicks
        switch(value) {
            case 'C':
                // Clear the display
                display.value = '';
                break;
            case '=':
                // Evaluate the expression and show the result
                try {
                    display.value = evaluateExpression(display.value);
                } catch (error) {
                    display.value = 'Error'; // Show 'Error' if evaluation fails
                }
                break;
            case '(':
                // Add a '(' if the last character is numeric or a ')'
                if (display.value !== '' && 
                    (isNumeric(display.value[display.value.length - 1]) || 
                     display.value[display.value.length - 1] === ')')) {
                    display.value += '(';
                } else {
                    display.value += '(';
                }
                break;
            case ')':
                // Add a ')'
                display.value += ')';
                break;
            case '%':
                // Convert the current value to a percentage
                try {
                    display.value = (parseFloat(evaluateExpression(display.value)) / 100).toString();
                } catch (error) {
                    display.value = 'Error'; // Show 'Error' if evaluation fails
                }
                break;
            case '×':
                // Replace '×' with '*' for multiplication
                display.value += '*';
                break;
            case '÷':
                // Replace '÷' with '/' for division
                display.value += '/';
                break;
            case '−':
                // Replace '−' with '-' for subtraction
                display.value += '-';
                break;
            case '⌫':
                // Remove the last character from the display
                display.value = display.value.slice(0, -1);
                break;
            default:
                // Handle numbers and other characters
                if (value.match(/[0-9]/) && display.value[display.value.length - 1] === ')') {
                    display.value += value;
                } else {
                    display.value += value;
                }
        }
        
    }

    function evaluateExpression(expression) {
        // Replace visual operators with JavaScript operators
        expression = expression.replace(/×/g, '*')
                               .replace(/÷/g, '/')
                               .replace(/−/g, '-');
        
        // Handle implicit multiplication
        expression = expression.replace(/(\d+|\))(?=\()/g, '$1*');
        expression = expression.replace(/\)(\d+)/g, ')*$1');

        // Replace '^' with '**' for exponentiation
        expression = expression.replace(/\^/g, '**');
        
        // Evaluate the expression
        return Function('"use strict";return (' + expression + ')')();
    }

    function isNumeric(char) {
        // Check if a character is a numeric digit
        return /[0-9]/.test(char);
    }
});
