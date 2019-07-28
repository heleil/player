package com.player.util;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.TimeZone;

import org.springframework.util.StringUtils;

public class TimeUtils {
	
	public static void main(String[] args) {
		
	
			
			
		System.out.println(getNowTimeFileName());
		System.out.println(getNowTimeFileNameUTC0());

			
			
	}
	
	public static String getDeviceIdTimeByApn(String apn)
	{
		if(StringUtils.hasText(apn))
		{
			if(apn.startsWith("404"))
			{
				java.sql.Timestamp time = new java.sql.Timestamp(
						new java.util.Date().getTime());	
				
				long lnt = time.getTime()-150*1000;
				
				Time t = new Time(lnt);
			
				return t.toString().substring(0, 19);
			}
		}
		else
		{
			java.sql.Timestamp time = new java.sql.Timestamp(
					new java.util.Date().getTime());

			return time.toString().substring(0, 19);
			
			
		}
		
		return null;
	}

	
	public static  String getSQLTime(int offset)
	{
		Calendar now = Calendar.getInstance();
		now.add(Calendar.DATE, offset);		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date currentTime = now.getTime();
		String startTime = sdf.format(currentTime);
		return startTime;
	}
	
	public static String getSqlNowTime()
	{
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String date = df.format(new Date());
		
		return date;
	}
	
	public static String getNowTime()
	{
		
		SimpleDateFormat df = new SimpleDateFormat("yy-MM-dd,HH:mm:ss");
		String date = df.format(new Date());
		
		return date;
	}
	


	public static  String getNowTimeFileName()
	{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

		Date currentTime = new Date();
		String startTime = sdf.format(currentTime);
		return startTime;
	}	

	
	public static  String getNowTimeFileNameUTC0()
	{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		
		TimeZone gmtTime = TimeZone.getTimeZone("GMT");
		sdf.setTimeZone(gmtTime);
		
		Date currentTime = new Date();
		String startTime = sdf.format(currentTime);
		return startTime;
	}	
	
	
	
	
	
	
	public static String getStaAndEnd(){
		
		
//		取时间
		 String staDate = "";
		 String endDate = "";
		 
		 Date date=new Date();//取时间
		 SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		 staDate = formatter.format(date);
		 Calendar calendar = new GregorianCalendar();
		 calendar.setTime(date);
		 calendar.add(calendar.DATE,1);//把日期往后增加一天.整数往后推,负数往前移动
		 date=calendar.getTime(); //这个时间就是日期往后推一天的结果 
		 endDate = formatter.format(date);
//		 结束
		
		
		String staandend=staDate+","+endDate;
		
		
		return staandend;
	}
	
	
	
	
	
public static String getStaAndEnd(String time){
		
		
//		取时间
		 String staDate = "";
		 String endDate = "";
		 
		 SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd");//小写的mm表示的是分钟  
		 java.util.Date date;
		try {
			date = formatter.parse(time);
			 staDate = formatter.format(date);
			 Calendar calendar = new GregorianCalendar();
			 calendar.setTime(date);
			 calendar.add(calendar.DATE,1);//把日期往后增加一天.整数往后推,负数往前移动
			 date=calendar.getTime(); //这个时间就是日期往后推一天的结果 
			 endDate = formatter.format(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
//		 结束
			
		String staandend=staDate+","+endDate;
		
		
		return staandend;
	}
	
	
	public static String getHalfyear(){
		String time="";
		try {
			Date date = new Date(); 
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd"); 
			Calendar calendar = new GregorianCalendar();
			calendar.setTime(date);
			calendar.add(calendar.MONTH, -6); 
			date = calendar.getTime(); 
			time = formatter.format(date); 
		} catch (Exception e) {
			e.printStackTrace();
		}
		return time;
	}
	
	//时间转时间戳
	public static long getLongTime(String s){
		long ts=0l;
		try {  
			if(!StringUtils.hasText(s)){
				return 0;
			}
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = simpleDateFormat.parse(s);
			ts = date.getTime();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ts;
	}
}
