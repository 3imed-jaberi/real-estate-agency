package com.agency.demo.soap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import com.agency.demo.entities.Annonce;
import com.agency.demo.services.AnnonceService;
import com.generated.annonce.AnnonceDetails;
import com.generated.annonce.AnnonceRequest;
import com.generated.annonce.AnnonceResponse;

@Endpoint
public class AnnonceEndpoint {

	private static final String NAMESPACE_URI = "http://www.generated.com/annonce";

	private AnnonceService annonceService;

	@Autowired
	public AnnonceEndpoint(AnnonceService annonceService) {
		this.annonceService = annonceService;
	}

	@PayloadRoot(namespace = NAMESPACE_URI, localPart = "AnnonceRequest")
	@ResponsePayload
	public AnnonceResponse getAnnonce(@RequestPayload AnnonceRequest request) {
		Long requestedID = Long.parseLong(request.getId());
		Annonce foundedAnnonce = annonceService.findById(requestedID);

		AnnonceResponse response = new AnnonceResponse();

		if (foundedAnnonce == null) {
			response.setAnnonceDetails(null);
			return response;
		}

		AnnonceDetails shippedAnnonce = new AnnonceDetails();
		shippedAnnonce.setId(foundedAnnonce.getId().toString());
		shippedAnnonce.setSurface(foundedAnnonce.getSurface().toString());
		shippedAnnonce.setRoomsNumber(foundedAnnonce.getRoomsNumber().toString());
		shippedAnnonce.setLocation(foundedAnnonce.getLocation());
		shippedAnnonce.setPrice(foundedAnnonce.getPrice().toString());
		shippedAnnonce.setPhotoUrl(foundedAnnonce.getPhotoUrl());
		shippedAnnonce.setDescription(foundedAnnonce.getDescription());
		shippedAnnonce.setPhoneNumber(foundedAnnonce.getPhoneNumber());
		shippedAnnonce.setOperation(foundedAnnonce.getOperation());
		shippedAnnonce.setAvailable(foundedAnnonce.getAvailable().toString());

		response.setAnnonceDetails(shippedAnnonce);
		return response;
	}
}