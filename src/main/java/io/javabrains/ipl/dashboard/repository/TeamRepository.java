package io.javabrains.ipl.dashboard.repository;

import io.javabrains.ipl.dashboard.model.Team;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Long> {

  public Team findByName(String name);
}
