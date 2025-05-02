export interface EquationNavigation {
  title: string;
  href: string;
}

export interface Equation {
  equation: string;
  lowerBound: number;
  upperBound: number;
  epsilon: number;
}

export type EquationRequest = {
  [k in
    | "equation"
    | "lowerBound"
    | "upperBound"
    | "epsilon"]: Equation[k];
};

export interface EquationResponse {
  result: string;
  table: Iterations[];
}

export interface Iterations {
  left: string;
  right: string;
  p: string;
  fp: string;
}
