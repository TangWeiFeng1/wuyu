$(document).ready(function ($) {
  var uid = $.cookie("uid");
  // if (uid == null) {
  //   location.href = '/login/';
  // }

  new Vue({
    el: '#app',
    data: function () {
      return {
        visible: false,
        dialogVisible: false,
        outerVisible: false,
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  })

// 修改用户信息
  $("#modify_btn").click(function(){
    window.event.returnValue = false;
    var uid = $("#s_uid").text();
//    获取修改信息
    var name = $(".name").val();
    if (name.length > 6){
        alert("用户名长度为1~6个字符");
        location.href = "/settings/?uid="+uid;
    }
    else{
        var gender = $(".gender").val();
        var grade = $(".grade").val();
        var tel = $(".tel").val();
        var dorm = $(".dormitory").val();
    //    判断是否修改信息，没填为默认值
        if(name==''){name=$(".uname").text();}
        if(gender==''){gender=$(".gen").text();}
        if(grade==''){grade=$(".gra").text();}
        if(tel==''){tel=$('.tele').text();}
        if(dorm==''){dorm=$('.dor').text();}
        var url = "http://localhost:8000/settings/";
    //    发起请求
        $.get(url, {'uid':uid, 'update':1, 'name':name, 'sex':gender, 'grade':grade, 'tel':tel, 'dorm':dorm},function(result){
            location.href = '/settings/?uid='+uid;
        })
    }

  })

    // 修改订单信息
 $(".order_modify").on("click", function(){
  var uid = $("#s_uid").text();
  var oid = $(this).siblings(".oid").text();

  location.href = "/orderModify/?uid="+uid+"&oid="+oid;
 })

})

