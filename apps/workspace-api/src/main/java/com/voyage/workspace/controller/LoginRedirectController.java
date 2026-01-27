package com.voyage.workspace.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginRedirectController {

    @GetMapping("/login-redirect")
    public String loginRedirect(@RequestParam("redirect") String redirect, HttpSession session) {
        session.setAttribute("LOGIN_REDIRECT", redirect);
        return "redirect:/login";
    }
}