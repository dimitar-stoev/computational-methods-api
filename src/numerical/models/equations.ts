export interface EquationNavigation {
  title: string;
  href: string;
}

export interface BisectionEquation {
  equation: string;
  lowerBound: number;
  upperBound: number;
  epsilon: number;
}

export type BisectionEquationRequest = {
  [k in
    | "equation"
    | "lowerBound"
    | "upperBound"
    | "epsilon"]: BisectionEquation[k];
};

export interface BisectionEquationResponse {
  result: string;
  table: Iterations[];
}

export interface Iterations {
  left: string;
  right: string;
  p: string;
  fp: string;
}
