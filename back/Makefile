image:
	docker build -t gelignite/fda_node_online_cinema .
delete:
	docker rmi gelignite/fda_node_online_cinema
container:
	docker run -d -p 4200:4200 -v "/home/fda/RED-Group_online-cinema/back:/application" --rm --name fda_node_online_cinema gelignite/fda_node_online_cinema
stop:
	docker stop fda_node_online_cinema