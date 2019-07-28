package com.player.dao.repo.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

import com.player.controller.entity.ConBaseEntity;
import com.player.controller.entity.ModuleEntity;
import com.player.controller.entity.ResourceInfoEntity;
import com.player.controller.entity.SearchEntity;
import com.player.controller.page.PageBean;
import com.player.dao.entity.AlbumEntity;
import com.player.dao.entity.ContentDaoEntity;
import com.player.dao.entity.ModuleDaoEntity;
import com.player.dao.entity.ResourceDaoEntity;
import com.player.dao.repo.IResourceDao;


@Repository
public class ResourceDaoImpl extends BaseDao implements IResourceDao {

	
	private Log Logger = LogFactory.getLog(ResourceDaoImpl.class);
	

	
	@Override
	public PageBean<ModuleDaoEntity> getCMSModule(ModuleEntity me) {
		
		PageBean<ModuleDaoEntity> page = new PageBean<ModuleDaoEntity>();
		
		String sql = "select count(*) from module ";

		page.setTotalNumber(this.jdbcTemplate.queryForLong(sql));
		
		sql = "select * from module";

		List<ModuleDaoEntity> alist= getModuleBySql(sql);
		

		page.setDatas(alist);
		
		
		return page;
	}
	
	

	List<ContentDaoEntity> getContentListBySql(String sql)
	{
		List<ContentDaoEntity> alist= jdbcTemplate.query(sql, new ResultSetExtractor<List<ContentDaoEntity>>(){
			@Override
			public List<ContentDaoEntity> extractData(ResultSet rs)
					throws SQLException, DataAccessException {
				
				List<ContentDaoEntity> idarray = new ArrayList<ContentDaoEntity>();
				
				while(rs.next())
				{
					ContentDaoEntity cde = new ContentDaoEntity();
					
					cde.setContent(rs.getString("content"));
					cde.setId(rs.getString("id"));
					cde.setImgLarge(rs.getString("imglarge"));
					cde.setImgSmall(rs.getString("imgsmall"));
					cde.setName(rs.getString("name"));
					cde.setType(rs.getString("type"));
					
					List<String> tags = new ArrayList<String>();
					tags.add(rs.getString("tags"));
					cde.setTags(tags);
					
					
					cde.setDescription(rs.getString("description"));
					cde.setTotal(rs.getInt("total"));
					
					
					
					
					idarray.add(cde);
				}
				return idarray;
			}
		});
		
		return alist;
	}

	@Override
	public PageBean<ContentDaoEntity> getContentByModuleId(String moduleid) {
		
		PageBean<ContentDaoEntity> page = new PageBean<ContentDaoEntity>();
		
		String sql = "select count(*) from content where moduleid='"+moduleid+"'";

		page.setTotalNumber(this.jdbcTemplate.queryForLong(sql));
		
		sql = "select * from content where moduleid='"+moduleid+"'";

		List<ContentDaoEntity> alist = getContentListBySql(sql);
		

		page.setDatas(alist);

		
		return page;
	}

	
	private List<ModuleDaoEntity> getModuleBySql(String sql)
	{

		List<ModuleDaoEntity> alist= jdbcTemplate.query(sql, new ResultSetExtractor<List<ModuleDaoEntity>>(){
			@Override
			public List<ModuleDaoEntity> extractData(ResultSet rs)
					throws SQLException, DataAccessException {
				
				List<ModuleDaoEntity> idarray = new ArrayList<ModuleDaoEntity>();
				
				while(rs.next())
				{
					ModuleDaoEntity cde = new ModuleDaoEntity();
					
					cde.setAttr(rs.getString("attr"));
					cde.setId(rs.getString("id"));
					cde.setDescription(rs.getString("description"));
					cde.setIcon(rs.getString("icon"));
					cde.setName(rs.getString("name"));
					
					
					idarray.add(cde);
				}
				return idarray;
			}
		});
		
		return alist;
	}
	
	
	@Override
	public ModuleDaoEntity getCMSModuleById(String id) {
		
		String sql = "select * from module where id='"+id+"'";

		List<ModuleDaoEntity> alist = getModuleBySql(sql);
		
		return alist.get(0);
	}

	@Override
	public ContentDaoEntity getContentById(String id) {
		
		String sql = "select * from content where id='"+id+"'";

		List<ContentDaoEntity> alist = getContentListBySql(sql);
		
		return alist.get(0);
	}
	
	public List<ResourceDaoEntity> getResourceListBySql(String sql)
	{

		List<ResourceDaoEntity> alist= jdbcTemplate.query(sql, new ResultSetExtractor<List<ResourceDaoEntity>>(){
			@Override
			public List<ResourceDaoEntity> extractData(ResultSet rs)
					throws SQLException, DataAccessException {
				
				List<ResourceDaoEntity> idarray = new ArrayList<ResourceDaoEntity>();
				
				while(rs.next())
				{
					ResourceDaoEntity cde = new ResourceDaoEntity();
					
					
					cde.setId(rs.getString("id"));
					cde.setType(rs.getInt("type"));
					cde.setName(rs.getString("name"));
					cde.setScore(rs.getInt("score"));
					cde.setFavoriteId(rs.getString("favoriteid"));
					cde.setArtist(rs.getString("artist"));
					cde.setLenght(rs.getInt("length"));
					cde.setContent(rs.getString("content"));
					cde.setNormal_size(rs.getInt("normal_size"));
					cde.setNormal_url(rs.getString("normal_url"));
					cde.setContentid(rs.getString("contentid"));
					
					
					idarray.add(cde);
				}
				return idarray;
			}
		});
		
		return alist;
	}

	@Override
	public PageBean<ResourceDaoEntity> getResourceList(String contentid) {
		
		PageBean<ResourceDaoEntity> page = new PageBean<ResourceDaoEntity>();
		
		String sql = "select count(*) from resource where contentid='"+contentid+"'";

		page.setTotalNumber(this.jdbcTemplate.queryForLong(sql));
		
		sql = "select * from resource where contentid="+contentid;

		List<ResourceDaoEntity> alist = getResourceListBySql(sql);
		

		page.setDatas(alist);

		
		return page;
	}

	
	@Override
	public PageBean<ResourceDaoEntity> getResourceInfo(ResourceInfoEntity re) {
		
		return getResourceById(re.getResId());
	}

	
	@Override
	public PageBean<ResourceDaoEntity> getResourceById(String id) {
		
		String sql = "select * from resource where id='"+id+"'";

		PageBean<ResourceDaoEntity>  page = new PageBean<ResourceDaoEntity>();

		List<ResourceDaoEntity> alist = getResourceListBySql(sql);
	
		page.setDatas(alist);

		return page;
	}

	
	
	@Override
	public PageBean<ResourceDaoEntity> getSearchResourcedata(SearchEntity se) {
		
		PageBean<ResourceDaoEntity> page = new PageBean<ResourceDaoEntity>();
		
		String sql = "select * from resource where name like '%"+se.getKeywords().get(0)+"%' limit "+page.getPageSize();
		

		List<ResourceDaoEntity> alist = getResourceListBySql(sql);
		
		page.setDatas(alist);
		
		page.setTotalNumber(alist.size());
		
		
		return page;
	}

	@Override
	public PageBean<ContentDaoEntity> getSearchAlbumdata(SearchEntity se) {
		
		PageBean<ContentDaoEntity> page = new PageBean<ContentDaoEntity>();
		
		String sql = "select * from content  where name like '%"+se.getKeywords().get(0)+"%' limit "+page.getPageSize();
		

		List<ContentDaoEntity> alist = getContentListBySql(sql);
		
		page.setDatas(alist);
		page.setTotalNumber(alist.size());
		
		
		return page;
	}



	@Override
	public boolean hasUser(ConBaseEntity cbe) {
	
		
		String sql = "select count(*) from user where appid='"+cbe.getAppId()+"' and token='"+cbe.getToken()+"'";

		long counts = jdbcTemplate.queryForLong(sql);
		
		if(counts>0)
		{
			return true;
		}
		
		return false;
	}


}
