import Building from "./models/building";

let location: [string, Array<[number, number]>];
let locations: Array<[string, Array<[number, number]>]> = [];

location = [
  "Electrica1",
  [
    [44.4369, 26.04566],
    [44.4369, 26.04593],
    [44.43588, 26.04597],
    [44.43587, 26.04571],
  ],
];

locations.push(location);

location = [
  "Automatica1",
  [
    [44.43603, 26.04711],
    [44.43604, 26.04763],
    [44.4356, 26.04764],
    [44.43559, 26.04712],
  ],
];

locations.push(location);

location = [
  "Energetica1",
  [
    [44.43778, 26.04859],
    [44.43769, 26.0491],
    [44.43741, 26.049],
    [44.43751, 26.04848],
  ],
];

locations.push(location);

location = [
  "Biblioteca1",
  [
    [44.4414, 26.05084],
    [44.44124, 26.05175],
    [44.44091, 26.05165],
    [44.44107, 26.05072],
  ],
];

locations.push(location);

location = [
  "Robotica1",
  [
    [44.44131, 26.04897],
    [44.4412, 26.04959],
    [44.44073, 26.04942],
    [44.44084, 26.0488],
  ],
];

locations.push(location);

location = [
  "Biotehnica1",
  [
    [44.44013, 26.04537],
    [44.43995, 26.04633],
    [44.43969, 26.04623],
    [44.43987, 26.04527],
  ],
];

locations.push(location);

location = [
  "Transporturi1",
  [
    [44.43991, 26.05256],
    [44.43984, 26.05293],
    [44.43952, 26.05282],
    [44.4396, 26.05244],
  ],
];

locations.push(location);

location = [
  "Aula1",
  [
    [44.44062, 26.05168],
    [44.44056, 26.05189],
    [44.44028, 26.05173],
    [44.44035, 26.05152],
  ],
];

locations.push(location);

location = [
  "Rectorat1",
  [
    [44.43871, 26.0513],
    [44.43861, 26.05189],
    [44.43818, 26.05173],
    [44.43829, 26.05115],
  ],
];

locations.push(location);

location = [
  "Stiinte1",
  [
    [44.44012, 26.05033],
    [44.44002, 26.05087],
    [44.43964, 26.05073],
    [44.43974, 26.05019],
  ],
];

locations.push(location);

location = [
  "Sportiv1",
  [
    [44.43971, 26.05511],
    [44.43963, 26.05553],
    [44.43933, 26.05542],
    [44.4394, 26.055],
  ],
];

locations.push(location);

export const addBuildings = async () => {
  for (let value of locations) {
    Building.methods.createBuilding(value[0], value[1]);
  }
};
