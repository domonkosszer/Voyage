package com.voyage.workspace.auth;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class AuthSeed implements CommandLineRunner {

    private final UserAccountRepository repo;
    private final PasswordEncoder encoder;

    public AuthSeed(UserAccountRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        repo.findByUsername("admin").orElseGet(() -> {
            UserAccount u = new UserAccount();
            u.setUsername("admin");
            u.setPasswordHash(encoder.encode("admin123!"));
            u.setRole(UserAccount.Role.ADMIN);
            u.setActive(true);
            return repo.save(u);
        });
    }
}
