#!/usr/bin/python
from subprocess import call

call("cd backend && node app.js", shell=True)
call("cd frontend && npm start", shell=True)

