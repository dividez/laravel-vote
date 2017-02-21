/*
Navicat MySQL Data Transfer

Source Server         : vagrant
Source Server Version : 50716
Source Host           : localhost:3306
Source Database       : vote

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2016-12-25 21:15:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for data_admin
-- ----------------------------
DROP TABLE IF EXISTS `data_admin`;
CREATE TABLE `data_admin` (
  `guid` char(32) NOT NULL COMMENT '登陆表',
  `name` varchar(50) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(36) NOT NULL COMMENT '邮箱',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '状态：2锁定，1正常',
  `addtime` int(11) DEFAULT NULL,
  `ip` char(20) NOT NULL,
  PRIMARY KEY (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of data_admin
-- ----------------------------
INSERT INTO `data_admin` VALUES ('e759ebc8ca6b11e6bad4080027bac1bb', 'admin', '301faf779b657aed239629a414d039cb', '123@qq.com', '1', '1482647547', '192.168.33.1');
SET FOREIGN_KEY_CHECKS=1;
