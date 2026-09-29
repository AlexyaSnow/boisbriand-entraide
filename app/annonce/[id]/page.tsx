import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { estAdmin } from "@/src/domain/admin";
import { langueActuelle } from "@/src/i18n/langue";
import { t } from "@/src/i18n/textes";
import { prisma } from "@/src/lib/prisma";
import { BoutonRepondre } from "@/src/ui/BoutonRepondre";
import { BoutonAccepter } from "@/src/ui/BoutonAccepter";
import { BoutonSupprimer } from "@/src/ui/BoutonSupprimer";
import { Vignette } from "@/src/ui/Vignette";

export default async function PageAnnonce({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const langue = await langueActuelle();
  const i = t(langue);
  const session = await auth();
  const admin = estAdmin(session?.user?.email, process.env.ADMIN_EMAILS || "");

  const annonce = await prisma.annonce.findUnique({
    where: { id },
    include: {
      reponses: { include: { auteur: true }, orderBy: { createdAt: "asc" } },
      echange: true,
    },
  });
  if (!annonce) notFound();

  const moi = session?.user?.id;
  const estAuteur = Boolean(moi && moi === annonce.auteurId);
  const deja = moi
    ? annonce.reponses.find((r) => r.auteurId === moi)
    : null;

  return (
    <main>
      <p className="hint">
        <Link href="/">{i.marque}</Link>
      </p>
      <h1>{annonce.titre}</h1>
      <p className="lede">
        {annonce.type === "offre" ? i.offre : i.besoinLabel}
        {annonce.statut === "reservee" ? " · réservée" : ""}
      </p>
      <Vignette src={annonce.photoUrl} grande />
      {annonce.detail ? <p>{annonce.detail}</p> : null}
      <p className="hint">{i.hintLieu}</p>

      {annonce.echange ? (
        <p className="ok">
          Jeton créé.{" "}
          <Link href={`/echange/${annonce.echange.jeton}`}>Ouvrir l’échange</Link>
        </p>
      ) : !moi ? (
        <Link className="btn btn-primary" href="/connexion">
          {i.connexion}
        </Link>
      ) : estAuteur ? (
        <>
          <p className="hint">{i.taAnnonce}</p>
          {annonce.reponses.length === 0 ? (
            <p className="hint">Aucune réponse pour l’instant.</p>
          ) : (
            <ul className="liste">
              {annonce.reponses.map((r) => (
                <li className="point" key={r.id}>
                  <span className="nom">{r.auteur.name || r.auteur.email}</span>
                  <span className="meta">Réponse reçue</span>
                  <div style={{ marginTop: "0.8rem" }}>
                    <BoutonAccepter reponseId={r.id} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : deja ? (
        <p className="ok">{i.dejaRepondu}</p>
      ) : (
        <BoutonRepondre
          annonceId={annonce.id}
          libelle={annonce.type === "offre" ? i.jePrends : i.jeDonne}
        />
      )}

      {admin ? (
        <div style={{ marginTop: "1.5rem" }}>
          <BoutonSupprimer id={annonce.id} />
        </div>
      ) : null}
    </main>
  );
}
