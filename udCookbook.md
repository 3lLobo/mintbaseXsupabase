# Unstoppable Domains Cookbook

In this context the client is your web site.

Client management via this [dashboard](https://dashboard.auth.unstoppabledomains.com/)

Steps:
- Set the redirect to the auth page.
- trigger login via `await uauth.loginWithPopup()`.
- retrieve user domain name via localstorage `JSON.parse(localStorage.username).value`.
