let fs = require('fs')
const { WebSocket } = require('ws');
const randomName = require('random-name');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const host = 'localhost';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
const colors = ['green', 'red', 'white', 'blue', 'yellow', 'purple', 'cyan', 'orange'];

const client = async (interactive, debug) => {
  const name = randomName();

  const username = name.toLowerCase().replace(' ', '.');
  const password = 'pass' + username;
  const email = username + '@gmail.com';
  const color = colors[getRandomInt(colors.length)];

  let res = await fetch(`http://${host}:3000/register`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: username,
      email: email,
      password: password
    })
  });

  let body = await res.json();
  if (!body.success) {
    return;
  }

  res = await fetch(`http://${host}:3000/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: username,
      password: password
    })
  });

  body = await res.json();
  if (!body.success) {
    return;
  }

  let token = body.token;

  res = await fetch(`http://${host}:3000/color?token=${token}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      color,
    })
  });

  body = await res.json();
  if (!body.success) {
    return;
  }

  const ws = new WebSocket(`ws://${host}:3001?token=${token}`);
  ws.on('message', msg => {
    if (debug) {
      console.log(msg.toString());
    }
  });

  let pos1 = [44.43690, 26.04566];
  let pos2 = [44.43690, 26.04593];
  let pos3 = [44.43588, 26.04597];
  let pos4 = [44.43587, 26.04571];
  
  setInterval(() => {
    
    ws.send(`move ${pos1[0]} ${pos1[1]}`);
    ws.send(`move ${pos2[0]} ${pos2[1]}`);
    // ws.send(`move ${pos3[0]} ${pos3[1]}`);
    // ws.send(`move ${pos4[0]} ${pos4[1]}`);
  }, 500);

  if (interactive) {
    return pos1;
  }
}

const spawn = async (count, time) => {
  for (let i = 0; i < count; i++) {
    await client(false, false).catch(console.warn);
    await delay(time);
  }
}

const interactive_mock = async () => {
  const getChar = () => new Promise(resolve => {
    let buffer = Buffer.alloc(1)
    fs.read(0, buffer, 0, 1, null, () => resolve(buffer.toString('utf8')))
  })

  const pos = await client(true, false);
  const speed = 0.0001;
  while (true) {
    const c = await getChar();
    switch (c) {
      case 'w':
        pos[0] += speed;
        break;
      case 'a':
        pos[1] -= speed;
        break;
      case 's':
        pos[0] -= speed;
        break;
      case 'd':
        pos[1] += speed;
        break;
      default:
        break;
    }
  }
}

const count = process.argv[2] || 1;
spawn(count - 1, process.argv[3] || 1);
interactive_mock()
