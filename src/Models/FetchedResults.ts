import {SupportedOperations} from "./SupportedOperations.ts";

export interface IFetchResponse {
  result: number;
  message: string;
  num1: number;
  num2: number;
  operation: SupportedOperations;
}

export const defaultFetchedValues: IFetchResponse = {
  result: 0,
  message: '',
  num1: 0,
  num2: 0,
  operation: SupportedOperations.ADDITION,
};

export type ButtonProps = {
  value: string;
  onClick: () => void;
  className?: string;
};