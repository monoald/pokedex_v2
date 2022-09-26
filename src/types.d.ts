export interface IconButton {
  class: string;
  id: string;
  event?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export interface HeaderContent {
  title: string;
  icons?: IconButton[];
}
export interface CardMenuContent {
  title: string;
  image: string;
  url: string;
}
export interface HomeContent {
  header: HeaderContent;
  cardMenu: CardMenuContent[];
}
