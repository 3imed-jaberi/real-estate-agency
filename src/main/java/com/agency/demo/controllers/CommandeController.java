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

import com.agency.demo.entities.Commande;
import com.agency.demo.services.CommandeService;

@RestController
@RequestMapping("/api/v1/commandes")
public class CommandeController {

  @Autowired
  CommandeService commandeservice;

  @GetMapping()
  public ResponseEntity<List<Commande>> handleGetAllcommandesRequest() {
    List<Commande> result = this.commandeservice.findAll();
    if (result.isEmpty()) {
      return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
    }

    return new ResponseEntity<>(result, HttpStatus.OK);
  }

  @GetMapping("/{CommandeId}")
  public ResponseEntity<Commande> handleGetSinglecommandeRequest(@PathVariable Long commandeId) {
    Commande result = this.commandeservice.findById(commandeId);
    if (result == null) {
      return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(result, HttpStatus.OK);
  }

  @PostMapping()
  public ResponseEntity<Commande> handleCreateCommandeRequest(@RequestBody Commande Commande) {
    Commande result = this.commandeservice.save(Commande);
    return new ResponseEntity<>(result, HttpStatus.CREATED);
  }

  @PutMapping(value = "/{commandeId}")
  public ResponseEntity<Commande> handleUpdatecommandeRequest(
      @PathVariable Long commandeId,
      @RequestBody Commande commande) {
    commande.setId(commandeId);
    Commande result = this.commandeservice.update(commande);
    if (result == null) {
      return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(result, HttpStatus.OK);
  }

  @DeleteMapping(value = "/{commandeId}")
  public ResponseEntity<Commande> handleDeletecommandeRequest(@PathVariable Long commandeId) {
    this.commandeservice.delete(commandeId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
