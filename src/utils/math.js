export const ratio = (numerator, denominator) => {
  const isZero = numerator / denominator === 0

  return isZero ? 1 : numerator / denominator
}
