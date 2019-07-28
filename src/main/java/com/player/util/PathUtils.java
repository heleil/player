package com.player.util;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class PathUtils {

	public static String replaceWindowSeperators(String path) {
		return path.replaceAll("\\\\", "/");
	}
	
	public static String getProjectDir(){
		String path = System.getProperty("user.dir");
		return replaceWindowSeperators(path);		
	}

	/**
	 * 获得文件或文件夹路径. 有时候是绝对文件路径，有时候是classpath，用此方法一劳永逸解决问题。
	 * @param abspathOrClasspath
	 * @return
	 * @throws IOException
	 */
	public static File getFileByAbspathOrClasspath(String abspathOrClasspath)  {
		try{
			File f = null;
			if(abspathOrClasspath.startsWith("classpath:")){
				abspathOrClasspath = abspathOrClasspath.replace("classpath:", "");
				if( ! abspathOrClasspath.startsWith("/")){
					abspathOrClasspath = "/" + abspathOrClasspath;
				}
				abspathOrClasspath = "." + abspathOrClasspath;
				f = new File( PathUtils.class.getClassLoader().getResource(abspathOrClasspath).toURI() );			
			}else if(abspathOrClasspath.startsWith("file:")){
				abspathOrClasspath = abspathOrClasspath.replace("file:", "");
				f = new File(abspathOrClasspath);
			}else{
				//默认为file
				f = new File(abspathOrClasspath);
			}
			return f;
		}catch(Exception e){
			throw new RuntimeException(e);
		}
	}

	public static final String removeLast(String str) {
		if (str == null) {
			return null;
		}
		return str.substring(0, str.length() - 1);
	}

	public static final String removeLastSlash(String str) {
		if (str == null) {
			return null;
		}
		if( ! str.endsWith("/")){
			return str;
		}
		
		return str.substring(0, str.length() - 1);
	}
	public static String createTimemillisFileUnder(String parent,String ext) throws IOException{
		String path = parent + "/" + System.currentTimeMillis() + "." + ext;
		return createFileIfNot(path).getAbsolutePath();
	}

	public static final File createParentDirIfNot(String path) throws IOException {
		File fpath = new File(path);
		File parent = fpath.getParentFile();
		if( ! parent.exists()){
			parent.mkdirs();
		}
		return parent;
	}

	public static final File createFileIfNot(String path) throws IOException {
		createParentDirIfNot(path);
		File f = new File(path);
		if( ! f.exists()){
			f.createNewFile();
		}
		return f;
	}

	public static final File getPathOrCreate(String path) throws IOException {
		File fpath = new File(path);
		if (!fpath.exists()) {
			fpath.mkdirs();
		}
		return fpath;
	}

	public static final String joinPath(String prefix, String path) {
		prefix = replaceWindowSeperators(prefix);
		path = replaceWindowSeperators(path);

		if (prefix.endsWith("/")) {
			prefix = removeLast(prefix);
		}
		if (path.startsWith("/")) {
			path = removeLeading(path);
		}

		return prefix + "/" + path;
	}

	public static final String removeLeading(String str) {
		if (str == null) {
			return null;
		}

		return str.substring(1);
	}
	public static List<String> getFilePathUnderDir(File rootDir) {
		List<String> alist = new ArrayList<String>();
		File[] fs = rootDir.listFiles();
		for (File f : fs) {
			if (f.isFile()) {
				alist.add(replaceWindowSeperators(f.getAbsolutePath()));
			} else {
				String dname = f.getName();
				if (".svn".equalsIgnoreCase(dname)
						|| ".cvs".equalsIgnoreCase(dname)) {
					continue;
				}
				addAllFiles(alist, f);
			}
		}
		return alist;
	}

	/**
	 * .svn, .cvs 的文件夹不用遍历
	 * 
	 * @param alist
	 * @param dir
	 * @throws Exception
	 */
	public static void addAllFiles(List<String> alist, File dir) {
		File[] fs = dir.listFiles();
		if (fs != null) {
			for (File f : fs) {
				if (f.isDirectory()) {
					String dname = f.getName();
					if (".svn".equalsIgnoreCase(dname)
							|| ".cvs".equalsIgnoreCase(dname)) {
						continue;
					}
					addAllFiles(alist, f);
				} else {
					alist.add(replaceWindowSeperators(f.getAbsolutePath()));
				}
			}
		}
	}
	public static List<String> getFilePathUnderDir(String rootPath) {
		File rootDir = new File(rootPath);
		return getFilePathUnderDir(rootDir);
	}
	/**
	 * 例如， /tmp/f1_sssss.jpg 会得到 f1_sssss.jpg 不考虑windows的情况 :-)。
	 * 
	 * @param file_path
	 * @return
	 */
	public static final String getFileName(String file_path) {
		int c = file_path.lastIndexOf("/");
		return file_path.substring(c + 1);
	}
}
