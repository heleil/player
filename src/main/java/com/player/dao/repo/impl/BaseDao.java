package com.player.dao.repo.impl;


import java.sql.SQLException;

import javax.annotation.Resource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.mysql.jdbc.Statement;


@Repository
public abstract class BaseDao {
	@Resource
	protected JdbcTemplate jdbcTemplate;
	
	public  long count(String sql,Object[] values,int [] types){
		if(values ==null || values.length <1){
			return jdbcTemplate.queryForLong(sql);
		}
		
		return jdbcTemplate.queryForLong(sql,values,types);
		
	}

	
}
