/**
 * Crée une instance de classe par réflexion.
 * Le nom de la classe a instancier doit etre definie dans la variable d'environnement NOM_CLASSE.
 * Note: Pour essayer de repliquer le comportement de la reflexion en Java, on utilise eval.
 * Une facon plus securitaire serait de creer une map de classes et utiliser le nom de la classe pour
 * obtenir la classe mais on aurait peut etre pas access a toutes les classes.
 */
export default function creerInstanceDeClasseParReflexion() {
    let nomClasse = process.env.NOM_CLASSE;
    if (!nomClasse) {
      throw new Error(
        "La variable d'environnement NOM_CLASSE n'est pas definie."
      );
    }
  
    nomClasse = nomClasse.trim();
    if (!nomClasse) {
      throw new Error("Le nom de la classe est vide.");
    }
  
    let classe;
    try {
      classe = eval(nomClasse);
    } catch (error) {
      throw new Error(`La classe ${nomClasse} n'existe pas.`);
    }
  
    if (
      typeof classe !== "function" ||
      !classe.prototype ||
      !classe.prototype.constructor
    ) {
      throw new Error(`La classe ${nomClasse} n'est pas une classe valide.`);
    }
  
    return new classe();
  }
  