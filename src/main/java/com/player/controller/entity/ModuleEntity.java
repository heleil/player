package com.player.controller.entity;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class ModuleEntity extends ConBaseEntity {

	public List<String> tags;
	
	
	
	
	public List<String> getTags() {
		return tags;
	}




	public void setTags(List<String> tags) {
		this.tags = tags;
	}




	@Override
	public void parserJson(String json) throws Exception {
		
		super.parserJson(json);
		
		JSONObject rej = JSONObject.fromObject(json);
		
		JSONArray reaj = rej.getJSONArray("tags");
		
		tags = new ArrayList<String>();
		
		for(int i=0 ; i< reaj.size() ; i++)
		{
			tags.add(reaj.getString(i));	
		}
		
	}

}
