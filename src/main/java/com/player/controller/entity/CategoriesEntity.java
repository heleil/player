package com.player.controller.entity;

import org.springframework.util.StringUtils;

import net.sf.json.JSONObject;

public class CategoriesEntity extends ConBaseEntity{

	public String moduleId;
	public String albumId;
	
	public String getModuleId() {
		return moduleId;
	}
	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}
	public String getAlbumId() {
		return albumId;
	}
	public void setAlbumId(String albumId) {
		this.albumId = albumId;
	}
	@Override
	public void parserJson(String json) throws Exception {

		super.parserJson(json);
		
		 JSONObject  reqjson= JSONObject.fromObject(json);

		 if(reqjson.has("moduleId"))
		 {
			 moduleId = reqjson.getString("moduleId");
		 }
		 
		 if(reqjson.has("albumId"))
		 {
			 albumId = reqjson.getString("albumId");
		 }
	 
		 if(StringUtils.hasText(albumId) && StringUtils.hasText(moduleId))
		 {
			 throw new Exception("params error");
		 }
	}
	
	
}
