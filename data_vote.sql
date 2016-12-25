/*
Navicat MySQL Data Transfer

Source Server         : vagrant
Source Server Version : 50716
Source Host           : localhost:3306
Source Database       : vote

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2016-12-25 21:15:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for data_vote
-- ----------------------------
DROP TABLE IF EXISTS `data_vote`;
CREATE TABLE `data_vote` (
  `guid` char(32) NOT NULL COMMENT '用户投票表',
  `admin_guid` char(32) NOT NULL COMMENT '发布用户guid',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `description` varchar(255) NOT NULL COMMENT '描述',
  `radio` tinyint(2) NOT NULL DEFAULT '1' COMMENT '单选或者多选',
  `iplimit` varchar(255) DEFAULT NULL COMMENT 'ip限制 null不限制 12小时之内 24小时之内  48小时之内',
  `addtime` int(11) NOT NULL COMMENT '添加时间',
  `startTime` int(11) NOT NULL COMMENT '开始时间',
  `endTime` int(11) DEFAULT NULL COMMENT '结束时间',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '1正常 2 删除 ',
  PRIMARY KEY (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of data_vote
-- ----------------------------
INSERT INTO `data_vote` VALUES ('0d1ff6faca9811e6ae0a080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '圣诞节过得怎么样？？', '今天是2016年12月25日19:47:18，圣诞节大伙一起码代码？感觉怎么样呢?', '1', '12', '1482666508', '1480636800', '1482681600', '1');
INSERT INTO `data_vote` VALUES ('87ada7faca9d11e6b229080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '24小时不能重复评论', '24小时不能重复评论24小时不能重复评论24小时不能重复评论24小时不能重复评论24小时不能重复评论', '1', '24', '1482668861', '1480550400', '1483056000', '1');
INSERT INTO `data_vote` VALUES ('c4185ef0caa311e69833080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', 'qwe多选', 'qwe多选qwe多选qwe多选qwe多选qwe多选qwe多选', '2', '48', '1482671539', '1480550400', '1483142400', '1');
INSERT INTO `data_vote` VALUES ('ea3338e0ca8911e6b7d4080027bac1bb', 'e759ebc8ca6b11e6bad4080027bac1bb', '北京天气怎么样？', '北京天气怎么样？北京天气怎么样？北京天气怎么样？北京天气怎么样？北京天气怎么样？', '1', '0', '1482660436', '1480550400', '1482681600', '1');
SET FOREIGN_KEY_CHECKS=1;
