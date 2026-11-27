// Simplified Africa outline (lon, lat), shared by the 3D hero and the SVG dot map.
export const AFRICA: [number, number][] = [
  [-5.9, 35.8], [-1, 35.1], [3, 36.8], [10, 37.3], [11, 33.5], [15, 32.3], [20, 30.8], [25, 31.6], [32.3, 31.3],
  [34.2, 27.5], [37, 22], [38.5, 18], [43.2, 12.6], [51.3, 11.8], [51, 10.4], [47.5, 4.5], [42, -1], [40, -4.5],
  [39.3, -8], [40.5, -11], [40.6, -15.5], [35.5, -21], [35.5, -24], [32.9, -26], [32.4, -28.7], [30, -31.3],
  [27.5, -33.5], [22.5, -34], [19.9, -34.8], [18.4, -34], [17.5, -30], [15.5, -27], [14.5, -23], [12, -18],
  [11.8, -13.8], [13.5, -11], [13, -8.5], [12, -5.5], [9.5, -1], [9.5, 3.5], [8.5, 4.5], [5.5, 4.3], [2.5, 6.3],
  [-1, 5], [-4, 5.2], [-7.5, 4.4], [-11.5, 6.9], [-13.3, 9], [-15, 11], [-16.8, 13.5], [-17.4, 14.7],
  [-16.5, 19.5], [-17, 21], [-15.5, 24], [-13.2, 27.7], [-9.8, 29.5], [-9.6, 32], [-6.8, 34],
];
export const MADAGASCAR: [number, number][] = [
  [49.3, -12], [50.5, -15.3], [49.5, -18], [47.1, -24.9], [45.2, -25.5], [43.7, -23.5], [43.3, -21.9], [44.4, -19.9], [44, -17.4], [46.5, -15.5],
];

export function insidePoly(poly: [number, number][], x: number, y: number) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

export function isAfrica(lon: number, lat: number) {
  return insidePoly(AFRICA, lon, lat) || insidePoly(MADAGASCAR, lon, lat);
}
