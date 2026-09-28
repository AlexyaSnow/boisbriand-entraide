import { auth } from "@/auth";
import { connexionGoogle, deconnexion } from "@/src/actions/session";
import { t, type Langue } from "@/src/i18n/textes";

export async function AuthBoutons({ langue }: { langue: Langue }) {
  const session = await auth();
  const i = t(langue);

  if (session?.user) {
    return (
      <form action={deconnexion}>
        <button className="langue" type="submit">
          {i.deconnexion}
        </button>
      </form>
    );
  }

  return (
    <form action={connexionGoogle}>
      <button className="langue on" type="submit">
        {i.connexion}
      </button>
    </form>
  );
}
