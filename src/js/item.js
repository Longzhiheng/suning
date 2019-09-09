(function () {
    class Ofangda {
        constructor() {
                this.warp = $('.wrap'),
                this.spic = $('#spic'),
                this.sf = $('#sf'),
                this.bpic = $('#bpic'),
                this.bf = $('#bf'),
                this.ulist = $('#ulist'),
                this.left=$('#left'),
                this.right=$('#right'),
                this.ul=$('#list ul') ,
                this.num=6      
        }
        init() {
            let _this = this;
            ////1：第一步 鼠标悬停 小放 大放出现
            this.spic.hover(function () {
                _this.showSp();
                //2:计算小放宽高
                _this.cssP();
               //计算比列
                _this.bili=_this.bpic.width()/_this.spic.width();
                ///3鼠标移动 小放移动 大放移动
                _this.spic.on('mousemove', function (ev) {
                    _this.movesf(ev);//小放移动
                })

            }, function () {
                _this.hidesp()
            });
            ///4绑定点击事件
            this.ulist.find('li').on('click',function(){
                  let obj=$(this);
                  _this.ulistmove(obj);
                  _this.bili=_this.bpic.width()/_this.spic.width();//重置比列
            });

           this.$speed=this.ul.find('li').eq(0).outerWidth();///偏移距离计算
           this.$num=this.ul.find('li').length;//求出长度
            this.right.on('click',function(){
                _this.rightmove()
            })
            
            this.left.on('click',function(){
                _this.leftmove();
            })

        }
        showSp() {
            this.sf.css('visibility', 'visible');
            this.bf.css('visibility', 'visible');
        }
        hidesp() {
            this.sf.css('visibility', 'hidden');
            this.bf.css('visibility', 'hidden');
        }
        cssP() {
            this.sf.css({
                width: this.spic.width() * this.bf.width() / this.bpic.width(),
                height: this.spic.height() * this.bf.height() / this.bpic.height()
            });
        }
        movesf(ev) {
            let shortlinel = ev.clientX - this.warp.offset().left - this.sf.width() / 2;
            let shortlinet = ev.clientY - this.warp.offset().top - this.sf.height() / 2;
            if(shortlinel<=0){
                shortlinel=0
            }
            else if(shortlinel>=this.spic.width()-this.sf.width()){
                shortlinel=this.spic.width()-this.sf.width()
            }
            if(shortlinet<=0){
                shortlinet=0
            }
            else if(shortlinet>=this.spic.height()-this.sf.height()){
                shortlinet=this.spic.height()-this.sf.height()
            }
            this.sf.css({
                left: shortlinel,
                top: shortlinet
            });
           this.bpic.css({
               left:-shortlinel*this.bili,
               top:-shortlinet*this.bili
           })
        }
        ulistmove(obj){
            let $imgUrl=obj.find('img').attr('src');
            this.spic.find('img').attr('src',$imgUrl); 
            this.bpic.attr('src',$imgUrl) ;
        }
        rightmove(){
            if(this.$num>this.num){
                this.num++;
                this.left.css('color','#333');
              this.ul.animate({
                  left:-(this.num-6)*this.$speed
               })
               if(this.$num==this.num){
                   this.right.css('color','#fff')
               }
            }
        }
        leftmove(){
            if(this.num>6){
                this.num--;
                this.right.css('color','#333')
                this.ul.animate({
                    left:-(this.num-6)*this.$speed
                 });
                 
                 if(this.num==6){
                    this.left.css('color','#fff')
                }
            }
        }

    }
    new Ofangda().init();
}

)();
///渲染结构
(function($){
       class changep{
           constructor(){
               this.spic=$('#spic img');
               this.bpic=$('#bpic');
               this.listpic=$('#list img');
               this.price=$('.pirce');
               this.title=$('.title');
               this.buy=$('.buy');
           }
           init(){
             ///1:获取sid;
             let _this=this;
             let sid=location.search.substring(1).split('=')[1];
              $.ajax({
                  type:'get',
                  url:'http://10.31.157.53/html1907/suning/php/items.php/',
                  data:{
                     id:sid 
                  }, 
                  dataType:'json'  
              }).done(function(data){
                  console.log( data);
                  _this.spic.attr('src',data.url);
                  _this.bpic.attr('src',data.url);
                   _this.buy.attr('href',`http://10.31.157.53/html1907/suning/src/html/cart.html?sid=${data.sid}`);
                  _this.buy.attr('sid',data.sid);
                  console.log(typeof data.urls);
                  let arry=data.urls.split(',');
                   _this.title.html(data.title);
                   _this.price.html(data.price);
                  console.log(arry);
                  _this.listpic.each(function(index,element){
                      $(element).attr('src',arry[index])
                  })
              })
                
           }    
       }
       new changep().init()
})(jQuery);
////设置cookie
(function($){
   class resetcook{
       constructor(){
           this.loss=$('.loss');
           this.add=$('.add');
            this.val=$('input');
            this.buy=$('.buy');
            this.arrysid=[];
            this.arrynum=[];
            this.how=$('.num');
       }
       init(){
           let _this=this;
          this.loss.on('click',function(){
             _this.cmloss();
          });
          this.add.on('click',function(){
            _this.cmadd();
         });
          this.buy.on('click',function(){
             _this.addcook($(this)); 
          });
          this.how.blur(function(){
             let reg=new RegExp(/\D/,'g');
              if(reg.test($(this).val())){
                 alert("请输入有效的商品数量");
                 $(this).val(0);

              }
          })
       }
       cmloss(){
           if(this.val.val()<=0){
               this.val.val('0')
           }
           else{
               this.val.val(parseInt(this.val.val())-1)
           }
       }
       cmadd(){
        this.val.val(parseInt(this.val.val())+1)
       }
       addcook(obj){
          let sid=obj.attr('sid');
          this.showcook();//cook初始化
         
          if($.inArray(sid,this.arrysid)!=-1){//cook存在
         
             let num= parseInt(this.arrynum[$.inArray(sid,this.arrysid)])+parseInt(this.val.val()) ;
     
             this.arrynum[$.inArray(sid,this.arrysid)]=num;
       
             addcookie('cookienum', this.arrynum.toString(), 10); //数组存入cookie
          }
          else{
           this.arrysid.push(sid); //将当前的id存入数组
			addcookie('cookiesid', this.arrysid.toString(), 10); //数组存入cookie
			this.arrynum.push(this.val.val());
			addcookie('cookienum',this.arrynum.toString(), 10); //数组存入cookie
        } 
        console.log(this.arrynum);
          
       }
       showcook(){
        if(getcookie('cookiesid') && getcookie('cookienum')) {//判断用户是第一次使用cook还是存多次存储
			this.arrysid = getcookie('cookiesid').split(','); //cookie商品的sid  
			this.arrynum= getcookie('cookienum').split(','); //cookie商品的num
		}
       }
   }
  new resetcook().init()

})(jQuery)