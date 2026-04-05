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
      <defs>
        <mask id="logo-s-mask">
          <rect width="100" height="100" fill="white" />
          <text
            x="50"
            y="76"
            fontFamily="Arial Black, 'Arial Bold', Gadget, sans-serif"
            fontWeight="900"
            fontSize="78"
            textAnchor="middle"
            fill="black"
          >S</text>
        </mask>
      </defs>
      <circle cx="50" cy="50" r="46" fill="#8a8a8a" mask="url(#logo-s-mask)" />
    </svg>
  )
}
