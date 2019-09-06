(function ($) {

  class login {
    constructor() {
      this.usename = $('.username input');
      this.password = $('.password input');
      this.submi = $('.commit');
      this.smao = $('.login-top span:eq(0)');
      this.denglu = $('.login-top span:eq(1)');
      this.pic = $('.pic');
      this.hidep = $('.pp');
      this.weix=$('.pic img:eq(0)');
      this.cat=$('.pic img:eq(1)');
      this.tishi = $('.tishi');
      this.span = $('.tishi span');

    }
    init() {
      let _this = this;
      this.smao.on('click', function () {
        _this.hidep.css('display', 'none');
        _this.pic.css('display', 'block');
      });
      this.denglu.on('click', function () {
        _this.hidep.css('display', 'block');
        _this.pic.css('display', 'none');
      });
      this.usename.focus(function () {
        $(this).attr('placeholder', '');
      });
      this.usename.blur(function () {
        if ($(this).val() == '') {
          $(this).attr('placeholder', '用户名/手机/邮箱');
        }
      });
      
      this.usename[0].oninput = function () {
        if ($(this).val().length > 11) {
          $(this)[0].value = $(this)[0].value.substring(0, 11);//11位密码长度
        }
      };

      this.password.focus(function () {
        $(this).attr('placeholder', '');
      });
      this.password[0].oninput = function () {
        if ($(this).val().length > 20) {
          $(this)[0].value = $(this)[0].value.substring(0, 20);//20位密码长度
        }
      };
      this.password.blur(function () {
        if ($(this).val() == '') {
          $(this).attr('placeholder', '密码');
        }
      });
      this.submi.on('click', function () {
        if (_this.usename.val() == '' || _this.password.val() == "") {
          _this.tishi.css('display', 'block');
          _this.span.html('用户名或密码不能为空')
        }
        else if (_this.password.val().length < 6) {
          _this.tishi.css('display', 'block');
          _this.span.html('请输入6~20位密码');
        }
        else {

          $.ajax({
            type: 'get',
            url: 'http://10.31.157.53/html1907/suning/php/login.php/',
            data: {
              usename: _this.usename.val(),
              password: _this.password.val()
            }
          }).done(function (data) {
            console.log(data);
            if (data == 1) {
              location.href = 'http://10.31.157.53/html1907/suning/src/html/';
            }
            else {
              _this.tishi.css('display', 'block');
              _this.span.html('用户名或密码错误');
            }
          })
        }
      });
       this.pic.hover(function(){
          _this.weix.stop().animate({
            left:20
          },function(){
               _this.cat.css('display','block')
          });
       
       },function(){
        _this.cat.css('display','none');
        _this.weix.stop().animate({
          left:141
        })
       })
    }

  }
  new login().init();
})(jQuery)