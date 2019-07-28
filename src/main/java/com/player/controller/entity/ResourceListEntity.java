package com.player.controller.entity;

import net.sf.json.JSONObject;

public class ResourceListEntity extends ConBaseEntity{
	
	public String albumId;
	public String bind;
	public String queryAlbumInfo;
	
	
	

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




	public String getQueryAlbumInfo() {
		return queryAlbumInfo;
	}




	public void setQueryAlbumInfo(String queryAlbumInfo) {
		this.queryAlbumInfo = queryAlbumInfo;
	}




	@Override
	public void parserJson(String str) throws Exception {
	
		super.parserJson(str);
		
		JSONObject json = JSONObject.fromObject(str);
		
		albumId = json.getString("albumId");
	
		if(json.has("bind"))
		{
			bind = json.getString("bind");
		}
		
		if(json.has("queryAlbumInfo"))
		{
			queryAlbumInfo = json.getString("queryAlbumInfo");
		}
		
		
	}

}
