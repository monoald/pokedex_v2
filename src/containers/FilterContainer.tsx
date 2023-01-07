import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

import { Filters } from '../models/Filters';

import '../styles/FilterContainer.scss';
import setDirection from '../utils/setDirection';

const FilterContainer = ({
  isIntersected,
  isFiltered,
  setIsFiltered,
  allElements,
  setAllElements,
  filters,
  setFilters,
}: Filters) => {
  const { setCurrentPokedex } = useContext(AppContext);

  const filterByRegion = (region: string, remove = false) => {
    if (isIntersected) {
      return;
    }

    if (remove) {
      setCurrentPokedex('kanto');
    } else {
      setCurrentPokedex(region);
    }
  };

  const filterByType = (type: string, remove = false) => {
    if (remove) {
      const newFilters = [...isFiltered];
      const typeToRemove = newFilters.findIndex((filter) => filter === type);
      newFilters.splice(typeToRemove, 1);

      setIsFiltered(newFilters);
    } else {
      setIsFiltered([...isFiltered, type]);
    }
  };

  // const setDirection = (from: Element, child: HTMLElement) => {
  //   let to;
  //   if (from.id === 'region-filters' || from.id === 'type-list') {
  //     to = document.querySelector('#added-filters');
  //     to.appendChild(child);
  //   } else if (from.id === 'added-filters') {
  //     let index;

  //     if (child.id === filters.region?.id) {
  //       to = document.querySelector('#region-filters');
  //       index = filters.region.index;
  //     } else {
  //       to = document.querySelector('#type-list');
  //       const element = filters.types.find((type) => type.name === child.id);
  //       index = element.index;
  //     }

  //     if (index === 0) {
  //       to.prepend(child);
  //     } else {
  //       to.insertBefore(child, to.children[index]);
  //     }
  //   }
  // };

  // const setLists = (
  //   from: Element,
  //   child: HTMLElement,
  //   setAllElements: React.Dispatch<React.SetStateAction<AllElements>>,
  //   setFilters: React.Dispatch<React.SetStateAction<AddedFilters>>,
  // ) => {
  //   if (from.id === 'type-list') {
  //     const element = allElements.types.find((type) => type.name === child.id);
  //     const elementIndex = allElements.types.findIndex(
  //       (type) => type.name === child.id,
  //     );

  //     const newElements = [...allElements.types];
  //     newElements.splice(elementIndex, 1);

  //     const filteredTypes = [...filters.types];
  //     filteredTypes.push(element);

  //     setFilters({ ...filters, types: filteredTypes });
  //     setAllElements({ ...allElements, types: newElements });

  //     filterByType(child.id);
  //   } else if (from.id === 'region-filters') {
  //     const newElements = [...allElements.regions];
  //     const element = allElements.regions.find(
  //       (region) => region.id === child.id,
  //     );
  //     const previousRegion = filters.region || null;

  //     if (previousRegion) {
  //       newElements.splice(previousRegion.index, 0, previousRegion);
  //     }

  //     newElements.splice(element.index, 1);

  //     setFilters({ ...filters, region: element });
  //     setAllElements({ ...allElements, regions: newElements });

  //     filterByRegion(child.id);
  //   } else if (from.id === 'added-filters' && child.id === filters.region?.id) {
  //     const newRegions = [...allElements.regions];
  //     newRegions.splice(filters.region.index, 0, filters.region);

  //     setAllElements({ ...allElements, regions: newRegions });
  //     setFilters({ ...filters, region: null });

  //     filterByRegion('', true);
  //   } else {
  //     const element = filters.types.find((type) => type.name === child.id);
  //     const elementIndex = filters.types.findIndex(
  //       (type) => type.name === child.id,
  //     );
  //     const newTypes = [...allElements.types];
  //     newTypes.splice(element.index, 0, element);

  //     setAllElements({ ...allElements, types: newTypes });

  //     const filterTypes = [...filters.types];
  //     filterTypes.splice(elementIndex, 1);
  //     setFilters({ ...filters, types: filterTypes });

  //     filterByType(child.id, true);
  //   }
  // };

  const changeParent = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
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

    // child.addEventListener('animationend', () => {
    //   child.classList.remove('move');
    //   setLists(from, child, setAllElements, setFilters);
    // });
    // child.classList.add('move');
  };

  const addFilters = (event) => {
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

  return (
    <section className='FilterContainer'>
      <div onClick={changeParent} onAnimationEnd={addFilters}>
        <section className='filter'>
          <h2 className='filter__title'>Filters</h2>
          <ul className='filter__list' id='added-filters'>
            {filters.region != null && (
              <li
                key={filters.region.id}
                className='region-filter filter__item'
                id={filters.region.id}
              >
                {filters.region.name}
              </li>
            )}
            {filters.types.length > 0 &&
              filters.types.map((type) => (
                <li
                  key={type.name}
                  className={`type-filter  filter__item filter--${type.name}`}
                  id={type.name}
                >
                  <span className={`icon type--${type.name}`}></span>
                  {type.name}
                </li>
              ))}
          </ul>
        </section>
        <section className='filter'>
          <h2 className='filter__title'>Regions</h2>
          <ul className='filter__list' id='region-filters'>
            {allElements.regions.map((region) => (
              <li
                key={region.id}
                className='region-filter filter__item'
                id={region.id}
              >
                {region.name}
              </li>
            ))}
          </ul>
        </section>
        <section className='filter'>
          <h2 className='filter__title'>Types</h2>
          <ul className='filter__list' id='type-list'>
            {allElements.types.map((type) => (
              <li
                key={type.name}
                className={`type-filter  filter__item filter--${type.name}`}
                id={type.name}
              >
                <span className={`icon type--${type.name}`}></span>
                {type.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};

export default FilterContainer;
