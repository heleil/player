package com.player.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


import net.sf.json.JSONObject;

public class ByteUtils {

	public static void realHeartByteCopy(byte[] dst,byte[] src)
	{
		Calendar c = Calendar.getInstance();
		int h = c.get(Calendar.HOUR_OF_DAY);
		int m = c.get(Calendar.MINUTE);
		int s = c.get(Calendar.SECOND);
		int byteoffset = h*3600+m*60+s-src.length;
		
		if(dst!=null && dst.length>0){
			for(int i=0; i< src.length && (i+byteoffset)<dst.length ; i++ )
			{
				dst[i+byteoffset] = src[i];
			}
		}
		else{
			for(int i=0; i< src.length; i++ )
			{
				dst[i+byteoffset] = src[i];
			}
		}
	}
	
	
	 public static final InputStream byte2Input(byte[] buf) {  
	        return new ByteArrayInputStream(buf);  
	    }  
	  
	    public static final byte[] input2byte(InputStream inStream)  
	            {  

	    	Log Logger = LogFactory.getLog(ByteUtils.class);
	    	
	    	byte[] in2b = null;
	    	
	    	ByteArrayOutputStream swapStream = new ByteArrayOutputStream(); 
	    	
	    	try{
	    		
	        
	        byte[] buff = new byte[1024];  
	        int rc = 0;  
	        while ((rc = inStream.read(buff, 0, 100)) > 0) {  
	            swapStream.write(buff, 0, rc);  
	          
	        }  

	        
	    	}catch(Exception e)
	    	{
	    		 Logger.info("read buffer:"+e.getMessage()+","+e.getCause());
	    	}
	    	
	        in2b = swapStream.toByteArray();  
	        
	        Logger.info("read buffer-:"+in2b.length);
	    	
	        return in2b;  
	    }  
	    
	    
	   
	    private static String InterToHexStr(int nv,int len)
	    {
	    	
	    	String str = Integer.toHexString(nv);
	    	
	    	int offset =len-str.length();
	    	
	    	for(int i=0 ; i< offset; i++)
	    	{
	    		str= "0"+str;
	    	}
	    	
	    	
	    	return str;
	    }
	    
	    public static String getBioland_Gprs()
	    {

	    	Date date = new Date();
	    	
	    	String content = "+IP";
	    	
	    	int ip1=115;
	    	int ip2=29;
	    	int ip3=5;
	    	int ip4=227;
	    	int port = 80;
	    	
	    	int sum1=ip1^ip2^ip3^ip4^port;
	    	content+=InterToHexStr(ip1,2)+InterToHexStr(ip2,2)+InterToHexStr(ip3,2)+InterToHexStr(ip4,2)+InterToHexStr(port,4)+InterToHexStr(sum1,2);
	    	
	    	
	    	
	    	int year = date.getYear()%100;
	    	int month =date.getMonth();
	    	int day =date.getDay();
	    	int hour=date.getHours();
	    	int minute = date.getMinutes();
	    	
	    	
	    	
	    	content+=InterToHexStr(year,2)+InterToHexStr(month,2)+
	    			InterToHexStr(day,2)+InterToHexStr(hour,2)+InterToHexStr(minute,2);
	    	
	    	int sum2 = year^month^day^hour^minute;
	    	
	    	content+=InterToHexStr(sum2,2)+"OK";
	    	
	    	content = content.toUpperCase();
	    	

	    	return content;
	    }

	    
	    public static String byte2HexStr(byte[] b)  
	    {  
	        String stmp="";  
	        StringBuilder sb = new StringBuilder("");  
	        for (int n=0;n<b.length;n++)  
	        {  
	            stmp = Integer.toHexString(b[n] & 0xFF);  
	            sb.append((stmp.length()==1)? "0"+stmp : stmp);  
	        }  
	        return sb.toString().toUpperCase().trim();  
	    }  
	      
	    public static String byte2HexStr(byte[] b,int start,int end)  
	    {  
	        String stmp="";  
	        StringBuilder sb = new StringBuilder("");  
	        for (int n=start;n<end;n++)  
	        {  
	            stmp = Integer.toHexString(b[n] & 0xFF);  
	            sb.append((stmp.length()==1)? "0"+stmp : stmp);  
	        }  
	        return sb.toString().toUpperCase().trim();  
	    }  
	       

	    public static byte[] hexStr2Bytes(String srcstr)  
	    {  
	        int m=0,n=0;  
	        
	        String src = srcstr;
	        
	        if(srcstr.length()%2==1)
	        {
	        	src+="0";
	        }
	        
	        int l=src.length()/2;  
	        byte[] ret = new byte[l];  
	        String hex = null;
	        for (int i = 0; i < l; i++)  
	        {  
	            m=i*2+1;  
	            n=m+1;  
	            hex =   src.substring(i*2, m) + src.substring(m,n);
	            int b = Integer.parseInt(hex, 16);
	            ret[i] = (byte) b;  
	        }  
	        return ret;  
	    }  
	    
	    public static byte[] antiLost2unSecert(byte buf[])
	    {

	    	int j=0;
	    	
	    	int count =0;
	    	
	    	for(int i=0 ; i<buf.length-1; i++)
	    	{
	    		if(buf[i]==125 && buf[i+1]<=5 && buf[i+1]>0)
	    		{
	    			count ++;
	    		}
	    	}

	    	byte[]  newbuf= new byte[buf.length-count];
	    	
	    	for(int i=0 ; i<buf.length-1; i++)
	    	{
	    		if(buf[i]==125 && buf[i+1]<=5 && buf[i+1]>0)
	    		{
	    			
	    			if(buf[i+1]==1)
	    			{
	    				newbuf[j]=125;
	    			}
	    			else if(buf[i+1]==2)
	    			{
	    				newbuf[j]=91;
	    			}
	    			else if(buf[i+1]==3)
	    			{
	    				newbuf[j]=93;
	    			}
	    			else if(buf[i+1]==4)
	    			{
	    				newbuf[j]=44;
	    			}
	    			else if(buf[i+1]==5)
	    			{
	    				newbuf[j]=42;
	    			}
	    				
	    			i++;
	    			j++;
	    		}
	    		else
	    		{
	    			newbuf[j]=buf[i];
	    			j++;
	    		}
	    	}
	    	
	    	return newbuf;
	    }

	    
	    
	    
	    public static byte[] antiLost2Secert(byte buf[])
	    {
	    	

	    	int j=0;
	    	int count =0;
	    	
	    	
	    	for(int i=0 ; i<buf.length; i++)
	    	{
	    		if(buf[i]==125 || buf[i]==91 || buf[i]==93|| buf[i]==44 || buf[i]==42)
	    		{
	    			count ++;
	    		}
	    	}

	    	System.out.println("antiLost2Client"+count);
	    	
	    	byte[]  newbuf= new byte[buf.length+count];
	    	
	    	for(int i=0 ; i<buf.length; i++)
	    	{
	    		if(buf[i]==125)
	    		{
	    			newbuf[j]=125;
	    			newbuf[j+1]=1;
	    			j+=2;
	    		}
	    		else if(buf[i]==91)
	    		{
	    			newbuf[j]=125;
	    			newbuf[j+1]=2;	 
	    			j+=2;
	    		}
	    		else if(buf[i]==93)
	    		{
	    			newbuf[j]=125;
	    			newbuf[j+1]=3;	 
	    			j+=2;
	    		}
	    		else if(buf[i]==44)
	    		{
	    			newbuf[j]=125;
	    			newbuf[j+1]=4;	 
	    			j+=2;
	    		}
	    		else if(buf[i]==42)
	    		{
	    			newbuf[j]=125;
	    			newbuf[j+1]=5;	 
	    			j+=2;
	    		}
	    		else
	    		{
	    			newbuf[j]=buf[i];
	    			j+=1;	
	    		}
	    	}
	    	
	

	   
	    	
	    	return newbuf;
	    }

}

