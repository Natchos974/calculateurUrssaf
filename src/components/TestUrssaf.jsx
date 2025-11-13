import rules from "modele-social";
import Engine, { formatValue } from "publicodes";
import { useState } from "react";

function TestUrssaf() {
  const [hours, setHours] = useState("");
  const [taux, setTaux] = useState("");
  const [brut, setBrut] = useState("");
  const [net, setNet] = useState("");
  const [cotis, setCotis] = useState("");
  const [prime, setPrime] = useState("");

  const handleNumberInput = (setter) => (e) => {
    // Autorise uniquement chiffres + virgule ou point
    const value = e.target.value.replace(",", ".").replace(/[^0-9.]/g, "");
    setter(value);
  };

  const handleClick = () => {
    if (!taux || !hours) return alert("Veuillez remplir tous les champs.");
    // Changer la valeur ci-dessous pour voir le net s'actualiser
    const brutValue = `${taux * hours} €/mois`;
    const primeValue = `${prime} €/mois`;
    setBrut(brutValue); // le brut à calculer en €/mois
    console.log("Son brut est de ", brutValue);
    const engine = new Engine(rules);
    setNet(
      engine
        .setSituation({
          "salarié . contrat . salaire brut": brutValue,
          "salarié . contrat": "'CDI'",
          "salarié . contrat . statut cadre": "non",
          "salarié . activité partielle": "oui",
          "salarié . rémunération . primes . activité": primeValue,
          "salarié . contrat . temps de travail . temps partiel": "oui",
          "salarié . convention collective": "'HCR'",
          "établissement . commune . code postal": "31000",
          "établissement . taux ATMP": "1.77 %",
          "entreprise . salariés . effectif . seuil . moins de 11": "oui",
        })
        .evaluate("salarié . rémunération . net . à payer avant impôt")
    );
    setCotis(engine.evaluate("salarié . coût total employeur"));
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full border border-gray-100">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Simulateur URSSAF
      </h1>

      <div className="flex flex-col gap-4">
        <label className="font-semibold text-gray-700">
          Nombre d'heures mensuelles
        </label>
        <input
          className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Ex : 151.67"
          value={hours}
          onChange={handleNumberInput(setHours)}
        />

        <label className="font-semibold text-gray-700">Taux horaire (€)</label>
        <input
          className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Ex : 12.5"
          value={taux}
          onChange={handleNumberInput(setTaux)}
        />
        <label className="font-semibold text-gray-700">
          Prime d'activité (€)
        </label>
        <input
          className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Ex : 100"
          value={prime}
          onChange={handleNumberInput(setPrime)}
        />
        <button
          onClick={handleClick}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 hover:cursor-grab"
        >
          Simuler
        </button>
      </div>

      {brut && (
        <div className="mt-8 p-4 bg-gray-50 rounded-xl shadow-inner">
          <p className="text-gray-700 text-lg">
            💰 <strong>Salaire brut :</strong> {brut}
          </p>
          <p className="text-gray-700 text-lg mt-2">
            🧾 <strong>Salaire net à payer avant impots:</strong>{" "}
            {formatValue(net)}
          </p>
          <p className="text-gray-700 text-lg mt-2">
            🏢 <strong>Cotisations employeur :</strong> {formatValue(cotis)}
          </p>
        </div>
      )}
    </div>
  );
}

export default TestUrssaf;
