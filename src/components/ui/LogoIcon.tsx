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
      <rect x="2" y="2" width="96" height="96" rx="20" fill="var(--logo-bg)" />
      <path
        d="M 58,2 L 98,2 L 98,42 C 98,68 70,78 50,70 L 42,98 L 2,98 L 2,58 C 2,32 30,22 50,30 Z"
        fill="var(--logo-band)"
      />
    </svg>
  )
}
