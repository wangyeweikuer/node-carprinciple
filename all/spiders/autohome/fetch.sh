#!/bin/bash
if [ $# != 2 ]
then
   echo Need two parameters!
   exit 1;
fi
curl $1 | iconv -f "gb2312" -t "utf8" | sed -e "s/gb2312/utf8/g" > $2
