package com.agency.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.agency.demo.entities.Annonce;

@Repository
public interface AnnonceRepository extends JpaRepository<Annonce, Long> {
}
