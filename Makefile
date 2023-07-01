SHELL := /bin/bash

create:
	docker-compose build && docker-compose up -d
delete:
	if [ -n "$$(docker ps -aqf ancestor=gelignite/fda_node_online-cinema)" ] && [ -n "$$(docker ps -aqf ancestor=gelignite/fda_next_online-cinema)" ] && [ -n "$$(docker ps -aqf ancestor=nginx)" ]; then \
		docker stop $$(docker ps -aqf ancestor=gelignite/fda_node_online-cinema) && docker rm $$(docker ps -aqf ancestor=gelignite/fda_node_online-cinema); \
		docker stop $$(docker ps -aqf ancestor=gelignite/fda_next_online-cinema) && docker rm $$(docker ps -aqf ancestor=gelignite/fda_next_online-cinema); \
		docker stop $$(docker ps -aqf ancestor=nginx) && docker rm $$(docker ps -aqf ancestor=nginx); \
	fi; \
	if [ -n "$$(docker images -q gelignite/fda_node_online-cinema)" ] && [ -n "$$(docker images -q gelignite/fda_next_online-cinema)" ] && [ -n "$$(docker images -q nginx)" ] && [ -n "$$(docker images -q certbot/certbot)" ]; then \
		docker rmi gelignite/fda_node_online-cinema gelignite/fda_next_online-cinema nginx certbot/certbot; \
	fi
deleteAll:
	docker stop $$(docker ps -aq) && docker rm $$(docker ps -aq) && docker rmi $$(docker images -aq)
logs:
	docker-compose logs
network:
	docker network inspect online-cinema