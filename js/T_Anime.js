/*-------------------------------------
 *スライドアニメーションのクラス
 *要jquery
 * *@start: スライド開始位 (false: 現在位置から)
 *@end: スライド終了位
 *@type: メニューが出てくる方向 (true:横方向,false:縦方向)
 *@id: アニメーションのID
 * ------------------------------------*/
$(function(){
	T_Animation = function(menu,btn,end,type,id){
			var name_show = "t_show_"+id;
			var name_hide = "t_hide_"+id;
			var oriental,org_pos_menu,org_pos_btn;
			if(type){
				oriental = "left";
				org_pos_menu = menu[0].offsetLeft;
				org_pos_btn = btn[0].offsetLeft;
			}else{
				oriental = "top";
				org_pos_menu = menu[0].offsetTop;
				org_pos_btn = btn[0].offsetTop;
			}
			var dif_btn_menu = org_pos_menu-org_pos_btn;
			var end_menu = end;
			var end_btn = end - dif_btn_menu;;
			var body = "";
			body += "0% {}";
			body += "100% { "+oriental+": "+end_menu+" }";
		  var css = "@-webkit-keyframes menu_"+name_show+" { "+body+"}\n";
		  css += "@keyframes menu_"+name_show+" { "+body+" }\n";
			css += ".menu_"+name_show+" { -webkit-animation-name: menu_"+name_show+";animarion-name: menu_"+name_show+";}\n";
			body = "";
			body += "0% {}";
			body += "100% { "+oriental+": "+end_btn+" }";
		  css += "@-webkit-keyframes btn_"+name_show+" { "+body+"}\n";
		  css += "@keyframes btn_"+name_show+" { "+body+" }\n";
			css += ".btn_"+name_show+" { -webkit-animation-name: btn_"+name_show+";animarion-name: btn_"+name_show+";}\n";
			body = "";
			body += "0% {}";
			body += "100% {"+oriental+":"+org_pos_menu+"}";
		  css += "@-webkit-keyframes menu_"+name_hide+" { "+body+"}\n";
		  css += "@keyframes menu_"+name_hide+" { "+body+" }\n";
			css += ".menu_"+name_hide+" { -webkit-animation-name: menu_"+name_hide+";animarion-name: menu_"+name_hide+";}\n";
			body = "";
			body += "0% {}";
			body += "100% {"+oriental+":"+org_pos_btn+"}";
		  css += "@-webkit-keyframes btn_"+name_hide+" { "+body+"}\n";
		  css += "@keyframes btn_"+name_hide+" { "+body+" }\n";
			css += ".btn_"+name_hide+" { -webkit-animation-name: btn_"+name_hide+";animarion-name: btn_"+name_hide+";}\n";
			this.name_show = name_show;
			this.name_hide = name_hide;
			this.oriental = oriental;
			this.end_menu = end_menu;
			this.end_btn = end_btn;
			this.css = css;
			this.org_pos_menu = org_pos_menu;
			this.org_pos_btn = org_pos_btn;
			this.which = org_pos_menu < end_menu;
			this.type = type;
			this.menu = menu;
			this.btn = btn;
			$("head").append("<style>"+this.css+"</style>");
			css = {"-webkit-animation-duration":" 0.2s","-webkit-animation-delay": "0s","-webkit-animation-iteration-count": "1","-webkit-animation-fill-mode":"forwards","-moz-animation-duration": "0.2s","-moz-animation-delay": "0s","-moz-animation-iteration-count": "1",	"-moz-animation-fill-mode":"forwards"};
			menu.css(css);
			btn.css(css);
  }
});
