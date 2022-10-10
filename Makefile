start.db:
	@docker-compose -f docker-compose.dev.yml up -d

start.db.force:
	@docker-compose -f docker-compose.dev.yml down --remove-orphans -v --rmi local
	@docker-compose -f docker-compose.dev.yml up --force-recreate --build -d

stop.db:
	@docker-compose -f docker-compose.dev.yml down --remove-orphans

exec.db:
	@docker exec -it api env TERM=xterm-256color script -q -c "/bin/bash" /dev/null

logs.db:
	@docker logs -f --tail 100 teros-db