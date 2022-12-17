import useToggle from '../hooks/useToggle';

import { stateMock, setStateMock } from '../__mocks__/setToggleMock';

describe('Test useToggle hook', () => {
  test('should return true', () => {
    useToggle(setStateMock, stateMock);

    expect(stateMock).toBe(true);
  });

  test('should return false', () => {
    useToggle(setStateMock, stateMock);

    expect(stateMock).toBe(false);
  });
});
