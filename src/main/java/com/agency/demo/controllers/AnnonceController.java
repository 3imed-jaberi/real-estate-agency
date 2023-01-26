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

import com.agency.demo.entities.Annonce;
import com.agency.demo.services.AnnonceService;

@RestController
@RequestMapping("/api/v1/annonces")
public class AnnonceController {

  @Autowired
  AnnonceService annonceService;

  @GetMapping()
  public ResponseEntity<List<Annonce>> handleGetAllAnnoncesRequest() {
    List<Annonce> result = this.annonceService.findAll();
    if (result.isEmpty()) {
      return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
    }

    return new ResponseEntity<>(result, HttpStatus.OK);
  }

  @GetMapping("/{annonceId}")
  public ResponseEntity<Annonce> handleGetSingleAnnonceRequest(@PathVariable Long annonceId) {
    Annonce result = this.annonceService.findById(annonceId);
    if (result == null) {
      return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(result, HttpStatus.OK);
  }

  @PostMapping()
  public ResponseEntity<Annonce> handleCreateAnnonceRequest(@RequestBody Annonce annonce) {
    Annonce result = this.annonceService.save(annonce);
    return new ResponseEntity<>(result, HttpStatus.CREATED);
  }

  @PutMapping(value = "/{annonceId}")
  public ResponseEntity<Annonce> handleUpdateAnnonceRequest(
      @PathVariable Long annonceId,
      @RequestBody Annonce annonce) {
    annonce.setId(annonceId);
    Annonce result = this.annonceService.update(annonce);
    if (result == null) {
      return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(result, HttpStatus.OK);
  }

  @DeleteMapping(value = "/{annonceId}")
  public ResponseEntity<Annonce> handleDeleteAnnonceRequest(@PathVariable Long annonceId) {
    this.annonceService.delete(annonceId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
