(function() {
  const resultDiv = document.getElementById('result');
  let currentInput = '0';
  let previousInput = '';
  let currentOperator = null;
  let waitingForNewOperand = false;

  function updateDisplay() {
    let displayValue = currentInput;
    if (displayValue.length > 18) displayValue = displayValue.slice(0, 16) + '...';
    resultDiv.innerText = displayValue;
  }

  function inputDigit(digit) {
    if (waitingForNewOperand) {
      currentInput = digit;
      waitingForNewOperand = false;
    } else {
      if (currentInput === '0' && digit !== '.') {
        currentInput = digit;
      } else {
        currentInput += digit;
      }
    }
    updateDisplay();
  }

  function inputDecimal() {
    if (waitingForNewOperand) {
      currentInput = '0.';
      waitingForNewOperand = false;
      updateDisplay();
      return;
    }
    if (!currentInput.includes('.')) {
      currentInput += '.';
    }
    updateDisplay();
  }

  function clearAll() {
    currentInput = '0';
    previousInput = '';
    currentOperator = null;
    waitingForNewOperand = false;
    updateDisplay();
  }

  function changeSign() {
    if (currentInput === '0') return;
    if (currentInput.startsWith('-')) {
      currentInput = currentInput.slice(1);
    } else {
      currentInput = '-' + currentInput;
    }
    updateDisplay();
  }

  function percent() {
    let value = parseFloat(currentInput);
    if (isNaN(value)) return;
    currentInput = (value / 100).toString();
    updateDisplay();
  }

  function performOperation(nextOperator) {
    const inputValue = parseFloat(currentInput);
    if (isNaN(inputValue)) return;

    if (previousInput !== '' && currentOperator !== null && !waitingForNewOperand) {
      let result;
      const prev = parseFloat(previousInput);
      switch (currentOperator) {
        case '+': result = prev + inputValue; break;
        case '-': result = prev - inputValue; break;
        case 'x': result = prev * inputValue; break;
        case '/':
          if (inputValue === 0) {
            result = 'Ошибка';
          } else {
            result = prev / inputValue;
          }
          break;
        default: return;
      }
      if (result === 'Ошибка') {
        currentInput = 'Ошибка';
        previousInput = '';
        currentOperator = null;
        waitingForNewOperand = true;
        updateDisplay();
        return;
      }
      currentInput = result.toString();
      updateDisplay();
    }

    previousInput = currentInput;
    currentOperator = nextOperator;
    waitingForNewOperand = true;
  }

  function calculateResult() {
    if (currentOperator === null || waitingForNewOperand) return;
    const inputValue = parseFloat(currentInput);
    if (isNaN(inputValue)) return;
    const prev = parseFloat(previousInput);
    let result;
    switch (currentOperator) {
      case '+': result = prev + inputValue; break;
      case '-': result = prev - inputValue; break;
      case 'x': result = prev * inputValue; break;
      case '/':
        if (inputValue === 0) {
          result = 'Ошибка';
        } else {
          result = prev / inputValue;
        }
        break;
      default: return;
    }
    if (result === 'Ошибка') {
      currentInput = 'Ошибка';
    } else {
      currentInput = result.toString();
    }
    previousInput = '';
    currentOperator = null;
    waitingForNewOperand = true;
    updateDisplay();
  }

  document.getElementById('btn_digit_0').onclick = () => inputDigit('0');
  document.getElementById('btn_digit_1').onclick = () => inputDigit('1');
  document.getElementById('btn_digit_2').onclick = () => inputDigit('2');
  document.getElementById('btn_digit_3').onclick = () => inputDigit('3');
  document.getElementById('btn_digit_4').onclick = () => inputDigit('4');
  document.getElementById('btn_digit_5').onclick = () => inputDigit('5');
  document.getElementById('btn_digit_6').onclick = () => inputDigit('6');
  document.getElementById('btn_digit_7').onclick = () => inputDigit('7');
  document.getElementById('btn_digit_8').onclick = () => inputDigit('8');
  document.getElementById('btn_digit_9').onclick = () => inputDigit('9');
  document.getElementById('btn_digit_dot').onclick = () => inputDecimal();
  document.getElementById('btn_op_clear').onclick = () => clearAll();
  document.getElementById('btn_op_sign').onclick = () => changeSign();
  document.getElementById('btn_op_percent').onclick = () => percent();
  document.getElementById('btn_op_plus').onclick = () => performOperation('+');
  document.getElementById('btn_op_minus').onclick = () => performOperation('-');
  document.getElementById('btn_op_mult').onclick = () => performOperation('x');
  document.getElementById('btn_op_div').onclick = () => performOperation('/');
  document.getElementById('btn_op_equal').onclick = () => calculateResult();

  updateDisplay();
})();