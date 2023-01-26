package com.agency.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.agency.demo.dtos.auth.AuthRequest;
import com.agency.demo.dtos.auth.AuthResponse;
import com.agency.demo.dtos.auth.RegisterRequest;
import com.agency.demo.entities.Role;
import com.agency.demo.entities.User;
import com.agency.demo.repositories.UserRepository;
import com.agency.demo.security.JwtService;

@Service
public class AuthService {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;
  @Autowired
  private JwtService jwtService;
  @Autowired
  private AuthenticationManager authenticationManager;

  public AuthResponse register(RegisterRequest requestBody) {
    User user = User.builder()
        .firstName(requestBody.getFirstName())
        .lastName(requestBody.getLastName())
        .email(requestBody.getEmail())
        .cin(requestBody.getCin())
        .password(passwordEncoder.encode(requestBody.getPassword()))
        .role(Role.USER)
        .build();

    this.userRepository.save(user);
    String jwtToken = jwtService.generateToken(user);

    return AuthResponse.builder().token(jwtToken).build();
  }

  public AuthResponse login(AuthRequest requestBody) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            requestBody.getEmail(),
            requestBody.getPassword()));
    User user = userRepository.findByEmail(requestBody.getEmail()).orElseThrow();
    String jwtToken = jwtService.generateToken(user);
    return AuthResponse.builder().token(jwtToken).build();
  }
}