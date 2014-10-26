##droptable
DROP TABLE IF EXISTS `principle`;

##createtable
CREATE TABLE IF NOT EXISTS `principle` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `originalUrl` varchar(255) NOT NULL UNIQUE,
  `status` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

##findAll
select id,name,category from principle;

##findById
select * from principle where id = ${id}

##findByUrl
select * from principle where originalUrl = ${url}

##create
insert into principle (name,category,content,originalUrl) 
values (${name},${category},${content},${originalUrl})
