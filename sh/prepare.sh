#!/bin/bash
PHP=`which php`

echo "======= install composer ========"
composer install
echo "==== install node module ====="
yarn install
echo "====== install the react part ======="
cd assets/react-part
yarn install
echo "====== compile the assets part ======="
cd ../../
yarn encore dev