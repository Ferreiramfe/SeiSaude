package server.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import server.entities.Componente;
import server.entities.Elemento;
import server.entities.DTOs.AlimentoDTO;
import server.entities.DTOs.ComponenteDTO;
import server.entities.DTOs.ElementoDTO;
import server.entities.DTOs.ProdutoDTO;
import server.servicies.ElementoService;

@RestController
public class ElementoController {

	@Autowired
	private ElementoService elementoService;
	
/*	@RequestMapping(value = "/elemento", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Elemento> cadastraElemento(@RequestBody ElementoDTO elemento, ComponenteDTO componente, ValorNutricionalDTO valorNutricional) {

		return new ResponseEntity<>(elementoService.save(elemento, componente, valorNutricional), HttpStatus.CREATED);
	}*/
	
	@RequestMapping(value = "/elemento/comportamento", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Elemento> cadastraComportamento(@RequestBody ElementoDTO elemento) {
		if (elementoService.elementoInDataBase(elemento.getName())) {
			return new ResponseEntity<>(HttpStatus.MULTIPLE_CHOICES);
		}
		
		return new ResponseEntity<>(elementoService.save(elemento), HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/elemento/remedio", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Elemento> cadastraRemedio(@RequestBody ProdutoDTO remedio) {
		if (elementoService.elementoInDataBase(remedio.getName())) {
			return new ResponseEntity<>(HttpStatus.MULTIPLE_CHOICES);
		}
		
		return new ResponseEntity<>(elementoService.save(remedio), HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/elemento/alimento", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Elemento> cadastraAlimento(@RequestBody AlimentoDTO alimento) {
		if (elementoService.elementoInDataBase(alimento.getName())) {
			return new ResponseEntity<>(HttpStatus.MULTIPLE_CHOICES);
		}
		
		return new ResponseEntity<>(elementoService.save(alimento), HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/elemento", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<Elemento>> getElementosByName(@RequestParam(value = "name")  String search) { 
		return new ResponseEntity<ArrayList<Elemento>>(elementoService.findByName(search), HttpStatus.OK);
	}

	@RequestMapping(value = "/all_elemento", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<Elemento>> getAllElementos() { 
		return new ResponseEntity<ArrayList<Elemento>>((ArrayList<Elemento>) elementoService.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/elemento/componente")
	public ResponseEntity<ArrayList<Componente>> getComponentesByName(@RequestParam(value = "name") String name) { 
		return new ResponseEntity<ArrayList<Componente>>(elementoService.findComponenteByName(name), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/elemento/componente", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Object> cadastraComponente(@RequestBody ComponenteDTO componente) {
		String[] result = elementoService.componenteInDataBase(componente.getNomeComponente());
		if (result.length > 0) {
			return new ResponseEntity<>(result, HttpStatus.MULTIPLE_CHOICES);
		}
		
		return new ResponseEntity<>(elementoService.saveComponente(componente), HttpStatus.CREATED);
	}
}
