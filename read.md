# 部署手册

python3.6+Django3.2.15+MySQL5.7

1.安装django

​	pip install django==3.2.15

2.安装MySQL

​	[安装Navicat]

​	新建shoppingmall数据库，默认utf8

3.解压文件，用pycharm打开

4.安装pymysql

​	pip intsall pymysql

5.修改settings.py

​	找到DATABASES配置项，PORT修改为3306，用户名和密码修改为本地MySQL对应的用户名密码

6.删除migrations文件夹

7.生产迁移文件,创建数据库

​	python manage.py makemigrations wuyu

​	python manage.py migrate wuyu

8.导入数据

​	在Navicat中连接数据库并选中shoppingmall，右击运行项目下的sql文件

9.运行

​	python manage.py runserver localhost:8000

10.登录

​	用户名：admin

​	密码：123456

11.问题

​	我的商品修改功能，无法获取对应gid	

​	轮播图进入对应商品页面