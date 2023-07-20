package com.agency.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.agency.demo.entities.Commande;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {
}
