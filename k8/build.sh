#!/bin/bash
buildTest()
{
    echo 'build test'
}
buildProd()
{
    echo 'build prod'
}

if [ "$1" == "prod" ]; then
    buildProd
else
    buildTest
fi
