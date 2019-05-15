import React from 'react'

const Image = props => {
  const style = {
    maxWidth: '100%',
    height: 'auto',
    objectFit: 'cover',
  }

  return <img style={style} src={props.src} />
}

export default Image
