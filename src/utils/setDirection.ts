import { AddedFilters } from '../models/Filters';

const setDirection = (
  from: Element,
  child: HTMLElement,
  filters: AddedFilters,
) => {
  let to;
  if (from.id === 'region-filters' || from.id === 'type-list') {
    to = document.querySelector('#added-filters');
    to.appendChild(child);
  } else if (from.id === 'added-filters') {
    let index;

    if (child.id === filters.region?.id) {
      to = document.querySelector('#region-filters');
      index = filters.region.index;
    } else {
      to = document.querySelector('#type-list');
      const element = filters.types.find((type) => type.name === child.id);
      index = element.index;
    }

    if (index === 0) {
      to.prepend(child);
    } else {
      to.insertBefore(child, to.children[index]);
    }
  }
};

export default setDirection;
