import React from "react"

interface CircleIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

export function CircleIcon({
  size = 24,
  color = "currentColor",
  ...props
}: CircleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
    </svg>
  )
}
