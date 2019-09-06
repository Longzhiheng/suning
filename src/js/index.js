////1：下滑效果头部导航
(function ($) {
  class slidshow {
    constructor() {
      this.slideelement = $('.leftnav li:visible');//获取操作元素集合
      this.Inav=$('.I-nav');
      this.Cnav=$('.C-nav');
      this.CUnav=$('.CU-nav');
    }
    init() {
      let _this = this;
      this.slideelement.hover(function () {
        clearTimeout($(this).timer) ;//关闭定时器
        $(this).timer=setTimeout(()=>{
             _this.showelement($(this));//向下移动
        },100)
     
      }, function () {
         clearTimeout( $(this).timer) ; 
        $(this).timer=setTimeout(()=>{
           _this.hideelement($(this))//向上回去
        },100)
       
      })
    }
    showelement(obj){
      let attrt=obj.index();
       if(attrt==0){
         this.Inav.css('display','block');
         this.Inav.stop().animate({
            height:292
         })
       }
       else if(attrt==1){
        this.Cnav.css('display','block');
        this.Cnav.stop().animate({
          height:147
        })
       }
       else if(attrt==2){
        this.CUnav.css('display','block');
        this.CUnav.stop().animate({
          height:147
        })
       }
    }
    hideelement(obj){
      let _this=this;
      let attrt=obj.index();
      if(attrt==0){
      
        this.Inav.stop().animate({
           height:0
        },function(){
           _this.Inav.css('display','none');//先移动再消失
        }); 
        
      }
      else if(attrt==1){
      
       this.Cnav.stop().animate({
         height:0
       },function(){
           _this.Cnav.css('display','none');
       }); 
     
      }
      else if(attrt==2){
     
       this.CUnav.stop().animate({
         height:0
       },function(){
         _this.CUnav.css('display','none');
       }); 
        
      }
    }
  }
  new slidshow().init()
})(jQuery);

///头部右边滑动
(function ($) {
  class slidshow {
    constructor() {
      this.slideelement = $('.rightnav li:visible');//获取操作元素集合
      this.ODnav=$('.OD-nav');
      this.EGnav=$('.EG-nav');
      this.ISnav=$('.IS-nav');
    }
    init() {
      let _this = this;
      this.slideelement.hover(function () {
        clearTimeout($(this).timer) ;//关闭定时器
        $(this).timer=setTimeout(()=>{
             _this.showelement($(this));//向下移动
        },100)
     
      }, function () {
         clearTimeout( $(this).timer) ; 
        $(this).timer=setTimeout(()=>{
           _this.hideelement($(this))//向上回去
        },100)
       
      })
    }
    showelement(obj){
      let attrt=obj.index();
       if(attrt==2){ 
         this.ODnav.css('display','block');
         this.ODnav.stop().animate({
            height:122
         })
       }
       else if(attrt==3){
        this.EGnav.css('display','block');
        this.EGnav.stop().animate({
          height:159
        })
       }
       else if(attrt==8){
        this.ISnav.css('display','block');
        this.ISnav.stop().animate({
          height:197
        })
       }
    }
    hideelement(obj){
      let _this=this;
      let attrt=obj.index();
      if(attrt==2){
      
        this.ODnav.stop().animate({
           height:0
        },function(){
           _this.ODnav.css('display','none');//先移动再消失
        }); 
        
      }
      else if(attrt==3){
      
       this.EGnav.stop().animate({
         height:0
       },function(){
           _this.EGnav.css('display','none');
       }); 
     
      }
      else if(attrt==8){
     
       this.ISnav.stop().animate({
         height:0
       },function(){
         _this.ISnav.css('display','none');
       }); 
        
      }
    }
  }
  new slidshow().init()
})(jQuery);

//搜索框消失模块
   (function($){
      class showdown{
        constructor(){
          this.click=$('.keyvalue');
          this.span=$('.keyvalue').siblings('span');
          this.hidebox=$('.search-box');
          this.searchright=$('.search-right');
          this.hiden=$('.hiden');
        }
        init(){
          let _this=this;
          this.click.focus(function(){//获取焦点
              _this.span.css('display','none');
              _this.hidebox.css('display','block')
          });
           
           this.hidebox.on('click',this.searchright,function(){///事件绑定
            _this.span.css('display','none');
            _this.hidebox.css('display','block');
            // alert(1);
           });
          this.click.blur(function(){
            _this.span.css('display','block');
            _this.hidebox.css('display','none')
          });
          this.hiden.on('click',function(){
            _this.span.css('display','block');
            _this.hidebox.css('display','none')
          })
        }
      }
       new showdown().init()
   })(jQuery);


// 轮播图
(function($){
  class sild{
    constructor(){
      this.check=$('.check-nav span');
      this.hidepicture=$('.hide-picture li');
      this.index=null;
      this.sildePic=$('.sildePic');
      this.leftcheck=$('.left-check');
      this.rightcheck=$('.right-check');
      this.timer=null;
    }

    init(){
     let  _this=this;
      //1:给点击按钮加事件
      this.check.on('click',function(){
        _this.showcolor($(this)) ;
        _this.pictureshow();  
      });
      //2：左右箭头出现
       this.sildePic.hover(function(){
          _this.leftcheck.css('display','block');
          _this.rightcheck.css('display','block');
          clearInterval(_this.timer);
       },function(){
        _this.leftcheck.css('display','none');
        _this.rightcheck.css('display','none');
        _this.timer=setInterval(()=>{
          _this.leftevent();
        },2000) ;
       });
       //3：左右箭头事件
        this.leftcheck.on('click',function(){
            _this.leftevent();
        });
        this.rightcheck.on('click',function(){
          _this.rightevent();
      });
      //4:时间控件
      this.timer=setInterval(()=>{
        this.leftevent();
      },2000)  
    }
    showcolor(obj){
       obj.siblings().removeClass('red');
       obj.addClass('red');
       this.index=obj.index();
    }
    pictureshow(){
     let $m=$(this.hidepicture[this.index]);
     $m.siblings().stop().animate({
       opacity:0
     });
         $m.stop().animate({
          opacity:1
        })   
    } 
    leftevent(){
      this.index--;
      if(this.index<0){
        this.index=7;
      }
      let $m=$(this.hidepicture[this.index]);
      $m.siblings().stop().animate({
        opacity:0
      });
          $m.stop().animate({
           opacity:1
         })  
           this.check.removeClass('red');
         this.check.eq(this.index).addClass('red') ; 

    }
    rightevent(){
      this.index++;
      if(this.index>7){
        this.index=0;
      }
      let $m=$(this.hidepicture[this.index]);
      $m.siblings().stop().animate({
        opacity:0
      });
          $m.stop().animate({
           opacity:1
         });
         this.check.removeClass('red');
         this.check.eq(this.index).addClass('red') ; 
    } 
  }
  new sild().init()
})(jQuery);
////数据渲染新闻
(function($){
  class creatnew{
    constructor(){
      this.newtitle=$('.right-therr');
      this.newlist=$('.right-therr ul a');
    }
    init(){
      let _this=this;
      // 1：获取数据
      $.ajax({
        type:'get',
        url:'http://10.31.157.53/html1907/suning/php/index.php/',
        dataType:'json'
      }).done(function(data){
            _this.creat(data);//开始数据遍历
      })
    }
    creat(data){
       console.log(data);
       this.newlist.each(function(index,element){
            $.each(data,function(index1,element1){
                if(index==index1){
                  console.log(element);
                  console.log(element1);
                  $(element).html(element1.title);
                   $(element).attr('href',element1.url)
                }
            })
       })
    }
  }
   
 new creatnew().init()

})(jQuery);
////换灯片效果
  
  (function($){
       
    class slidhide{
      constructor(){
        this.newtitle=$('.right-therr');
        this.newul=$('.right-therr ul');
        this.newlist=$('.right-therr ul li');
         this.speed=0;//初始化距离
         this.index=0;//定义索引位置
         this.timer=null;
      }
      init(){
        ///1：追加元素
        let _this=this;
        this.speed=this.newlist.eq(0).height();
        console.log(this.speed);
       
        this.timer=setInterval(()=>{
          this.index++;
          if(this.index==3){
            this.index=0
          }
           this.newul.animate({
             top:-this.speed*this.index
           })
        },2000);
        this.newul.hover(function(){
           clearInterval(_this.timer)
        },function(){
          _this.timer=setInterval(()=>{
            _this.index++;
            if(_this.index==3){
              _this.index=0
            }
             _this.newul.animate({
               top:-_this.speed*_this.index
             })
          },2000); 
        })
        
      }
    }
    new slidhide().init()
  })(jQuery);
//////商品渲染
(function($){
  let ul=$('.like ul');
  let htmlva='';
   $.ajax({
     dataType:'json',
     type:'post',
     url:'http://10.31.157.53/html1907/suning/php/item.php/'
   }).done(function(data){
       $.each(data,function(index,element){
         htmlva+=`
         <li><a href="http://10.31.157.53/html1907/suning/src/html/item.html?sid=${element.sid}">
         <div><img src=${element.url} alt=""></div>
         <p>${element.title}</p>
         <p>￥<i>${element.price}</i></p>
         <em>找相似</em>
     </a></li>        
   `
       });
       ul.html(htmlva);
   })
  
})(jQuery);