CREATE DATABASE IF NOT EXISTS `userservice`;
GRANT ALL ON `userservice`.* TO 'bibliouser'@'%';
CREATE DATABASE IF NOT EXISTS `commentservice`;
GRANT ALL ON `commentservice`.* TO 'bibliouser'@'%';
