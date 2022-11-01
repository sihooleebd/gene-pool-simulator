import Organism from './Organism';
import Habitat from './Habitat';
document.addEventListener('DOMContentLoaded', () => {
  new EvolutionSimulator();
});

class EvolutionSimulator {
  habitats: Habitat[] = [];
  constructor() {
    this.habitats.push(new Habitat(25));
    this.habitats.push(new Habitat(15));
    this.habitats.push(new Habitat(-5));
    this.habitats.push(new Habitat(-25));
    const testOrganism = Organism.createRandomOrganism(3);
    console.log('height(cm)', testOrganism.getHeight());
    console.log('volume(cm3)', testOrganism.getVolume());
    console.log('surface area(cm2)', testOrganism.getSurfaceArea());
    console.log('metabolism(kcal/day)', testOrganism.getMetabolism());
    console.log(
      'estimated temperature(Degrees Celcius)',
      testOrganism.getEstimatedBodyTemperature(15),
    );
    console.log('---------------------------------');
    const testOrganism2 = Organism.createRandomOrganism(9);
    console.log('height(cm)', testOrganism2.getHeight());
    console.log('volume(cm3)', testOrganism2.getVolume());
    console.log('surface area(cm2)', testOrganism2.getSurfaceArea());
    console.log('metabolism(kcal/day)', testOrganism2.getMetabolism());
    console.log(
      'estimated temperature(Degrees Celcius)',
      testOrganism2.getEstimatedBodyTemperature(15),
    );
    console.log(
      'estimated temperature(Degrees Celcius)',
      testOrganism2.getEstimatedBodyTemperature(-25),
    );

    this.habitats.forEach((habitat) => habitat.showInfo());

    document.querySelector('#one-step')?.addEventListener('click', () => {
      this.habitats.forEach((habitat) => {
        habitat.nextGeneration();
        habitat.showInfo();
      });
    });
    document.querySelector('#continue')?.addEventListener('click', () => {
      setInterval(() => {
        this.habitats.forEach((habitat) => {
          habitat.nextGeneration();
          habitat.showInfo();
        });
      }, 0);
    });
  }
}
