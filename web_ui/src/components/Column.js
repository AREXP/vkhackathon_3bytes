import styled from 'react-emotion'
import { padding as palettePadding } from 'styles/palette'

export const Column = styled('div')`
  display: flex;
  flex-direction: column;
  padding: ${({ padding }) => padding || 0}
  & > * + * {
    margin-top: ${({ marginBetween }) => palettePadding[marginBetween] || palettePadding.M};
  }
`
