package com.voyage.workspace.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUsersController {

    private final UserAccountRepository repo;
    private final PasswordEncoder encoder;

    public AdminUsersController(UserAccountRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    public record CreateUserRequest(String username, String password, UserAccount.Role role) {}

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateUserRequest req) {
        if (req.username() == null || req.username().isBlank()) return ResponseEntity.badRequest().body("username required");
        if (req.password() == null || req.password().length() < 6) return ResponseEntity.badRequest().body("password min 6 chars");
        if (repo.findByUsername(req.username()).isPresent()) return ResponseEntity.badRequest().body("username exists");

        UserAccount u = new UserAccount();
        u.setUsername(req.username());
        u.setPasswordHash(encoder.encode(req.password()));
        u.setRole(req.role() == null ? UserAccount.Role.WORKER : req.role());
        u.setActive(true);

        repo.save(u);
        return ResponseEntity.ok("created");
    }

    @PostMapping("/{id}/disable")
    public ResponseEntity<?> disable(@PathVariable Long id) {
        var u = repo.findById(id).orElse(null);
        if (u == null) return ResponseEntity.badRequest().body("unknown id");
        u.setActive(false);
        repo.save(u);
        return ResponseEntity.ok("disabled");
    }
}