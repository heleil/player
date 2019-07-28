package com.player.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.player.util.BaseController;




@Controller
public class ControllerInterceptor  extends HandlerInterceptorAdapter {
	
	private Log Logger = LogFactory.getLog(ControllerInterceptor.class);
	

	public 	static boolean shutdown=false; 
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		
		
		
		if (!(handler instanceof BaseController)) {
			return super.preHandle(request, response, handler);
		}
		
		String url = request.getRequestURL().toString();
		

		if(shutdown && !url.endsWith("clientmanager.htm"))
		{
			return false;
		}
		
		return super.preHandle(request, response, handler);
	}

	
}

