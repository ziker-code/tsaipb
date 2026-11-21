import indonesia from "@svg-maps/indonesia";

// Posisi Bogor (106.8°BT, 6.6°LS) dalam viewBox peta, dihitung dari bbox provinsi Jawa Barat (≈17,2 unit/derajat).
const BOGOR = { x: 200.6, y: 241 };

export function IndonesiaMap() {
  return (
    <figure className="relative">
      <svg viewBox={indonesia.viewBox} className="h-auto w-full" role="img" aria-labelledby="map-title">
        <title id="map-title">Peta Indonesia — TSA IPB berbasis di Bogor, Jawa Barat</title>
        {indonesia.locations.map((loc) => (
          <path
            key={loc.id}
            d={loc.path}
            className={
              loc.id === "id-jb"
                ? "fill-gold-500"
                : "fill-white/85 transition-[fill] duration-500 hover:fill-gold-300"
            }
            stroke="#0a4d32"
            strokeWidth="0.6"
          >
            <title>{loc.name}</title>
          </path>
        ))}
        <g transform={`translate(${BOGOR.x} ${BOGOR.y})`} aria-hidden="true">
          <circle r="7" className="origin-center animate-pulse-ring fill-gold-300 [transform-box:fill-box]" />
          <circle r="7" className="origin-center animate-pulse-ring fill-gold-300 [animation-delay:1.2s] [transform-box:fill-box]" />
          <circle r="4.5" className="fill-white" stroke="#b5a66c" strokeWidth="2.5" />
        </g>
      </svg>
      <figcaption className="sr-only">Lokasi: IPB University, Dramaga, Bogor, Jawa Barat.</figcaption>
    </figure>
  );
}
