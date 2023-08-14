/*
 Navicat Premium Data Transfer

 Source Server         : xxoo
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : 127.0.0.1:3306
 Source Schema         : it666

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 30/08/2020 12:11:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for oauths
-- ----------------------------
DROP TABLE IF EXISTS `oauths`;
CREATE TABLE `oauths`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `access_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `provider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uid` int(0) NOT NULL,
  `user_id` int(0) NOT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uid`(`uid`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `oauths_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of oauths
-- ----------------------------
INSERT INTO `oauths` VALUES (1, '0bc65e5f8cf068741fb7c5bfd093eabb7512dc9b', 'github', 4397619, 4, '2020-08-11 15:04:19', '2020-08-11 15:04:19');

-- ----------------------------
-- Table structure for rights
-- ----------------------------
DROP TABLE IF EXISTS `rights`;
CREATE TABLE `rights`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `rights_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rights_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rights_state` tinyint(1) NULL DEFAULT 1,
  `rights_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rights_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `pid` int(0) NULL DEFAULT NULL,
  `level` int(0) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `rights_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `rights_name`(`rights_name`) USING BTREE,
  INDEX `rights_desc`(`rights_desc`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 72 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rights
-- ----------------------------
INSERT INTO `rights` VALUES (42, '菜单权限', '是否可以使用特定菜单', 1, 'menu', '', 0, 0, '2020-08-22 16:10:46', '2020-08-30 11:32:39', '');
INSERT INTO `rights` VALUES (43, '用户管理', '用户管理菜单', 1, 'menu', '', 42, 1, '2020-08-22 16:11:05', '2020-08-22 16:11:05', '');
INSERT INTO `rights` VALUES (44, '用户列表', '用户列表菜单', 1, 'menu', '/users', 43, 2, '2020-08-22 16:11:30', '2020-08-22 16:11:38', '');
INSERT INTO `rights` VALUES (45, '权限管理', '是否可以使用权限管理菜单', 1, 'menu', '', 42, 1, '2020-08-22 16:12:06', '2020-08-22 16:14:00', '');
INSERT INTO `rights` VALUES (46, '角色列表', '角色列表菜单', 1, 'menu', '/roles', 45, 2, '2020-08-22 16:13:11', '2020-08-22 16:14:08', '');
INSERT INTO `rights` VALUES (47, '权限列表', '权限列表菜单', 1, 'menu', '/rights', 45, 2, '2020-08-22 16:16:55', '2020-08-22 16:16:55', '');
INSERT INTO `rights` VALUES (48, '路由权限', '是否可以使用特定路由', 1, 'router', '/welcome', 0, 0, '2020-08-22 16:19:01', '2020-08-28 12:47:37', '');
INSERT INTO `rights` VALUES (49, '用户管理', '用户管理路由', 1, 'router', '', 48, 1, '2020-08-22 16:19:22', '2020-08-22 16:19:22', '');
INSERT INTO `rights` VALUES (50, '用户列表', '用户列表路由', 1, 'router', '/users', 49, 2, '2020-08-22 16:19:43', '2020-08-22 16:19:43', '');
INSERT INTO `rights` VALUES (51, '权限管理', '权限管理路由', 1, 'router', '', 48, 1, '2020-08-22 16:20:01', '2020-08-22 16:20:01', '');
INSERT INTO `rights` VALUES (52, '角色列表', '角色列表路由', 1, 'router', '/roles', 51, 2, '2020-08-22 16:20:18', '2020-08-22 16:20:18', '');
INSERT INTO `rights` VALUES (53, '权限列表', '权限列表路由', 1, 'router', '/rights', 51, 2, '2020-08-22 16:20:36', '2020-08-22 16:20:36', '');
INSERT INTO `rights` VALUES (54, '请求权限', '是否可以发送特定请求', 1, 'action', '', 0, 0, '2020-08-22 16:22:45', '2020-08-22 16:22:45', 'all');
INSERT INTO `rights` VALUES (55, '用户列表', '用户列表相关请求', 1, 'action', '', 54, 1, '2020-08-22 16:30:03', '2020-08-22 16:30:03', 'all');
INSERT INTO `rights` VALUES (56, '获取用户', '用户用户请求', 1, 'action', '/api/v1/users', 55, 2, '2020-08-22 16:30:29', '2020-08-22 16:30:29', 'get');
INSERT INTO `rights` VALUES (57, '创建用户', '创建用户请求', 1, 'action', '/api/v1/users', 55, 2, '2020-08-22 16:30:44', '2020-08-22 16:30:44', 'post');
INSERT INTO `rights` VALUES (58, '更新用户', '更新用户请求', 1, 'action', '/api/v1/users', 55, 2, '2020-08-22 16:31:03', '2020-08-22 16:31:03', 'put');
INSERT INTO `rights` VALUES (59, '删除用户', '删除用户请求', 1, 'action', '/api/v1/users', 55, 2, '2020-08-22 16:31:20', '2020-08-22 16:31:20', 'delete');
INSERT INTO `rights` VALUES (60, '角色列表', '角色列表相关请求', 1, 'action', '', 54, 1, '2020-08-22 16:31:44', '2020-08-22 16:31:44', 'all');
INSERT INTO `rights` VALUES (61, '获取角色', '获取角色请求', 1, 'action', '/api/v1/roles', 60, 2, '2020-08-22 16:32:13', '2020-08-22 16:32:13', 'get');
INSERT INTO `rights` VALUES (62, '创建角色', '创建角色请求', 1, 'action', '/api/v1/roles', 60, 2, '2020-08-22 16:32:28', '2020-08-22 16:32:28', 'post');
INSERT INTO `rights` VALUES (63, '删除角色', '删除角色请求', 1, 'action', '/api/v1/roles', 60, 2, '2020-08-22 16:32:42', '2020-08-22 16:32:42', 'delete');
INSERT INTO `rights` VALUES (64, '更新角色', '更新角色请求', 1, 'action', '/api/v1/roles', 60, 2, '2020-08-22 16:32:57', '2020-08-22 16:32:57', 'put');
INSERT INTO `rights` VALUES (65, '权限列表', '权限列表相关请求', 1, 'action', '', 54, 1, '2020-08-22 16:33:27', '2020-08-22 16:33:27', 'all');
INSERT INTO `rights` VALUES (66, '获取权限', '获取权限请求', 1, 'action', '/api/v1/rights', 65, 2, '2020-08-22 16:33:53', '2020-08-22 16:33:53', 'get');
INSERT INTO `rights` VALUES (67, '删除权限', '删除权限请求', 1, 'action', '/api/v1/rights', 65, 2, '2020-08-22 16:34:07', '2020-08-22 16:34:07', 'delete');
INSERT INTO `rights` VALUES (68, '创建权限', '创建权限请求', 1, 'action', '/api/v1/rights', 65, 2, '2020-08-22 16:34:23', '2020-08-22 16:34:23', 'post');
INSERT INTO `rights` VALUES (69, '更新权限', '更新全新请求', 1, 'action', '/api/v1/rights', 65, 2, '2020-08-22 16:34:39', '2020-08-22 16:34:39', 'put');
INSERT INTO `rights` VALUES (70, '分配角色', '分配角色请求', 1, 'action', '/api/v1/userrole', 55, 2, '2020-08-22 16:35:16', '2020-08-22 16:35:16', 'post');
INSERT INTO `rights` VALUES (71, '移出角色', '移出角色请求', 1, 'action', '/api/v1/userrole', 55, 2, '2020-08-22 16:35:30', '2020-08-22 16:35:30', 'delete');
INSERT INTO `rights` VALUES (72, '分配角色', '给用户分配角色', 1, 'action', '/api/v1/userrole', 55, 2, '2020-08-30 12:03:53', '2020-08-30 12:03:53', 'post');
INSERT INTO `rights` VALUES (73, '移出角色', '移出用户拥有的角色', 1, 'action', '/api/v1/userrole', 55, 2, '2020-08-30 12:04:23', '2020-08-30 12:04:23', 'delete');
INSERT INTO `rights` VALUES (74, '分配权限', '给角色分配权限', 1, 'action', '/api/v1/roleRights', 60, 2, '2020-08-30 12:04:56', '2020-08-30 12:04:56', 'post');
INSERT INTO `rights` VALUES (75, '移出权限', '移出角色拥有的权限', 1, 'action', '/api/v1/roleRights', 60, 2, '2020-08-30 12:05:28', '2020-08-30 12:05:36', 'delete');

-- ----------------------------
-- Table structure for role_rights
-- ----------------------------
DROP TABLE IF EXISTS `role_rights`;
CREATE TABLE `role_rights`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `role_id` int(0) NOT NULL,
  `rights_id` int(0) NOT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `role_rights_ibfk_1`(`role_id`) USING BTREE,
  INDEX `role_rights_ibfk_2`(`rights_id`) USING BTREE,
  CONSTRAINT `role_rights_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `role_rights_ibfk_2` FOREIGN KEY (`rights_id`) REFERENCES `rights` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 47 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_rights
-- ----------------------------
INSERT INTO `role_rights` VALUES (1, 1, 43, '2020-08-27 16:58:18', '2020-08-27 16:58:18');
INSERT INTO `role_rights` VALUES (2, 1, 42, '2020-08-27 16:58:18', '2020-08-27 16:58:18');
INSERT INTO `role_rights` VALUES (3, 2, 45, '2020-08-27 16:58:25', '2020-08-27 16:58:25');
INSERT INTO `role_rights` VALUES (4, 2, 46, '2020-08-27 16:58:25', '2020-08-27 16:58:25');
INSERT INTO `role_rights` VALUES (5, 2, 47, '2020-08-27 16:58:25', '2020-08-27 16:58:25');
INSERT INTO `role_rights` VALUES (6, 2, 42, '2020-08-27 16:58:25', '2020-08-27 16:58:25');
INSERT INTO `role_rights` VALUES (7, 1, 44, '2020-08-27 17:22:11', '2020-08-27 17:22:11');
INSERT INTO `role_rights` VALUES (8, 1, 45, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (9, 1, 46, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (10, 1, 47, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (11, 1, 48, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (12, 1, 49, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (13, 1, 50, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (14, 1, 51, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (15, 1, 52, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (16, 1, 53, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (17, 1, 54, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (18, 1, 55, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (19, 1, 56, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (20, 1, 57, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (21, 1, 58, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (22, 1, 59, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (23, 1, 70, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (24, 1, 71, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (25, 1, 60, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (26, 1, 61, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (27, 1, 62, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (28, 1, 63, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (29, 1, 64, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (30, 1, 65, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (31, 1, 66, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (32, 1, 67, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (33, 1, 68, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (34, 1, 69, '2020-08-28 10:55:54', '2020-08-28 10:55:54');
INSERT INTO `role_rights` VALUES (35, 2, 51, '2020-08-28 10:58:14', '2020-08-28 10:58:14');
INSERT INTO `role_rights` VALUES (36, 2, 52, '2020-08-28 10:58:14', '2020-08-28 10:58:14');
INSERT INTO `role_rights` VALUES (37, 2, 53, '2020-08-28 10:58:14', '2020-08-28 10:58:14');
INSERT INTO `role_rights` VALUES (38, 2, 48, '2020-08-28 10:58:14', '2020-08-28 10:58:14');
INSERT INTO `role_rights` VALUES (39, 2, 65, '2020-08-29 15:09:46', '2020-08-29 15:09:46');
INSERT INTO `role_rights` VALUES (40, 2, 66, '2020-08-29 15:09:46', '2020-08-29 15:09:46');
INSERT INTO `role_rights` VALUES (41, 2, 67, '2020-08-29 15:09:46', '2020-08-29 15:09:46');
INSERT INTO `role_rights` VALUES (42, 2, 68, '2020-08-29 15:09:46', '2020-08-29 15:09:46');
INSERT INTO `role_rights` VALUES (43, 2, 69, '2020-08-29 15:09:46', '2020-08-29 15:09:46');
INSERT INTO `role_rights` VALUES (44, 2, 54, '2020-08-29 15:09:47', '2020-08-29 15:09:47');
INSERT INTO `role_rights` VALUES (46, 2, 60, '2020-08-29 15:25:34', '2020-08-29 15:25:34');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role_state` tinyint(1) NULL DEFAULT 1,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `role_name`(`role_name`) USING BTREE,
  UNIQUE INDEX `role_desc`(`role_desc`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, '管理员', '啥都干的', 1, '2020-08-18 15:27:15', '2020-08-21 19:33:34');
INSERT INTO `roles` VALUES (2, '项目经理', '监工额', 1, '2020-08-18 15:27:15', '2020-08-18 15:27:15');
INSERT INTO `roles` VALUES (3, '产品经理', '吹牛的', 1, '2020-08-18 15:27:15', '2020-08-18 15:27:15');
INSERT INTO `roles` VALUES (4, '开发人员', '干活的', 1, '2020-08-18 15:27:15', '2020-08-18 16:31:07');

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sequelizemeta
-- ----------------------------
INSERT INTO `sequelizemeta` VALUES ('20200727060756-users.ts');
INSERT INTO `sequelizemeta` VALUES ('20200805090832-oauths.ts');
INSERT INTO `sequelizemeta` VALUES ('20200805092012-users.ts');
INSERT INTO `sequelizemeta` VALUES ('20200811064553-users.ts');
INSERT INTO `sequelizemeta` VALUES ('20200818013111-users.ts');
INSERT INTO `sequelizemeta` VALUES ('20200818051258-role.ts');
INSERT INTO `sequelizemeta` VALUES ('20200818051258-roles.ts');
INSERT INTO `sequelizemeta` VALUES ('20200818051309-userrole.ts');
INSERT INTO `sequelizemeta` VALUES ('20200820102707-rights.ts');
INSERT INTO `sequelizemeta` VALUES ('20200820102756-rolerights.ts');

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` int(0) NOT NULL,
  `role_id` int(0) NOT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO `user_roles` VALUES (2, 1, 2, '2020-08-18 18:51:32', '2020-08-18 18:51:32');
INSERT INTO `user_roles` VALUES (4, 5, 1, '2020-08-18 20:01:52', '2020-08-18 20:01:52');
INSERT INTO `user_roles` VALUES (5, 4, 4, '2020-08-18 20:02:35', '2020-08-18 20:02:35');
INSERT INTO `user_roles` VALUES (8, 1, 1, '2020-08-27 15:27:36', '2020-08-27 15:27:36');
INSERT INTO `user_roles` VALUES (9, 2, 2, '2020-08-28 10:56:22', '2020-08-28 10:56:22');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `github` tinyint(1) NULL DEFAULT 0,
  `user_state` tinyint(1) NOT NULL DEFAULT 1,
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '/public/avatar.png',
  `local` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE,
  UNIQUE INDEX `phone`(`phone`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 51 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'abc123', '97606813@qq.com', NULL, '5f236c1092868c216022ae0e301210d4', '2020-08-10 12:49:10', '2020-08-18 17:16:02', 0, 1, '/public/upload/7664fa9c16e76a3e02aca4df6dd276fa.jpg', 1);
INSERT INTO `users` VALUES (2, NULL, '97606814@qq.com', NULL, '5f236c1092868c216022ae0e301210d4', '2020-08-10 12:49:10', '2020-08-10 12:49:10', 0, 1, '/public/avatar.png', 1);
INSERT INTO `users` VALUES (3, NULL, NULL, '17301727164', '5f236c1092868c216022ae0e301210d4', '2020-08-10 12:49:10', '2020-08-10 12:49:10', 0, 1, '/public/avatar.png', 1);
INSERT INTO `users` VALUES (4, '5e686322-7eee-44b4-8133-fc4bb9247df5', '123@it666.com', NULL, '5f236c1092868c216022ae0e301210d4', '2020-08-11 15:04:19', '2020-08-11 15:04:19', 1, 1, '/public/avatar.png', 0);
INSERT INTO `users` VALUES (5, 'def456', NULL, NULL, '5f236c1092868c216022ae0e301210d4', '2020-08-18 15:27:15', '2020-08-21 17:37:57', 0, 1, '/public/avatar.png', 1);
INSERT INTO `users` VALUES (6, NULL, '976068123@qq.com', NULL, '5f236c1092868c216022ae0e301210d4', '2020-08-11 15:04:19', '2020-08-11 15:04:19', 0, 1, '/public/avatar.png', 1);
INSERT INTO `users` VALUES (7, NULL, NULL, '13554499123', '5f236c1092868c216022ae0e301210d4', '2020-08-11 15:04:19', '2020-08-11 15:04:19', 0, 1, '/public/avatar.png', 1);
INSERT INTO `users` VALUES (8, 'it666', 'lnj@it666.com', '13554499321', '5f236c1092868c216022ae0e301210d4', '2020-08-11 15:04:19', '2020-08-11 15:04:19', 0, 1, '/public/avatar.png', 1);
INSERT INTO `users` VALUES (9, 'lnj123', NULL, NULL, '5f236c1092868c216022ae0e301210d4', '2020-08-13 14:22:27', '2020-08-13 14:22:27', 0, 1, '/public/avatar.png', 1);
INSERT INTO `users` VALUES (10, 'it666123', NULL, NULL, '5f236c1092868c216022ae0e301210d4', '2020-08-17 16:14:44', '2020-08-17 16:14:44', 0, 1, '/public/avatar.png', 1);
INSERT INTO `users` VALUES (11, NULL, '97606888@qq.com', NULL, '5f236c1092868c216022ae0e301210d4', '2020-08-17 16:14:44', '2020-08-17 16:14:44', 0, 1, '/public/avatar.png', 1);
INSERT INTO `users` VALUES (12, NULL, NULL, '17301727666', '5f236c1092868c216022ae0e301210d4', '2020-08-17 16:14:44', '2020-08-17 16:14:44', 0, 1, '/public/avatar.png', 1);

SET FOREIGN_KEY_CHECKS = 1;
