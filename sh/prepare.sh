#!/bin/bash
PHP=`which php`

echo "======= install composer ========"
composer install
echo "==== install node module ====="
yarn install