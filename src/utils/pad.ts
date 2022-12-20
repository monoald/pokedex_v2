const pad = (n: string): string => {
  n = n + '';
  return n.length >= 3 ? n : new Array(3 - n.length + 1).join('0') + n;
};

export default pad;
