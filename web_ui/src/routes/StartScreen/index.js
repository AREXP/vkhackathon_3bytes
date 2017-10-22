import React from 'react'
import { withRouter } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

const enhance = withRouter

const StartScreen = ({ history }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '350px',
    flexDirection: 'column',
  }}>
    {/* <Image
      src='/logo.png'
      size='small'
      shape='circular'
      style={{ cursor: 'pointer' }}
      onClick={() => history.push('/')}
    /> */}
    <div
      style={{
        fontFamily: 'Serif',
        fontSize: '3em',
        paddingTop: '1em',
        cursor: 'pointer',
      }}
      onClick={() => history.push('/')}
    >
      Начать работу
    </div>
  </div>
)

export default enhance(StartScreen)
