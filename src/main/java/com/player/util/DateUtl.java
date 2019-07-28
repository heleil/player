package com.player.util;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtl {
	 /**日期格式,精确到月*/  
	  public static final String DEFAULT_DATE = "yyyy-MM";
	  /**日期格式,精确到日*/  
	  public static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";  

	/** 日期格式,精确到分 */
	public static final String DEFAULT_DATETIME_FORMAT = "yyyy-MM-dd HH-mm";

	/** 日期格式,精确到秒 */
	public static final String DEFAULT_DATETIME_FORMAT_SEC = "yyyy-MM-dd HH:mm:ss";
	
	 /***
	  *  日期格式,精确到毫秒数
	  */
	 public static final String DEFAULT_DATETIME_FORMAT_SEC_SSS="yyyy-MM-dd HH:mm:ss SSS" ;
	/**
	 * 字符串设置时间
	 * 
	 * @param dateString
	 * @param fomatString
	 * @return
	 */
	public static Date stringToDate(String dateString, String fomatString) {
		Date date = new Date();
		if (dateString != null && !"".equals(dateString)) {
			SimpleDateFormat sdf = new SimpleDateFormat(fomatString);
			try {
				date = sdf.parse(dateString);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return date;
	}

	/**
	 * 时间格式化
	 * 
	 * @param date
	 * @param fomatString
	 * @return
	 */
	public static String dateToString(Date date, String fomatString) {
		String str = "";
		if (date == null) {
			date = new Date();
		}
		SimpleDateFormat sdf = new SimpleDateFormat(fomatString);
		str = sdf.format(date);
		return str;
	}  
	/**
	 * 
	 * @param 当前时间
	 * @param 返回月
	 * 例如-1返回上一月
	 * @return
	 */
	public static Date getLastDate(Date date,int month) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.MONTH, month);
        return cal.getTime();
    }

	
}
