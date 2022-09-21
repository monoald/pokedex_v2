export interface Icons {
  class: string;
  id: string;
}

export interface HeaderContent {
  title: string;
  icons?: Icons[];
}

export interface CardMenuContent {
  title: string;
  image: string;
  url: string;
}
