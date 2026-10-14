// Geometry of the Figma map illustration («Карта (иллюстрация, заменить на Яндекс/Google Maps)»),
// in px of its 736×618 frame. Shown under the Yandex map while it loads.
const blocks: [left: number, top: number, width: number, height: number][] = [
  [-20, -20, 182, 132],
  [200, -20, 162, 132],
  [400, -20, 202, 132],
  [640, -20, 122, 132],
  [-20, 150, 122, 152],
  [140, 150, 222, 152],
  [400, 150, 132, 152],
  [570, 150, 182, 152],
  [-20, 340, 242, 122],
  [260, 340, 102, 122],
  [400, 340, 182, 122],
  [620, 340, 142, 122],
  [-20, 500, 162, 152],
  [180, 500, 202, 152],
  [420, 500, 102, 152],
  [560, 500, 202, 152],
];
const park = [400, 340, 222, 122] as const;

export function MapIllustration({ label, address }: { label: string; address: string }) {
  return (
    // Below xl: centred on the pin + label group (x 332–650, y 232–328); at xl: the Figma frame origin.
    <div aria-hidden className="absolute top-[calc(50%-280px)] left-[calc(50%-491px)] h-154.5 w-184 xl:top-0 xl:left-0">
      {blocks.map(([left, top, width, height]) => (
        <span key={`${left}-${top}`} className="absolute rounded-block bg-map-block" style={{ left, top, width, height }} />
      ))}
      <span
        className="absolute rounded-block bg-map-park"
        style={{ left: park[0], top: park[1], width: park[2], height: park[3] }}
      />
      <span className="absolute top-117.5 -left-20 h-5 w-225 origin-top-left -rotate-8 bg-map-water" />
      <span className="absolute top-58 left-83 size-24 rounded-full bg-accent" />
      <span className="absolute top-65.5 left-90.5 size-9 rounded-full border-3 border-white" />
      <span className="absolute top-62.5 left-111.5 flex flex-col gap-0.5 rounded-field bg-white px-4 py-3 whitespace-nowrap shadow-float">
        <span className="text-label font-medium text-ink">{label}</span>
        <span className="text-small text-graphite">{address}</span>
      </span>
    </div>
  );
}
