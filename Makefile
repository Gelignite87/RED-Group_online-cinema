SHELL := /bin/bash

create:
	docker-compose build && docker-compose up -d
delete:
	if [ -n "$$(docker ps -aqf ancestor=gelignite/fda_node_online_cinema)" ] && [ -n "$$(docker ps -aqf ancestor=gelignite/fda_next_online_cinema)" ] && [ -n "$$(docker ps -aqf ancestor=nginx)" ] && [ -n "$$(docker ps -aqf ancestor=certbot/certbot)" ]; then \
		docker stop $$(docker ps -aqf ancestor=gelignite/fda_node_online_cinema) && docker rm $$(docker ps -aqf ancestor=gelignite/fda_node_online_cinema); \
		docker stop $$(docker ps -aqf ancestor=gelignite/fda_next_online_cinema) && docker rm $$(docker ps -aqf ancestor=gelignite/fda_next_online_cinema); \
		docker stop $$(docker ps -aqf ancestor=nginx) && docker rm $$(docker ps -aqf ancestor=nginx); \
		docker rm $$(docker ps -aqf ancestor=certbot/certbot); \
	fi; \
	if [ -n "$$(docker images -q gelignite/fda_node_online_cinema)" ] && [ -n "$$(docker images -q gelignite/fda_next_online_cinema)" ] && [ -n "$$(docker images -q nginx)" ] && [ -n "$$(docker images -q certbot/certbot)" ]; then \
		docker rmi gelignite/fda_node_online_cinema gelignite/fda_next_online_cinema nginx certbot/certbot; \
	fi
deleteAll:
	docker stop $$(docker ps -aq) && docker rm $$(docker ps -aq) && docker rmi $$(docker images -aq)
logs:
	docker-compose logs
network:
	docker network inspect online-cinema