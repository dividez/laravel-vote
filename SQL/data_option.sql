/*
Navicat MySQL Data Transfer

Source Server         : vagrant
Source Server Version : 50716
Source Host           : localhost:3306
Source Database       : vote

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2016-12-25 21:15:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for data_option
-- ----------------------------
DROP TABLE IF EXISTS `data_option`;
CREATE TABLE `data_option` (
  `guid` char(32) NOT NULL COMMENT '投票选项表',
  `vote_guid` char(32) NOT NULL,
  `admin_guid` char(32) NOT NULL,
  `option` varchar(255) NOT NULL COMMENT '选项内容表',
  `number` int(10) DEFAULT '0' COMMENT '此选项对应的投票数量',
  PRIMARY KEY (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of data_option
-- ----------------------------
INSERT INTO `data_option` VALUES ('0d23ed0aca9811e68fee080027bac1bb', '0d1ff6faca9811e6ae0a080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '爽', '2');
INSERT INTO `data_option` VALUES ('0d2424c8ca9811e69320080027bac1bb', '0d1ff6faca9811e6ae0a080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '开心', '0');
INSERT INTO `data_option` VALUES ('0d2479e6ca9811e69175080027bac1bb', '0d1ff6faca9811e6ae0a080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '表示不知道说什么好', '1');
INSERT INTO `data_option` VALUES ('0d2483c8ca9811e69457080027bac1bb', '0d1ff6faca9811e6ae0a080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '累', '1');
INSERT INTO `data_option` VALUES ('87b1768cca9d11e6a43c080027bac1bb', '87ada7faca9d11e6b229080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '24小时不能重复评论', '2');
INSERT INTO `data_option` VALUES ('87b426acca9d11e6b286080027bac1bb', '87ada7faca9d11e6b229080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '24小时不能重复评论', '3');
INSERT INTO `data_option` VALUES ('87b42e0eca9d11e69bbe080027bac1bb', '87ada7faca9d11e6b229080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '24小时不能重复评论', '1');
INSERT INTO `data_option` VALUES ('87b43444ca9d11e6923a080027bac1bb', '87ada7faca9d11e6b229080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '24小时不能重复评论', '1');
INSERT INTO `data_option` VALUES ('c41c23e6caa311e6ba05080027bac1bb', 'c4185ef0caa311e69833080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', 'qwe多选1', '2');
INSERT INTO `data_option` VALUES ('c41c5a1ecaa311e682ae080027bac1bb', 'c4185ef0caa311e69833080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', 'qwe多选2', '2');
INSERT INTO `data_option` VALUES ('c41c60c2caa311e68e2d080027bac1bb', 'c4185ef0caa311e69833080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', 'qwe多选3', '2');
INSERT INTO `data_option` VALUES ('c41cbee6caa311e68047080027bac1bb', 'c4185ef0caa311e69833080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', 'qwe多选4', '2');
INSERT INTO `data_option` VALUES ('ea37f808ca8911e69142080027bac1bb', 'ea3338e0ca8911e6b7d4080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '北京天气怎么样？1', '2');
INSERT INTO `data_option` VALUES ('ea3a9130ca8911e6ade6080027bac1bb', 'ea3338e0ca8911e6b7d4080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '北京天气怎么样？2', '4');
INSERT INTO `data_option` VALUES ('ea3a9838ca8911e6b298080027bac1bb', 'ea3338e0ca8911e6b7d4080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '北京天气怎么样？3', '2');
INSERT INTO `data_option` VALUES ('ea3a9e5aca8911e69d50080027bac1bb', 'ea3338e0ca8911e6b7d4080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '北京天气怎么样？4', '1');
INSERT INTO `data_option` VALUES ('ea3aa44aca8911e6aa3b080027bac1bb', 'ea3338e0ca8911e6b7d4080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '北京天气怎么样？5', '1');
SET FOREIGN_KEY_CHECKS=1;
