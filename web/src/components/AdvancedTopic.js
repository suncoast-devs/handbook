import React, { useState } from 'react'

const AdvancedTopic = props => {
  const [revealed, setRevealed] = useState(false)

  const message = props.message
  const buttonText = revealed ? 'Hide' : 'Reveal'

  return (
    <>
      <blockquote>
        <p>{message}</p>
        <p>
          <button
            className="button is-primary"
            onClick={() => setRevealed(!revealed)}
          >
            {buttonText}
          </button>
        </p>
      </blockquote>
      {revealed && props.children}
    </>
  )
}

export default AdvancedTopic
