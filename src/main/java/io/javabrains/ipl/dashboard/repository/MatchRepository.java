package io.javabrains.ipl.dashboard.repository;

import io.javabrains.ipl.dashboard.model.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {

  public List<Match> findByTeam1OrTeam2OrderByDateDesc(
      String team1, String team2, Pageable pageable);

  public default List<Match> findLatestMatchesByTeam(String teamName, int count) {
    return findByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0, 4));
  }
}
