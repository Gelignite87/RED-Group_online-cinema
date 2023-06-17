image:
	docker build -t gelignite/fda_mongodb_online_cinema .
delete:
	docker rmi gelignite/fda_mongodb_online_cinema
container:
	docker run -d -p 27017:27017 --rm --name fda_mongodb_online_cinema gelignite/fda_mongodb_online_cinema
stop:
	docker stop fda_mongodb_online_cinema