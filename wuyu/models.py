from django.db import models

# 用户信息表
class Users(models.Model):
    uid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=64)
    password = models.CharField(max_length=64)
    # null=True 数据库中字段可以为空
    sex = models.CharField(max_length=12, null=True, default='男')
    grade = models.CharField(max_length=12, null=True, default="")
    telephone = models.CharField(max_length=12, null=True, default="")
    dorm = models.CharField(max_length=12, null=True, default="")
    user_logo = models.CharField(max_length=64, null=True, default='/static/images/usericon/4.jpg')

    class Meta:
        # 设置数据表名
        db_table = 'users'

    def __str__(self):
        # 设置Models.objects.all()输出的格式
        return '%s_%s_%s_' % (self.uid, self.username, self.user_logo)

# 商品信息表
class Goods(models.Model):
    gid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=64)
    type = models.CharField(max_length=64)
    # logo = models.ImageField(upload_to='static/images/goods/')
    logo = models.CharField(max_length=255)
    info = models.CharField(max_length=64)
    details = models.CharField(max_length=64)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    uid = models.ForeignKey('Users', to_field='uid', on_delete=models.CASCADE)

    class Meta:
        # 设置数据表名
        db_table = 'goods'


# 订单表
class Orders(models.Model):
    oid = models.AutoField(primary_key=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    count = models.IntegerField(max_length=11)
    datetime = models.DateTimeField()
    region = models.CharField(max_length=64)
    gid = models.ForeignKey('Goods', to_field='gid', on_delete=models.CASCADE)
    uid = models.ForeignKey('Users', to_field='uid', on_delete=models.CASCADE)

    class Meta:
        # 设置数据表名
        db_table = 'orders'


# 购物车表
class Shopcarts(models.Model):
    sid = models.AutoField(primary_key=True)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    count = models.IntegerField(max_length=11)
    gid = models.ForeignKey('Goods', to_field='gid', on_delete=models.CASCADE)
    uid = models.ForeignKey('Users', to_field='uid', on_delete=models.CASCADE)

    class Meta:
        # 设置数据表名
        db_table = 'shopcarts'


# 收藏表
class Collections(models.Model):
    cid = models.AutoField(primary_key=True)
    gid = models.ForeignKey('Goods', to_field='gid', on_delete=models.CASCADE)
    uid = models.ForeignKey('Users', to_field='uid', on_delete=models.CASCADE)

    class Meta:
        # 设置数据表名
        db_table = 'collections'
