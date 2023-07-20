package com.agency.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agency.demo.entities.Commande;
import com.agency.demo.repositories.CommandeRepository;

@Service
public class CommandeService {

  @Autowired
  CommandeRepository commandeRepository;

  public List<Commande> findAll() {
    return this.commandeRepository.findAll();
  }

  public Commande findById(Long id) {
    return this.commandeRepository.findById(id).orElseGet(() -> null);
  }

  public Commande save(Commande commande) {
    return this.commandeRepository.save(commande);
  }

  public Commande update(Commande commande) {
    Long commandeId = commande.getId();
    Optional<Commande> existCommande = this.commandeRepository.findById(commandeId);

    if (existCommande.isEmpty())
      return null;

    return this.commandeRepository.save(commande);
  }

  public void delete(Long id) {
    this.commandeRepository.deleteById(id);
  }
}
