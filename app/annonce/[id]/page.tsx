import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { langueActuelle } from "@/src/i18n/langue";
import { t } from "@/src/i18n/textes";
import { prisma } from "@/src/lib/prisma";
import { BoutonRepondre } from "@/src/ui/BoutonRepondre";

export default async function PageAnnonce({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const langue = await langueActuelle();
  const i = t(langue);
  const session = await auth();

  const annonce = await prisma.annonce.findUnique({ where: { id } });
  if (!annonce) notFound();

  const deja = session?.user?.id
    ? await prisma.reponse.findUnique({
        where: {
          annonceId_auteurId: {
            annonceId: id,
            auteurId: session.user.id,
          },
        },
      })
    : null;

  const moi = session?.user?.id;
  const estAuteur = Boolean(moi && moi === annonce.auteurId);

  return (
    <main>
      <p className="hint">
        <Link href="/">{i.marque}</Link>
      </p>
      <h1>{annonce.titre}</h1>
      <p className="lede">
        {annonce.type === "offre" ? i.offre : i.besoinLabel} · {annonce.categorie}
      </p>
      {annonce.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="photo-grande" src={annonce.photoUrl} alt="" />
      ) : null}
      {annonce.detail ? <p>{annonce.detail}</p> : null}
      <p className="hint">{i.hintLieu}</p>
      {!moi ? (
        <Link className="btn btn-primary" href="/connexion">
          {i.connexion}
        </Link>
      ) : estAuteur ? (
        <p className="hint">{i.taAnnonce}</p>
      ) : deja ? (
        <p className="ok">{i.dejaRepondu}</p>
      ) : (
        <BoutonRepondre
          annonceId={annonce.id}
          libelle={annonce.type === "offre" ? i.jePrends : i.jeDonne}
        />
      )}
    </main>
  );
}
