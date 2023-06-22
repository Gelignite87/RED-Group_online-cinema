createimage:
	docker build -t gelignite/fda_next_online_cinema .
deleteimage:
	docker rmi gelignite/fda_next_online_cinema
# прежде чем создавать контейнер нужно убедится что .env и node_modules присутствуют в -v иначе внутри контейнера их не будет
dev:
	docker run -d -p 3200:3200 -v "/home/fda/RED-Group_online-cinema/front:/application" --rm --name fda_next_online_cinema gelignite/fda_next_online_cinema
start:
	docker run -d -p 3200:3200 --restart always --name fda_next_online_cinema gelignite/fda_next_online_cinema
delete:
	docker stop fda_next_online_cinema && docker rm fda_next_online_cinema
logs:
	docker logs fda_next_online_cinema