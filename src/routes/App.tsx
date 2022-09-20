import * as React from 'react';
import Header from '../components/molecules/Header';

interface Icons {
  class: string;
  id: string;
}

interface Props {
  title: string;
  icons?: Icons[];
}

const App = () => {
  const props: Props = {
    title: 'Pokemon',
    icons: [
      {
        class: 'filter_icon',
        id: 'filter',
      },
      {
        class: 'menu_icon',
        id: 'menu',
      },
    ],
  };

  return (
    <>
      <Header content={props} />
    </>
  );
};

export default App;
