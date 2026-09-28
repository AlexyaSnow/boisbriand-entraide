import { connexionGoogle } from "@/src/actions/session";
import { langueActuelle } from "@/src/i18n/langue";
import { t } from "@/src/i18n/textes";

export default async function PageConnexion() {
  const langue = await langueActuelle();
  const i = t(langue);
  return (
    <main>
      <h1>{i.connexionTitre}</h1>
      <p className="lede">{i.connexionLede}</p>
      <form action={connexionGoogle}>
        <button className="btn btn-primary" type="submit">
          {i.connexionGoogle}
        </button>
      </form>
    </main>
  );
}
