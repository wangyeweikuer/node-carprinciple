##getNewFeed
SELECT * from principle_feed where status = 0 order by id limit 1

##findByUrl
select * from principle_feed where url = ${url}

##createByUrl
insert into principle_feed (url) values(${url})

##finish
update principle_feed set status = 1 where url = ${url}