package com.test;

import org.junit.Test;

import com.player.util.HttpRequest;


public class testresource{
	
	
	public String URL = "http://localhost:8080/";
	
	//public String URL = "http://192.144.159.130/";
	
	 
	
	@Test
	public void testcmscategories()
	{
		String 	 content="{\"appId\":\"QaNCagiMWCdGbGSj\", \"token\":\"786203ce01256d1d590e2d0a1c1f11b62076\",\"clientId\" : \"10110000002003C7\",\"moduleId\" : \"1\",\"page\" : 1,\"count\" : 20}";
		
		String url = URL+"player/cms/categories";
		
		
	   System.out.println("send:"+content);
	   System.out.println("testcmscategories:"+HttpRequest.sendDataPost(url, content.getBytes())+"\r\n");
	   
	}
	
	
	
	@Test
	public void testcmsmodules()
	{
		String 	 content="{\"appId\":\"EvXLUN3xtyON74KY\", \"token\":\"786203ce01256d1d590e2d0a1c1f11b62076\",\"clientId\" : \"10110000002003C7\",\"tags\" :[\"ggg\"]}";
		
		String url = URL+"player/cms/modules";
		
		
	   System.out.println("send:"+content);
	   System.out.println("testcmsmodules:"+HttpRequest.sendDataPost(url, content.getBytes())+"\r\n");
	   
	}
		
	@Test
	public void testresourcelist()
	{
		String 	 content="{\"appId\":\"EvXLUN3xtyON74KY\", "
				+ "\"token\":\"786203ce01256d1d590e2d0a1c1f11b62076\","
				+ "\"clientId\" : \"10110000002003C7\",\"albumId\" : \"1\"}";
		
		String url = URL+"player/resources/list";
		
		
	   System.out.println("send:"+content);
	   System.out.println("testresourcelist:"+HttpRequest.sendDataPost(url, content.getBytes())+"\r\n");
	   
	}
	
	@Test
	public void testresourcedetail()
	{
		String 	 content="{\"appId\":\"EvXLUN3xtyON74KY\", "
				+ "\"token\":\"786203ce01256d1d590e2d0a1c1f11b62076\","
				+ "\"clientId\" : \"10110000002003C7\",\"resIds\" : [\"1\"]}";
		
		String url = URL+"/player/resources/detail";
		
		
	   System.out.println("send:"+content);
	   System.out.println("testresourcedetail :"+HttpRequest.sendDataPost(url, content.getBytes())+"\r\n");
	   
	}
	
	
	
	@Test
	public void testresourceseach()
	{
		String 	 content="{\"appId\":\"EvXLUN3xtyON74KY\", "
				+ "\"token\":\"786203ce01256d1d590e2d0a1c1f11b62076\","
				+ "\"clientId\" : \"10110000002003C7\","
				+ "\"ranges\" : [\"resource\", \"album\"],"
				+ "\"keywords\" : [\"故事\"]}";
		
		String url = URL+"/player/search";
		
		
	   System.out.println("send:"+content);
	   System.out.println("testresourceseach:"+HttpRequest.sendDataPost(url, content.getBytes())+"\r\n");
	   
	}

	@Test
	public void testresourceinfo()
	{
		String 	 content="{\"appId\":\"QaNCagiMWCdGbGSj\","
			   +"\"token\":\"786203ce01256d1d590e2d0a1c1f11b62076\","
			   +" \"clientId\":\"3000020000000020\","
			   +"\"resId\":\"1\","
			   +"\"albumId\" : \"100\","
			   +"\"userId\" : \"ps:5724e37aa1bfd42510b52256ec620b17\","
			   +"\"bind\" : \"device\","
			   +"\"needFav\" : true}";
		
		
		
		String url = URL+"/player/resources/info";
		
		
	   System.out.println("send:"+content);
	   System.out.println("testresourceinfo:"+HttpRequest.sendDataPost(url, content.getBytes())+"\r\n");
	   
	}
	
}
