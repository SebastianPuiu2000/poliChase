dev-local:
	POLICHASE_BACKEND=localhost:3000 POLICHASE_FRONTEND=localhost:4200 docker-compose -f dev-compose.yml up --build

dev-ngrok:
	SECURED='s' POLICHASE_BACKEND=$$(curl -s http://127.0.0.1:4040/api/tunnels | grep -oP 'tcp://.\.tcp\.eu\.ngrok\.io:[0-9]+') docker-compose -f dev-compose.yml up --build

ngrok:
	ngrok start --all
