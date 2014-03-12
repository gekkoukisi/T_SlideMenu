/*-------------------------------------
 *スライドメニューのプラグイン  bt tokki
 *要jquery
 * ------------------------------------*/

$(function(){

	var SWIPE_OFFSET = 5;
	var SLIDE_OFFSET = 150;
	T_SlideMenu = function(){
		this.animations = new Array;
		this.isTouch = false;
		this.pre_pos;
		this.isShow = false;
	}

	T_SlideMenu.prototype.addAnimation = function(menu,btn,end,type){
		var id = this.animations.length+1;
		var anime = new T_Animation(menu,btn,end,type,id);
		this.animations.push(anime);
		btn.on("touchstart",this,function(e){
			event.preventDefault();
			var own = e.data;
			own.isTouch = true;
			if(own.isShow){
				menu.removeClass("menu_"+anime.name_show);
				btn.removeClass("btn_"+anime.name_show);
				menu.css(anime.oriental,anime.end_menu+"px");
				btn.css(anime.oriental,anime.end_btn+"px");
			}else{
				menu.removeClass("menu_"+anime.name_hide);
				btn.removeClass("btn_"+anime.name_hide);
				menu.css(anime.oriental,anime.org_pos_menu+"px");
				btn.css(anime.oriental,anime.org_pos_btn+"px");
			}
			if(anime.type){
				own.pre_pos = event.touches[0].pageX;
			}else{
				own.pre_pos = event.touches[0].pageY;
			}
		})
		.on("touchmove",this,function(e){
			event.preventDefault();
			var own = e.data;
			if(!own.isTouch) return;
			var pos;
			var now_pos_menu;
			var now_pos_btn;
			var now_pos_dif;
			var dif;
			if(anime.type){
				pos = event.touches[0].pageX;
				now_pos_menu = menu[0].offsetLeft;
				now_pos_btn = btn[0].offsetLeft;
			}else{
				pos = event.touches[0].pageY;
				now_pos_menu = menu[0].offsetTop;
				now_pos_btn = btn[0].offsetTop;
			}
			dif = own.pre_pos - pos;
			menu.css(anime.oriental,(now_pos_menu-dif)+"px");
			btn.css(anime.oriental,(now_pos_btn-dif)+"px");
			own.pre_pos = pos;
			if(dif > SWIPE_OFFSET){
				if(anime.which){
					own.swipe_hide = true;
				}else{
					own.swipe_show = true;
				}
				return;
			}
			if(-1*dif > SWIPE_OFFSET){
				if(anime.which){
					own.swipe_show = true;
					own.swipe_hide = false;
				}else{
					own.swipe_hide = true;
					own.swipe_show = false;
				}
				return;
			}
			if(Math.abs(now_pos_menu - anime.end_menu)<SLIDE_OFFSET){
				own.swipe_show = true;
				own.swipe_hide = false;
				return;
			}else if(Math.abs(now_pos_menu - anime.org_pos_menu)<SLIDE_OFFSET){
				own.swipe_hide = true;
				own.swipe_show = false;
				return;
			}
			own.swipe_show = false;
			own.swipe_hide = false;
		})
		.on("touchend",this,function(e){
			var own = e.data;
			own.isTouch = false;
			if(own.swipe_show){
				anime.show();
				own.isShow = true;
				return;
			}
			if(own.swipe_hide){
				anime.hide();
				own.isShow = false;
				return;
			}
			if(own.isShow){
				anime.show();
			}else{
				anime.hide();
			}
		});
		return anime;
	}
	T_SlideMenu.prototype.getAnimation = function(id){
		return this.animations[id-1];
	}
});
