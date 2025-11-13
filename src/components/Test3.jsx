import rules from "modele-social";
import Engine, { formatValue } from "publicodes";

function Test3() {
  // Changer la valeur ci-dessous pour voir le net s'actualiser
  const brut = 1625; // le brut à calculer en €/mois

  const engine = new Engine(rules);
  const net = engine
    .setSituation({
      "salarié . contrat . salaire brut": brut,
    })
    .evaluate("salarié . rémunération . net . à payer avant impôt");

  return (
    <p>
      Votre brut : ${formatValue(brut)} <br />
      Votre net : <strong>${formatValue(net)}</strong>
    </p>
  );
}
export default Test3;
