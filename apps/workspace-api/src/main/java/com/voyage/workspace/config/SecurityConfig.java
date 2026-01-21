package com.voyage.workspace.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/health", "/error").permitAll()
                .requestMatchers("/h2-console/**").permitAll()

                // Admin-only user management
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // Everything else under /api requires login
                .requestMatchers("/api/**").authenticated()

                // Workspace should not be public
                .anyRequest().authenticated()
        );

        http.formLogin(form -> form
                .defaultSuccessUrl("http://localhost:3000/", true)
        );

        http.logout(logout -> logout
                .logoutUrl("/logout")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .logoutSuccessUrl("http://localhost:3000/login")
                .permitAll()
        );

        http.headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));

        // Dev/testing convenience: allow curl + UI without CSRF tokens
        http.csrf(csrf -> csrf.ignoringRequestMatchers(
                "/h2-console/**",
                "/login",
                "/logout",
                "/api/**"
        ));

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}