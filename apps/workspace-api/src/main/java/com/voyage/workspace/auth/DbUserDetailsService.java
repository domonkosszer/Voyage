package com.voyage.workspace.auth;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DbUserDetailsService implements UserDetailsService {

    private final UserAccountRepository repo;

    public DbUserDetailsService(UserAccountRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAccount u = repo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Unknown user: " + username));

        if (!u.isActive()) {
            throw new UsernameNotFoundException("User disabled: " + username);
        }

        // Spring wants ROLE_ prefix for roles
        var auth = List.of(new SimpleGrantedAuthority("ROLE_" + u.getRole().name()));

        return new org.springframework.security.core.userdetails.User(
                u.getUsername(),
                u.getPasswordHash(),
                auth
        );
    }
}