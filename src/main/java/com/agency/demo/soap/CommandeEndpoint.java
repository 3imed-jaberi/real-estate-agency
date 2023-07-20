package com.agency.demo.soap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import com.agency.demo.entities.Commande;
import com.agency.demo.services.CommandeService;
import com.generated.commande.CommandeDetails;
import com.generated.commande.CommandeRequest;
import com.generated.commande.CommandeResponse;

@Endpoint
public class CommandeEndpoint {

	private static final String NAMESPACE_URI = "http://www.generated.com/commande";

	private CommandeService commandeService;

	@Autowired
	public CommandeEndpoint(CommandeService commandeService) {
		this.commandeService = commandeService;
	}

	@PayloadRoot(namespace = NAMESPACE_URI, localPart = "CommandeRequest")
	@ResponsePayload
	public CommandeResponse getcommande(@RequestPayload CommandeRequest request) {
		Long requestedID = Long.parseLong(request.getId());
		Commande foundedCommande = commandeService.findById(requestedID);

		CommandeResponse response = new CommandeResponse();

		if (foundedCommande == null) {
			response.setCommandeDetails(null);
			return response;
		}

		CommandeDetails cmd = new CommandeDetails();
		cmd.setId(foundedCommande.getId().toString());
		cmd.setTitle(foundedCommande.getTitle().toString());

		response.setCommandeDetails(cmd);
		return response;
	}
}