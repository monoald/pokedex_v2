import React from 'react';

import { Filters } from '../models/Filters';

import useFilters from '../hooks/useFilters';

import '../styles/FilterContainer.scss';

const FilterContainer = ({
  isIntersected,
  isFiltered,
  setIsFiltered,
  allElements,
  setAllElements,
  filters,
  setFilters,
}: Filters) => {
  const [changeParent, addFilters] = useFilters({
    isIntersected,
    isFiltered,
    setIsFiltered,
    allElements,
    setAllElements,
    filters,
    setFilters,
  });

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
