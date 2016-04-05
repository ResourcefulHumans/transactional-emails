.DEFAULT_GOAL := help
.PHONY: help build

build: emails/*.json emails/templates/*.* build-emails.js ## Build email templates
	mkdir -p build
	node build-emails.js

help: ## (default), display the list of make commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
