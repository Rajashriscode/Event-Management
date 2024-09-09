package com.ems.repository;


import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ems.model.EventCategory;

@Repository
public interface EventCategoryRepo extends JpaRepository<EventCategory, Integer> {

	EventCategory findByCategory(String category);
	
//    @Modifying
//	@Query(value = "delete FROM event_category g where g.category_id=?1", nativeQuery = true)
//    void deleteCategory(String name);

	@Modifying
	@Query(value = "insert into event_db.event_category(category) values ('fffff')", nativeQuery = true)
    void deleteCategory(String name);
}
