createimage:
	docker build -t gelignite/fda_nginx_online_cinema .
deleteimage:
	docker rmi gelignite/fda_nginx_online_cinema
# прежде чем создавать контейнер нужно убедится что .env и node_modules присутствуют в -v иначе внутри контейнера их не будет
start:
	docker run -d -p 80:80 --name fda_nginx_online_cinema gelignite/fda_nginx_online_cinema
stop:
	docker stop fda_nginx_online_cinema
prune:
	docker container prune
logs:
	docker logs fda_nginx_online_cinema