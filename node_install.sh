#!/bin/bash

sudo apt-get update && sudo apt-get upgrade
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb

node -v
npm -v

echo DONE
