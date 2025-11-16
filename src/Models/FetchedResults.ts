export interface IFetchResponse {
  result: number;
  message: string;
  new: string;
}

export const defaultFetchedValues: IFetchResponse = {
  result: 0,
  message: '',
  new: '',
}

export type ButtonProps = {
  value: string;
  onClick: () => void;
  className?: string;
};