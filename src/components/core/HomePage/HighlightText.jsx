import React from 'react'

const HighlightText = ({ text }) => {
  const gradientStyle = {
    background: 'linear-gradient(117.95deg, #833AB4, #FD1D1D, #FCB045)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };
  return (
    <span className='font-bold'
      style={gradientStyle}
    >
      {" "}
      {text}
    </span>
  )
}

export default HighlightText
