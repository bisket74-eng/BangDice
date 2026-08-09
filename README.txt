BANG! DICE — Local Bot Edition (installable web app)
====================================================

WHAT'S IN HERE
  index.html      the whole game (single file, no build step)
  supabase.sql    run this once in the Supabase SQL editor
  manifest.json   app name, colors, icons — what makes it installable
  sw.js           service worker, caches everything for offline play
  icons/          two round icon designs, each in several sizes

TURNING ON MULTIPLAYER
  1. Supabase dashboard > SQL Editor > New query. Paste all of
     supabase.sql and hit Run. It creates bang_rooms and bang_players,
     opens them to anon, and adds them to the realtime publication.
  2. Nothing else — your project URL and publishable key are already
     filled in near the top of the script in index.html:

       https://ghnuahsovbpyzrjvbylp.supabase.co

     If you ever move the game to a different project, those are the
     only two lines to change.

  HOW A GAME RUNS
    The host's phone runs the game engine — the same code as solo play,
    untouched. It deals roles, rolls the dice, runs the bots, and pushes
    a snapshot of the table to everyone after each change. Guests draw
    that snapshot and send their taps back. Nothing is ever decided
    twice, so the rules cannot drift between phones.

    Empty seats still become bots at start, so a 6-player table with
    three humans works fine.

    One honest caveat: secret roles travel over a shared realtime
    channel addressed to one player. The app hides other people's roles,
    but someone determined enough to open the browser console could read
    a message meant for another seat. It is a kitchen-table game, not a
    tournament server.

    If the host closes the app, the table ends. Guests get a notice.

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
