package server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import server.entities.Paciente;

public interface PacienteRepository  extends JpaRepository<Paciente, Long> {

}
