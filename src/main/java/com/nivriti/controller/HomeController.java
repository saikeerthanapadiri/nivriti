package com.nivriti.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/panic")
    public String panic() {
        return "panic";
    }

    @GetMapping("/learn")
    public String learn() {
        return "about";
    }

    @GetMapping("/emergency")
    public String emergency() {
        return "emergency";
    }

    @GetMapping("/contacts")
    public String contacts() {
        return "contacts";
    }
}