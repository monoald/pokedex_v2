import { AllElements, AddedFilters } from '../models/Filters';

import setDirection from '../utils/setDirection';

const useChangeParent = (
  child: HTMLElement,
  from: Element,
  filters: AddedFilters,
) => {
  const childIndex = Array.from(from.children).indexOf(child);

  const positionInitial = child.getBoundingClientRect();
  const xInitial = positionInitial.left;
  const yInitial = positionInitial.top;

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

  const positionFinal = child.getBoundingClientRect();
  const xFinal = positionFinal.left;
  const yFinal = positionFinal.top;

  from.insertBefore(child, from.children[childIndex]);

  child.style.setProperty('--dx', xFinal - xInitial + 'px');
  child.style.setProperty('--dy', yFinal - yInitial + 'px');
};

const useFilter = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  setAllElements: React.Dispatch<React.SetStateAction<AllElements>>,
  setFilters: React.Dispatch<React.SetStateAction<AddedFilters>>,
  isIntersected: boolean,
  filters: AddedFilters,
  allElements: AllElements,
  filterByType: (type: string, remove?: boolean) => void,
  filterByRegion: (region: string, remove?: boolean) => void,
) => {
  const child = event.target as HTMLElement;

  if (child.nodeName !== 'LI') {
    return;
  }

  if (isIntersected && child.parentElement.nodeName === 'region-filters') {
    return;
  }
  const from: Element = child.parentElement;
  useChangeParent(child, from, filters);

  child.addEventListener('animationend', () => {
    child.classList.remove('move');
    // setLists(from, child, setAllElements, setFilters);
    if (from.id === 'type-list') {
      const element = allElements.types.find((type) => type.name === child.id);
      const elementIndex = allElements.types.findIndex(
        (type) => type.name === child.id,
      );

      const newElements = [...allElements.types];
      newElements.splice(elementIndex, 1);

      const filteredTypes = [...filters.types];
      filteredTypes.push(element);

      setFilters({ ...filters, types: filteredTypes });
      setAllElements({ ...allElements, types: newElements });

      filterByType(child.id);
    } else if (from.id === 'region-filters') {
      const newElements = [...allElements.regions];
      const element = allElements.regions.find(
        (region) => region.id === child.id,
      );
      const previousRegion = filters.region || null;

      if (previousRegion) {
        newElements.splice(previousRegion.index, 0, previousRegion);
      }

      newElements.splice(element.index, 1);

      setFilters({ ...filters, region: element });
      setAllElements({ ...allElements, regions: newElements });

      filterByRegion(child.id);
    } else if (from.id === 'added-filters' && child.id === filters.region?.id) {
      const newRegions = [...allElements.regions];
      newRegions.splice(filters.region.index, 0, filters.region);

      setAllElements({ ...allElements, regions: newRegions });
      setFilters({ ...filters, region: null });

      filterByRegion('', true);
    } else {
      const element = filters.types.find((type) => type.name === child.id);
      const elementIndex = filters.types.findIndex(
        (type) => type.name === child.id,
      );
      const newTypes = [...allElements.types];
      newTypes.splice(element.index, 0, element);

      setAllElements({ ...allElements, types: newTypes });

      const filterTypes = [...filters.types];
      filterTypes.splice(elementIndex, 1);
      setFilters({ ...filters, types: filterTypes });

      filterByType(child.id, true);
    }
  });
  child.classList.add('move');
};

export default useFilter;
