# Define the default target
.DEFAULT_GOAL := help

# Define the docker-compose command
DOCKER_COMPOSE := docker-compose

DOCKER_COMPOSE_FILE := docker-compose.yml

new: ## Create a new project
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) build --no-cache

up: ## Start all or c=<name> containers in background
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d

stop: ## Stop all or c=<name> containers
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) stop

status: ## Show status of containers
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) ps

restart: ## Restart all or c=<name> containers
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) stop
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d

renew: ## Restart all or c=<name> containers
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) stop
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) build --no-cache
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d

logs: ## Show logs for all or c=<name> containers
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) logs --tail=100 -f

down: ## Clean all data
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) stop
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down

clean: ## Clean all data
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down --volumes --remove-orphans
	sudo rm -rf ./node_modules
	sudo rm -rf ./volume_postgres

node: ## node.jsをインストールしている場合これで実行
	npm install
	npx prisma generate
	npm run dev

# Define the help target
help:
	@echo "Available targets:"
	@echo "  up        : Start the containers"
	@echo "  down      : Stop and remove the containers"
	@echo "  restart   : Restart the containers"
	@echo "  logs      : Show the logs of the containers"
	@echo "  help      : Show this help message"