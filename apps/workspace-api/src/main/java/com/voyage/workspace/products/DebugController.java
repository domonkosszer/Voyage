package com.voyage.workspace;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DebugController {
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}
