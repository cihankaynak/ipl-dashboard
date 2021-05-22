package io.javabrains.ipl.dashboard.controller;

import io.javabrains.ipl.dashboard.exception.TeamNotFoundException;
import io.javabrains.ipl.dashboard.model.Match;
import io.javabrains.ipl.dashboard.model.Team;
import io.javabrains.ipl.dashboard.repository.MatchRepository;
import io.javabrains.ipl.dashboard.repository.TeamRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin
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
    if (team == null) {
      throw new TeamNotFoundException();
    }
    List<Match> matches = matchRepository.findLatestMatchesByTeam(name, 4);
    team.setMatches(matches);
    return team;
  }

  @GetMapping("/team/{name}/matches")
  public List<Match> getMatchesForTeam(@PathVariable String name, @RequestParam int year) {
    LocalDate startDate = LocalDate.of(year, 1, 1);
    LocalDate endDate = startDate.plusYears(1);
    return matchRepository.findByTeamBetweenDates(name, startDate, endDate);
  }

  @GetMapping("/team")
  public Iterable<Team> getTeams() {
    return teamRepository.findAll();
  }
}
