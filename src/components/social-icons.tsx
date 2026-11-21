type IconProps = { className?: string };

/** LINE tidak tersedia di Famicons → glyph resmi LINE (bentuk balon + teks). */
export function LineIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 3C6.48 3 2 6.6 2 11.04c0 3.98 3.55 7.32 8.35 7.95.33.07.77.21.88.49.1.25.07.65.03.9l-.14.85c-.04.25-.2.98.86.53 1.06-.44 5.72-3.37 7.8-5.77C21.2 14.4 22 12.82 22 11.04 22 6.6 17.52 3 12 3Zm-3.6 10.43H6.42a.52.52 0 0 1-.52-.52V9a.52.52 0 0 1 1.04 0v3.39H8.4a.52.52 0 0 1 0 1.04Zm2.05-.52a.52.52 0 0 1-1.04 0V9a.52.52 0 0 1 1.04 0v3.91Zm4.77 0a.52.52 0 0 1-.94.31l-2.03-2.76v2.45a.52.52 0 0 1-1.04 0V9a.52.52 0 0 1 .94-.31l2.03 2.76V9a.52.52 0 0 1 1.04 0v3.91Zm3.2-2.47a.52.52 0 0 1 0 1.04h-1.46v.93h1.46a.52.52 0 0 1 0 1.04h-1.98a.52.52 0 0 1-.52-.52V9c0-.29.23-.52.52-.52h1.98a.52.52 0 0 1 0 1.04h-1.46v.92h1.46Z" />
    </svg>
  );
}
