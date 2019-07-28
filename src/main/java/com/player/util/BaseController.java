package com.player.util;

import java.awt.image.BufferedImage;
import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;



public abstract class BaseController extends MultiActionController {
	

	private Log log = LogFactory.getLog(BaseController.class);
	
	protected final void printContentToClient(HttpServletResponse response, String content) throws IOException {
		
		if(response==null || content==null)
		{
			return;
		
		}
		
		
		response.setContentType("text/html;charset=utf-8");
		response.setHeader("Cache-Control", "no-store");// http1.1
		response.setHeader("Pragma", "no-cache");// http1.0
		response.setDateHeader("Expires", 0);
		response.setContentLength(content.getBytes("utf-8").length);
		
		response.getWriter().print(content);
		response.getWriter().flush();
		response.getWriter().close();
	}
	
	
	 
protected final void printContentAllToClient(HttpServletResponse response, byte[] content) throws IOException {


					response.setContentLength(content.length);
			
					response.getOutputStream().write(content);
				    response.getOutputStream().close();
				
			}
	 


	protected final void convertRequestParamToUIObject(HttpServletRequest request, Object object) throws Exception {
		BeanInfo beanInfo = Introspector.getBeanInfo(object.getClass());
		PropertyDescriptor propertyDescriptor[] = beanInfo.getPropertyDescriptors();
		@SuppressWarnings("unchecked")
		Enumeration<String> paramters = request.getParameterNames();

		while (paramters.hasMoreElements()) {
			String paramterKey = paramters.nextElement();
			
			for (PropertyDescriptor property : propertyDescriptor) {
				String key = property.getName();
				if (key.equals("class")) {//每个object中都有一个默认的是属性是class，所以尽量不要使用class作为key。
					continue;
				}
				
				String value = request.getParameter(paramterKey);
				if (StringUtils.hasText(paramterKey) && paramterKey.equalsIgnoreCase(key)) {
					Object valueObject =  convertStrToTargetObject(value,property);
					if(valueObject ==null){
						break;
					}
					
					property.getWriteMethod().invoke(object, valueObject);//现在value是String类型的，要将其转换成对应的参数的类型

				}

			}
		}
	}

	private  final Object convertStrToTargetObject(String value, PropertyDescriptor property) {
		if(property ==null || property.getPropertyType() ==null){
			return null;
		}
		
		String parameterType =  property.getPropertyType().getSimpleName();
		if(!StringUtils.hasText(parameterType)){
			return null;
		}
		
		
		if(parameterType.equals("int")  || parameterType.equals("Integer")){
			return Integer.valueOf(value);
		}else if(parameterType.equals("long")  || parameterType.equals("Long")){
			return Long.valueOf(value);
		}else if(parameterType.equals("double")  || parameterType.equals("Double")){
			return Double.valueOf(value);
		}else if(parameterType.equals("boolean")  || parameterType.equals("Boolean")){
			return Boolean.valueOf(value);
		}else if(parameterType.equals("String")){
			return value;
		}//数据类型以后自行添加。date 类型 不定，第一同意的格式后在做处理
		
		
		
		return null;
	}

	
	public  final String getValueUTF8(HttpServletRequest request,String parameterName) throws UnsupportedEncodingException {
		String value = request.getParameter(parameterName);
		if(value==null){
			return null;
		}
		value  = encodingUTF8(request, value);
		//else 默认为utf8
		return value;
	}

	private  String encodingUTF8(HttpServletRequest request,String value) throws UnsupportedEncodingException {
		String encoding = request.getCharacterEncoding();
		String result =value;
		if(encoding == null || (!"UTF-8".equalsIgnoreCase(encoding) && !"UTF8".equalsIgnoreCase(encoding)) ){
			result = new String(value.getBytes("ISO8859-1"),"UTF-8");
		}		
		return result;
	}
	


	
	/**
	 * 输出图片
	 * @param response
	 * @param img
	 * @throws IOException
	 */
	 public void printImageToClient(HttpServletResponse response, BufferedImage img)
			throws IOException {
		response.setContentType("image/png");
	    OutputStream os = response.getOutputStream();
		javax.imageio.ImageIO
		 .write(img, "png", os);
	}
	 
	 
	 public void printGifImageToClient(HttpServletResponse response, InputStream in)
				throws IOException {
			response.setContentType("image/gif");
		    OutputStream out = response.getOutputStream();

		    try {
		            byte[] buffer = new byte[1024]; 
		            int count;

		            while ((count = in.read(buffer)) != -1) {
		              out.write(buffer, 0, count);
		            }
		   out.flush();
		    }
		   finally {
		   in.close(); 
		   }


		    out.close();
		}
	 
	 public void printImageToClientbmp(HttpServletResponse response, BufferedImage img)
				throws IOException {
		 
			response.setContentType("image/bmp");
		    OutputStream os = response.getOutputStream();
		    
			javax.imageio.ImageIO.write(img, "bmp", os);
			response.flushBuffer();
			
		}

	double converStringToDouble(String value){
		if(!StringUtils.hasText(value)){
			return 0;
		}
		return Double.parseDouble(value);
	}
	
	public String getBts(String lbsinfo){
		String[] lbsinfo1 = getlbsinfo1(lbsinfo);
		int len = lbsinfo1.length;
		String bts="";
		if(len>=5){
			for(int i=0;i<5;i++){
				bts+=lbsinfo1[i]+",";
			}
		}
		return bts.substring(0,bts.length()-1);
	}
	
	
	public String[] getlbsinfo1(String lbsinfo){
		String[] lbsinfo1 = lbsinfo.split("-");
		int len = lbsinfo1.length;
		for(int i=0;i<len;i++){
			lbsinfo1[i]=Integer.valueOf(lbsinfo1[i],16)+"";
		}
		if(len>=2 && Integer.parseInt(lbsinfo1[1])<10){
			lbsinfo1[1]="0"+Integer.parseInt(lbsinfo1[1]);
		}
		if(Integer.parseInt(lbsinfo1[4])<110){
			lbsinfo1[4]=(Integer.parseInt(lbsinfo1[4])-110)+"";
		}
		if(len>=8){
			lbsinfo1[7]=(Integer.parseInt(lbsinfo1[7])-110)+"";
		}
		if(len>=11){
			lbsinfo1[10]=(Integer.parseInt(lbsinfo1[10])-110)+"";
		}
		if(len>=14){
			lbsinfo1[13]=(Integer.parseInt(lbsinfo1[13])-110)+"";
		}
		if(len>=17){
			lbsinfo1[16]=(Integer.parseInt(lbsinfo1[16])-110)+"";
		}
		if(len>=20){
			lbsinfo1[19]=(Integer.parseInt(lbsinfo1[19])-110)+"";
		}
		return lbsinfo1;
	}
	
	public String getNearbts(String lbsinfo){
		String[] lbsinfo1 = getlbsinfo1(lbsinfo);
		
		int len = lbsinfo1.length;
		String nearbts="";
		String top="";
		if(len>2){
			top=lbsinfo1[0]+","+lbsinfo1[1]+",";
		}
		if(len>=8)
			nearbts=top+lbsinfo1[5]+","+lbsinfo1[6]+","+lbsinfo1[7];
		if(len>=11)
			nearbts=nearbts+"|"+top+lbsinfo1[8]+","+lbsinfo1[9]+","+lbsinfo1[10];
		if(len>=14)
			nearbts=nearbts+"|"+top+lbsinfo1[11]+","+lbsinfo1[12]+","+lbsinfo1[13];
		if(len>=17)
			nearbts=nearbts+"|"+top+lbsinfo1[14]+","+lbsinfo1[15]+","+lbsinfo1[16];
		if(len>=20)
			nearbts=nearbts+"|"+top+lbsinfo1[17]+","+lbsinfo1[18]+","+lbsinfo1[19];
		return nearbts;
	}

	public String getlbsinfo(String lbsinfo){
//		 lbsinfo = "1cc-1-c71-c424-c-c71-e870-b-c71-2673-9-c71-9b52-8";
		
//		if(StringUtils.hasText(lbsinfo)){
			String[] lbsinfo1 = lbsinfo.split("-");
			int len = lbsinfo1.length;
			String lbsinfoNew="";
			for(int i=0;i<len;i++){
				if(i==4 && Integer.valueOf(lbsinfo1[i],16)<110){
					int intensity1 = Integer.valueOf(lbsinfo1[4],16);
					lbsinfo1[4]=Integer.toHexString(intensity1+110).toUpperCase();
					if(len>=8){
						lbsinfo1[7]=Integer.toHexString(Integer.valueOf(lbsinfo1[7],16)+110).toUpperCase();
					}
					if(len>=11){
						lbsinfo1[10]=Integer.toHexString(Integer.valueOf(lbsinfo1[10],16)+110).toUpperCase();
					}
					if(len>=14){
						lbsinfo1[13]=Integer.toHexString(Integer.valueOf(lbsinfo1[13],16)+110).toUpperCase();
					}
					if(len>=17){
						lbsinfo1[16]=Integer.toHexString(Integer.valueOf(lbsinfo1[16],16)+110).toUpperCase();
					}
					if(len>=20){
						lbsinfo1[19]=Integer.toHexString(Integer.valueOf(lbsinfo1[19],16)+110).toUpperCase();
					}
				}
				lbsinfoNew+=lbsinfo1[i]+"-";
			}
			lbsinfoNew = lbsinfoNew.substring(0,lbsinfoNew.length()-1);
			return lbsinfoNew;
//		}else{
//			
//			return "{\"address\":\"\",\"map\":\"baidu\"}";
//		}
		
	}
	
	

}
