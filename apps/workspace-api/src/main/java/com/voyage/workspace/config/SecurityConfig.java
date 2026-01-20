package com.voyage.workspace.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // Autorisierung
                .authorizeHttpRequests(auth -> auth
                        // offen
                        .requestMatchers("/health", "/error").permitAll()

                        // H2-Console nur DEV (siehe extra Bean unten), hier erstmal erlaubt,
                        // wird durch Profile gesteuert
                        .requestMatchers("/h2-console/**").permitAll()

                        // alles unter /api nur eingeloggt
                        .requestMatchers("/api/**").authenticated()

                        // sonst auch nur eingeloggt (Workspace nicht public)
                        .anyRequest().authenticated()
                )

                // Form Login (Session)
                .formLogin(Customizer.withDefaults())

                // Logout ok
                .logout(Customizer.withDefaults());

        // Damit H2 Console im Browser funktioniert:
        http.headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));

        // CSRF: Für H2 Console + einfache curl Tests disable (für internes Tool OK zum Start).
        // Später kann man das feiner machen (nur für /api/** tokenbasiert etc.)
        http.csrf(csrf -> csrf.ignoringRequestMatchers("/h2-console/**", "/login", "/api/**"));
        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * DEV-User: später ersetzt ihr das durch DB-User / Admin Tabelle.
     */
    @Bean
    @Profile("dev")
    UserDetailsService devUsers(PasswordEncoder encoder) {
        UserDetails admin = User.withUsername("admin")
                .password(encoder.encode("admin123!"))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(admin);
    }
}