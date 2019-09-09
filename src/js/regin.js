(function ($) {

    class regin {
        constructor() {
            this.phonevalue = $('.phonevalue');
            this.passvalue = $('.passvalue');
            this.codevalue = $('.codevalue');
            this.sub = $('.in');
            this.pbox = $('.pnone i');
            this.sbox = $('.pass i');
            this.cbox = $('.code i');
            this.hidebox = $('.hidebox');
            this.flog1 = false;
            this.floa2 = false;
            this.tishiname = $('.tishiphone');
            this.tishpass = $('.tishipass');
        }
        init() {
            //1:输入框样式
            let _this = this;
            this.phonevalue.focus(function () {
                $(this).attr('placeholder', '');
            });
            this.phonevalue.blur(function () {
                if ($(this).val() == '') {
                    $(this).attr('placeholder', '请输入您的手机号码');
                    _this.flog1 = false;
                } else {
                    let reg = new RegExp(/^1[3,5,9,8,4][0-9]{9}$/);
                    if (!reg.test(_this.phonevalue.val())) {
                        _this.tishiname.css('display', 'block');
                        _this.tishiname.html('手机格式错误');
                        _this.flog1 = false;
                    }
                    else {

                        $.ajax({
                            type: 'get',
                            url: 'http://10.31.157.53/html1907/suning/php/pass.php/',
                            data: {
                                usename: _this.phonevalue.val(),
                            }
                        }).done(function (data) {
                            console.log(data);
                           
                            if (data == 1) {
                                _this.tishiname.css('display', 'block');
                                _this.tishiname.html('用户名已存在');
                                _this.flog1 = false;
                               
                            }
                            else {
                               
                                 _this.tishiname.css('display', 'none');
                                _this.flog1 = true;
                               
                            }
                        })

                    }
                }
            });
            this.passvalue.focus(function () {
                $(this).attr('placeholder', '')

            });
            this.passvalue.blur(function () {
                if ($(this).val() == '') {
                    $(this).attr('placeholder', '请输入您的验证码');
                    _this.flog2 = false;
                }
                else {
                    _this.hidebox.css('display','block');
                    let leng = _this.passvalue.val().length;
                    if (leng < 6) {
                        _this.tishpass.css('display', 'block');
                        _this.tishpass.html('请输入6~20位数字 字母 特殊字符的密码');
                        _this.flog2 = false;
                    }
                    else {
                        // _this.tishpass.css('display','none');
                        // _this.flog2=true; 

                        let arry = _this.passvalue.val().split('');
                        let count = 0;
                        let mi = arry[0];
                        $.each(arry, function (index, value) {
                            if (mi != value) {
                                return false
                            }
                            mi = value;
                            count++;
                        });
                        console.log(count);
                        console.log(leng);
                        if (count == leng) {
                            _this.tishpass.css('display', 'block');
                            _this.tishpass.html('密码不能一直重复');
                            _this.flog2 = false;
                        }
                        else {
                            _this.tishpass.css('display', 'none');
                            _this.flog2 = true;
                        }

                    }
                }
            });
            this.codevalue.focus(function () {
                $(this).attr('placeholder', '')
            });
            this.codevalue.blur(function () {
                if ($(this).val() == '') {
                    $(this).attr('placeholder', '请输入您的密码')
                }
            });
            ////2:手机长度为11位数字
            this.phonevalue[0].oninput = function () {
                if (_this.phonevalue[0].value.length > 11) {
                    _this.phonevalue[0].value = _this.phonevalue[0].value.substring(0, 11);
                }
            }
            ///3:密码长度以及密码安全长度验证   
            this.passvalue[0].oninput = function () {
                if (_this.passvalue[0].value.length > 11) {
                    _this.passvalue[0].value = _this.passvalue[0].value.substring(0, 20);
                
                }
                let num = 0; //记录字符串中字符的种类
                let numreg = /\d+/;
                let uppercase = /[A-Z]+/;
                let lowercase = /[a-z]+/;
                let othercase = /[\W\_]+/;

                console.log(this.value);
                if (numreg.test(this.value)) {
                    num++;
                }
                if (uppercase.test(this.value)) {
                    num++;
                }
                if (lowercase.test(this.value)) {
                    num++;
                }
                if (othercase.test(this.value)) {
                    num++;
                }

                switch (num) {
                    case 1:
                        _this.hidebox.find('span:eq(1)').css('background', '#f60');

                        break;
                    case 2:
                    case 3:
                        _this.hidebox.find('span:eq(2)').css('background', '#f60');

                        break;
                    case 4:
                        _this.hidebox.find('span:eq(3)').css('background', '#f60');
                        break;

                }
            };
            this.sub.on('click', function () {
                console.log(_this.flog2);
                console.log(_this.flog1);
                if(_this.passvalue.val()==''||_this.phonevalue.val()==''){
                    alert('账号或密码不能为空');
                }
               else if (_this.flog1 && _this.flog2) {
                   alert('注册成功，正在跳转登录页面');
                    $.ajax({
                        type: 'get',
                        url: 'http://10.31.157.53/html1907/suning/php/regin.php/',
                        data: {
                            usename: _this.phonevalue.val(),
                            password: _this.passvalue.val()
                        }
                    });
                    location.href = 'http://10.31.157.53/html1907/suning/src/html/login.html'

                }

            })

        }

    }
    new regin().init()
})(jQuery)