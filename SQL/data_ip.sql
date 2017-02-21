/*
Navicat MySQL Data Transfer

Source Server         : vagrant
Source Server Version : 50716
Source Host           : localhost:3306
Source Database       : vote

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2016-12-25 21:15:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for data_ip
-- ----------------------------
DROP TABLE IF EXISTS `data_ip`;
CREATE TABLE `data_ip` (
  `guid` char(32) NOT NULL COMMENT '每一条投票记录guid',
  `addtime` int(11) NOT NULL,
  `option_guid` char(32) NOT NULL COMMENT '投票选项内容',
  `ip` char(32) NOT NULL COMMENT '投票者ip地址',
  `vote_guid` char(32) NOT NULL COMMENT '投票guid',
  PRIMARY KEY (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of data_ip
-- ----------------------------
INSERT INTO `data_ip` VALUES ('136574a4ca9811e6b16f080027bac1bb', '1482666519', '0d23ed0aca9811e68fee080027bac1bb', '192.168.33.2', '0d1ff6faca9811e6ae0a080027bac1bb');
INSERT INTO `data_ip` VALUES ('16fc5f2cca9511e688c0080027bac1bb', '1482665236', 'ea37f808ca8911e69142080027bac1bb', '192.168.33.2', 'ea3338e0ca8911e6b7d4080027bac1bb');
INSERT INTO `data_ip` VALUES ('17e176c2ca9811e69beb080027bac1bb', '1482666526', '0d23ed0aca9811e68fee080027bac1bb', '192.168.33.2', '0d1ff6faca9811e6ae0a080027bac1bb');
INSERT INTO `data_ip` VALUES ('1bec8c50caa411e68d24080027bac1bb', '1482671687', 'c41c23e6caa311e6ba05080027bac1bb', '192.168.33.1', 'c4185ef0caa311e69833080027bac1bb');
INSERT INTO `data_ip` VALUES ('1bece48ecaa411e6b13f080027bac1bb', '1482671687', 'c41c5a1ecaa311e682ae080027bac1bb', '192.168.33.1', 'c4185ef0caa311e69833080027bac1bb');
INSERT INTO `data_ip` VALUES ('1becf30ccaa411e6b9da080027bac1bb', '1482671687', 'c41c60c2caa311e68e2d080027bac1bb', '192.168.33.1', 'c4185ef0caa311e69833080027bac1bb');
INSERT INTO `data_ip` VALUES ('1bed043ccaa411e6b895080027bac1bb', '1482671687', 'c41cbee6caa311e68047080027bac1bb', '192.168.33.1', 'c4185ef0caa311e69833080027bac1bb');
INSERT INTO `data_ip` VALUES ('205f36a8ca9e11e6843b080027bac1bb', '1482669117', '87b426acca9d11e6b286080027bac1bb', '192.168.33.2', '87ada7faca9d11e6b229080027bac1bb');
INSERT INTO `data_ip` VALUES ('27f9d340caa411e6a5d8080027bac1bb', '1482671707', '87b1768cca9d11e6a43c080027bac1bb', '192.168.33.1', '87ada7faca9d11e6b229080027bac1bb');
INSERT INTO `data_ip` VALUES ('2bacc6b4caa411e6ad8b080027bac1bb', '1482671713', 'c41c23e6caa311e6ba05080027bac1bb', '192.168.33.1', 'c4185ef0caa311e69833080027bac1bb');
INSERT INTO `data_ip` VALUES ('2bad2c3acaa411e6b3bf080027bac1bb', '1482671713', 'c41c5a1ecaa311e682ae080027bac1bb', '192.168.33.1', 'c4185ef0caa311e69833080027bac1bb');
INSERT INTO `data_ip` VALUES ('2bad3c84caa411e6a442080027bac1bb', '1482671713', 'c41c60c2caa311e68e2d080027bac1bb', '192.168.33.1', 'c4185ef0caa311e69833080027bac1bb');
INSERT INTO `data_ip` VALUES ('2bada00ccaa411e6b5d5080027bac1bb', '1482671713', 'c41cbee6caa311e68047080027bac1bb', '192.168.33.1', 'c4185ef0caa311e69833080027bac1bb');
INSERT INTO `data_ip` VALUES ('3784ac82ca9e11e6bd64080027bac1bb', '1482669156', '87b426acca9d11e6b286080027bac1bb', '192.168.33.1', '87ada7faca9d11e6b229080027bac1bb');
INSERT INTO `data_ip` VALUES ('3afc8ba8ca9611e6a204080027bac1bb', '1482665726', 'ea3a9838ca8911e6b298080027bac1bb', '192.168.33.2', 'ea3338e0ca8911e6b7d4080027bac1bb');
INSERT INTO `data_ip` VALUES ('3eb11138ca9611e6be85080027bac1bb', '1482665732', 'ea3a9e5aca8911e69d50080027bac1bb', '192.168.33.2', 'ea3338e0ca8911e6b7d4080027bac1bb');
INSERT INTO `data_ip` VALUES ('406f7faaca9611e6879f080027bac1bb', '1482665735', 'ea3a9130ca8911e6ade6080027bac1bb', '192.168.33.2', 'ea3338e0ca8911e6b7d4080027bac1bb');
INSERT INTO `data_ip` VALUES ('434089b8ca9611e6b72f080027bac1bb', '1482665740', 'ea3aa44aca8911e6aa3b080027bac1bb', '192.168.33.2', 'ea3338e0ca8911e6b7d4080027bac1bb');
INSERT INTO `data_ip` VALUES ('450ff0daca9611e69084080027bac1bb', '1482665743', 'ea3a9130ca8911e6ade6080027bac1bb', '192.168.33.2', 'ea3338e0ca8911e6b7d4080027bac1bb');
INSERT INTO `data_ip` VALUES ('4a5aab16ca9611e6a79b080027bac1bb', '1482665752', 'ea3a9838ca8911e6b298080027bac1bb', '192.168.33.2', 'ea3338e0ca8911e6b7d4080027bac1bb');
INSERT INTO `data_ip` VALUES ('4c6eeb9cca9611e6af6e080027bac1bb', '1482665755', 'ea3a9130ca8911e6ade6080027bac1bb', '192.168.33.2', 'ea3338e0ca8911e6b7d4080027bac1bb');
INSERT INTO `data_ip` VALUES ('584eaa76caa311e6a134080027bac1bb', '1482671359', '87b426acca9d11e6b286080027bac1bb', '192.168.33.1', '87ada7faca9d11e6b229080027bac1bb');
INSERT INTO `data_ip` VALUES ('5a7ef814caa311e68a2b080027bac1bb', '1482671362', '87b42e0eca9d11e69bbe080027bac1bb', '192.168.33.1', '87ada7faca9d11e6b229080027bac1bb');
INSERT INTO `data_ip` VALUES ('5e629068caa211e6b4e1080027bac1bb', '1482670939', '0d2483c8ca9811e69457080027bac1bb', '192.168.33.1', '0d1ff6faca9811e6ae0a080027bac1bb');
INSERT INTO `data_ip` VALUES ('64c95440caa311e68534080027bac1bb', '1482671380', '87b43444ca9d11e6923a080027bac1bb', '192.168.33.1', '87ada7faca9d11e6b229080027bac1bb');
INSERT INTO `data_ip` VALUES ('82db8584caa311e6a846080027bac1bb', '1482671430', '0d2479e6ca9811e69175080027bac1bb', '192.168.33.1', '0d1ff6faca9811e6ae0a080027bac1bb');
INSERT INTO `data_ip` VALUES ('9c09e81eca9611e681a7080027bac1bb', '1482665889', 'ea3a9130ca8911e6ade6080027bac1bb', '192.168.33.2', 'ea3338e0ca8911e6b7d4080027bac1bb');
INSERT INTO `data_ip` VALUES ('dbf835faca9d11e68d4c080027bac1bb', '1482669003', '87b1768cca9d11e6a43c080027bac1bb', '192.168.33.2', '87ada7faca9d11e6b229080027bac1bb');
INSERT INTO `data_ip` VALUES ('e2d00456ca9411e689ed080027bac1bb', '1482665149', 'ea37f808ca8911e69142080027bac1bb', '192.168.33.2', 'ea3338e0ca8911e6b7d4080027bac1bb');
SET FOREIGN_KEY_CHECKS=1;
