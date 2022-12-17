export let stateMock = false;

export const setStateMock: React.Dispatch<React.SetStateAction<boolean>> = (
  state: boolean,
) => {
  stateMock = state;
};
