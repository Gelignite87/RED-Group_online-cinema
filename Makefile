create:
	docker-compose build && docker-compose up -d
delete:
	docker stop $$(docker ps -aq) && docker rm $$(docker ps -aq) && docker rmi $$(docker images -aq) && docker network prune -y
logs:
	docker-compose logs
network:
	docker network inspect online-cinema