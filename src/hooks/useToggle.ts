function useToggle(
  set: React.Dispatch<React.SetStateAction<boolean>>,
  state: boolean,
): void {
  set(!state);
}

export default useToggle;
