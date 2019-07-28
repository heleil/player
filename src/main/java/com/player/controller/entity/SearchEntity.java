package com.player.controller.entity;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.player.controller.page.PageConstant;

public class SearchEntity extends ConBaseEntity{

	public List<String> keywords;
	public List<String> ranges;
	public List<String> getKeywords() {
		return keywords;
	}
	public void setKeywords(List<String> keywords) {
		this.keywords = keywords;
	}
	public List<String> getRanges() {
		return ranges;
	}
	public void setRanges(List<String> ranges) {
		this.ranges = ranges;
	}
	
	
	@Override
	public void parserJson(String json) throws Exception {
	
		
		super.parserJson(json);
		
		 JSONObject  reqjson= JSONObject.fromObject(json);

		 
		 JSONArray  jkeywords = reqjson.getJSONArray("keywords");
		 
		 keywords = new ArrayList<String>();
		 
		 for(int i=0  ; i< jkeywords.size() ; i++)
		 {
			 keywords.add(jkeywords.getString(i));
		 }
		 
		
		 ranges = new ArrayList<String>();
		 JSONArray  jranges = null;
		 if(reqjson.has("ranges"))
		 {
			 jranges = reqjson.getJSONArray("ranges");
			 ranges = new ArrayList<String>();
			 for(int i=0; i< jranges.size() ; i++)
			 {
				 ranges.add(jranges.getString(i));
			 }
		 }
		 


		 
		
	}
	
	
}
