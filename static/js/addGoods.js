$(document).ready(function(){

  var v = new Vue({
    el: '#app',
    data: function () {
      return {
        form: {
          name: '',
          price: '',
          info: '',
          gtype: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
      methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  })

  // 上传
//  var logo;
//  $(".upload-demo").change(function(){
//    logo = $(this).val();
////     logo = document.getElementById("upload_btn").files[0].name;
//     alert("logo="+logo);
//  })
//
//  $(".upload").click(function(){
//    var name = v.form.name;
//    var type = v.form.gtype;
//    var price = v.form.price;
//    var info = v.form.info;
//    var desc = v.form.desc;
//    var uid = $(".uid").text();
//    var url = "/addGoods/";
//    $.get(url,{"upload":1,"uid":uid,"name":name, "logo":logo, "type": type, "price":price, "info":info, "desc":desc},
//    function(result){
//       location.href = "/myGoods/?uid="+uid;
//    })
//  })
})