export const aggregateNaturalAxisLimits = (data = []) => {
  const { highest, lowest } = data.reduce(
    (accu, { high, low }, index) => {
      if (index === 0)
        return {
          highest: +high,
          lowest: +low
        }

      return {
        highest: +high > accu.highest ? +high : accu.highest,
        lowest: +low < accu.lowest ? +low : accu.lowest
      }
    },
    {
      highest: 0,
      lowest: 0
    }
  )

  return {
    max: Math.ceil(highest),
    min: Math.floor(lowest)
  }
}

export const getAxisLimits = ({ min = 0, max = 0 }) => {
  const factorList = [
    0.1,
    0.2,
    0.5,
    1,
    2,
    5,
    10,
    20,
    50,
    100,
    200,
    500,
    1000,
    2000,
    2500,
    5000,
    10000
  ]

  const difference = max - min
  const tick = factorList.find(f => difference / f >= 5 && difference / f <= 15)

  if (!tick)
    return {
      lowerLimit: min,
      upperLimit: max,
      tick: difference
    }

  const lowerLimit = min - (min % tick)
  const upperLimit = max + tick - (max % tick)

  return {
    lowerLimit,
    upperLimit,
    tick
  }
}

export const fillRange = ({ lowerLimit = 0, upperLimit = 0, tick = 0 }) => {
  const iteration = (upperLimit - lowerLimit) / tick

  if (iteration === 0 || tick === 0) return [lowerLimit, upperLimit]

  const results = [lowerLimit]

  for (let i = 1; i <= iteration; i++) {
    results.push(lowerLimit + tick * i)
  }

  return results
}
