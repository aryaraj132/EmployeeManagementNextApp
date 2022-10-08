#!/bin/bash

sudo docker rm next_app_cont -f

id=$(sudo docker images next_app -q)

sudo docker build --rm -t next_app .

sudo docker run -dp 3000:3000 --name next_app_cont next_app

new_id=$(sudo docker images next_app -q)

if [ $id == $new_id ]
    then
    sudo docker rmi $(sudo docker images --filter "dangling=true" -q)
    else
    sudo docker image rm $id
    sudo docker rmi $(sudo docker images --filter "dangling=true" -q)
fi
