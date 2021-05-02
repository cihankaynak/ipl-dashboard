package io.javabrains.ipl.dashboard.controller;

import io.javabrains.ipl.dashboard.model.Match;
import io.javabrains.ipl.dashboard.model.Team;
import io.javabrains.ipl.dashboard.repository.MatchRepository;
import io.javabrains.ipl.dashboard.repository.TeamRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TeamController {

  private TeamRepository teamRepository;

  private MatchRepository matchRepository;

  public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
    this.teamRepository = teamRepository;
    this.matchRepository = matchRepository;
  }

  @GetMapping("/team/{name}")
  public Team getTeam(@PathVariable String name) {
    Team team = teamRepository.findByName(name);
    List<Match> matches = matchRepository.findLatestMatchesByTeam(name, 4);
    team.setMatches(matches);
    return team;
  }
}
