import React from 'react';

const useAddFilters = (
  event,
  allElements,
  filters,
  setFilters,
  setAllElements,
  filterByRegion,
  filterByType,
) => {
  const child: HTMLElement = event.target;
  if (child.nodeName !== 'LI') {
    return;
  }
  const from: Element = child.parentElement;
  child.classList.remove('move');

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
};

export default useAddFilters;
