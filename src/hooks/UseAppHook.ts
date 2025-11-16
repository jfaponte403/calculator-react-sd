import {useState} from 'react';
import {SupportedOperations} from '../Models/SupportedOperations';
import type {IFetchResponse} from '../Models/FetchedResults';
import {defaultFetchedValues} from '../Models/FetchedResults';
import {SupportedStates} from '../enums/SupportedStates';

export function useAppHook() {
  const [operation, setOperation] = useState<SupportedOperations | null>(null);
  const [resultFetched, setResultFetched] =
    useState<IFetchResponse>(defaultFetchedValues);
  const [display, setDisplay] = useState<string>('0');
  const [currentInput, setCurrentInput] = useState<string>('0');
  const [prevNumber, setPrevNumber] = useState<number | null>(null);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);

  const updateInput = (next: string) => {
    setCurrentInput(next);
    if (operation === null) {
      setPrevNumber(Number(next));
    } else {
      setCurrentNumber(Number(next));
    }
    setDisplay(next);
  };

  const handleNumber = (digit: string) => {
    const next = currentInput === '0' ? digit : currentInput + digit;
    updateInput(next);
  };

  const handleDecimal = () => {
    if (currentInput.includes('.')) return;
    const next = currentInput + '.';
    updateInput(next);
  };

  const handleClear = () => {
    setOperation(null);
    setResultFetched(defaultFetchedValues);
    setDisplay('0');
    setCurrentInput('0');
    setPrevNumber(null);
    setCurrentNumber(null);
  };

  const selectOperationHandler = (op: SupportedOperations) => {
    if (prevNumber === null) {
      setPrevNumber(Number(currentInput));
    }
    setOperation(op);
    setCurrentInput('0');
  };

  const handleFetch = async (numA: number, numB: number) => {
    setDisplay(SupportedStates.LOADING);

    const response = await fetch(
      'https://calculadora-zsg3.onrender.com/operations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({operation, num1: numA, num2: numB}),
      }
    );

    if (!response.ok) {
      setDisplay(SupportedStates.ERROR);
      setOperation(null);
      setPrevNumber(null);
      setCurrentNumber(null);
      setCurrentInput('0');
      return;
    }

    const data = (await response.json()) as IFetchResponse;

    setDisplay(String(data.result));
    setResultFetched(data);

    setOperation(null);
    setPrevNumber(null);
    setCurrentNumber(null);
    setCurrentInput(String(data.result));
  };

  const handleEquals = () => {
    if (prevNumber === null || operation === null) return;
    const b = currentNumber ?? Number(currentInput);
    handleFetch(prevNumber, b);
  };

  return {
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
  };
}
