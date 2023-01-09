export interface IField {
  id: number;
  type: string;
  name: string;
  label: string;
  value: string;
  options?: IOptions[];
  validations?: IValidations[];
}

export interface IOptions {
  id: number;
  value: string;
  label: string;
}

export interface IValidations {
  type?: string;
  value?: number | undefined;
}
