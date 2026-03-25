(function() {
  const resultDiv = document.getElementById('result');
  let expression = '0';      // текущее выражение
  let justEvaluated = false; // флаг, что последним действием было "="
  const MAX_LEN = 13;        // максимальная длина выражения (символов)

  // Обновление экрана
  function updateDisplay() {
    let displayValue = expression;
    if (displayValue === '') displayValue = '0';
    resultDiv.innerText = displayValue;
  }

  // Проверка, можно ли добавить символ (ограничение длины)
  function canAddChar() {
    // после вычисления разрешаем начать новое выражение, поэтому лимит не проверяем
    if (justEvaluated) return true;
    return expression.length < MAX_LEN;
  }

  // Получить последнее число в выражении (для +/- и %)
  function getLastNumber(expr) {
    const match = expr.match(/(\d+(?:\.\d+)?)(?=[+\-*/]|$)/);
    if (match) return match[1];
    return null;
  }

  // Заменить последнее число в выражении на новое значение
  function replaceLastNumber(expr, newNum) {
    // Ищем последнее число, учитывая, что перед ним может быть знак
    const match = expr.match(/(\d+(?:\.\d+)?)(?=[+\-*/]|$)/);
    if (!match) return expr;
    const lastNum = match[1];
    const lastIndex = match.index;
    return expr.slice(0, lastIndex) + newNum + expr.slice(lastIndex + lastNum.length);
  }

  // Смена знака последнего числа
  function changeSign() {
    if (justEvaluated) return; // после = не меняем знак, пока не начнём новый ввод
    const lastNum = getLastNumber(expression);
    if (!lastNum) return;
    let newNum;
    if (lastNum.startsWith('-')) {
      newNum = lastNum.slice(1);
    } else {
      newNum = '-' + lastNum;
    }
    expression = replaceLastNumber(expression, newNum);
    updateDisplay();
  }

  // Процент: последнее число делим на 100
  function percent() {
    if (justEvaluated) return;
    const lastNum = getLastNumber(expression);
    if (!lastNum) return;
    const num = parseFloat(lastNum);
    if (isNaN(num)) return;
    const percentValue = num / 100;
    // Преобразуем в строку без лишней точности
    let newNum = percentValue.toString();
    expression = replaceLastNumber(expression, newNum);
    updateDisplay();
  }

  // Добавление символа в выражение с проверками
  function addChar(ch) {
    // Если после вычисления, начинаем новое выражение
    if (justEvaluated) {
      if (ch === '+' || ch === '-' || ch === 'x' || ch === '/') {
        // используем предыдущий результат как начало
        expression = expression + ch;
      } else {
        expression = ch;
      }
      justEvaluated = false;
      updateDisplay();
      return;
    }

    // Защита от превышения длины
    if (!canAddChar()) return;

    // Обработка операторов
    const operators = ['+', '-', 'x', '/'];
    if (operators.includes(ch)) {
      // Если последний символ уже оператор, заменяем его (кроме случая, когда это минус как знак числа)
      const lastChar = expression[expression.length - 1];
      if (operators.includes(lastChar)) {
        // Заменяем последний символ
        expression = expression.slice(0, -1) + ch;
        updateDisplay();
        return;
      }
      // Если выражение пустое или "0", то при вводе оператора создаём "0+", "0-" и т.д.
      if (expression === '' || expression === '0') {
        expression = '0' + ch;
        updateDisplay();
        return;
      }
      // Обычное добавление
      expression += ch;
      updateDisplay();
      return;
    }

    // Обработка точки
    if (ch === '.') {
      // Находим последнее число и проверяем, есть ли в нём точка
      const lastNum = getLastNumber(expression);
      if (lastNum && lastNum.includes('.')) return; // уже есть точка
      // Если после вычисления, начинаем новое число
      if (justEvaluated) {
        expression = '0.';
        justEvaluated = false;
        updateDisplay();
        return;
      }
      // Если выражение пустое или "0", то превращаем в "0."
      if (expression === '' || expression === '0') {
        expression = '0.';
        updateDisplay();
        return;
      }
      expression += '.';
      updateDisplay();
      return;
    }

    // Цифры
    // Если после вычисления, начинаем новое выражение
    if (justEvaluated) {
      expression = ch;
      justEvaluated = false;
      updateDisplay();
      return;
    }
    // Если текущее выражение "0" и вводится цифра, заменяем "0"
    if (expression === '0' && ch !== '.') {
      expression = ch;
      updateDisplay();
      return;
    }
    expression += ch;
    updateDisplay();
  }

  // Очистка
  function clearAll() {
    expression = '0';
    justEvaluated = false;
    updateDisplay();
  }

  // Вычисление с учётом приоритета (* и /)
  function evaluate() {
    if (expression === '' || expression === '0') {
      expression = '0';
      updateDisplay();
      return;
    }
    // Заменяем 'x' на '*' для eval
    let exprToEval = expression.replace(/x/g, '*');
    try {
      let result = eval(exprToEval);
      if (!isFinite(result) || isNaN(result)) {
        expression = 'Ошибка';
      } else {
        // Округляем до разумного количества знаков, но без потери точности
        // Если результат длинный, оставляем как есть
        expression = result.toString();
      }
    } catch (e) {
      expression = 'Ошибка';
    }
    justEvaluated = true;
    updateDisplay();
  }

  // Назначение обработчиков кнопок
  document.getElementById('btn_digit_0').onclick = () => addChar('0');
  document.getElementById('btn_digit_1').onclick = () => addChar('1');
  document.getElementById('btn_digit_2').onclick = () => addChar('2');
  document.getElementById('btn_digit_3').onclick = () => addChar('3');
  document.getElementById('btn_digit_4').onclick = () => addChar('4');
  document.getElementById('btn_digit_5').onclick = () => addChar('5');
  document.getElementById('btn_digit_6').onclick = () => addChar('6');
  document.getElementById('btn_digit_7').onclick = () => addChar('7');
  document.getElementById('btn_digit_8').onclick = () => addChar('8');
  document.getElementById('btn_digit_9').onclick = () => addChar('9');
  document.getElementById('btn_digit_dot').onclick = () => addChar('.');
  document.getElementById('btn_op_plus').onclick = () => addChar('+');
  document.getElementById('btn_op_minus').onclick = () => addChar('-');
  document.getElementById('btn_op_mult').onclick = () => addChar('x');
  document.getElementById('btn_op_div').onclick = () => addChar('/');
  document.getElementById('btn_op_equal').onclick = () => evaluate();
  document.getElementById('btn_op_clear').onclick = () => clearAll();
  document.getElementById('btn_op_sign').onclick = () => changeSign();
  document.getElementById('btn_op_percent').onclick = () => percent();

  // Инициализация
  updateDisplay();
})();