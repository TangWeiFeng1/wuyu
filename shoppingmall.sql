/*
 Navicat Premium Data Transfer

 Source Server         : MySQL5.7
 Source Server Type    : MySQL
 Source Server Version : 50729
 Source Host           : localhost:3307
 Source Schema         : shoppingmall

 Target Server Type    : MySQL
 Target Server Version : 50729
 File Encoding         : 65001

 Date: 06/02/2023 18:40:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for collections
-- ----------------------------
DROP TABLE IF EXISTS `collections`;
CREATE TABLE `collections`  (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `gid_id` int(11) NOT NULL,
  `uid_id` int(11) NOT NULL,
  PRIMARY KEY (`cid`) USING BTREE,
  INDEX `collections_gid_id_ec5d7405_fk_goods_gid`(`gid_id`) USING BTREE,
  INDEX `collections_uid_id_0264bfc4_fk_users_uid`(`uid_id`) USING BTREE,
  CONSTRAINT `collections_gid_id_ec5d7405_fk_goods_gid` FOREIGN KEY (`gid_id`) REFERENCES `goods` (`gid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `collections_uid_id_0264bfc4_fk_users_uid` FOREIGN KEY (`uid_id`) REFERENCES `users` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of collections
-- ----------------------------
INSERT INTO `collections` VALUES (2, 9, 1);
INSERT INTO `collections` VALUES (3, 8, 1);
INSERT INTO `collections` VALUES (4, 3, 1);
INSERT INTO `collections` VALUES (5, 5, 1);

-- ----------------------------
-- Table structure for django_migrations
-- ----------------------------
DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE `django_migrations`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_migrations
-- ----------------------------
INSERT INTO `django_migrations` VALUES (1, 'wuyu', '0001_initial', '2022-12-24 07:50:13.572778');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `gid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `type` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `logo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `info` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `details` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `uid_id` int(11) NOT NULL,
  PRIMARY KEY (`gid`) USING BTREE,
  INDEX `goods_uid_id_208fbb90_fk_users_uid`(`uid_id`) USING BTREE,
  CONSTRAINT `goods_uid_id_208fbb90_fk_users_uid` FOREIGN KEY (`uid_id`) REFERENCES `users` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (3, '电视机', '电子商品', '/static/images/goods/imac-pro_v4n9J94.jpg', '好用，实惠，大品牌', '这是一个电视机', 288.00, 1);
INSERT INTO `goods` VALUES (4, 'U盘', '电子商品', '/static/images/goods/t3_HbR6ZQM.png', '金士顿32g，白色，全新包装，限量发售', '这是一个U盘', 58.00, 1);
INSERT INTO `goods` VALUES (5, '1', '电子商品', '/static/images/goods/t2_ZBfehxV.png', '索尼音响，蝰蛇音效，远程蓝牙连接', '这是一个音响', 1.00, 1);
INSERT INTO `goods` VALUES (6, '水杯', '生活用品', '/static/images/goods/tj2_tA16VaR.jpg', '水杯的参数', '这是一个水杯', 28.00, 1);
INSERT INTO `goods` VALUES (7, '咖啡', '食品', '/static/images/goods/tj1_i8EkYfC.jpg', '没毒的咖啡', '这是咖啡', 66.00, 1);
INSERT INTO `goods` VALUES (8, '太阳镜', '生活用品', '/static/images/goods/tj6_5FnGnpQ.jpg', '暴龙眼镜，参数', '这是一副眼镜', 88.00, 1);
INSERT INTO `goods` VALUES (9, '充电宝', '电子商品', '/static/images/goods/t1_g8XgZcP.png', '爱马仕充电宝，10w快充', '这是个充电宝', 388.00, 1);
INSERT INTO `goods` VALUES (11, '手机', '电子商品', '/static/images/goods/phone01.jpg', '这是一个手机', '非常好用', 11.00, 1);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `oid` int(11) NOT NULL AUTO_INCREMENT,
  `price` decimal(10, 2) NOT NULL,
  `count` int(11) NOT NULL,
  `datetime` datetime(6) NOT NULL,
  `region` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gid_id` int(11) NOT NULL,
  `uid_id` int(11) NOT NULL,
  PRIMARY KEY (`oid`) USING BTREE,
  INDEX `orders_gid_id_f9c8a230_fk_goods_gid`(`gid_id`) USING BTREE,
  INDEX `orders_uid_id_9b7f6984_fk_users_uid`(`uid_id`) USING BTREE,
  CONSTRAINT `orders_gid_id_f9c8a230_fk_goods_gid` FOREIGN KEY (`gid_id`) REFERENCES `goods` (`gid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_uid_id_9b7f6984_fk_users_uid` FOREIGN KEY (`uid_id`) REFERENCES `users` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (2, 388.00, 1, '2023-02-24 18:10:00.000000', '枣园', 9, 1);

-- ----------------------------
-- Table structure for shopcarts
-- ----------------------------
DROP TABLE IF EXISTS `shopcarts`;
CREATE TABLE `shopcarts`  (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `subtotal` decimal(10, 2) NOT NULL,
  `count` int(11) NOT NULL,
  `gid_id` int(11) NOT NULL,
  `uid_id` int(11) NOT NULL,
  PRIMARY KEY (`sid`) USING BTREE,
  INDEX `shopcarts_gid_id_5ded728e_fk_goods_gid`(`gid_id`) USING BTREE,
  INDEX `shopcarts_uid_id_3dff5c7d_fk_users_uid`(`uid_id`) USING BTREE,
  CONSTRAINT `shopcarts_gid_id_5ded728e_fk_goods_gid` FOREIGN KEY (`gid_id`) REFERENCES `goods` (`gid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `shopcarts_uid_id_3dff5c7d_fk_users_uid` FOREIGN KEY (`uid_id`) REFERENCES `users` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sex` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `grade` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `telephone` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dorm` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_logo` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '111111', '男', '大大大大', '15676586548', '菊园', '/static/images/usericon/4.jpg');

SET FOREIGN_KEY_CHECKS = 1;
