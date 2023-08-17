$(document).ready(function ($) {


var vue = new Vue({
    el: '#app',
    data: function () {
      return {
        visible: false,
        drawer: false,
        direction: 'rtl',
        imageList: [
          { "id": '/goods/?gid=3', idView: "/static/images/goods/imac-pro_a6VAtjc.jpg" },
          { "id": '/goods/?gid=5', idView: "/static/images/goods/t2.png" },
          { "id": '/goods/?gid=4', idView: "/static/images/goods/t3.png" }
        ]
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  })

  // 商品分类
  $(".classify").click(function(){
    $(this).css("display", "none");
    $(".classification").css("display", "block");
  })
  $(".close_classification").click(function(){
    $(".classification").css("display", "none");
    $(".classify").css("display", "block");
  })

  $(".classify_li").click(function(){
    var type = $(this).text();
    location.href = "/index/?type="+type;
  })

  //轮播图点击事件
//  $(".img_goods").click(function(){
//    console.log(vue.imageList);
//
////    location.href = "http://localhost:8000/goods/?gid=3";
//  })
 })
