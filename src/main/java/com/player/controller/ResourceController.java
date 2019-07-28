package com.player.controller;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.player.controller.entity.CategoriesEntity;
import com.player.controller.entity.ModuleEntity;
import com.player.controller.entity.ResourceDetailEntity;
import com.player.controller.entity.ResourceInfoEntity;
import com.player.controller.entity.ResourceListEntity;
import com.player.controller.entity.SearchEntity;
import com.player.service.IResourceService;
import com.player.util.BaseController;
import com.player.util.ByteUtils;

@Controller
public class ResourceController extends BaseController{

	
	private Log logger = LogFactory.getLog(ResourceController.class);
	
	
	  @Resource
	  IResourceService service;
	  

	
	@RequestMapping("/cms/modules")
	public ModelAndView cms_module(HttpServletRequest request , HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		 byte[] buffer = ByteUtils.input2byte(request.getInputStream());
		 JSONObject resjson = new JSONObject();
		 
		 resjson.put("code", "-1");
		 resjson.put("msg", "error");
		
		 
		 try{
			 String jgetstr = new String(buffer,"utf-8");
			 
			 ModuleEntity me = new ModuleEntity();
			 me.parserJson(jgetstr);
			 
			 if(service.hasUser(me)){
				 resjson.put("data", service.getCMSModuleService(me));
				 resjson.put("code", "0");
				 resjson.put("msg", "success");				 
			 }
			 else
			 {
				 resjson.put("code", "-2");
				 resjson.put("msg", "token error");
			 }

		
		}catch(Exception e)
		{
			logger.error("error:"+e.getMessage());
		}


		printContentToClient(response, resjson.toString());
	
		return null;
	}	
	
	@RequestMapping("/cms/categories")
	public ModelAndView cms_categories(HttpServletRequest request , HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		
		 byte[] buffer = ByteUtils.input2byte(request.getInputStream());
		 JSONObject resjson = new JSONObject();
		 
		 resjson.put("code", "-1");
		 resjson.put("msg", "error");
		
		 
		 try{
			 String jgetstr = new String(buffer,"utf-8");

			 CategoriesEntity ce = new CategoriesEntity();
			 ce.parserJson(jgetstr);
			 
			 if(service.hasUser(ce))
			 {
				 resjson.put("data", service.getCMSCategoriesService(ce));
				 resjson.put("code", "0");
				 resjson.put("msg", "success");
			 }
			 else
			 {
				 resjson.put("code", "-2");
				 resjson.put("msg", "token error");
			 }
			 
		}catch(Exception e)
		{
			logger.error("error:"+e.getMessage());
		}


		printContentToClient(response, resjson.toString());
	
		return null;
	}	
	

	@RequestMapping("resources/info")
	public ModelAndView resources_info(HttpServletRequest request , HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		
		 byte[] buffer = ByteUtils.input2byte(request.getInputStream());
		 JSONObject resjson = new JSONObject();
		 
		 resjson.put("code", "-1");
		 resjson.put("msg", "error");
		
		 
		 try{

			 String jgetstr = new String(buffer,"utf-8");
			 ResourceInfoEntity  re = new ResourceInfoEntity();
			 re.parserJson(jgetstr);
			 
			 if(service.hasUser(re))
			 {
				 resjson.put("data", service.getResourceInfoService(re));
				 resjson.put("code", "0");
				 resjson.put("msg", "success");				 
			 }
			 else
			 {
				 resjson.put("code", "-2");
				 resjson.put("msg", "token error");
			 }

			 
		}catch(Exception e)
		{
			logger.error("error:"+e.getMessage());
		}


		printContentToClient(response, resjson.toString());
	
		return null;
	}	

	@RequestMapping("resources/detail")
	public ModelAndView resources_detail(HttpServletRequest request , HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		
		 byte[] buffer = ByteUtils.input2byte(request.getInputStream());
		 JSONObject resjson = new JSONObject();
		 
		 resjson.put("code", "-1");
		 resjson.put("msg", "error");
		
		 
		 try{

			 String jgetstr = new String(buffer,"utf-8");
			 ResourceDetailEntity  re = new ResourceDetailEntity();
			 re.parserJson(jgetstr);
			 
			 if(service.hasUser(re))
			 {
				 resjson.put("data", service.getResourceDetailService(re));
				 resjson.put("code", "0");
				 resjson.put("msg", "success");				 
			 }
			 else
			 {
				 resjson.put("code", "-2");
				 resjson.put("msg", "token error");
			 }

		
		}catch(Exception e)
		{
			logger.error("error:"+e.getMessage());
		}


		printContentToClient(response, resjson.toString());
	
		return null;
	}	
	

	
	@RequestMapping("resources/list")
	public ModelAndView resources_list(HttpServletRequest request , HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		
		 byte[] buffer = ByteUtils.input2byte(request.getInputStream());
		 JSONObject resjson = new JSONObject();
		 
		 resjson.put("code", "-1");
		 resjson.put("msg", "error");
		
		 
		 try{

			 String jgetstr = new String(buffer,"utf-8");
			 ResourceListEntity  re = new ResourceListEntity();
			 re.parserJson(jgetstr);
			 
			 if(service.hasUser(re))
			 {
				 resjson.put("data", service.getResourceListService(re));
				 resjson.put("code", "0");
				 resjson.put("msg", "success");				 
			 }
			 else
			 {
				 resjson.put("code", "-2");
				 resjson.put("msg", "token error");
			 }

			
		}catch(Exception e)
		{
			logger.error("error:"+e.getMessage());
		}


		printContentToClient(response, resjson.toString());
	
		return null;
	}	

	@RequestMapping("search")
	public ModelAndView search(HttpServletRequest request , HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		
		 byte[] buffer = ByteUtils.input2byte(request.getInputStream());
		 JSONObject resjson = new JSONObject();
		 
		 resjson.put("code", "-1");
		 resjson.put("msg", "error");
		
		 
		 try{
			 String jgetstr = new String(buffer,"utf-8");

			 SearchEntity  se = new SearchEntity();
			 
			 se.parserJson(jgetstr);

			 
			 if(service.hasUser(se))
			 {
				 resjson.put("data", service.getSearchService(se));
				    
				 resjson.put("code", "0");
				 resjson.put("msg", "success");				 
			 }
			 else
			 {
				 resjson.put("code", "-2");
				 resjson.put("msg", "token error");
			 }
		
		}catch(Exception e)
		{
			logger.error("error:"+e.getMessage());
		}


		printContentToClient(response, resjson.toString());
	
		return null;
	}	
}
