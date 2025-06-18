import React from 'react'
import "./button.css"

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled: boolean
  variant: "primary" | "secondary" | "danger"
  processing?: boolean
  className?: string,
}
const Button = ({children, onClick, disabled, variant = "primary", className, ...props} : ButtonProps) => {

  const variantColor = {
    primary: "primary",
    secondary: "secondary",
    danger: "danger",
  }

  return (
     <button
      className={`button ${className} ${variantColor[variant]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
