import Building from "./models/building";

let location: [string, Array<number>, Array<[number, number]>];
let locations: Array<[string, Array<number>, Array<[number, number]>]> = [];

// const color = [195, 201, 10]; // R G B
const colorE = [255, 244, 131];
const colorF = [210, 201, 110];
const colorR = [255, 251, 207]; // rectorat
const colorS = [0, 150, 65]; // sala de sport
const colorJ = [165, 145, 188];
const colorC = [190, 191, 190];
const colorP = [245, 163, 108];
const colorD = [87, 111, 105];
const colorA = [210, 112, 108]; // aula
const colorB = [176, 66, 57]; // biblioteca

location = [
  "JK",
  colorJ,
  [
    [44.44007, 26.05365],
    [44.4399, 26.0546],
    [44.43976, 26.05455],
    [44.43993, 26.0536],
  ],
];
locations.push(location);

location = [
  "JL",
  colorJ,
  [
    [44.43979, 26.05435],
    [44.43976, 26.05455],
    [44.43948, 26.05445],
    [44.43952, 26.05425],
  ],
];
locations.push(location);

location = [
  "JB",
  colorJ,
  [
    [44.43987, 26.05296],
    [44.43975, 26.05367],
    [44.43958, 26.05361],
    [44.43971, 26.0529],
  ],
];
locations.push(location);

location = [
  "JA",
  colorJ,
  [
    [44.43991, 26.05256],
    [44.43984, 26.05293],
    [44.43956, 26.05283],
    [44.43964, 26.05246],
  ],
];
locations.push(location);

location = [
  "JE",
  colorJ,
  [
    [44.43971, 26.0529],
    [44.43968, 26.05306],
    [44.43885, 26.05276],
    [44.43888, 26.05261],
  ],
];
locations.push(location);

location = [
  "JC",
  colorJ,
  [
    [44.43947, 26.05298],
    [44.43937, 26.0535],
    [44.43921, 26.05344],
    [44.4393, 26.05292],
  ],
];
locations.push(location);

location = [
  "JD",
  colorJ,
  [
    [44.43941, 26.05371],
    [44.43929, 26.05432],
    [44.43901, 26.05422],
    [44.43913, 26.0536],
  ],
];
locations.push(location);

location = [
  "JG",
  colorJ,
  [
    [44.43871, 26.05308],
    [44.43863, 26.05353],
    [44.43824, 26.05339],
    [44.43832, 26.05294],
  ],
];
locations.push(location);

location = [
  "JF",
  colorJ,
  [
    [44.4389, 26.05247],
    [44.43883, 26.05284],
    [44.43855, 26.05273],
    [44.43862, 26.05237],
  ],
];
locations.push(location);

location = [
  "SPORT",
  colorS,
  [
    [44.43976, 26.05513],
    [44.43968, 26.05554],
    [44.43928, 26.0554],
    [44.43936, 26.05498],
  ],
];
locations.push(location);

location = [
  "AN",
  colorR,
  [
    [44.43909, 26.05003],
    [44.43888, 26.05112],
    [44.4384, 26.05095],
    [44.4386, 26.04985],
  ],
];
locations.push(location);

location = [
  "BN",
  colorR,
  [
    [44.44027, 26.05063],
    [44.44022, 26.05094],
    [44.439, 26.0505],
    [44.43906, 26.0502],
  ],
];
locations.push(location);

location = [
  "RECTORAT",
  colorR,
  [
    [44.43871, 26.0513],
    [44.43861, 26.05189],
    [44.43818, 26.05173],
    [44.43829, 26.05115],
  ],
];
locations.push(location);

location = [
  "D",
  colorD,
  [
    [44.44013, 26.04537],
    [44.43995, 26.04633],
    [44.43969, 26.04623],
    [44.43987, 26.04527],
  ],
];
locations.push(location);

location = [
  "FA",
  colorF,
  [
    [44.43907, 26.04642],
    [44.43902, 26.04671],
    [44.43846, 26.04652],
    [44.43851, 26.04621],
  ],
];
locations.push(location);

location = [
  "FB",
  colorF,
  [
    [44.43897, 26.04585],
    [44.43889, 26.04627],
    [44.43836, 26.04608],
    [44.43844, 26.04565],
  ],
];
locations.push(location);

location = [
  "PR",
  colorP,
  [
    [44.43509, 26.04759],
    [44.43509, 26.04791],
    [44.43486, 26.04791],
    [44.43486, 26.04759],
  ],
];
locations.push(location);

location = [
  "AULA",
  colorA,
  [
    [44.44063, 26.0517],
    [44.44057, 26.05193],
    [44.44028, 26.05176],
    [44.44035, 26.05153],
  ],
];
locations.push(location);

location = [
  "ED",
  colorE,
  [
    [44.43588, 26.04785],
    [44.43588, 26.04834],
    [44.43566, 26.04834],
    [44.43565, 26.04785],
  ],
];
locations.push(location);

location = [
  "EF",
  colorE,
  [
    [44.43597, 26.04834],
    [44.43597, 26.04855],
    [44.43566, 26.04856],
    [44.43566, 26.04834],
  ],
];
locations.push(location);

location = [
  "EC",
  colorE,
  [
    [44.43603, 26.0471],
    [44.43603, 26.04762],
    [44.4356, 26.04765],
    [44.43559, 26.04712],
  ],
];
locations.push(location);

location = [
  "EB",
  colorE,
  [
    [44.43625, 26.04597],
    [44.43626, 26.04735],
    [44.43608, 26.04734],
    [44.43607, 26.04596],
  ],
];
locations.push(location);

location = [
  "EA",
  colorE,
  [
    [44.4369, 26.04566],
    [44.4369, 26.04594],
    [44.43588, 26.04597],
    [44.43587, 26.0457],
  ],
];
locations.push(location);

location = [
  "EJ",
  colorE,
  [
    [44.43786, 26.04705],
    [44.43773, 26.04773],
    [44.43737, 26.0476],
    [44.43749, 26.04692],
  ],
];
locations.push(location);

location = [
  "EG",
  colorE,
  [
    [44.43722, 26.04785],
    [44.43716, 26.04821],
    [44.43629, 26.04791],
    [44.43636, 26.04756],
  ],
];
locations.push(location);

location = [
  "EH",
  colorE,
  [
    [44.43778, 26.04858],
    [44.43769, 26.0491],
    [44.43741, 26.049],
    [44.43751, 26.04849],
  ],
];
locations.push(location);

location = [
  "EM",
  colorE,
  [
    [44.43859, 26.04793],
    [44.43842, 26.04888],
    [44.43825, 26.04882],
    [44.43842, 26.04787],
  ],
];
locations.push(location);

location = [
  "EL",
  colorE,
  [
    [44.43874, 26.04899],
    [44.43871, 26.04917],
    [44.43788, 26.04888],
    [44.43791, 26.0487],
  ],
];
locations.push(location);

location = [
  "EN",
  colorE,
  [
    [44.43814, 26.04797],
    [44.43802, 26.04865],
    [44.43785, 26.04859],
    [44.43798, 26.04791],
  ],
];
locations.push(location);

location = [
  "BIBLIOTECA",
  colorB,
  [
    [44.4414, 26.05084],
    [44.44121, 26.0519],
    [44.44088, 26.05179],
    [44.44107, 26.05072],
  ],
];
locations.push(location);

location = [
  "CA",
  colorC,
  [
    [44.44238, 26.04986],
    [44.44227, 26.05052],
    [44.44197, 26.05041],
    [44.44209, 26.04976],
  ],
];
locations.push(location);

location = [
  "CB",
  colorC,
  [
    [44.44201, 26.04968],
    [44.44193, 26.05015],
    [44.44107, 26.04984],
    [44.44116, 26.04936],
  ],
];
locations.push(location);

location = [
  "CD",
  colorC,
  [
    [44.44124, 26.04894],
    [44.44112, 26.04956],
    [44.44071, 26.04941],
    [44.44082, 26.04879],
  ],
];
locations.push(location);

location = [
  "CE",
  colorC,
  [
    [44.4407, 26.04957],
    [44.44064, 26.04986],
    [44.44038, 26.04976],
    [44.44043, 26.04947],
  ],
];
locations.push(location);

location = [
  "CF",
  colorC,
  [
    [44.44052, 26.04869],
    [44.44038, 26.04942],
    [44.43988, 26.04923],
    [44.44001, 26.0485],
  ],
];
locations.push(location);

location = [
  "CK",
  colorC,
  [
    [44.43991, 26.04846],
    [44.43978, 26.04919],
    [44.43957, 26.04912],
    [44.4397, 26.04838],
  ],
];
locations.push(location);

location = [
  "CG",
  colorC,
  [
    [44.44111, 26.04797],
    [44.44106, 26.04826],
    [44.43991, 26.04782],
    [44.43995, 26.04754],
  ],
];
locations.push(location);

location = [
  "CH",
  colorC,
  [
    [44.441, 26.04737],
    [44.44095, 26.0476],
    [44.44075, 26.04752],
    [44.44079, 26.04729],
  ],
];
locations.push(location);

location = [
  "CI",
  colorC,
  [
    [44.44107, 26.04688],
    [44.44103, 26.04711],
    [44.44056, 26.04694],
    [44.4406, 26.04671],
  ],
];
locations.push(location);

location = [
  "CJ",
  colorC,
  [
    [44.44233, 26.04953],
    [44.4423, 26.04968],
    [44.44208, 26.0496],
    [44.44211, 26.04945],
  ],
];
locations.push(location);

export const addBuildings = async () => {
  for (let value of locations) {
    await Building.BuildingModel.deleteOne({
      name: value[0],
    }).exec();

    await Building.methods.createBuilding(value[0], value[1], value[2]);
  }
};
