createimage:
	docker build -t gelignite/fda_next_online_cinema .
deleteimage:
	docker rmi gelignite/fda_next_online_cinema
# прежде чем создавать контейнер нужно убедится что .env и node_modules присутствуют в -v иначе внутри контейнера их не будет
dev:
	docker run -d -p 3200:3200 -v "/home/fda/RED-Group_online-cinema/front:/application" --rm --name fda_next_online_cinema gelignite/fda_next_online_cinema
start:
	docker run -d -p 3200:3200 --restart always --name red-group_online-cinema_fda_next_online_cinema_1 gelignite/fda_next_online_cinema
delete:
	docker stop red-group_online-cinema_fda_next_online_cinema_1 && docker rm red-group_online-cinema_fda_next_online_cinema_1
logs:
	docker logs red-group_online-cinema_fda_next_online_cinema_1