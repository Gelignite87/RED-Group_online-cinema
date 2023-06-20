createimage:
	docker build -t gelignite/fda_node_online_cinema .
deleteimage:
	docker rmi gelignite/fda_node_online_cinema
# прежде чем создавать контейнер нужно убедится что .env и node_modules присутствуют в -v иначе внутри контейнера их не будет
dev:
	docker run -d -p 4200:4200 -v "/home/fda/RED-Group_online-cinema/back:/application" --rm --name fda_node_online_cinema gelignite/fda_node_online_cinema
start:
	docker run -d -p 4200:4200 --restart always --name fda_node_online_cinema gelignite/fda_node_online_cinema
stop:
	docker stop fda_node_online_cinema
prune:
	docker container prune
logs:
	docker logs fda_node_online_cinema