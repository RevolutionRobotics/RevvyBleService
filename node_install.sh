#!/bin/bash

sudo apt-get update && sudo apt-get upgrade
wget -O - https://raw.githubusercontent.com/audstanley/NodeJs-Raspberry-Pi/master/Install-Node.sh | sudo bash
sudo node-install -v 8.11.3

node -v
npm -v

echo DONE
