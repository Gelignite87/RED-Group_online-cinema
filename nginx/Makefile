createimage:
	docker build -t gelignite/fda_nginx_online_cinema .
deleteimage:
	docker rmi gelignite/fda_nginx_online_cinema
# прежде чем создавать контейнер нужно убедится что .env и node_modules присутствуют в -v иначе внутри контейнера их не будет
start:
	docker run -d -p 80:80 -p 443:443 --name fda_nginx_online_cinema gelignite/fda_nginx_online_cinema
delete:
	docker stop fda_nginx_online_cinema && docker rm fda_nginx_online_cinema
logs:
	docker logs fda_nginx_online_cinema