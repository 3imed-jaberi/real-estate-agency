package com.agency.demo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "annonces")
public class Annonce {
  @Id
  @GeneratedValue
  @Column(name = "annonce_id")
  private Long id;
  private Double surface;
  private Byte roomsNumber;
  private String location;
  private Double price;
  private String photoUrl;
  private String description;
  private String phoneNumber;
  private String operation;
  private Boolean available;
}
