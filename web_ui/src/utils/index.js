import { compose, map, split, drop, fromPairs } from 'ramda'

export const getParams = compose(
  fromPairs,
  map(split('=')),
  split('&'),
  drop(1),
)
