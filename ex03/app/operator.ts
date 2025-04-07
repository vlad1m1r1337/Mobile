export type Operation = '+' | '-' | '*' | '/' | undefined;

export interface CalculatorState {
    currentOperand: string;
    previousOperand: string;
    operation: Operation;
}

export interface OperationResult {
    previousOperand: string;
    currentOperand: string;
    operation: Operation;
}

export function calculate(
    previousOperand: string,
    currentOperand: string,
    operation: Operation
): string {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) {
        return '';
    }

    let result: number;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                return 'Ошибка: Деление на ноль!';
            }
            result = prev / current;
            break;
        default:
            return currentOperand;
    }

    return parseFloat(result.toFixed(10)).toString();
}

export function handleNumberInput(currentOperand: string, number: string): string {
    if (currentOperand === '0' && number !== '.') {
        return number;
    }
    if (number === '.' && currentOperand.includes('.')) {
        return currentOperand;
    }
    return currentOperand + number;
}

export function handleOperationInput(
    previousOperand: string,
    currentOperand: string,
    operation: Operation
): OperationResult {
    if (currentOperand === '') {
        return {
            previousOperand: previousOperand,
            currentOperand: '',
            operation: operation,
        };
    }

    if (previousOperand === '') {
        return {
            previousOperand: currentOperand,
            currentOperand: '',
            operation: operation,
        };
    }

    const result = calculate(previousOperand, currentOperand, operation);
    return {
        previousOperand: result,
        currentOperand: '',
        operation: operation,
    };
}

export function handleEqualsInput(
    previousOperand: string,
    currentOperand: string,
    operation: Operation
): string {
    return calculate(previousOperand, currentOperand, operation);
}

export function handleClearInput(): string {
    return '0';
}

export function handleAllClearInput(): CalculatorState {
    return {
        currentOperand: '0',
        previousOperand: '',
        operation: undefined,
    };
}

export function handleDeleteInput(currentOperand: string): string {
    return currentOperand.slice(0, -1) || '0';
}