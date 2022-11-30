export interface Base {
  name: string;
  url: string;
}

export interface Name {
  language: Base;
  name: string;
}

interface Description {
  description: string;
  language: Base;
}
