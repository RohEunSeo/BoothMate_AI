// src/components/HoverButton.tsx
import React, { useState } from 'react'

const baseStyle: React.CSSProperties = {
  backgroundColor: '#222',
  color: 'white',
  border: '1px solid #555',
  borderRadius: '8px',
  padding: '10px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  width: '100%',
}

const HoverButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  style,
  ...rest
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      {...rest}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...baseStyle,
        ...style,
        backgroundColor: hovered
          ? (style?.backgroundColor === '#444' ? '#555' : '#333')
          : (style?.backgroundColor || baseStyle.backgroundColor),
      }}
    >
      {children}
    </button>
  )
}

export default HoverButton
