type IconProps = { className?: string };

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.6 4.77 6v5.56h-4v-4.93c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62v5.01h-4v-11Z" />
    </svg>
  );
}

export function LineIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 3C6.48 3 2 6.6 2 11.04c0 3.98 3.55 7.32 8.35 7.95.33.07.77.21.88.49.1.25.07.65.03.9l-.14.85c-.04.25-.2.98.86.53 1.06-.44 5.72-3.37 7.8-5.77C21.2 14.4 22 12.82 22 11.04 22 6.6 17.52 3 12 3Zm-3.6 10.43H6.42a.52.52 0 0 1-.52-.52V9a.52.52 0 0 1 1.04 0v3.39H8.4a.52.52 0 0 1 0 1.04Zm2.05-.52a.52.52 0 0 1-1.04 0V9a.52.52 0 0 1 1.04 0v3.91Zm4.77 0a.52.52 0 0 1-.94.31l-2.03-2.76v2.45a.52.52 0 0 1-1.04 0V9a.52.52 0 0 1 .94-.31l2.03 2.76V9a.52.52 0 0 1 1.04 0v3.91Zm3.2-2.47a.52.52 0 0 1 0 1.04h-1.46v.93h1.46a.52.52 0 0 1 0 1.04h-1.98a.52.52 0 0 1-.52-.52V9c0-.29.23-.52.52-.52h1.98a.52.52 0 0 1 0 1.04h-1.46v.92h1.46Z" />
    </svg>
  );
}
