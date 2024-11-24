import creerInstanceDeClasseParReflexion from "../creerInstanceDeClasseParReflexion";

describe("Creer instance de classe par reflextion", () => {
  beforeEach(() => {
    delete process.env.NOM_CLASSE;
  });

  it("lance une erreur si la variable d'environement n'est pas definie", () => {
    expect(() => creerInstanceDeClasseParReflexion()).toThrowError(
      "La variable d'environnement NOM_CLASSE n'est pas definie."
    );
  });

  it("lance une erreur si le nom passe est une chaine vide", () => {
    process.env.NOM_CLASSE = "";
    expect(() => creerInstanceDeClasseParReflexion()).toThrowError(
      "La variable d'environnement NOM_CLASSE n'est pas definie."
    );
  });

  it("lance une erreur si le nom passe est une chaine avec seulement des espaces", () => {
    process.env.NOM_CLASSE = "  ";
    expect(() => creerInstanceDeClasseParReflexion()).toThrowError(
      "Le nom de la classe est vide."
    );
  });

  it("lance une erreur si la classe n'existe pas", () => {
    process.env.NOM_CLASSE = "ClasseInexistante";
    expect(() => creerInstanceDeClasseParReflexion()).toThrowError(
      "La classe ClasseInexistante n'existe pas."
    );
  });

  it("lance une erreur si la classe n'est pas definie globalement", () => {
    process.env.NOM_CLASSE = "ClasseTest";
    class ClasseTest {}
    expect(() => creerInstanceDeClasseParReflexion()).toThrowError(
      "La classe ClasseTest n'existe pas."
    );
  });

  it("retourne une instance de la classe definie globalement", () => {
    process.env.NOM_CLASSE = "ClasseTest";
    class ClasseTest {}
    (globalThis as any).ClasseTest = ClasseTest;
    const instance = creerInstanceDeClasseParReflexion();
    expect(instance).toBeInstanceOf(ClasseTest);
    delete (globalThis as any).ClasseTest;
  });

  describe("Classes natives", () => {
    const classesNatives = {
      Number: Number,
      String: String,
      Boolean: Boolean,
      Array: Array,
      Object: Object,
      Date: Date,
    };

    for (const [nomClasse, classe] of Object.entries(classesNatives)) {
      it(`retourne une instance de la classe ${nomClasse}`, () => {
        process.env.NOM_CLASSE = nomClasse;
        const instance = creerInstanceDeClasseParReflexion();
        expect(instance).toBeInstanceOf(classe);
      });
    }
  });

  describe("Cas où le nom passe n'est pas une classe", () => {
    it("lance une erreur si le nom passe est un nombre", () => {
      process.env.NOM_CLASSE = "123";
      expect(() => creerInstanceDeClasseParReflexion()).toThrowError(
        `La classe ${process.env.NOM_CLASSE} n'est pas une classe valide.`
      );
    });

    it("lance une erreur si le nom passe est un objet", () => {
      process.env.NOM_CLASSE = "{}";
      expect(() => creerInstanceDeClasseParReflexion()).toThrowError(
        `La classe ${process.env.NOM_CLASSE} n'est pas une classe valide.`
      );
    });

    it("lance une erreur si le nom passe est une fonction", () => {
      process.env.NOM_CLASSE = "() => {}";
      expect(() => creerInstanceDeClasseParReflexion()).toThrowError(
        `La classe ${process.env.NOM_CLASSE} n'est pas une classe valide.`
      );
    });

    it("lance une erreur si le nom passe est un tableau", () => {
      process.env.NOM_CLASSE = "[]";
      expect(() => creerInstanceDeClasseParReflexion()).toThrowError(
        `La classe ${process.env.NOM_CLASSE} n'est pas une classe valide.`
      );
    });

    it("lance une erreur si le nom passe est un booleen", () => {
      process.env.NOM_CLASSE = "true";
      expect(() => creerInstanceDeClasseParReflexion()).toThrowError(
        `La classe ${process.env.NOM_CLASSE} n'est pas une classe valide.`
      );
    });

    it("lance une erreur si le nom passe est une date", () => {
      process.env.NOM_CLASSE = "new Date()";
      expect(() => creerInstanceDeClasseParReflexion()).toThrowError(
        `La classe ${process.env.NOM_CLASSE} n'est pas une classe valide.`
      );
    });

    it("lance une erreur si le nom passe est un objet natif", () => {
      process.env.NOM_CLASSE = "new Number(123)";
      expect(() => creerInstanceDeClasseParReflexion()).toThrowError(
        `La classe ${process.env.NOM_CLASSE} n'est pas une classe valide.`
      );
    });
  });
});
