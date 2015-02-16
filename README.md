dns-react
=========

TODO
====
Make a seperate page/app that handles auth. Idea is:

- `/authed/` protected by http server with http basic auth
- `/` not protected by http auth, presents a login form/basic site

A successful login redirects to authed app/route and sets the header to be sent with all ajax requests.
