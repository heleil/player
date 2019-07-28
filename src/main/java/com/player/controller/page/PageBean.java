package com.player.controller.page;

import java.util.List;


public class  PageBean<T> {
	private int currentPage;
	private long totalNumber;
	private long totalPage;
	private int pageSize =10;
	private List<T> datas;

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public long getTotalNumber() {
		return totalNumber;
	}

	public void setTotalNumber(long totalNumber) {
		this.totalNumber = totalNumber;
	}

	public long getTotalPage() {
		if(totalNumber ==0){
			totalPage=0;
		}
		if(totalNumber%pageSize==0){
			totalPage = totalNumber/pageSize;
		}else{
			totalPage = totalNumber/pageSize+1;		
		}
		return totalPage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public List<T> getDatas() {
		return datas;
	}

	public void setDatas(List<T> datas) {
		this.datas = datas;
	}

	
	
}
