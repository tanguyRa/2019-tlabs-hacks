# What is this repository? #
It is used to create a local instance of a composer blockchain in your browser.

# What do I need ? #
 - docker

# How to use it ? #
## for a basic playground in your browser: ##
 - `make playground` starts a hyperledger-composer playground within a docker container at port 8080.
 - Open your favorite web browser and go to localhost:8080
 - Click on the `let's blockchain` button to start using the composer playground
 - Proceed to `deploy a new business` network (big empty tile with a + in the middle)
 - In section 2, use the third option for tour business network definition: Upload your own.
 - Upload composer-demo.bna. You don't need to pay attention to any of the other fields in the form.

## for a more hands-on approach: ##
See the Makefile
