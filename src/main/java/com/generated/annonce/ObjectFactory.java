//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.7 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2023.07.20 at 03:43:24 AM CEST 
//


package com.generated.annonce;

import javax.xml.bind.annotation.XmlRegistry;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.generated.annonce package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {


    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.generated.annonce
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link AnnonceResponse }
     * 
     */
    public AnnonceResponse createAnnonceResponse() {
        return new AnnonceResponse();
    }

    /**
     * Create an instance of {@link AnnonceDetails }
     * 
     */
    public AnnonceDetails createAnnonceDetails() {
        return new AnnonceDetails();
    }

    /**
     * Create an instance of {@link AnnonceRequest }
     * 
     */
    public AnnonceRequest createAnnonceRequest() {
        return new AnnonceRequest();
    }

}