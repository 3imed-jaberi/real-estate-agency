package com.agency.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agency.demo.entities.User;
import com.agency.demo.services.UserService;

import io.swagger.annotations.ApiImplicitParam;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

  @Autowired
  UserService userService;

  @GetMapping()
  @ApiImplicitParam(name = "Authorization", value = "Access Token", required = true, allowEmptyValue = false, paramType = "header", example = "Bearer access_token")
  public ResponseEntity<List<User>> handleGetAllUsersRequest() {
    List<User> result = this.userService.findAll();
    if (result.isEmpty()) {
      return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
    }

    return new ResponseEntity<>(result, HttpStatus.OK);
  }

  @GetMapping("/{userId}")
  @ApiImplicitParam(name = "Authorization", value = "Access Token", required = true, allowEmptyValue = false, paramType = "header", example = "Bearer access_token")
  public ResponseEntity<User> handleGetSingleUserRequest(@PathVariable Long userId) {
    User result = this.userService.findById(userId);
    if (result == null) {
      return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(result, HttpStatus.OK);
  }

  @PostMapping()
  @ApiImplicitParam(name = "Authorization", value = "Access Token", required = true, allowEmptyValue = false, paramType = "header", example = "Bearer access_token")
  public ResponseEntity<User> handleCreateUserRequest(@RequestBody User User) {
    User result = this.userService.save(User);
    return new ResponseEntity<>(result, HttpStatus.CREATED);
  }

  @PutMapping(value = "/{userId}")
  @ApiImplicitParam(name = "Authorization", value = "Access Token", required = true, allowEmptyValue = false, paramType = "header", example = "Bearer access_token")
  public ResponseEntity<User> handleUpdateUserRequest(
      @PathVariable Long userId,
      @RequestBody User User) {
    User.setId(userId);
    User result = this.userService.update(User);
    if (result == null) {
      return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(result, HttpStatus.OK);
  }

  @DeleteMapping(value = "/{userId}")
  @ApiImplicitParam(name = "Authorization", value = "Access Token", required = true, allowEmptyValue = false, paramType = "header", example = "Bearer access_token")
  public ResponseEntity<User> handleDeleteUserRequest(@PathVariable Long userId) {
    this.userService.delete(userId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
