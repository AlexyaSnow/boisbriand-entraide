# Hébergement Pi (canal A)

Le site public `entraideboisbriand.com` passe par Cloudflare Tunnel vers un Raspberry Pi sur le réseau local.

## Qui sert les pages

- Service systemd : `entraide`
- Dossier : `/home/akatsuki/boisbriand-entraide`
- Port local : `3000` (Next.js en production)
- Relance automatique si le process tombe : `Restart=always`

Vérifier :

```bash
sudo systemctl status entraide --no-pager
curl -sI http://127.0.0.1:3000 | head
```

Le site doit répondre. On ne lance **pas** `npx next start` à la main : deux instances se battent pour le port 3000 et le tunnel affiche 502.

## Mise à jour sans casser l’ancien build

Script : `/home/akatsuki/maj-entraide.sh`

1. `git pull`
2. migrations Prisma
3. build dans `.next-new` (l’ancien `.next` reste en service)
4. seulement si `BUILD_ID` existe : on arrête le service, on garde `.next.bak`, on bascule, on redémarre

```bash
~/maj-entraide.sh
```

Retour arrière si le nouveau build refuse de démarrer :

```bash
sudo systemctl stop entraide
rm -rf /home/akatsuki/boisbriand-entraide/.next
mv /home/akatsuki/boisbriand-entraide/.next.bak /home/akatsuki/boisbriand-entraide/.next
sudo systemctl start entraide
```

## Ce qu’il ne faut pas faire

- `pkill` large (`node`, `cloudflared`, `npm`)
- `npx next` depuis `/home/akatsuki` (mauvais lockfile, mauvaise version)
- rebuild dans `.next` pendant que le serveur lit ce dossier
