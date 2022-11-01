class Co {
  static NUMBER_OF_INDIVIDUALS = 22000;
  // static GROWTH_PER_GROWTH_HORMONE_GENE = 10; //cm
  // static BASE_HEIHGT = 30;
  static GROWTH_PER_GROWTH_HORMONE_GENE = 20; //cm
  static BASE_HEIGHT = 0;
  static MINIMUM_HEIGHT = 1;

  // 70kg(70000g) 사람의 1일 대사량 1680kcal
  // 사람 밀도가 0.97 g/cm3
  // 1,680kcal/70kg * 1kg/1000g * 0.97g/cm3
  static METABOLIC_RATE_PER_CUBIC_CENTIMETER = 0.02328; // kcal/cm3

  // 키가 60cm인 생물이 외부기온 15oC에서 체온이 35도 되는 열전달계수
  static HEAT_TRANSFER_COEFFICIENT = 0.01164;

  // static EVOLUTIONARY_PRESSURE = 0.00003125; // 0.0003125;
  static EVOLUTIONARY_PRESSURE = 0.0001;
  // static EVOLUTIONARY_PRESSURE = 0.0003;

  static IDEAL_BODY_TEMPERATURE = 35;

  static GRAPH_WIDTH = 800;
  static GRAPH_HEIGHT = 200;
  static GRAPH_PADDING = 30;
  static GENE_HISTORY_LENGTH = 20;
  static STABILITY_THRESHOLD = 0.01;
}

export default Co;
