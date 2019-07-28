package com.player.service;

import net.sf.json.JSONObject;

import com.player.controller.entity.CategoriesEntity;
import com.player.controller.entity.ConBaseEntity;
import com.player.controller.entity.ModuleEntity;
import com.player.controller.entity.ResourceDetailEntity;
import com.player.controller.entity.ResourceInfoEntity;
import com.player.controller.entity.ResourceListEntity;
import com.player.controller.entity.SearchEntity;


public interface IResourceService {

	public JSONObject getSearchService(SearchEntity se);
	
	public JSONObject getResourceInfoService(ResourceInfoEntity re);
	
	public JSONObject getResourceListService(ResourceListEntity re);
	
	public JSONObject getResourceDetailService(ResourceDetailEntity re);
	
	public JSONObject getCMSModuleService(ModuleEntity me);
	
	public JSONObject getCMSCategoriesService(CategoriesEntity me);
	
	public boolean  hasUser(ConBaseEntity cbe);
}
