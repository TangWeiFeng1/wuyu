import math
import os
from django.http import JsonResponse
from PIL import Image
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage

from django.http import HttpResponse

from django.shortcuts import render, redirect

from wuyu import settings

from wuyu.models import Users, Goods, Orders, Collections, Shopcarts


# 登录
def login(request):
    if request.POST:
        username = request.POST.get("username")
        password = request.POST.get("password")
        result = Users.objects.filter(username=username)
        if result:
            if password == result[0].password:
                uid = result[0].uid
                request.session['username'] = username
                request.session['uid'] = uid
                return redirect("/index/")
            else:
                # print("密码错误")
                return render(request, "login.html", {"msg": "密码错误"})
        else:
            # print("用户名不存在")
            return render(request, "login.html", {"msg": "用户名不存在"})
    return render(request, "login.html", {"msg": ""})


# 注册
def register(request):
    if request.POST:
        username = request.POST.get("reg_username")
        password = request.POST.get("reg_password")
        telephone = request.POST.get("telephone")
        dorm = request.POST.get("dorm")
        # 判断用户名重复
        if Users.objects.filter(username=username):
            return HttpResponse("用户名重复")
        else:
            user = Users.objects.create(uid=None, username=username, password=password, telephone=telephone, dorm=dorm)
            user.save()
    return render(request, "login.html", {"msg": ""})


# 首页
def index(request):
    # 退出登录
    if request.GET.get("logout"):
        request.session.flush()
    goods_list = Goods.objects.all().order_by('-gid')
    type_list = Goods.objects.raw('SELECT MIN(gid) AS gid, type FROM goods GROUP BY type')

    if request.GET.get("type"):
        goods_list = Goods.objects.filter(type=request.GET.get("type"))
    # 分页
    page = request.GET.get("page")
    if page:
        page = int(page)
    else:
        page = 1
    goods_list = goods_list[8 * (page - 1): 8 * page]
    # 动态生产页脚
    length = len(Goods.objects.all())
    # 向上取整
    length = math.ceil(length / 8)
    a_list = []
    for num in range(length):
        a_list.append(num + 1)
    if request.session.get("uid", 0):
        pass
    else:
        request.session["username"] = "登录"
    return render(request, "index.html", {"goods_list": goods_list, "a_list": a_list, "type_list": type_list})

# 商品信息页
def goods(request):
    # 查询对应商品信息
    if request.GET.get("gid"):
        gid = request.GET.get("gid")
        # 下架商品
        if request.GET.get("delete"):
            uid = request.GET.get("uid")
            Goods.objects.filter(gid=gid).delete()
            return redirect("/myGoods/?uid=%s" % uid)
            # 修改单个商品数据
        elif request.GET.get("update"):
            name = request.GET.get("name")
            price = request.GET.get("price")
            # 获取商品对象
            goods = Goods.objects.get(gid=gid)
            goods.name = name
            goods.price = float(price)
            # 修改完保存进数据库
            goods.save()
        goods = Goods.objects.filter(gid=gid)
        type = goods[0].type
        goods_list = Goods.objects.filter(type=type)
        return render(request, "goods.html", {"goods": goods[0], "goods_list": goods_list})
    # elif request.GET.get("update"):
    #     name = request.GET.get("name")
    #     price = int(request.GET.get("price"))
    #     gid = request.GET.get("gid")
    #     print("------------------------")
    #     print(gid)
    #     print('------------------------')
    #     # 获取商品对象
    #     goods = Goods.objects.get(gid=gid)
    #     goods.name = name
    #     goods.price = float(price)
    #     # 修改完保存进数据库
    #     goods.save()
    #     return redirect("/goods/?gid=" + gid)
    return render(request, "goods.html")


# 搜索页面
def search(request):
    goods_list = Goods.objects.all().order_by('-gid')
    # 分页
    page = request.GET.get("page")
    if page:
        page = int(page)
    else:
        page = 1
    goods_list = goods_list[6 * (page - 1): 6 * page]
    # 动态生产页脚
    length = len(Goods.objects.all())
    # 向上取整
    length = math.ceil(length / 6)
    a_list = []
    for num in range(length):
        a_list.append(num + 1)
    # 关键字搜索
    if request.GET.get("keyword"):
        keyword = request.GET.get("keyword")
        goods_list = Goods.objects.filter(name__contains=keyword)
        goods_list = goods_list[6 * (page - 1): 6 * page]
        # 动态生产页脚
        length = len(goods_list)
        # 向上取整
        length = math.ceil(length / 6)
        a_list = []
        for num in range(length):
            a_list.append(num + 1)
        return render(request, "search.html", {"goods_list": goods_list, "a_list": a_list})
    return render(request, "search.html", {"goods_list": goods_list, "a_list": a_list})


# 个人
def setting(request):
    global uid
    # 获取用户所有订单
    if request.GET.get("uid"):
        uid = request.GET.get("uid")
        # 修改信息
        if request.GET.get("update"):
            uid = request.GET.get("uid")
            name = request.GET.get("name")
            sex = request.GET.get("sex")
            grade = request.GET.get("grade")
            tel = request.GET.get("tel")
            dorm = request.GET.get("dorm")
            Users.objects.filter(uid=uid).update(username=name, sex=sex, grade=grade, telephone=tel, dorm=dorm)
            request.session['username'] = name
        # 原生sql
        orders_list = Orders.objects.raw(
            'select g.name,g.type,g.logo,o.oid,o.price,o.price,o.count,o.datetime,o.region,'
            'u.telephone from goods g join orders o on g.gid=o.gid_id join users u on '
            'u.uid=o.uid_id where o.uid_id=%s order by o.oid', [uid])
        # 查询用户信息
        user = Users.objects.filter(uid=uid)
        return render(request, "settings.html", {"user": user[0], "orders_list": orders_list})
    # 删除订单
    if request.GET.get("delete"):
        oid = request.GET.get("delete")
        Orders.objects.filter(oid=oid).delete()
        return redirect("/settings/?uid=%s" % uid)
    return redirect("/login/")


# 购物车
def shoppingCar(request):
    if request.GET.get("uid"):
        uid = request.GET.get("uid")
        global shop_list
        # 删除商品
        if request.GET.get("delete"):
            sid = request.GET.get("delete")
            Shopcarts.objects.filter(sid=sid).delete()
            return redirect('/shoppingCar/?uid=%s' % uid)
        # 清空购物车
        elif request.GET.get("delall"):
            Shopcarts.objects.filter(uid_id=uid).delete()
            return redirect('/shoppingCar/?uid=%s' % uid)
        # 添加进购物车
        elif request.GET.get("gid"):
            gid = request.GET.get("gid")
            goods = Goods.objects.filter(gid=gid)
            # print(goods)
            if goods[0]:
                shop = Shopcarts.objects.create(sid=None, subtotal=goods[0].price, count=1, gid_id=gid, uid_id=uid)
                shop.save()
            return redirect('/shoppingCar/?uid=%s' % uid)
        # 添加进订单
        elif request.GET.get("add"):
            date = request.GET.get("date")
            time = request.GET.get("time")
            region = request.GET.get("region")
            price = float(request.GET.get("price"))
            gid = request.GET.get("goods_id")
            datetime = date + '' + time
            date = datetime[1:11]
            time = datetime[13:18]
            datetime = date + ' ' + time
            Orders.objects.create(oid=None, price=price, count=1, datetime=datetime, region=region, gid_id=gid,
                                  uid_id=uid).save()
            # return redirect('/settings/?uid=%s' % uid)
        # 提交购物车，产生订单
        elif request.GET.get("save") and len(shop_list):
            date = request.GET.get("date")
            time = request.GET.get("time")
            region = request.GET.get("region")
            price_list = request.GET.get("price_list")
            amount_list = request.GET.get("amount_list")
            datetime = date + '' + time
            date = datetime[1:11]
            time = datetime[13:18]
            datetime = date + ' ' + time
            price_list = price_list.split(',')
            amount_list = amount_list.split(',')
            p_list = []
            a_list = []
            for i in range(len(price_list) - 1):
                # print('------------------------')
                # print(price_list[i])
                # print('--------------------------')
                p_list.append(float(price_list[i]))
                a_list.append(int(amount_list[i]))
            i = 0
            for order in shop_list:
                Orders.objects.create \
                    (oid=None, price=price_list[i], count=amount_list[i], datetime=datetime, region=region,
                     gid_id=order.gid_id, uid_id=order.uid_id).save()
                i = i + 1
            return redirect('/shoppingCar/?uid=%s&delall=1' % uid)
        # 查询购物车列表
        else:
            shop_list = Shopcarts.objects.raw('select g.name,g.logo,g.price,g.info,s.sid,s.subtotal,s.count,s.gid_id,'
                                              's.uid_id '
                                              'from shopcarts s join goods g on s.gid_id=g.gid join users u on '
                                              'u.uid=s.uid_id where s.uid_id=%s order by s.sid' % uid)
            return render(request, "shoppingCar.html", {"shop_list": shop_list})

    # 删除选中商品
    elif request.method == 'POST':
        carts = request.POST.getlist("carts")
        print("---------------")
        print(carts)
        for sid in carts:
            Shopcarts.objects.filter(sid=sid).delete()
        return HttpResponse("ok")
    return redirect('/login/')


# 收藏
def collection(request):
    # 获取收藏列表
    if request.GET.get("uid"):
        uid = request.GET.get("uid")
        if request.GET.get("gid"):
            Collections.objects.create(cid=None, gid_id=request.GET.get("gid"), uid_id=uid).save()
            return redirect("/collection/?uid=%s" % uid)
        # 原生sql
        goods_list = Goods.objects.raw(
            'select c.gid_id,c.cid,g.gid,g.name,g.type,g.logo,g.info,g.details,g.price,'
            'g.uid_id from goods g join collections c on c.gid_id=g.gid join '
            'users u on c.uid_id=u.uid where c.uid_id=%s order by c.cid', [uid])

        # 分页
        length = len(goods_list)
        page = request.GET.get("page")
        if page:
            page = int(page)
        else:
            page = 1
        goods_list = goods_list[6 * (page - 1): 6 * page]
        # 动态生产页脚

        # 向上取整
        length = math.ceil(length / 6)
        a_list = []
        for num in range(length):
            a_list.append(num + 1)

        # 删除收藏商品
        if request.GET.get("delete"):
            cid = request.GET.get("delete")
            Collections.objects.filter(cid=cid).delete()
            cuid = request.GET.get("uid")
            return redirect('/collection/?uid=%s' % uid)

        return render(request, "collection.html", {"goods_list": goods_list, "a_list": a_list})
    return redirect('/login/')


# 上传商品
def addGoods(request):
    if request.GET.get("uid"):
        uid = request.GET.get("uid")
        goods_list = Goods.objects.raw("select goods.gid, goods.type from goods")
        if request.GET.get("upload"):
            name = request.POST.get("name")
            # 获取图片
            image = request.FILES.get("image")
            # 判断大小
            if 1000 < image.size < 20480000:
                # 保存到项目静态目录下
                path = default_storage.save(str(settings.BASE_DIR) + '/static/images/goods/' + image.name,
                                            ContentFile(image.read()))
            else:
                # 图片大小不符合处理
                print("图片大小不符合")

            type = request.POST.get("type")
            price = request.POST.get("price")
            info = request.POST.get("info")
            details = request.POST.get("details")
            Goods.objects.create(gid=None, name=name, type=type, logo="/" + path, info=info, details=details,
                                 price=price, uid_id=uid)
            return redirect("/myGoods/?uid=%s" % uid)
        return render(request, "addGoods.html", {"goods_list": goods_list})
    return redirect("/login/")


# 我的商品
def myGoods(request):
    if request.GET.get('uid'):
        uid = request.GET.get('uid')
        goods_list = Goods.objects.filter(uid_id=uid).order_by('-gid')
        length = len(goods_list)
        # print(goods_list)
        # 分页
        page = request.GET.get("page")
        if page:
            page = int(page)
        else:
            page = 1
        goods_list = goods_list[6 * (page - 1): 6 * page]
        # 动态生产页脚
        # 向上取整
        length = math.ceil(length / 6)
        a_list = []
        for num in range(length):
            a_list.append(num + 1)
        return render(request, "myGoods.html", {"goods_list": goods_list, "a_list": a_list})
    return redirect("/login/")


# 修改订单
def orderModify(request):
    if request.GET.get("uid"):
        uid = request.GET.get("uid")
        oid = request.GET.get("oid")
        # 修改订单信息
        if request.GET.get("oupdate"):
            date = request.GET.get("date")
            time = request.GET.get("time")
            region = request.GET.get("region")
            # 日期时间格式化
            datetime = date + '' + time
            date = datetime[1:11]
            time = datetime[13:18]
            datetime = date + ' ' + time
            # 修改数据库
            orders = Orders.objects.get(oid=oid)
            orders.datetime = datetime
            orders.region = region
            orders.save()
            return redirect("/settings/?uid=%s" % uid)
        # 取消订单
        elif request.GET.get("delete"):
            Orders.objects.filter(oid=oid).delete()
            return redirect("/settings/?uid=%s" % uid)
        return render(request, "orderModify.html", {"uid": uid, "oid": oid})
    return redirect("/login/")
