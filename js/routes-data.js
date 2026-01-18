/**
 * RoutesDB - Database of Popular Brazilian Routes
 * Contains 35+ major Brazilian routes with accurate distances
 */

const RoutesDB = {
  routes: [
    // Capital to Capital Routes
    {
      origin: "São Paulo, SP",
      destination: "Rio de Janeiro, RJ",
      distanceKm: 430,
    },
    {
      origin: "São Paulo, SP",
      destination: "Brasília, DF",
      distanceKm: 1015,
    },
    {
      origin: "Rio de Janeiro, RJ",
      destination: "Brasília, DF",
      distanceKm: 1148,
    },
    {
      origin: "São Paulo, SP",
      destination: "Belo Horizonte, MG",
      distanceKm: 586,
    },
    {
      origin: "Belo Horizonte, MG",
      destination: "Brasília, DF",
      distanceKm: 738,
    },
    {
      origin: "São Paulo, SP",
      destination: "Salvador, BA",
      distanceKm: 1698,
    },
    {
      origin: "Rio de Janeiro, RJ",
      destination: "Salvador, BA",
      distanceKm: 1715,
    },
    {
      origin: "São Paulo, SP",
      destination: "Curitiba, PR",
      distanceKm: 408,
    },
    {
      origin: "Curitiba, PR",
      destination: "Rio de Janeiro, RJ",
      distanceKm: 838,
    },
    {
      origin: "São Paulo, SP",
      destination: "Porto Alegre, RS",
      distanceKm: 1332,
    },
    {
      origin: "São Paulo, SP",
      destination: "Manaus, AM",
      distanceKm: 3228,
    },
    {
      origin: "Rio de Janeiro, RJ",
      destination: "Recife, PE",
      distanceKm: 2303,
    },
    {
      origin: "São Paulo, SP",
      destination: "Fortaleza, CE",
      distanceKm: 2347,
    },
    {
      origin: "Salvador, BA",
      destination: "Fortaleza, CE",
      distanceKm: 1232,
    },
    {
      origin: "Brasília, DF",
      destination: "Goiânia, GO",
      distanceKm: 209,
    },
    {
      origin: "São Paulo, SP",
      destination: "Goiânia, GO",
      distanceKm: 925,
    },
    {
      origin: "Curitiba, PR",
      destination: "Porto Alegre, RS",
      distanceKm: 924,
    },
    {
      origin: "Belo Horizonte, MG",
      destination: "Rio de Janeiro, RJ",
      distanceKm: 562,
    },
    {
      origin: "Recife, PE",
      destination: "Fortaleza, CE",
      distanceKm: 651,
    },
    {
      origin: "Salvador, BA",
      destination: "Recife, PE",
      distanceKm: 1071,
    },

    // Major City Routes
    {
      origin: "São Paulo, SP",
      destination: "Campinas, SP",
      distanceKm: 100,
    },
    {
      origin: "São Paulo, SP",
      destination: "Santos, SP",
      distanceKm: 71,
    },
    {
      origin: "Rio de Janeiro, RJ",
      destination: "Niterói, RJ",
      distanceKm: 25,
    },
    {
      origin: "Belo Horizonte, MG",
      destination: "Ouro Preto, MG",
      distanceKm: 97,
    },
    {
      origin: "Salvador, BA",
      destination: "Feira de Santana, BA",
      distanceKm: 109,
    },
    {
      origin: "Brasília, DF",
      destination: "Anápolis, GO",
      distanceKm: 148,
    },
    {
      origin: "Rio de Janeiro, RJ",
      destination: "Búzios, RJ",
      distanceKm: 176,
    },
    {
      origin: "Curitiba, PR",
      destination: "Maringá, PR",
      distanceKm: 398,
    },
    {
      origin: "Porto Alegre, RS",
      destination: "Gramado, RS",
      distanceKm: 144,
    },
    {
      origin: "Recife, PE",
      destination: "Olinda, PE",
      distanceKm: 12,
    },

    // Regional Connections
    {
      origin: "São Paulo, SP",
      destination: "Ribeirão Preto, SP",
      distanceKm: 313,
    },
    {
      origin: "Brasília, DF",
      destination: "Palmas, TO",
      distanceKm: 887,
    },
    {
      origin: "Manaus, AM",
      destination: "Boa Vista, RR",
      distanceKm: 797,
    },
    {
      origin: "Belém, PA",
      destination: "Macapá, AP",
      distanceKm: 616,
    },
    {
      origin: "Cuiabá, MT",
      destination: "Brasília, DF",
      distanceKm: 1287,
    },
    {
      origin: "Campo Grande, MS",
      destination: "São Paulo, SP",
      distanceKm: 1260,
    },
    {
      origin: "Natal, RN",
      destination: "João Pessoa, PB",
      distanceKm: 185,
    },
    {
      origin: "Maceió, AL",
      destination: "Recife, PE",
      distanceKm: 257,
    },
  ],

  /**
   * Search for routes between two cities
   * @param {string} origin - Origin city name (with or without state)
   * @param {string} destination - Destination city name (with or without state)
   * @returns {object|null} - Route object or null if not found
   */
  findRoute(origin, destination) {
    const normalizeCity = (city) => city.toLowerCase().trim();

    return this.routes.find(
      (route) =>
        (normalizeCity(route.origin).includes(normalizeCity(origin)) &&
          normalizeCity(route.destination).includes(
            normalizeCity(destination),
          )) ||
        (normalizeCity(route.origin).includes(normalizeCity(destination)) &&
          normalizeCity(route.destination).includes(normalizeCity(origin))),
    );
  },

  /**
   * Get all routes from a specific city
   * @param {string} city - City name (with or without state)
   * @returns {array} - Array of routes from that city
   */
  getRoutesFromCity(city) {
    const normalizeCity = (c) => c.toLowerCase().trim();
    const normalized = normalizeCity(city);

    return this.routes.filter(
      (route) =>
        normalizeCity(route.origin).includes(normalized) ||
        normalizeCity(route.destination).includes(normalized),
    );
  },

  /**
   * Get all available cities
   * @returns {array} - Sorted array of unique cities
   */
  getAllCities() {
    const cities = new Set();
    this.routes.forEach((route) => {
      cities.add(route.origin);
      cities.add(route.destination);
    });
    return Array.from(cities).sort();
  },

  /**
   * Get routes by distance range
   * @param {number} minKm - Minimum distance
   * @param {number} maxKm - Maximum distance
   * @returns {array} - Routes within the distance range
   */
  getRoutesByDistance(minKm, maxKm) {
    return this.routes.filter(
      (route) => route.distanceKm >= minKm && route.distanceKm <= maxKm,
    );
  },

  /**
   * Get the longest routes
   * @param {number} limit - Number of longest routes to return
   * @returns {array} - Array of longest routes
   */
  getLongestRoutes(limit = 10) {
    return [...this.routes]
      .sort((a, b) => b.distanceKm - a.distanceKm)
      .slice(0, limit);
  },

  /**
   * Get the shortest routes
   * @param {number} limit - Number of shortest routes to return
   * @returns {array} - Array of shortest routes
   */
  getShortestRoutes(limit = 10) {
    return [...this.routes]
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, limit);
  },

  /**
   * Get total number of routes
   * @returns {number} - Number of routes in database
   */
  getTotalRoutes() {
    return this.routes.length;
  },

  /**
   * Get average distance of all routes
   * @returns {number} - Average distance in km
   */
  getAverageDistance() {
    const total = this.routes.reduce((sum, route) => sum + route.distanceKm, 0);
    return (total / this.routes.length).toFixed(2);
  },
};

// Export for Node.js/CommonJS environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = RoutesDB;
}
