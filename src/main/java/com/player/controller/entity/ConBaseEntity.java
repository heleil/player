package com.player.controller.entity;

import net.sf.json.JSONObject;

import com.player.controller.page.PageConstant;

public  class ConBaseEntity {

	public String appId;
	public String token;
	public String clientId;
	public String userId;
	
	public int page;
	public int count;
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getClientId() {
		return clientId;
	}
	public void setClientId(String clientId) {
		this.clientId = clientId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	
	public  void parserJson(String json) throws Exception
	{
		 JSONObject  reqjson= JSONObject.fromObject(json);
		  appId =  reqjson.getString("appId");
		  token = reqjson.getString("token");
		 
		 

		 if(reqjson.has("clientId"))
		 {
			 clientId = reqjson.getString("clientId");
		 }


		 if(reqjson.has("userId"))
		 {
			 userId = reqjson.getString("userId");
		 } 
		 

		 page = PageConstant.page;
		 if(reqjson.has("page"))
		 {
			 page = reqjson.getInt("page");
		 }
		 
		 count = PageConstant.count ;
		 if(reqjson.has("count"))
		 {
			count =  reqjson.getInt("count");	 
		 }
	}
	
}
