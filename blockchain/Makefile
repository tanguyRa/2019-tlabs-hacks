# Makefile for HyperLedger Composer PoCs
#
# The following commands allow for easy testing and prototyping with Hyperledger-Composer:
#
# `make playground` starts a hyperledger-composer playground within a docker container at port 8080
# You will need to use the graphical interface to upload (copy/paste) the different files
#
# `make stop-playground` stops and cleans the container used for running the playground
#
# `make start` starts a hyperledger-fabric blockchain locally with a single peer.
# It also create a business network archive from hyperledger-composer code and deploy it to the fabric blockchain.
#
# `make stop` stops the fabric blockchain and the development environment used to compile the composer chaincode.
#
# `make clean` remove any temporary files and leftovers for a clean environment.
#
# For a more in-depth understanding, feel free to explore and play with the development environment and its associated make commands


# path variables
orgapath = fabric-dev-servers/fabric-scripts/hlfv12/composer/crypto-config/peerOrganizations
cryptopath = $(orgapath)/org1.example.com/users/Admin@org1.example.com/msp

# higher order functions
.PHONY: playground stop-playground start stop clean
# kill and remove docker containers
.PHONY: stop-fabric clean-fabric stop-dev
# docker operation, commonly used in dev mode
.PHONY: fabric composer dev build connect rec clean-dev
.PHONY: build-business-archive create-network-card deploy instantiate import-admin server

# basic composer playground to interact and test composer business network
playground:
	docker run --name seed-playground --publish 8080:8080 hyperledger/composer-playground
stop-playground:
	-docker kill $$(docker ps -aq --filter "name=seed-playground" --format="{{.ID}}")
	-docker rm $$(docker ps -aq --filter "name=seed-playground" --format="{{.ID}}")


# simple all-in-one commands:
start: fabric composer
stop: stop-dev stop-fabric
clean: clean-fabric clean-dev


# fabric simple network to deploy business network archive
fabric:
	export FABRIC_VERSION=hlfv12
	export MSYS_NO_PATHCONV=1
	src/fabric-dev-servers/startFabric.sh
stop-fabric:
	src/fabric-dev-servers/stopFabric.sh
	src/fabric-dev-servers/teardownFabric.sh
clean-fabric:
	-docker rm $$(docker ps -aq --filter "name=dev-peer0.org1.example.com-seed*" --format="{{.ID}}")
	-docker rmi $$(docker ps -aq --filter "name=dev-peer0.org1.example.com-seed*" --format="{{.ID}}")
# deploy a business network archive on fabric
composer: dev build-business-archive create-network-card deploy instantiate import-admin


# a development environment to run and test business network without the need to install anything locally
dev: build
	docker container run -d \
		-v $(PWD)/src\:/home/composer \
		-v /var/run/docker.sock:/var/run/docker.soc \
		--network composer_default \
		--name seed-dev \
		-p 3000:3000 \
		seed/dev \
		sleep 100000
npm-install:
	docker exec -t seed-dev bash -c "npm install --prefix seed/"
npm-test:
	docker exec -t seed-dev bash -c "npm run test --prefix seed/"
stop-dev:
	-docker kill $$(docker ps -aq --filter "name=seed-dev" --format="{{.ID}}")
	-docker rm $$(docker ps -aq --filter "name=seed-dev" --format="{{.ID}}")
# dev environment lifecycle
build:
	docker image build -t seed/dev .
	-docker network create --driver bridge composer_default
connect:
	docker exec -it seed-dev bash
rec: stop-dev dev connect
clean-dev:
	-rm src/seed@0.0.1.bna
	-rm src/admin@seed.card
	-rm src/PeerAdmin@seed.card
# deploying composer to fabric
build-business-archive:
	-docker exec seed-dev \
		composer archive create -t dir -n seed
create-network-card:
	docker exec seed-dev \
		composer card create \
		-p DevServer_connection.json \
		-u PeerAdmin \
		-c $(cryptopath)/admincerts/Admin@org1.example.com-cert.pem \
		-k $(cryptopath)/keystore/114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk \
		-r PeerAdmin -r ChannelAdmin
	-docker exec seed-dev \
		composer card import -f PeerAdmin@seed.card
deploy:
	docker exec seed-dev \
		composer network install -c PeerAdmin@seed -a seed@0.0.1.bna
instantiate:
	docker exec seed-dev \
		composer network start \
		--networkName seed \
		--networkVersion 0.0.1 \
		-A admin \
		-S adminpw \
		-c PeerAdmin@seed
import-admin:
	-docker exec seed-dev \
		composer card import -f admin@seed.card
# deploying a REST server
server:
	docker exec seed-dev \
		composer-rest-server
