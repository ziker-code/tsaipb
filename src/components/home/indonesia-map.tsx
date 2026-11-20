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
            id={loc.id}
            d={loc.path}
            className={loc.id === "id-jb" ? "fill-gold-500" : "fill-white/90"}
            stroke="#006838"
            strokeWidth="0.6"
          />
        ))}
        <g transform={`translate(${BOGOR.x} ${BOGOR.y})`}>
          <circle r="14" className="fill-gold-300/40">
            <animate attributeName="r" values="6;16;6" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0;0.9" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle r="5" className="fill-white" stroke="#b9a56b" strokeWidth="2.5" />
        </g>
      </svg>
      <figcaption className="sr-only">Lokasi: IPB University, Dramaga, Bogor, Jawa Barat.</figcaption>
    </figure>
  );
}
