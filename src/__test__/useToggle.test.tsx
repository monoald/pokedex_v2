import useToggle from '../hooks/useToggle';

describe('Test useToggle hook', () => {
  let myState = false;

  const set: React.Dispatch<React.SetStateAction<boolean>> = (
    state: boolean,
  ) => {
    myState = state;
  };

  test('should return true', () => {
    useToggle(set, myState);

    expect(myState).toBe(true);
  });

  test('should return false', () => {
    useToggle(set, myState);

    expect(myState).toBe(false);
  });
});
