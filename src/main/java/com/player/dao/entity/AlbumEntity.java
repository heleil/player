package com.player.dao.entity;

import java.util.List;

import net.sf.json.JSONObject;

public class AlbumEntity {
	public String albumId;
	public String favoriteId;
	public String name;
	public String description;
	public int total;
	public String imgThrumb;
	public String imgLarge;
	public String type;
	public List<String> tags;
	
	
	public String getAlbumId() {
		return albumId;
	}
	public void setAlbumId(String albumId) {
		this.albumId = albumId;
	}
	public String getFavoriteId() {
		return favoriteId;
	}
	public void setFavoriteId(String favoriteId) {
		this.favoriteId = favoriteId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public String getImgThrumb() {
		return imgThrumb;
	}
	public void setImgThrumb(String imgThrumb) {
		this.imgThrumb = imgThrumb;
	}
	public String getImgLarge() {
		return imgLarge;
	}
	public void setImgLarge(String imgLarge) {
		this.imgLarge = imgLarge;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public List<String> getTags() {
		return tags;
	}
	public void setTags(List<String> tags) {
		this.tags = tags;
	} 
	
	public JSONObject toJson()
	{
		return null;
	}
	
}
