import Co from './Constant';

class Organism {
  genes: [string, string][] = [];
  numberOfGrowthHormoneGenes: number;

  static createRandomOrganism(numberOfDominantGenes: number) {
    const genes: [string, string][] = Array.from(Array(5).keys()).map((n) => [
      String.fromCharCode(97 + n),
      String.fromCharCode(97 + n),
    ]);
    Array.from(Array(10).keys())
      .sort(() => Math.random() - 0.5)
      .slice(0, numberOfDominantGenes)
      .forEach((n) => {
        genes[Math.floor(n / 2)][n % 2] =
          genes[Math.floor(n / 2)][n % 2].toUpperCase();
      });
    return new Organism(genes);
  }

  static fromTwoGarmetes(garmete1: string[], garmete2: string[]) {
    const genes: [string, string][] = garmete1.map((g, i) => [g, garmete2[i]]);
    return new Organism(genes);
  }

  static survivability(t: number) {
    return (
      -1 *
        Co.EVOLUTIONARY_PRESSURE *
        (t - Co.IDEAL_BODY_TEMPERATURE) *
        (t - Co.IDEAL_BODY_TEMPERATURE) +
      1
    );
  }

  constructor(genesGiven: [string, string][]) {
    this.genes = genesGiven;
    this.numberOfGrowthHormoneGenes = this.genes
      .flat()
      .reduce((a, c) => (c.charCodeAt(0) < 97 ? a + 1 : a), 0);
  }
  getGarmete() {
    return this.genes.map((gene) => gene[Math.random() > 0.5 ? 1 : 0]);
  }

  getHeight() {
    if (this.numberOfGrowthHormoneGenes === 0) return Co.MINIMUM_HEIGHT;
    return (
      Co.BASE_HEIGHT +
      Co.GROWTH_PER_GROWTH_HORMONE_GENE * this.numberOfGrowthHormoneGenes
    );
  }
  getVolume() {
    const height = this.getHeight();
    return height * height * height;
  }

  getSurfaceArea() {
    const height = this.getHeight();
    return height * height * 6;
  }

  getMetabolism() {
    return this.getVolume() * Co.METABOLIC_RATE_PER_CUBIC_CENTIMETER;
  }

  getEstimatedBodyTemperature(externalTemperature: number) {
    return (
      externalTemperature +
      this.getMetabolism() /
        Co.HEAT_TRANSFER_COEFFICIENT /
        this.getSurfaceArea()
    );
  }

  isViable(externalTemperature: number) {
    const ebt = this.getEstimatedBodyTemperature(externalTemperature);
    const survivability = Organism.survivability(ebt);
    return Math.random() <= survivability;
  }
}

export default Organism;
