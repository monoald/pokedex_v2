import setDirection from '../utils/setDirection';
import { AddedFilters } from './Filters';

interface ChangeParentProps {
  event: React.MouseEvent<HTMLDivElement, MouseEvent>;
  isIntersected: boolean;
  filters: AddedFilters;
}

const changeParent = ({ event, isIntersected, filters }: ChangeParentProps) => {
  const child = event.target as HTMLElement;

  if (child.nodeName !== 'LI') {
    return;
  }

  if (isIntersected && child.parentElement.id === 'region-filters') {
    return;
  }

  const from: Element = child.parentElement;
  const childIndex = Array.from(from.children).indexOf(child);

  const positionInitial = child.getBoundingClientRect();
  const xInitial = positionInitial.left;
  const yInitial = positionInitial.top;

  setDirection(from, child, filters);

  const positionFinal = child.getBoundingClientRect();
  const xFinal = positionFinal.left;
  const yFinal = positionFinal.top;

  from.insertBefore(child, from.children[childIndex]);

  child.style.setProperty('--dx', xFinal - xInitial + 'px');
  child.style.setProperty('--dy', yFinal - yInitial + 'px');

  child.classList.add('move');
};

export default changeParent;
