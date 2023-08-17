$(document).ready(function () {

  //检查验证码是否正确
  function validateCode() {
  //获取显示区生成的验证码
  var checkCode = document.getElementById("checkCode").innerHTML;
  //获取输入的验证码
  var inputCode = document.getElementById("inputCode").value;
    var flag = false;
  if (inputCode.length <= 0) {
//    alert("请输入验证码！");
  }
  else if (inputCode.toUpperCase() != checkCode.toUpperCase()) {
//    alert("验证码输入有误！");
    createCode(4);
  }
  else {
//    alert("验证码正确！");
    return true;
  }
}


  //生成验证码的方法
  function createCode(length) {
  var code = "";
  var codeLength = parseInt(length); //验证码的长度
  var checkCode = document.getElementById("checkCode");
  // 所有候选组成验证码的字符，当然也可以用中文的
  var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
  //循环组成验证码的字符串
  for (var i = 0; i < codeLength; i++) {
    //获取随机验证码下标
    var charNum = Math.floor(Math.random() * 62);
    //组合成指定字符验证码
    code += codeChars[charNum];
  }
  if (checkCode) {
    //为验证码区域添加样式名
    checkCode.className = "code";
    //将生成验证码赋值到显示区
    checkCode.innerHTML = code;
  }
}

  createCode(4);
  // 注册校验
  var flag = 0;
  var f1, f2, f3, f4, f5;
  // 1.用户名长度在1~6个字符
  // 鼠标失去焦点事件
  $("#reg_username").blur(function () {
    var username = $(this).val();
    var len = username.length;
    // 判断字符串长度,jquery中对象.length获取长度
    if (len < 1 || len > 6) {
      $(".reg_name").text("用户名有误").css("color", "red");
      f1 = 0;
    } else { f1 = 1; $(".reg_name").text("长度在1~6个字符").css("color", "gray");}
  })
  // 2.密码长度在6~12个字符，包括数字、字母
  $("#reg_password").blur(function(){
    var password = $(this).val();
    var len = password.length;
    // 正则匹配
    var regular = /^[A-Za-z0-9]+$/;
    if (len<6 || len>12){
    $(".reg_pwd").text("密码输入有误").css("color","red");
    f2 = 0;
      this.blur();
    }else if(!regular.exec(password)){
//      alert("密码只能包含英文和数字");
      $(".reg_pwd").text("密码只能包含英文和数字").css("color","red");
      this.blur();
    }else{ f2 = 1; $(".reg_pwd").text("长度在6~12个字符内，数字，字母").css("color", "gray")}
  })
  // 3.确认密码
  $("#reg_password2").blur(function(){
    var password = $("#reg_password").val();
    var password2 = $(this).val();
    if (password!=password2){
    $(".reg_pwd2").text("确认密码输入有误").css("color","red");
    f3 = 0;
      this.blur();
    }else{ f3 = 1; $(".reg_pwd2").text("再次输入密码").css("color", "gray")}
  })
  // 4.手机号码
  $("#telephone").blur(function(){
    var regular = /^1\d{10}$/;
    var telephone = $(this).val();
    if(!regular.exec(telephone)){
      $(".telephone").text("请输入正确的手机号").css("color","red");
    }else{ f5 = 1; $(".telephone").text("请输入手机号").css("color","gray");}
  })
  $(".code").click(function(){
    createCode(4);
  })
   $(".changeCode").click(function(){
    createCode(4);
  })
  // 导航栏点击首页
  $(".navigation").click(function () {
    window.event.returnValue = false;
    window.location.href = "/index/";
  })
  $(".collection").click(function () {
    window.event.returnValue = false;
    alert("请先登录");
    window.location.href = "/login/";
  })

  $("#inputCode").blur(function(){
    $(".changeCode").text("看不清换一张").css("color","#288BC4");
    f4 = validateCode();
    if (!f4){
        $(".changeCode").text("验证码有误").css("color","red");
        createCode(4);
    }
  })

  // 注册用户
  $("#register_btn").click(function () {
    if (f1==1 && f2==1 && f3==1 && f4==1 && f5==1) {
      flag = 1;
      var reg_username = $("#reg_username").val();
      var reg_password = $("#reg_password").val();
      var telephone = $("#telephone").val();
      var dorm = $("#dorm").val();
      $.post("/register/", {"reg_username": reg_username, "reg_password": reg_password, "telephone":telephone, "dorm":dorm}, function(result){
        if(result=="用户名重复"){
          alert(result);
        }else{
          alert("注册成功");
        }
        location.href = "/login/";
      })
    }
    if (!flag) {
      alert("请完成表单");
    }
  })

})