BANG! DICE — Local Bot Edition (installable web app)
====================================================

WHAT'S IN HERE
  index.html      the whole game (single file, no build step)
  manifest.json   app name, colors, icons — what makes it installable
  sw.js           service worker, caches everything for offline play
  icons/          two round icon designs, each in several sizes

THE TWO ICONS
  icon-bang-*.png   the badge: gold sheriff star over a red BANG! banner
  icon-die-*.png    the medallion: bullseye die over crossed arrows
  *-maskable-*.png  same art padded for Android's adaptive icon crop

  The badge is set as the default in manifest.json. To use the medallion
  instead, open manifest.json and swap "icon-bang-" for "icon-die-" in the
  icons list, and do the same in the <link rel="icon"> tags in index.html.

INSTALLING IT
  A service worker needs http(s), so it must be served, not opened from the
  file system. Easiest route:

  GitHub Pages
    1. Put all of these files in a repo (keep the folder structure).
    2. Settings > Pages > deploy from your branch, root folder.
    3. Open the URL on your phone.

  Local test on your own machine
    cd into this folder, then:  python3 -m http.server 8000
    open http://localhost:8000

  Then on the phone:
    Android/Chrome — menu (three dots) > Add to Home screen / Install app
    iPhone/Safari  — Share > Add to Home Screen

  It launches full screen with no browser chrome, and plays offline once
  it has loaded a first time.

UPDATING LATER
  Browsers hold onto the cached copy. After you edit index.html, bump the
  version at the top of sw.js (bang-dice-v1 -> bang-dice-v2) so the old
  cache is thrown away and everyone picks up the new build.
