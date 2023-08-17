$(document).ready(function () {

  var v = new Vue({
    el: '#app',
    data: function () {
      return {
        centerDialogVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    }
  })

  $(".save").click(function(){
    window.event.returnValue = false;
    date = v.form.date1;
    time = v.form.date2;
    region = v.form.region;
    var price = $(".buy").text().substring(8);
    var uid = $("#uid").text();
    var gid = $("#gid").text();
    var url = '/shoppingCar/';
    $.get(url,{'add':1,'uid':uid,'goods_id':gid,'date':date, 'time':time, 'region':region, 'price':price},
    function(result){
        location.href = '/settings/?uid='+uid;
    });
  })

})