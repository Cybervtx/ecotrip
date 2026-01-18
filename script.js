// ========================================
// CALCULADORA DE EMISSÃO DE CO2
// ========================================

// Dados de emissão por modo de transporte (em g CO2/km)
const emissionFactors = {
  bicycle: 0,
  car: 120,
  bus: 15,
  truck: 200,
};

// Descrições dos transportes
const transportDescriptions = {
  bicycle: "Bicicleta - Transporte sustentável e zero emissões!",
  car: "Carro - Impacto considerável no ambiente",
  bus: "Ônibus - Transporte coletivo e responsável",
  truck: "Caminhão - Alto impacto ambiental",
};

// Elementos do DOM
const form = document.getElementById("co2-calculator");
const originInput = document.getElementById("origin");
const destinationInput = document.getElementById("destination");
const distanceInput = document.getElementById("distance");
const insertDistanceBtn = document.getElementById("insert-distance-btn");
const calculateBtn = document.getElementById("calculate-btn");
const resultsSection = document.getElementById("results");
const transportRadios = document.querySelectorAll(
  'input[name="transport-mode"]',
);

// ========================================
// INTERAÇÕES DOS CARDS DE TRANSPORTE
// ========================================
transportRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    // Remove classe de seleção anterior
    document.querySelectorAll(".transport-card").forEach((card) => {
      card.classList.remove("selected");
    });

    // Adiciona classe de seleção ao card selecionado
    if (radio.checked) {
      radio.nextElementSibling.classList.add("selected");
    }
  });
});

// ========================================
// INSERIR DISTÂNCIA
// ========================================
insertDistanceBtn.addEventListener("click", () => {
  const origin = originInput.value.trim();
  const destination = destinationInput.value.trim();

  if (!origin || !destination) {
    alert("Por favor, preenchea origem e destino");
    return;
  }

  // Simular cálculo de distância (em um cenário real, usaria uma API)
  const simulatedDistance = (Math.random() * 400 + 50).toFixed(1);

  distanceInput.value = simulatedDistance;

  // Animação de sucesso
  insertDistanceBtn.style.transform = "scale(0.95)";
  setTimeout(() => {
    insertDistanceBtn.style.transform = "scale(1)";
  }, 100);

  // Feedback visual
  insertDistanceBtn.textContent = "✓ Distância inserida!";
  setTimeout(() => {
    insertDistanceBtn.textContent = "Inserir distância";
  }, 2000);
});

// ========================================
// CALCULAR EMISSÃO
// ========================================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const origin = originInput.value.trim();
  const destination = destinationInput.value.trim();
  const distance = parseFloat(distanceInput.value);
  const selectedTransport = document.querySelector(
    'input[name="transport-mode"]:checked',
  );

  // Validações
  if (!origin || !destination || !selectedTransport || distance === 0) {
    alert("Por favor, preencha todos os campos");
    return;
  }

  const transportMode = selectedTransport.value;
  const emissionFactor = emissionFactors[transportMode];

  // Calcular emissões
  const totalEmissions = (distance * emissionFactor) / 1000; // Converter para kg
  const equivalentTrees = (totalEmissions / 21).toFixed(2); // Uma árvore absorve ~21kg CO2/ano
  const equivalentCars = (totalEmissions / 4.6).toFixed(2); // Um carro emite ~4.6kg CO2/100km

  // Determinar nível de impacto
  let impactLevel = "Baixo";
  let impactClass = "low";
  if (totalEmissions > 50) {
    impactLevel = "Médio";
    impactClass = "medium";
  }
  if (totalEmissions > 100) {
    impactLevel = "Alto";
    impactClass = "high";
  }

  // Criar resultado
  const resultHTML = `
    <div class="result-card">
      <div class="result-header">
        <div class="result-icon">🌍</div>
        <div>
          <div class="result-title">Emissão de CO₂ Calculada</div>
          <p style="color: var(--text-secondary); margin-top: 0.25rem;">
            De ${origin} para ${destination}
          </p>
        </div>
      </div>

      <div class="result-content">
        <div class="result-item">
          <span class="result-label">Distância</span>
          <span class="result-value">${distance} km</span>
        </div>

        <div class="result-item">
          <span class="result-label">Modo de Transporte</span>
          <span class="result-value">${transportDescriptions[transportMode]}</span>
        </div>

        <div class="result-item">
          <span class="result-label">Emissão Total</span>
          <span class="result-value ${impactClass === "high" ? "danger" : impactClass === "medium" ? "warning" : ""}">
            ${totalEmissions.toFixed(2)} kg CO₂
          </span>
        </div>

        <div class="result-item">
          <span class="result-label">Nível de Impacto</span>
          <span class="result-value ${impactClass === "high" ? "danger" : impactClass === "medium" ? "warning" : ""}">
            ${impactLevel}
          </span>
        </div>

        <div class="result-item">
          <span class="result-label">Árvores Necessárias*</span>
          <span class="result-value">${equivalentTrees} árvores</span>
        </div>

        <div class="result-item">
          <span class="result-label">Equivalente em Carro</span>
          <span class="result-value">${equivalentCars} viagens</span>
        </div>
      </div>

      <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
        * Para absorver a quantidade de CO₂ emitida em um ano
      </p>
    </div>
  `;

  resultsSection.innerHTML = resultHTML;
  resultsSection.classList.add("show");

  // Scroll para resultados
  setTimeout(() => {
    resultsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 100);

  // Feedback do botão
  calculateBtn.textContent = "✓ Cálculo realizado!";
  setTimeout(() => {
    calculateBtn.textContent = "Calcular Emissão";
  }, 2000);
});

// ========================================
// VALIDAÇÃO EM TEMPO REAL
// ========================================
originInput.addEventListener("input", () => {
  validateForm();
});

destinationInput.addEventListener("input", () => {
  validateForm();
});

distanceInput.addEventListener("change", () => {
  validateForm();
});

transportRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    validateForm();
  });
});

function validateForm() {
  const isValid =
    originInput.value.trim() !== "" &&
    destinationInput.value.trim() !== "" &&
    parseFloat(distanceInput.value) > 0 &&
    document.querySelector('input[name="transport-mode"]:checked') !== null;

  calculateBtn.disabled = !isValid;
  calculateBtn.style.opacity = isValid ? "1" : "0.5";
  calculateBtn.style.cursor = isValid ? "pointer" : "not-allowed";
}

// Validar formulário ao carregar
validateForm();
