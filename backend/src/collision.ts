export function circleCircle(p1_X: number, p1_Y: number, p2_X: number, p2_Y: number, r: number) {
  return ((r + r) ** 2 > (p1_X - p2_X) ** 2 + (p1_Y - p2_Y) ** 2);
}

function intersects(x: number, y: number, p1: [number, number], p2: [number, number]) {
  if (x > p1[0] && x > p2[0]) {
    return false;
  }

  if (y >= Math.min(p1[1], p2[1]) && y <= Math.max(p1[1], p2[1])) {
    return true;
  }

  return false;
}

export function inBuilding(x: number, y: number, building: [number, number][]) {
  let count = 0;

  let prev_point = building[0];
  for (let i = 1; i < building.length; i++) {
    const curr_point = building[i];
    count += intersects(x, y, prev_point, curr_point) ? 1 : 0;

    prev_point = curr_point;
  }

  const curr_point = building[0];
  count += intersects(x, y, prev_point, curr_point) ? 1 : 0;

  return count % 2 != 0;
}

export function inBuildings(x: number, y: number, buildings: any) {
  for (const building of buildings) {
    if (checkInside(building.points, [x, y])) {
      return true;
    }
  }

  return false;
}

type Point = [number, number];
type Line = [Point, Point];

function onLine(l1: Line, p: Point) {
	if (p[0] <= Math.max(l1[0][0], l1[1][0])
		&& p[0] <= Math.min(l1[0][0], l1[1][0])
		&& (p[0] <= Math.max(l1[0][1], l1[1][1])
			&& p[0] <= Math.min(l1[0][1], l1[1][1])))
		return true;

	return false;
}

function direction(a: Point, b: Point, c: Point) {
	let val = (b[1] - a[1]) * (c[0] - b[0]) - (b[0] - a[0]) * (c[1] - b[1]);

	if (val == 0)
		return 0;

	else if (val < 0)
		return 2;

	return 1;
}

function isIntersect(l1: Line, l2: Line) {
	let dir1 = direction(l1[0], l1[1], l2[0]);
	let dir2 = direction(l1[0], l1[1], l2[1]);
	let dir3 = direction(l2[0], l2[1], l1[0]);
	let dir4 = direction(l2[0], l2[1], l1[1]);

	if (dir1 != dir2 && dir3 != dir4)
		return true;

	if (dir1 == 0 && onLine(l1, l2[0]))
		return true;

	if (dir2 == 0 && onLine(l1, l2[1]))
		return true;

	if (dir3 == 0 && onLine(l2, l1[0]))
		return true;

	if (dir4 == 0 && onLine(l2, l1[1]))
		return true;

	return false;
}

function checkInside(poly: [Point], p: Point) {
  const n = poly.length;

	if (n < 3)
		return false;

	let tmp: Point = [100, p[1]];
	let exline: Line = [p, tmp];

	let count = 0;
	let i = 0;

	do {
		let side: Line = [poly[i], poly[(i + 1) % n]];
		if (isIntersect(side, exline)) {

			if (direction(side[0], p, side[1]) == 0)
				return onLine(side, p);
			count++;
		}
		i = (i + 1) % n;
	} while (i != 0);

	return count & 1;
}
