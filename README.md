Tasks to do:
-add button and service to update hero's phtoos
-migrate to Redux

...
-migrate project on TS

Troubleshooting
"/dev/tty: No such a device or address"
If, when deploying, you get /dev/tty: No such a device or address or a similar error, try the following:

Create a new Personal Access Token https://github.com/settings/tokens
git remote set-url origin https://<user>:<token>@github.com/<user>/<repo> .
Try npm run deploy again

"Cannot read property 'email' of null"
If, when deploying, you get Cannot read property 'email' of null, try the following:

git config --global user.name '<your_name>'
git config --global user.email '<your_email>'
Try npm run deploy again