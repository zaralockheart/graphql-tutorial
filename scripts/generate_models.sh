#!/bin/bash

source .env
typeorm-model-generator -h localhost -d $DATABASE_NAME -u $USERNAME -x $PASSWORD -e $DATABASE -o ./src -s