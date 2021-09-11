import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";

export default function AuthNav() {
  return (
    <div className={styles.AuthNav}>
      <NavLink
        to="/register"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Registration
      </NavLink>

      <NavLink
        to="/login"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Log In
      </NavLink>
    </div>
  );
}