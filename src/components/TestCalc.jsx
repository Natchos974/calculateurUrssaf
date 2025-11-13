import rules from "modele-social";
import Engine, { formatValue } from "publicodes";

function TestCalc() {
  const engine = new Engine(rules);
  engine.setSituation({
    "salarié . rémunération . brut": "1625 €/mois",
    "salarié . contrat": "'CDI'",
    "salarié . contrat . statut cadre": "non",
    "salarié . activité partielle": "oui",
    "salarié . activité partielle . heures travaillées": "32 heures",
    "salarié . rémunération . taux horaire": "12 €/heure",
    "salarié . contrat . temps de travail . temps partiel": "oui",
    "salarié . contrat . temps de travail . temps partiel . heures par semaine":
      "32 heures",
    "salarié . temps de travail . heures complémentaires": "non",
    "salarié . rémunération . frais professionnels . titres-restaurant": "non",
    "salarié . temps de travail . heures supplémentaires": "0 heure/mois",
    "salarié . rémunération . frais professionnels . trajets domicile travail . transports publics . montant":
      "0 €/mois",
    "salarié . rémunération . frais professionnels . trajets domicile travail . forfait mobilités durables . montant":
      "0 €/an",
    "salarié . rémunération . frais professionnels . trajets domicile travail . prime de transport . montant":
      "0 €/an",
    "salarié . rémunération . avantages en nature": "non",
    "salarié . rémunération . primes . fin d'année": "non",
    "salarié . rémunération . primes . activité . base": "0 €/mois",
    "salarié . convention collective": "'HCR'",
    "établissement . commune . code postal": "31000",
    "établissement . taux ATMP . taux collectif": "2.12 %",
    "entreprise . salariés . effectif . seuil . moins de 11": "oui",
  });

  const brut = engine.evaluate("salarié . rémunération . brut");
  const net = engine.evaluate("salarié . rémunération . net");
  const cout = engine.evaluate("salarié . coût total employeur");

  console.log("Variables manquantes", brut.missingVariables);

  return (
    <div>
      <p>Salaire brut : {formatValue(brut)}</p>
      <p>Salaire net : {formatValue(net)}</p>
      <p>Coût total employeur : {formatValue(cout)}</p>
    </div>
  );
}

export default TestCalc;
