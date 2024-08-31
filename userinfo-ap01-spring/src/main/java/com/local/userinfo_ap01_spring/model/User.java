package com.local.userinfo_ap01_spring.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users") // DB上のusersテーブルを使用
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 主キー値を自動生成。PostgreSQLは、関連するテーブルのカラムタイプをSERIALへ。
    private Long id;
    private String name;
    private String address;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}