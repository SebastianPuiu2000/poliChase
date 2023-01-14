dev:
	docker-compose -f dev-compose.yml up --build

ngrok:
	ngrok start --all
