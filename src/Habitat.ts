/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Graph, { LineT } from './Graph';
import Co from './Constant';
import Organism from './Organism';

class Habitat {
  population: Organism[] = [];
  temperature: number;
  generation = 1;
  avgGrowthHormoneGene = 0;
  initialIndividualsByGH = Array.from(Array(11).keys()).map((v, i) => 0);
  individualsByGH: number[] = this.initialIndividualsByGH.slice();
  prevAvgGrowthHormoneGene: number[] = [];
  isStabilized = false;

  constructor(temperature: number) {
    this.temperature = temperature;
    let growthHormoneGene = 0;
    for (let i = 0; i <= 10; ++i) {
      for (let j = 0; j < Co.NUMBER_OF_INDIVIDUALS / 11; ++j) {
        this.population.push(Organism.createRandomOrganism(i));
        growthHormoneGene += i;
        this.individualsByGH[i]++;
      }
    }
    this.avgGrowthHormoneGene = growthHormoneGene / this.population.length;
  }
  checkStability() {
    if (this.prevAvgGrowthHormoneGene.length >= Co.GENE_HISTORY_LENGTH) {
      const prevPrevAvg =
        this.prevAvgGrowthHormoneGene
          .slice(0, Co.GENE_HISTORY_LENGTH / 2)
          .reduce((a, c) => a + c, 0) /
        this.prevAvgGrowthHormoneGene.length /
        2;
      const prevAvg =
        this.prevAvgGrowthHormoneGene
          .slice(-Co.GENE_HISTORY_LENGTH / 2)
          .reduce((a, c) => a + c, 0) /
        this.prevAvgGrowthHormoneGene.length /
        2;

      if (Math.abs(prevAvg - prevPrevAvg) < Co.STABILITY_THRESHOLD) {
        this.isStabilized = true;
      }
    }
  }

  nextGeneration(): boolean {
    if (this.isStabilized) {
      return false;
    }
    const newPopulation: Organism[] = [];
    this.individualsByGH = this.initialIndividualsByGH.slice();
    let growthHormoneGene = 0;
    while (newPopulation.length < Co.NUMBER_OF_INDIVIDUALS) {
      const organism1 =
        this.population[Math.floor(Math.random() * this.population.length)];
      const organism2 =
        this.population[Math.floor(Math.random() * this.population.length)];
      const garmete1 = organism1.getGarmete();
      const garmete2 = organism2.getGarmete();
      //새 놈 생성
      const newOrganism = Organism.fromTwoGarmetes(garmete1, garmete2);
      //자연선택
      // if (!newOrganism.isViable(this.temperature)) continue;

      //통과함
      growthHormoneGene += newOrganism.numberOfGrowthHormoneGenes;
      this.individualsByGH[newOrganism.numberOfGrowthHormoneGenes]++;
      //살았으면 삽입
      newPopulation.push(newOrganism);
    }
    this.population = newPopulation;
    this.generation++;
    this.avgGrowthHormoneGene = growthHormoneGene / this.population.length;

    this.prevAvgGrowthHormoneGene.push(this.avgGrowthHormoneGene);
    this.prevAvgGrowthHormoneGene = this.prevAvgGrowthHormoneGene.slice(
      -Co.GENE_HISTORY_LENGTH,
    );

    this.checkStability();

    return true;
  }

  showInfo() {
    document.querySelector(
      `li.habitat-${this.temperature} div.title`,
    )!.innerHTML = `평균기온 ${this.temperature}°C`;

    document.querySelector(
      `li.habitat-${this.temperature} div.generation`,
    )!.innerHTML = `${this.generation}세대`;

    document.querySelector(
      `li.habitat-${this.temperature} div.state`,
    )!.innerHTML = `평균 성장 유전자 : ${this.avgGrowthHormoneGene.toFixed(
      4,
    )}개`;
    document.querySelector(
      `li.habitat-${this.temperature} div.viewer-wrapper img`,
    )!.style.width = `${this.avgGrowthHormoneGene * 20}px`;
    document.querySelector(
      `li.habitat-${this.temperature} div.viewer-wrapper img`,
    )!.style.height = `${this.avgGrowthHormoneGene * 20 * 1.3}px`;
    const line: LineT = {
      color: '#888',
      points: this.individualsByGH.map((v, i) => ({ x: i, y: v })),
      closed: false,
    };
    const graph = new Graph(
      Co.GRAPH_WIDTH,
      Co.GRAPH_HEIGHT,
      Co.GRAPH_PADDING,
      0,
      10,
      0,
      10000,
      `canvas-${this.temperature}`,
    );
    graph.addLine(line);
    graph.setTickLabelsFromArray(Array.from(Array(11).keys()), 'x');
    graph.draw();
  }
}

export default Habitat;
