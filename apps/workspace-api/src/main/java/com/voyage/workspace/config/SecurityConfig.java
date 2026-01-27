package com.voyage.workspace.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/health", "/error", "/login", "/login-redirect").permitAll()
                .requestMatchers("/h2-console/**").permitAll()

                // Admin-only user management
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // Everything else under /api requires login
                .requestMatchers("/api/**").authenticated()

                // Workspace should not be public
                .anyRequest().authenticated()
        );

        // IMPORTANT: For API calls, return 401 instead of redirecting to /login (HTML)
        http.exceptionHandling(ex -> ex
                .defaultAuthenticationEntryPointFor(
                        new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
                        request -> request.getRequestURI() != null && request.getRequestURI().startsWith("/api/")
                )
        );

        http.formLogin(form -> form
                .successHandler((request, response, authentication) -> {
                    String target = request.getParameter("redirect");
                    if (target == null) {
                        Object saved = request.getSession().getAttribute("LOGIN_REDIRECT");
                        if (saved != null) target = saved.toString();
                    }

                    boolean allowed = target != null && target.startsWith("http://localhost:3000/");
                    response.sendRedirect(allowed ? target : "http://localhost:3000/admin");
                })
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