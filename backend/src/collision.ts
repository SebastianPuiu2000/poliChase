export function circleCircle(p1_X: number, p1_Y: number, p2_X: number, p2_Y: number, r: number) {
  return ((r + r) ** 2 > (p1_X - p2_X) ** 2 + (p1_Y - p2_Y) ** 2);
}

export function inBuilding(x: number, y: number, buildings: [number, number][][]) {
  return false;
}
