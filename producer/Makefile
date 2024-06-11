# Variables
REPO = gabrielfsil
IMAGE = producer
VERSION_FILE = VERSION
DOCKERFILE_PATH = docker/Dockerfile
BUILD_CONTEXT = .

# Read the version from the VERSION file
VERSION = $(shell cat $(VERSION_FILE))

# Define the build, tag, and push targets
.PHONY: all build tag push increment_version

all: build tag push

build:
	docker build -t $(REPO)/$(IMAGE):latest -f $(DOCKERFILE_PATH) $(BUILD_CONTEXT)

tag: increment_version
	docker tag $(REPO)/$(IMAGE):latest $(REPO)/$(IMAGE):$(VERSION)

push:
	docker push $(REPO)/$(IMAGE):latest
	docker push $(REPO)/$(IMAGE):$(VERSION)

increment_version:
	$(eval NEW_VERSION=$(shell echo $(VERSION) | awk -F. '{print $$1"."$$2"."$$3+1}'))
	echo $(NEW_VERSION) > $(VERSION_FILE)