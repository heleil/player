package com.player.util;

import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class FileUtils {
	
	  public static final Log logger = LogFactory.getLog(FileUtils.class);
	public static void main(String args[]) {  
		
		byte[] buff=new byte[12];
		
		writeAudioToFile("/Users/apple/Desktop/record/b/a.amr",buff);
		
	}

	
	 /** 
    * 获得指定文件的byte数组 
    */  
   public static byte[] getBytes(String filePath){  
       byte[] buffer = null;  
       try {  
           File file = new File(filePath);  
           if(!file.exists()){
        	   return null;
           }
           FileInputStream fis = new FileInputStream(file);  
           ByteArrayOutputStream bos = new ByteArrayOutputStream(55500);  
           byte[] b = new byte[1000];  
           int n;  
           while ((n = fis.read(b)) != -1) {  
               bos.write(b, 0, n);  
           }  
           fis.close();  
           bos.close();  
           buffer = bos.toByteArray();  
       } catch (FileNotFoundException e) {  
           e.printStackTrace();
       } catch (IOException e) {  
          e.printStackTrace();
       }  
       return buffer;  
   }  	
	

   public static boolean FileExits(String filename)
   {
	   File file = new File(filename);
	   return file.exists();
   }
	
   public static void FileDel(String filename)
   {
	   File file = new File(filename);
	   	file.delete();
   }
	 
   
	public static void writeToFile(String file,boolean append,byte[] buffer)
	{
		
		if(buffer==null)
		{
			return;
		}
		
		FileOutputStream fos;
		try {
			fos = new FileOutputStream(file,append);
			fos.write(buffer);
			fos.close();
			
		} catch (Exception e) {
			logger.error(e);
		}
	}
	
    /**  
    * 将字节流转换成文件  
    * @param filename  
    * @param data  
    * @throws Exception  
    */    
    public static void saveFile(String filename,byte [] data)throws Exception{     
        if(data != null){     
          String filepath =filename;     
          File file  = new File(filepath);     
          if(file.exists()){     
        	  file.delete();     
          }else {
        	  file.mkdirs();
		}     
          FileOutputStream fos = new FileOutputStream(file);     
          fos.write(data,0,data.length);     
          fos.flush();     
          fos.close();     
        }     
    }    
    public static boolean makeDirs(String filePath) {
    	
         File file = new File(filePath);
    	
        String folderName = file.getParent();
        if (folderName == null || folderName.isEmpty()) {
            return false;
        }

        File folder = new File(folderName);
        return (folder.exists() && folder.isDirectory()) ? true : folder.mkdirs();
    }
	
	public static File writeAudioToFile(String filePath,byte[] buffer)
	{
		BufferedOutputStream bos = null;  
        FileOutputStream fos = null; 
		 File file = null;  
		 
		 //makeDirs(filePath);
		 
	        try {  
	        	file = new File(filePath); 
	        	if (!file.exists()) {
	        		//file.mkdirs();
	    		}
	            fos = new FileOutputStream(file);  
	            bos = new BufferedOutputStream(fos);  
	            bos.write(buffer);  
	        } catch (Exception e) {  
	        	logger.error(e);
	        } finally {  
	            if (bos != null) {  
	                try {  
	                    bos.close();  
	                } catch (IOException e1) {  
	                    e1.printStackTrace();  
	                }  
	            }  
	            if (fos != null) {  
	                try {  
	                    fos.close();  
	                } catch (IOException e1) {  
	                    e1.printStackTrace();  	
	                }  
	            }  
	        }
			return file;
	        
	}
}
