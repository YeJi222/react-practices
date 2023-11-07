package com.poscodx.emaillist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.poscodx.emaillist.dto.JsonResult;
import com.poscodx.emaillist.repository.EmaillistRepository;
import com.poscodx.emaillist.vo.EmaillistVo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class ApiController {
	@Autowired
	private EmaillistRepository emaillistRepository;
	
	@GetMapping("/api")
	public ResponseEntity<JsonResult> read() {
		log.info("Request[GET /api]");
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(emaillistRepository.findAll()));
	}
	
	@PostMapping("/api")
	@ResponseBody
	public ResponseEntity<JsonResult> create(@RequestBody EmaillistVo EmaillistVo) {
		log.info("Request[POST /api]:" + EmaillistVo);
		
		Long no = emaillistRepository.insert(EmaillistVo);
		EmaillistVo.setNo(no);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(EmaillistVo));
	}
}
