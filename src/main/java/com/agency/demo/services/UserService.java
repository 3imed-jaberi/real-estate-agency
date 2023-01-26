package com.agency.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.agency.demo.entities.User;
import com.agency.demo.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService {

  @Autowired
  UserRepository userRepository;

  public List<User> findAll() {
    return this.userRepository.findAll();
  }

  public User findById(Long id) {
    return this.userRepository.findById(id).orElseGet(() -> null);
  }

  public User save(User User) {
    return this.userRepository.save(User);
  }

  public User update(User User) {
    Long userId = User.getId();
    Optional<User> existUser = this.userRepository.findById(userId);

    if (existUser.isEmpty()) {
      return null;
    }

    return this.userRepository.save(User);
  }

  public void delete(Long id) {
    this.userRepository.deleteById(id);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return this.userRepository.findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found!"));
  }
}
