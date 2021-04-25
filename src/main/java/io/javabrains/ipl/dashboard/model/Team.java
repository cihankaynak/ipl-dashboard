package io.javabrains.ipl.dashboard.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Team {

  @Id @GeneratedValue private long id;
  private String name;
  private long totalMatches;
  private long totalWins;

  public Team(String name, long totalMatches) {
    setName(name);
    setTotalMatches(totalMatches);
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public long getTotalMatches() {
    return totalMatches;
  }

  public void setTotalMatches(long totalMatches) {
    this.totalMatches = totalMatches;
  }

  public long getTotalWins() {
    return totalWins;
  }

  public void setTotalWins(long totalWins) {
    this.totalWins = totalWins;
  }
}
