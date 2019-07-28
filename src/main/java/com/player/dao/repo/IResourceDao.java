package com.player.dao.repo;

import com.player.controller.entity.ConBaseEntity;
import com.player.controller.entity.ModuleEntity;
import com.player.controller.entity.ResourceInfoEntity;
import com.player.controller.entity.SearchEntity;
import com.player.controller.page.PageBean;
import com.player.dao.entity.ContentDaoEntity;
import com.player.dao.entity.ModuleDaoEntity;
import com.player.dao.entity.ResourceDaoEntity;


public interface IResourceDao {
	public PageBean<ResourceDaoEntity> getSearchResourcedata(SearchEntity se);
	public PageBean<ContentDaoEntity> getSearchAlbumdata(SearchEntity se);
	
	public PageBean<ResourceDaoEntity>  getResourceInfo(ResourceInfoEntity re);
	
	public PageBean<ModuleDaoEntity> getCMSModule(ModuleEntity me);
	
	public PageBean<ContentDaoEntity> getContentByModuleId(String moduleid);

	public ContentDaoEntity getContentById(String id);
	
	public PageBean<ResourceDaoEntity> getResourceList(String contentid);

	public PageBean<ResourceDaoEntity> getResourceById(String id);
	
	public ModuleDaoEntity getCMSModuleById(String id);

	public boolean hasUser(ConBaseEntity cbe);
}
