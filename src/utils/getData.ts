const url = 'https://pokeapi.co/api/v2/';

const getData = async (route) => {
  const data = await fetch(`${url}${route}`).then((res) => res.json());

  return data;
};

export default getData;
