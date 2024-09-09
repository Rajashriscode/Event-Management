package com.ems.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.model.Event;
import com.ems.repository.EventRepo;

@Service
public class EventService {

	@Autowired
	private EventRepo eventRepo;
	
	public Event getEvent(int id) {
		return eventRepo.findById(id).get();
	}
	
	public String getEventNameById(int id) {
		return eventRepo.findById(id).get().getName();
	}

	public void addEvent(Event event) {
		eventRepo.save(event);
	}
	
	public List<Event> getAllEvents(){
		return eventRepo.findAll();
	}

	public void updateEvent(Integer eventId, Event event) {
		
		Event storedEvent = eventRepo.findById(eventId).get();
			storedEvent.setCategory(event.getCategory());
		
			storedEvent.setDate(event.getDate());
		
			storedEvent.setDescription(event.getDescription());
		
			storedEvent.setVenue(event.getVenue());
		
			storedEvent.setPrice(event.getPrice());
		
			storedEvent.setName(event.getName());
		
		eventRepo.save(storedEvent);
		
	}
	
	public boolean deleteEvent(Integer eventId) {
		try {
		eventRepo.deleteById(eventId);
		return true;
		}
		catch(Exception exception) {
			System.out.println("error in deleteEvent "+exception.getMessage());
			
		}
		return false;
	}

	public List<Event> getEventsByOragnizer(Integer id) {
		return eventRepo.getEventsCreatedByOrganizer(id);
		
	}

	public String getEventsCount() {
		
		return String.valueOf(eventRepo.count());
	}
	
}
