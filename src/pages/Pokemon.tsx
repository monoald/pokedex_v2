import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { HeaderContent } from '../types';

import AppContext from '../context/AppContext';

import Header from '../components/Header';
import DonutChart from '../components/DonutChart';
import EvolutionCard from '../components/EvolutionCard';

import '../styles/Pokemon.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const Pokemon = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    state: { pokemon, currentPokedex },
    getPoke,
    getPokemonSpecifications,
  } = useContext(AppContext);

  useEffect(() => {
    if (!pokemon[slug]) {
      getPoke(slug);
    } else {
      getPokemonSpecifications(slug);
    }

    if (pokemon[slug]?.evolutions) {
      getPoke(pokemon[slug]?.evolutions);
    }
  }, [pokemon[slug]?.evolutions]);

  const num = (): number => {
    let number = pokemon[slug].species.pokedex_numbers.find(
      (element) => element.pokedex.name === currentPokedex,
    );

    if (!number) {
      number = pokemon[slug].species.pokedex_numbers.find(
        (element) => element.pokedex.name === 'national',
      );
    }

    return number.entry_number;
  };

  const content: HeaderContent = {
    title: slug,
    icons: [
      {
        class: 'back_icon',
        id: 'back',
        event: () => navigate(-1),
      },
      {
        class: 'pokeball_icon',
        id: 'pokeball',
      },
    ],
  };

  if (pokemon) {
    return (
      <>
        <Header content={content} />
        <main className='Pokemon'>
          {pokemon[slug] && (
            <>
              <section className='graphic-card'>
                <p className='number'>#{num()}</p>
                <ul className='types-container'>
                  {pokemon[slug].types.map((type) => (
                    <li key={type} className={`type type--${type}`}>
                      {type}
                    </li>
                  ))}
                </ul>

                <figure className='image-container'>
                  <img
                    src={pokemon[slug].image}
                    alt={`Photo of ${pokemon[slug].name}`}
                    className='img'
                  />
                </figure>
              </section>

              <section className='description-card'>
                <h2 className='title'>Description</h2>
                <p className='value'>
                  {pokemon[slug].species.description.flavor_text}
                </p>
              </section>

              <section className='info-card'>
                <h2 className='title'>Info</h2>

                <div className='content'>
                  <div className='info-section'>
                    <div className='info'>
                      <h3 className='subtitle'>Height</h3>
                      <p className='value'>
                        {(pokemon[slug].height / 10).toFixed(2)} m
                      </p>
                    </div>

                    <div className='info'>
                      <h3 className='subtitle'>Weight</h3>
                      <p className='value'>
                        {(pokemon[slug].weight / 10).toFixed(2)} kg
                      </p>
                    </div>
                  </div>

                  <div className='abilities-section'>
                    <h3 className='subtitle'>Abilities</h3>
                    <div className='abilities'>
                      {pokemon[slug].abilities.map((ability) => (
                        <div key={ability.name} className='ability'>
                          <p>{ability.name}</p>
                          <span className='icon'></span>
                          <p className='description'>{ability.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className='stats-card'>
                <h2 className='title'>Stats</h2>
                <div className='content'>
                  {pokemon[slug].stats.map((stat) => (
                    <DonutChart stat={stat} key={stat.name} />
                  ))}
                </div>
              </section>

              <section className='capture-rate-card'>
                <h2 className='title'>Capture Rate</h2>
                <div className='content'>
                  <Doughnut
                    data={{
                      labels: ['Capture Rate', 'total'],
                      datasets: [
                        {
                          label: 'Capture Rate',
                          data: [
                            (pokemon[slug].species.capture_rate / 255) * 100,
                            (pokemon[slug].species.capture_rate / 255) * 100 -
                              100,
                          ],
                          borderWidth: 0,
                          backgroundColor: ['#09BC8A', '#1E1E1E'],
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          enabled: false,
                        },
                      },
                      cutout: 62,
                    }}
                    className='donut'
                  />
                  <p className='number'>
                    {(
                      (pokemon[slug].species.capture_rate / 255) *
                      100
                    ).toFixed()}
                    %
                  </p>
                </div>
              </section>

              <section className='evolutions'>
                <ul className='content'>
                  {pokemon[slug]?.evolutions?.map((evolution) => (
                    <EvolutionCard evolution={evolution} key={evolution.name} />
                  ))}
                </ul>
              </section>
            </>
          )}
        </main>
      </>
    );
  } else {
    return <p>Cargando...</p>;
  }
};

export default Pokemon;
