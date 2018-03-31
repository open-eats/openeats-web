
// Find the GCD of two numbers
const GCD = (a, b) => {
  if (!b) return a;
  return GCD(b, a % b);
};

export default (servings, customServings, numerator, denominator) => {
  console.log(numerator, denominator, servings, customServings);

  // If there isn't a denominator.
  // We can assume the user wants to display
  // the recipe ings as decimals.
  if (denominator <= 1 )
    return parseFloat((numerator * (customServings / servings)).toFixed(3)).toString();

  // Check if there is a custom serving.
  // If there is, we multiple the numerator by the custom servings amount
  // and multiple the denominator by the servings amount.
  if (servings !== customServings) {
    numerator *= customServings;
    denominator *= servings;
  }

  // Get the quotient from the mixed fraction
  // so we are only left with a fraction < 1.
  const quotient = Math.floor(numerator / denominator);

  // The remainder from  what is left over.
  // Set is as the new numerator.
  numerator = numerator % denominator;

  // If the numerator zero then return just the quotient
  if (numerator === 0)
    return quotient.toString();

  // Get the GCD and reduce the fraction.1
  const gcd = GCD(numerator, denominator);
  numerator /= gcd;
  denominator /= gcd;

  // TODO: We should do some math to try and
  // round weird fractions to smaller ones.
  // For Example, 23/64 -> 3/8

  // If the denominator is greater than 8.
  // Display as a decimal.
  if (denominator > 8)
    return quotient.toString() + " " + numerator.toString() + "/" + denominator.toString()

  return parseFloat((quotient + (numerator / denominator)).toFixed(3)).toString()
};
