package com.player.controller.entity;

import net.sf.json.JSONObject;

import com.player.controller.page.PageConstant;

public class ResourceInfoEntity extends ConBaseEntity {

	public String resId;
	public String albumId;
	public String bind;
	public boolean needFav;
	
	

	
	public String getResId() {
		return resId;
	}





	public void setResId(String resId) {
		this.resId = resId;
	}





	public String getAlbumId() {
		return albumId;
	}





	public void setAlbumId(String albumId) {
		this.albumId = albumId;
	}





	public String getBind() {
		return bind;
	}





	public void setBind(String bind) {
		this.bind = bind;
	}





	public boolean isNeedFav() {
		return needFav;
	}





	public void setNeedFav(boolean needFav) {
		this.needFav = needFav;
	}





	@Override
	public void parserJson(String json) throws Exception {
	
		super.parserJson(json);
		
		 JSONObject  reqjson= JSONObject.fromObject(json);
		 
		 
		 resId = reqjson.getString("resId");


		if(reqjson.has("albumId"))
			 {
				albumId = reqjson.getString("albumId");
			 }		  


		if(reqjson.has("bind"))
			 {
			bind = reqjson.getString("bind");
			 }			

		if(reqjson.has("needFav"))
		 {
			needFav = reqjson.getBoolean("needFav");
		 }	
		

	}

}
