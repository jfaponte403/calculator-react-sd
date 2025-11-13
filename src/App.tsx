import { useState } from 'react';

type Operation = '+' | '-' | '×' | '÷';

type ButtonProps = {
  value: string;
  onClick: () => void;
  className?: string;
};

function App() {
  const [display, setDisplay] = useState<string>('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [newNumber, setNewNumber] = useState<boolean>(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const calculate = (a: number, b: number, op: Operation): number => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return a / b;
      default:
        return b;
    }
  };

  const handleOperation = (op: Operation) => {
    const current = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(current);
    } else if (operation) {
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(result);
    }

    setOperation(op);
    setNewNumber(true);
  };

  const handleEquals = () => {
    if (operation && prevValue !== null) {
      const current = parseFloat(display);
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleSquareRoot = () => {
    const current = parseFloat(display);
    if (current >= 0) {
      setDisplay(String(Math.sqrt(current)));
    } else {
      setDisplay('Error');
    }
    setNewNumber(true);
  };

  const getOperationDisplay = (): string => {
    if (prevValue !== null && operation) {
      const currentNum = newNumber ? '' : ` ${display}`;
      return `${prevValue} ${operation}${currentNum}`;
    }
    return '';
  };

  const Button = ({ value, onClick, className = '' }: ButtonProps) => (
    <button
      onClick={onClick}
      className={`aspect-square rounded-full text-3xl font-light active:opacity-50 transition-opacity ${className}`}
    >
      {value}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-black rounded-3xl shadow-[8px_8px_16px_rgba(0,0,0,0.4)] p-6">
        {/* Display */}
        <div className="bg-gray-800 rounded-2xl mb-6 px-6 py-6 overflow-hidden">
          {/* Operation display */}
          <div className="text-gray-400 text-right text-2xl font-light mb-2 h-8">
            {getOperationDisplay()}
          </div>
          {/* Main display */}
          <div className="text-white text-right text-6xl font-light">
            {display.length > 9 ? display.slice(0, 9) : display}
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button
            value="C"
            onClick={handleClear}
            className="bg-gray-400 text-black"
          />
          <Button
            value="√"
            onClick={handleSquareRoot}
            className="bg-gray-400 text-black"
          />
          <Button
            value="÷"
            onClick={() => handleOperation('÷')}
            className={`${
              operation === '÷'
                ? 'bg-white text-orange-500'
                : 'bg-orange-500 text-white'
            }`}
          />
          <Button
            value="×"
            onClick={() => handleOperation('×')}
            className={`${
              operation === '×'
                ? 'bg-white text-orange-500'
                : 'bg-orange-500 text-white'
            }`}
          />

          {/* Row 2 */}
          <Button
            value="7"
            onClick={() => handleNumber('7')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="8"
            onClick={() => handleNumber('8')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="9"
            onClick={() => handleNumber('9')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="-"
            onClick={() => handleOperation('-')}
            className={`${
              operation === '-'
                ? 'bg-white text-orange-500'
                : 'bg-orange-500 text-white'
            }`}
          />

          {/* Row 3 */}
          <Button
            value="4"
            onClick={() => handleNumber('4')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="5"
            onClick={() => handleNumber('5')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="6"
            onClick={() => handleNumber('6')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="+"
            onClick={() => handleOperation('+')}
            className={`${
              operation === '+'
                ? 'bg-white text-orange-500'
                : 'bg-orange-500 text-white'
            }`}
          />

          {/* Row 4 */}
          <Button
            value="1"
            onClick={() => handleNumber('1')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="2"
            onClick={() => handleNumber('2')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="3"
            onClick={() => handleNumber('3')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="="
            onClick={handleEquals}
            className="bg-orange-500 text-white row-span-2"
          />

          {/* Row 5 */}
          <button
            onClick={() => handleNumber('0')}
            className="col-span-2 rounded-full text-3xl font-light active:opacity-50 transition-opacity bg-gray-700 text-white text-left pl-8"
            style={{ aspectRatio: '2/1' }}
          >
            0
          </button>
          <Button
            value="."
            onClick={handleDecimal}
            className="bg-gray-700 text-white"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
