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

const spawn = async (count, time) => {
  for (let i = 0; i < count; i++) {
    await client(i).catch(console.warn);
    await delay(time);
  }
}

const client = async (i) => {
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
    if (i == 0) {
      console.log(msg.toString());
    }
  });

  let pos = [44.439862, 26.049249];
  let dir = [(Math.random() - 0.5) / 10000, (Math.random() - 0.5) / 10000];
  setInterval(() => {
    pos[0] += dir[0];
    pos[1] += dir[1];
    ws.send(`move ${pos[0]} ${pos[1]}`);
  }, 500);
}

spawn(process.argv[2] || 1, process.argv[3] || 1);
