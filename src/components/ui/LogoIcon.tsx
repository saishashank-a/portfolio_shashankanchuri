export function LogoIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" fill="var(--muted)" />
      <text
        x="50"
        y="76"
        fontFamily="Arial Black, 'Arial Bold', Gadget, sans-serif"
        fontWeight="900"
        fontSize="78"
        textAnchor="middle"
        fill="var(--accent)"
      >S</text>
    </svg>
  )
}
