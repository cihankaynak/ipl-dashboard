package io.javabrains.ipl.dashboard.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Team is not found")
public class TeamNotFoundException extends RuntimeException {}
