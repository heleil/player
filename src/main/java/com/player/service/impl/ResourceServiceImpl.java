package com.player.service.impl;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.player.controller.entity.CategoriesEntity;
import com.player.controller.entity.ConBaseEntity;
import com.player.controller.entity.ModuleEntity;
import com.player.controller.entity.ResourceDetailEntity;
import com.player.controller.entity.ResourceInfoEntity;
import com.player.controller.entity.ResourceListEntity;
import com.player.controller.entity.SearchEntity;
import com.player.controller.page.PageBean;
import com.player.dao.entity.ContentDaoEntity;
import com.player.dao.entity.ModuleDaoEntity;
import com.player.dao.entity.ResourceDaoEntity;
import com.player.dao.repo.IResourceDao;
import com.player.service.IResourceService;

@Service
public class ResourceServiceImpl implements IResourceService {

	@Resource
	IResourceDao dao;

	@Override
	public JSONObject getSearchService(SearchEntity se) {

		JSONObject root = new JSONObject();
		PageBean<ResourceDaoEntity> ress = dao.getSearchResourcedata(se);
		

		JSONObject resourcesPager = new JSONObject();
		resourcesPager.put("page", ress.getCurrentPage());
		resourcesPager.put("pageSize", ress.getPageSize());
		resourcesPager.put("total", ress.getTotalNumber());
		
		
		JSONArray rlist = new JSONArray();
		
		for(int i=0; i<ress.getDatas().size(); i++)
		{
		
			ResourceDaoEntity item = ress.getDatas().get(i);
			
			JSONObject res = new JSONObject();
			
			res.put("id", item.getId());
		    res.put("type", item.getType());
		    res.put("name", item.getName());
		    res.put("favoriteId", item.getFavoriteId());
		    res.put("length", item.getLenght());
		    res.put("content", item.getContent());
		    res.put("artist",item.getArtist());
		    
		    JSONObject playurls = new JSONObject();
		    JSONObject normal = new JSONObject();
		    
		    normal.put("size", item.getNormal_size());
		    normal.put("url", item.getNormal_url());
		    
		    playurls.put("normal", normal);
		    res.put("playUrls", playurls);
		    
		    
		    ContentDaoEntity cdeitem = dao.getContentById(item.getContentid());
		    JSONObject album = new JSONObject();
	
		    album.put("id", cdeitem.getId());
		    album.put("name", cdeitem.getName());
		    album.put("type", cdeitem.getType());
		    album.put("content", cdeitem.getContent());
			
		    album.put("imgLarge", cdeitem.getImgLarge());
		    album.put("imgSmall", cdeitem.getImgSmall());
			
		    
		    res.put("album", album);
		    
		    rlist.add(res);
		}
		
	

		

		

		PageBean<ContentDaoEntity> ablu = dao.getSearchAlbumdata(se);
		JSONObject albumsPager = new JSONObject();
		albumsPager.put("page", ress.getCurrentPage());
		albumsPager.put("pageSize", ress.getPageSize());
		albumsPager.put("total", ress.getTotalNumber());
				
		JSONArray alist = new JSONArray();
		for(int i=0; i<ablu.getDatas().size(); i++)
		{
			ContentDaoEntity item = ablu.getDatas().get(i);
			JSONObject json = new JSONObject();
			
			json.put("id", item.getId());
			json.put("favoriteId", item.getFavoriteId());
			json.put("name", item.getName());
			json.put("description", item.getDescription());
			json.put("total", item.getTotal());
			json.put("imgSmall", item.getImgSmall());
			json.put("imgLarge", item.getImgLarge());
			json.put("type", item.getType());
			
			JSONArray tags = new JSONArray();
			
			for(int j=0; j< item.getTags().size() ; j++)
			{
				tags.add(item.getTags().get(j));
			}
			
			alist.add(json);
		}
		
		
		
		for(int i=0 ; i<se.getRanges().size() ; i++)
		{
			if(se.getRanges().get(i).equals("resource"))
			{
				root.put("resourcesPager", resourcesPager);
				root.put("resource", rlist);				
			}
			
			if(se.getRanges().get(i).equals("album"))
			{
				root.put("albumsPager", albumsPager);
				root.put("albums", alist);				
			}
		}


		
		return root;
	}

	@Override
	public JSONObject getResourceInfoService(ResourceInfoEntity re) {
		
		//JSONObject root = new JSONObject();
	
		PageBean<ResourceDaoEntity> items = dao.getResourceInfo(re);

		
		
		JSONArray alist = new JSONArray();
		JSONObject res = new JSONObject();
		
		if(items!=null && items.getDatas().size()>0)
		{
			
			//JSONObject res = new JSONObject();
			
			ResourceDaoEntity item = items.getDatas().get(0);
			
			res.put("id", item.getId());
		    res.put("type", item.getType());
		    res.put("name", item.getName());
		    res.put("favoriteId", item.getFavoriteId());
		    res.put("length", item.getLenght());
		    res.put("content", item.getContent());
		    res.put("artist",item.getArtist());
		    
		    JSONObject playurls = new JSONObject();
		    JSONObject normal = new JSONObject();
		    
		    normal.put("size", item.getNormal_size());
		    normal.put("url", item.getNormal_url());
		    
		    playurls.put("normal", normal);
		    res.put("playUrls", playurls);	
		    
		    
		    ContentDaoEntity cdeitem = dao.getContentById(item.getContentid());
		    JSONObject album = new JSONObject();
	
		    album.put("id", cdeitem.getId());
		    album.put("name", cdeitem.getName());
		    album.put("type", cdeitem.getType());
		    album.put("content", cdeitem.getContent());
			
		    album.put("imgLarge", cdeitem.getImgLarge());
		    album.put("imgSmall", cdeitem.getImgSmall());
			
		    
		    
		    res.put("album", album);
		    
		   // alist.add(res);
		}

	    
		

		
		
		return res;
	}

	@Override
	public JSONObject getResourceListService(ResourceListEntity re) {
	
		JSONObject root = new JSONObject();
		
		ContentDaoEntity cde = dao.getContentById(re.getAlbumId());
		
		JSONObject album = new JSONObject();
		
		album.put("id", re.getAlbumId());
		album.put("name", cde.getName());
		album.put("imgLarge", cde.getImgLarge());
		album.put("imgSmall", cde.getImgSmall());
		
		root.put("album", album);
		
		
		PageBean<ResourceDaoEntity> page = dao.getResourceList(cde.getId());
		
		JSONArray list = new JSONArray();
		for(int i=0; i<page.getDatas().size() ; i++)
		{
			ResourceDaoEntity item = page.getDatas().get(i);
			
			JSONObject res = new JSONObject();
			
			res.put("id", item.getId());
		    res.put("type", item.getType());
		    res.put("name", item.getName());
		    res.put("favoriteId", item.getFavoriteId());
		    res.put("length", item.getLenght());
		    res.put("content", item.getContent());
		    res.put("artist",item.getArtist());
		    
		    JSONObject playurls = new JSONObject();
		    JSONObject normal = new JSONObject();
		    
		    normal.put("size", item.getNormal_size());
		    normal.put("url", item.getNormal_url());
		    
		    playurls.put("playUrls", normal);
		    res.put("playUrls", playurls);
		    
			
			list.add(res);
		}
		root.put("total",page.getTotalNumber());
		root.put("list", list);
		
		
	
		return root;
	}

	@Override
	public JSONObject getResourceDetailService(ResourceDetailEntity re) {
		
		JSONObject root = new JSONObject();
		JSONArray list = new JSONArray();
		
		for(int i=0; i<re.getResIds().size(); i++)
		{
		
			PageBean<ResourceDaoEntity> items = dao.getResourceById(re.getResIds().get(i));
			
			for(int j=0; j< items.getDatas().size() ; j++)
			{
				
				ResourceDaoEntity item = items.getDatas().get(j);
				
				JSONObject res = new JSONObject();
				
				res.put("id", item.getId());
			    res.put("type", item.getType());
			    res.put("name", item.getName());
			    res.put("favoriteId", item.getFavoriteId());
			    res.put("length", item.getLenght());
			    res.put("content", item.getContent());
			    res.put("artist",item.getArtist());
			    
			    JSONObject playurls = new JSONObject();
			    JSONObject normal = new JSONObject();
			    
			    normal.put("size", item.getNormal_size());
			    normal.put("url", item.getNormal_url());
			    
			    playurls.put("normal", normal);
			    res.put("playUrls", playurls);
			    
			    
			    ContentDaoEntity cdeitem = dao.getContentById(item.getContentid());
			    JSONObject album = new JSONObject();
		
			    album.put("id", cdeitem.getId());
			    album.put("name", cdeitem.getName());
			    album.put("type", cdeitem.getType());
			    album.put("content", cdeitem.getContent());
				
			    album.put("imgLarge", cdeitem.getImgLarge());
			    album.put("imgSmall", cdeitem.getImgSmall());
				
			    
			    
			    res.put("album", album);
			    list.add(res);				
			}
			

		}
		
		root.put("list", list);
		return root;
	}

	@Override
	public JSONObject getCMSModuleService(ModuleEntity me) {
		
		PageBean<ModuleDaoEntity> pagem = dao.getCMSModule(me);
		
		JSONObject root = new JSONObject();
		
		JSONArray modules = new JSONArray();
		
		root.put("total", pagem.getTotalNumber());
		
		
		
		for(int i=0 ; i< pagem.getDatas().size() ; i++)
		{
			ModuleDaoEntity item = pagem.getDatas().get(i);
			JSONObject json = new JSONObject();
			json.put("id", ""+item.getId());
			json.put("name", item.getName());
			json.put("icon", item.getIcon());
			json.put("attr", item.getAttr());
			json.put("description", item.getDescription());
			
			
			JSONArray contents = new JSONArray();
			
			PageBean<ContentDaoEntity> cde = dao.getContentByModuleId(item.getId());
			
			
			
			for(int j=0; j< cde.getDatas().size(); j++)
			{
				
				ContentDaoEntity cdeitem = cde.getDatas().get(j);
				
				JSONObject cc  = new JSONObject();
				
				cc.put("id", cdeitem.getId());
				cc.put("name", cdeitem.getName());
				cc.put("type", cdeitem.getType());
				cc.put("content", cdeitem.getContent());
				
				cc.put("imgLarge", cdeitem.getImgLarge());
				cc.put("imgSmall", cdeitem.getImgSmall());
				
				
				JSONArray tags = new JSONArray();
				cc.put("tags", tags);
				
				contents.add(cc);

			}
			
			json.put("contents", contents);
			
			modules.add(json);
		}
		
		
		root.put("modules", modules);
		
		
		return root;
	}

	@Override
	public JSONObject getCMSCategoriesService(CategoriesEntity me) {
		
		ModuleDaoEntity mde = dao.getCMSModuleById(me.getModuleId());
		
		JSONObject root = new JSONObject();
		
		root.put("id", mde.getId());
		root.put("name", mde.getName());
		root.put("attr", mde.getAttr());
		root.put("icon", mde.getIcon());
		root.put("description", mde.getDescription());
		
		
		JSONArray list = new JSONArray();
		
		PageBean<ContentDaoEntity> page = dao.getContentByModuleId(me.getModuleId());
		
		for(int i=0; i<page.getDatas().size(); i++)
		{
			ContentDaoEntity item = page.getDatas().get(i);
			JSONObject json = new JSONObject();
			
			json.put("id", item.getId());
			json.put("favoriteId", item.getFavoriteId());
			json.put("name", item.getName());
			json.put("description", item.getDescription());
			json.put("total", item.getTotal());
			json.put("imgSmall", item.getImgSmall());
			json.put("imgLarge", item.getImgLarge());
			json.put("type", item.getType());
			
			JSONArray tags = new JSONArray();
			
			for(int j=0; j< item.getTags().size() ; j++)
			{
				tags.add(item.getTags().get(j));
			}
			
			list.add(json);
		}
		
		root.put("total", page.getTotalNumber());
		root.put("list", list);
		
		
		return root;
	}

	@Override
	public boolean hasUser(ConBaseEntity cbe) {
		
		return dao.hasUser(cbe);
	}


}
