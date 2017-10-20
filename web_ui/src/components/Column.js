import styled from 'react-emotion'
import { padding } from 'styles/palette'

export const Column = styled('div')`
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: ${({ marginBetween }) => padding[marginBetween] || padding.M}
  }
`
