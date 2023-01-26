package com.agency.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agency.demo.entities.Annonce;
import com.agency.demo.repositories.AnnonceRepository;

@Service
public class AnnonceService {

  @Autowired
  AnnonceRepository annonceRepository;

  public List<Annonce> findAll() {
    return this.annonceRepository.findAll();
  }

  public Annonce findById(Long id) {
    return this.annonceRepository.findById(id).orElseGet(() -> null);
  }

  public Annonce save(Annonce annonce) {
    return this.annonceRepository.save(annonce);
  }

  public Annonce update(Annonce annonce) {
    Long annonceId = annonce.getId();
    Optional<Annonce> existAnnonce = this.annonceRepository.findById(annonceId);

    if (existAnnonce.isEmpty())
      return null;

    return this.annonceRepository.save(annonce);
  }

  public void delete(Long id) {
    this.annonceRepository.deleteById(id);
  }
}
