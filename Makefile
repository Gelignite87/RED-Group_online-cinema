start:
	docker-compose build && docker-compose up
delete:
	docker stop $$(docker ps -aq) && docker rm $$(docker ps -aq) && docker rmi $$(docker images -aq)
	