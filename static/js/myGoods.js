$(document).ready(function(){
var vue = new Vue({
    el: '#app',
    data: function () {
      return {
        visible: false,
         name: '',
         price: '',
         goodsId: '',
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
      }
    }
  })

  $(".confirm").on("click", function(){
//    获取修改信息
    var name = vue.name;
    var price = vue.price;
    var gid = vue.goodsId;
//    var gid = $(this).next().text();
//    alert("gid="+gid);
//   判断是否修改信息，没填为默认值
//    if(name==''){name=}
//    发起请求
    $.ajax({
      type:'get',
      contentType : false,
	  processData : false,
	  url: '/goods/?gid='+gid+'&update=1&name='+name+'&price='+price,
	  success: function(result){
	    location.href = '/goods/?gid='+gid;
	  }
    })
//    $.get('/goods/', {'gid':gid, 'update':1, 'name':name, 'price':price},function(result){
//
//    })
  })
})