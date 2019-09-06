(function ($) {
    class creatlist {
        constructor() {
            this.arrysid = [];
            this.arrynum = [];
            this.parentbox = $('.contain-cart');
            this.allch=$('.allch');
            this.allpirce=$('.allpirce');  
        }
        init() {
            let _this=this;
            if (getcookie('cookiesid') && getcookie('cookienum')) {//判断cook是否存在
                this.arrysid = getcookie('cookiesid').split(','); //cookie商品的sid  
                this.arrynum = getcookie('cookienum').split(','); //cookie商品的num
                this.startcreat();//创建元素
                console.log(this.allch);
                this.allch.on('click',function(){
                    _this.allcheckevent();    
                });
               this.parentbox.on('click','.bit',function(){
                    _this.check1($(this));
                    _this.jisuan();
               })
            }
        }
        startcreat() {
            let _this = this;
            $.each(this.arrysid, function (index, value) {
                console.log(index);
                $.ajax({
                    url: 'http://10.31.157.53/html1907/suning/php/items.php/',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id: value
                    }
                }).done(function (data) {
                    //   _this.clonebox=_this.hidelement.clone(true,true);
                    //   _this.clonebox.find('img').attr('src',data.url);
                    //   _this.clonebox.find('.title5').html(data.title);
                    //   _this.clonebox.find('.pirce').html(data.price);
                    //   _this.clonebox.find('.zpirce').html(_this.arrynum[index]*data.price);
                    //   _this.clonebox.find('.num').val(_this.arrynum[index]);
                    //    _this.parentbox.append(_this.clonebox);

                    _this.parentbox.html(`${_this.parentbox.html()}
                   <div class="item-cartis" sid=${data.sid}>
                   <div class="cart-left">
                       <img src=${data.url} alt="">
                       <span class="title5">${data.title}</span>
                   </div>
                   <div class="cart-right">
                       <i>￥</i><span class="pirce">${data.price}</span><em class="jian">-</em><input type="text" class="num" value=${_this.arrynum[index]}><em class="add1">+</em>
                   </div>
                   <div class="cart-pire">
                       <i>￥</i><span class="zpirce">${_this.arrynum[index] * data.price}</span>
                   </div>
                     <div class="cart-buttom"><ul>
                         <li><span>移入关注</span></li>
                         <li sid=${data.sid} class="delete">删除</li>
                         <li>查找关注</li>
                     </ul></div>
                   <input type="checkbox" class="bit">
             </div>`);
                    _this.deletevalue();//绑定事件
                })
            });

        }
        deletevalue() {
            let _this = this;
            this.loss = $('.jian');
            this.add1 = $('.add1');
            this.delete = $('.delete');
            console.log(this.arrynum)  ;        
            this.loss.on('click', function () {
                let num = $(this).siblings('.num').val();

                if (num <= 0) {
                    $(this).siblings('.num').val(0);

                }
                else {
                    $(this).siblings('.num').val(`${num - 1}`)
                };
                // console.log( $(this).parent('.cart-right').siblings('.cart-pire').find('.zpirce'));
                $(this).parent('.cart-right').siblings('.cart-pire').find('.zpirce').html($(this).siblings('.num').val() * $(this).siblings('.pirce').html());
                 let sid=$(this).parents('.item-cartis').attr('sid');
                  _this.arrynum[$.inArray(sid,_this.arrysid)]= $(this).siblings('.num').val();
                  addcookie('cookienum', _this.arrynum.toString(), 10); //数组存入cookie
                 console.log(_this.arrynum);
                //  console.log($(this).parent().siblings('.bit').prop('checked'));
                    if($(this).parent().siblings('.bit').prop('checked')){
                        let hp=parseInt(_this.allpirce.html());
                        let hy=parseInt($(this).parent('.cart-right').siblings('.cart-pire').find('.zpirce').html());
                        _this.allpirce.html(hp-hy);
                    }     
            });
            this.add1.on('click', function () {

                let num = parseInt($(this).siblings('.num').val());

                if (num <= 0) {

                    $(this).siblings('.num').val(0);
                    num = 0;
                    $(this).siblings('.num').val(`${num + 1}`)
                }
                else {
                    $(this).siblings('.num').val(`${num + 1}`)
                }
                $(this).parent('.cart-right').siblings('.cart-pire').find('.zpirce').html($(this).siblings('.num').val() * $(this).siblings('.pirce').html());
                let sid=$(this).parents('.item-cartis').attr('sid');
                _this.arrynum[$.inArray(sid,_this.arrysid)]= $(this).siblings('.num').val();
                addcookie('cookienum', _this.arrynum.toString(), 10); //数组存入cookie
               console.log(_this.arrynum);
               if($(this).parent().siblings('.bit').prop('checked')){
                let hp=parseInt(_this.allpirce.html());
                let hy=parseInt($(this).parent('.cart-right').siblings('.cart-pire').find('.zpirce').html());
                _this.allpirce.html(hp+hy);
            }   
            });

            this.delete.on('click', function () {
                console.log(_this.arrysid);
                console.log(_this.arrynum);
                let sid = $(this).attr('sid');
                $(this).parents('.item-cartis').remove();
                _this.arrysid.splice($.inArray(sid, _this.arrysid), 1);
                _this.arrynum.splice($.inArray(sid, _this.arrysid), 1);
                console.log(_this.arrysid);
                console.log(_this.arrynum);
                addcookie('cookiesid', _this.arrysid.toString(), 10); //数组存入cookie
                addcookie('cookienum', _this.arrynum.toString(), 10); //数组存入cookie
            })

        }
        allcheckevent(){
            if(this.allch.prop('checked')){
                this.parentbox.find('input').prop('checked',true); 
                 this.cmallpirce()
            }
            else{
                this.parentbox.find('input').prop('checked',false); 
               this.allpirce.html(0);
            }
        }
        cmallpirce(){
            let _this=this;
            let price=0;
            let m=this.parentbox.find('.zpirce');
             m.each(function(index,ele){
                 price+=parseInt($(ele).html());
             })
               this.allpirce.html(price);
        }
        check1(obj){
            let m=this.parentbox.find('.item-cartis').length;
            let g=this.parentbox.find(':checked').length;
            console.log(m);
            console.log(g);
             
             if(m==g){
                this.allch.prop('checked',true);
              } 
              else{
                this.allch.prop('checked',false); 
              }
           
        }
        jisuan(){
           let m=this.parentbox.find(':checked').siblings('.cart-pire').find('.zpirce');
             let z=0;
             m.each(function(index,ele){
                 z+=parseInt($(ele).html())
             });
             console.log(z);
             this.allpirce.html(z);
        }

    }
    new creatlist().init()
})(jQuery)