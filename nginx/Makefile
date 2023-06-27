createimage:
	docker build -t gelignite/fda_nginx_online_cinema .
deleteimage:
	docker rmi gelignite/fda_nginx_online_cinema
# прежде чем создавать контейнер нужно убедится что .env и node_modules присутствуют в -v иначе внутри контейнера их не будет
start:
	docker run -d -p 80:80 --name red-group_online-cinema_fda_nginx_online_cinema_1 gelignite/fda_nginx_online_cinema
delete:
	docker stop red-group_online-cinema_fda_nginx_online_cinema_1 && docker rm red-group_online-cinema_fda_nginx_online_cinema_1
logs:
	docker logs red-group_online-cinema_fda_nginx_online_cinema_1