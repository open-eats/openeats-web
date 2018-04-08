
// Find the GCD of two numbers
export const GCD = (a, b) => {
  if (!b) return a;
  return GCD(b, a % b);
};