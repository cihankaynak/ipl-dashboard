package io.javabrains.ipl.dashboard.data;

import io.javabrains.ipl.dashboard.model.Team;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

  private static final Logger log =
      LoggerFactory.getLogger(JobCompletionNotificationListener.class);

  private final EntityManager entityManager;

  @Autowired
  public JobCompletionNotificationListener(EntityManager entityManager) {
    this.entityManager = entityManager;
  }

  @Override
  @Transactional
  public void afterJob(JobExecution jobExecution) {
    if (jobExecution.getStatus() == BatchStatus.COMPLETED) {

      log.info("!!! JOB FINISHED! Creating teams...");
      List<Object[]> teams1 = getMatchesByTeam("team1");
      List<Object[]> teams2 = getMatchesByTeam("team2");
      List<Object[]> allTeams = new ArrayList<>();
      allTeams.addAll(teams1);
      allTeams.addAll(teams2);
      Map<String, Team> teams =
          allTeams.stream()
              .map(row -> new Team((String) row[0], (long) row[1]))
              .collect(
                  Collectors.toMap(
                      Team::getName,
                      Function.identity(),
                      (team1, team2) ->
                          new Team(
                              team1.getName(), team1.getTotalMatches() + team2.getTotalMatches())));
      List<Object[]> winsByTeam = getWinsByTeam();
      winsByTeam.forEach(
          row -> {
            String teamName = (String) row[0];
            Team team = teams.get(teamName);
            if (team != null) {
              team.setTotalWins((long) row[1]);
            }
          });

      log.info("Total teams:{}. Persisting them...", teams.size());
      teams.values().forEach(entityManager::persist);
      List<Team> persistedTeams = getAllTeams();
      log.info("{} teams are persisted. Validating them...", persistedTeams.size());
      persistedTeams.forEach(
          team ->
              log.info(
                  "Team:{} Matches:{} Wins:{}",
                  team.getName(),
                  team.getTotalMatches(),
                  team.getTotalWins()));
    }
  }

  private List<Object[]> getMatchesByTeam(String teamColumn) {
    String query =
        MessageFormat.format(
            "select m.{0}, count(*) from Match m group by m.{1}", teamColumn, teamColumn);
    return entityManager.createQuery(query, Object[].class).getResultList();
  }

  private List<Object[]> getWinsByTeam() {
    return entityManager
        .createQuery(
            "select m.matchWinner, count(*) from Match m group by m.matchWinner", Object[].class)
        .getResultList();
  }

  private List<Team> getAllTeams() {
    return entityManager.createQuery("select t from Team t", Team.class).getResultList();
  }
}
