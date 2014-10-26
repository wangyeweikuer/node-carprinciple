#!/bin/bash
# 1)从数据库中获取种子
# 2)如果种子是列表页，则分析出详情列表，并插入到表中，形成新的种子;
# 3)如果种子是详情页，则获取其中的内容部分，及类型中去，并增加到principle中去；
# 4)对页面中的地址做变换，替换成最新的地址
# 4)对页面内容做内容提取，并提取其中的图片资源；
while [ 1 = 1 ]
do
	url=`node getNewFeed.js`
	name=''
	if [ -z "$url" ]
	then 
	  echo "finished";
	  exit 0;
	else
	  name=${url##*/}
	  rm -f tmp/$name
	  curl $url | iconv -f "gb2312" -t "utf8" | sed -e "s/gb2312/utf8/g" > tmp/$name 
	fi
	node parser.js tmp/$name
done
