import { langueActuelle } from "@/src/i18n/langue";
import { t } from "@/src/i18n/textes";

export default async function Confidentialite() {
  const i = t(await langueActuelle());
  return (
    <main className="page-simple">
      <h1>{i.confTitre}</h1>
      <p>{i.conf1}</p>
      <p>{i.conf2}</p>
      <p>{i.conf3}</p>
      <p>{i.conf4}</p>
      <p>{i.conf5}</p>
      <p>{i.conf6}</p>
      <p>{i.conf7}</p>
    </main>
  );
}
