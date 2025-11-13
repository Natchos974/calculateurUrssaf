import rules from "modele-social";
import Engine, { formatValue } from "publicodes";

function Test() {
  const engine = new Engine(rules);
  engine.setSituation({
    //"salarié . contrat": "CDI",
    "salarié . contrat . CDI": "oui",
    "salarié . activité partielle": "oui",
    //"salarié . rémunération . brut": "1625 €",
    "salarié . contrat . temps de travail . temps partiel . heures par semaine":
      "32 heures",
    "salarié . rémunération . taux horaire": "12 €/heure",
    "salarié . contrat . statut cadre": "non",
    "salarié . rémunération . avantages en nature . ntic . abonnements": "0 €",
    //"salarié . rémunération . primes . activité . base": "104 €",
    "salarié . convention collective": "'HCR'",
    "établissement . commune . code postal": "31000",
    "entreprise . salariés . effectif . seuil . moins de 11": "oui",
    "établissement . taux ATMP . taux collectif": "2.12 %",
    "entreprise . TVA": "oui",
    "salarié . cotisations . ATMP . taux": "1.77 %",
    "établissement . commune . taux versement mobilité": "2 %",
    dirigeant: "non",
  });

  const salaireBrut = engine.evaluate("salarié . rémunération . brut");
  const cotisationsEmployeur = engine.evaluate(
    "salarié . cotisations . employeur"
  );
  const salaireNet = engine.evaluate(
    "salarié . rémunération . montant net social"
  );
  const coutTotalEmployeur = engine.evaluate("salarié . coût total employeur");
  console.log(engine.evaluate("salarié . cotisations . ATMP . taux"));
  return (
    <div>
      <p>
        Le salaire brut de ce salarié est de{" "}
        <strong>€{formatValue(salaireBrut)}</strong>
      </p>
      <p>
        Le salaire net de ce salarié est de{" "}
        <strong>€{formatValue(salaireNet)}</strong>
      </p>
      <p>
        Les cotisations employeurs sont de{" "}
        <strong>€{formatValue(cotisationsEmployeur)}</strong>
      </p>
      <p>
        Le cout total employeur de ce salarié est de{" "}
        <strong>€{formatValue(coutTotalEmployeur)}</strong>
      </p>
    </div>
  );
}

export default Test;
