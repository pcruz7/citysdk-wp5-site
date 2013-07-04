#!/bin/sh

echo '=================='
echo 'Compressing'
echo `java -jar yuicompressor-2.4.7.jar -v -o .js$:.min.js *.js`
echo '=================='
echo 'Concate compressed'
echo `touch jquery.citysdk-tourism.min.js`
echo `cat jquery.citysdk-tourism.datareader.min.js jquery.citysdk-tourism.stub.min.js jquery.citysdk-tourism.uritemplate.min.js`>jquery.citysdk-tourism.min.js
echo `mv jquery.citysdk-tourism.min.js ..`
echo '=================='
echo 'Cleaning up'
echo `rm jquery.citysdk-tourism.datareader.min.js jquery.citysdk-tourism.stub.min.js jquery.citysdk-tourism.uritemplate.min.js`
