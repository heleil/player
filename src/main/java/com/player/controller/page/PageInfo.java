package com.player.controller.page;

public class PageInfo {

	private long currentPage=1;
	private long totalNumber;
	private long totalPage;
	private  int pageSize =10;
	private  long offset;
	
	public long getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		
		
		this.currentPage = currentPage;
		
		if(this.currentPage<=1)
		{
			this.currentPage=1;
		}
	}
	
	
	public long getTotalNumber() {
		return totalNumber;
	}
	
	
	public void setTotalNumber(long totalNumber) {
		
		long total  = totalNumber/pageSize;
		this.totalNumber = totalNumber;
		
		if(totalNumber%pageSize !=0)
		{
			total+=1;
		}
		
		this.setTotalPage(total);
		
//		if(this.currentPage > this.totalPage)
//		{
//			this.currentPage = this.totalPage;
//		}
		
		this.setOffset((this.currentPage-1)*this.pageSize);
		
		
	}
	public long getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(long totalPage) {
		this.totalPage = totalPage;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public long getOffset() {
		return offset;
	}
	public void setOffset(long offset) {
		
		this.offset = offset;
		
		if(this.offset < 0)
		{
			this.offset = 0;
		}
			
	}
	
	
}
