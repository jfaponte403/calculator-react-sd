import {useAppHook} from './hooks/UseAppHook';
import {SupportedOperations} from './Models/SupportedOperations';

type ButtonProps = {
  value: string;
  onClick: () => void;
  className?: string;
};

function App() {
  const {
    resultFetched,
    display,
    operation,
    currentInput,
    prevNumber,
    selectOperationHandler,
    handleNumber,
    handleDecimal,
    handleClear,
    handleEquals,
  } = useAppHook();

  const Button = ({value, onClick, className = ''}: ButtonProps) => (
    <button
      onClick={onClick}
      className={`aspect-square rounded-full text-3xl font-light active:opacity-50 transition-opacity ${className}`}
    >
      {value}
    </button>
  );

  const getOperationSymbol = (op: SupportedOperations | null) => {
    if (!op) return '';
    switch (op) {
      case SupportedOperations.ADDITION:
        return '+';
      case SupportedOperations.SUBTRACTION:
        return '-';
      case SupportedOperations.MULTIPLICATION:
        return '×';
      case SupportedOperations.DIVISION:
        return '÷';
      default:
        return '';
    }
  };

  const completedExpression =
    resultFetched.operation != null
      ? `${resultFetched.num1} ${getOperationSymbol(
        resultFetched.operation
      )} ${resultFetched.num2} =`
      : '';

  const pendingExpression =
    operation && prevNumber !== null
      ? `${prevNumber} ${getOperationSymbol(operation)}${
        currentInput !== '0' ? ` ${currentInput}` : ''
      }`
      : '';

  return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-black rounded-3xl shadow-[8px_8px_16px_rgba(0,0,0,0.4)] p-6">
        <div className="bg-gray-800 rounded-2xl mb-6 px-6 py-6 overflow-hidden">
          <div className="text-gray-400 text-right text-2xl font-light mb-2 h-8 overflow-x-auto whitespace-nowrap">
            {completedExpression || pendingExpression}
          </div>
          <div className="text-white text-right text-6xl font-light">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {/* Fila 1 */}
          <Button
            value="C"
            onClick={handleClear}
            className="bg-gray-400 text-black"
          />
          <div className="col-span-2" />
          <Button
            value="÷"
            onClick={() =>
              selectOperationHandler(SupportedOperations.DIVISION)
            }
            className={
              operation === SupportedOperations.DIVISION
                ? 'bg-white text-orange-500'
                : 'bg-orange-500 text-white'
            }
          />

          {/* Fila 2 */}
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
            value="×"
            onClick={() =>
              selectOperationHandler(SupportedOperations.MULTIPLICATION)
            }
            className={
              operation === SupportedOperations.MULTIPLICATION
                ? 'bg-white text-orange-500'
                : 'bg-orange-500 text-white'
            }
          />

          {/* Fila 3 */}
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
            value="-"
            onClick={() =>
              selectOperationHandler(SupportedOperations.SUBTRACTION)
            }
            className={
              operation === SupportedOperations.SUBTRACTION
                ? 'bg-white text-orange-500'
                : 'bg-orange-500 text-white'
            }
          />

          {/* Fila 4 */}
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
            value="+"
            onClick={() =>
              selectOperationHandler(SupportedOperations.ADDITION)
            }
            className={
              operation === SupportedOperations.ADDITION
                ? 'bg-white text-orange-500'
                : 'bg-orange-500 text-white'
            }
          />

          {/* Fila 5 */}
          <button
            onClick={() => handleNumber('0')}
            className="col-span-2 rounded-full text-3xl font-light active:opacity-50 transition-opacity bg-gray-700 text-white text-left pl-8"
            style={{aspectRatio: '2/1'}}
          >
            0
          </button>
          <Button
            value="."
            onClick={handleDecimal}
            className="bg-gray-700 text-white"
          />
          <Button
            value="="
            onClick={handleEquals}
            className="bg-orange-500 text-white"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
