package com.player.controller.entity;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class ResourceDetailEntity extends ConBaseEntity {

	public List<String> resIds;
	
	
	
	public List<String> getResIds() {
		return resIds;
	}



	public void setResIds(List<String> resIds) {
		this.resIds = resIds;
	}



	@Override
	public void parserJson(String str) throws Exception {
		
		super.parserJson(str);

		JSONObject json = JSONObject.fromObject(str);
		
		JSONArray ids = json.getJSONArray("resIds");
		
		resIds = new ArrayList<String>();
		
		for(int i=0; i<ids.size(); i++)
		{
			resIds.add(ids.getString(i));	
		}
			
		
		
	}

}
