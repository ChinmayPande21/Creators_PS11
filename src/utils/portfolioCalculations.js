/**
 * Portfolio Financial Calculations Library
 * Handles all financial metrics and portfolio analysis
 */

// Calculate Total Return
export const calculateTotalReturn = (holdings) => {
  const totalInvested = holdings.reduce((sum, h) => sum + h.totalCost, 0);
  const currentValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  return ((currentValue - totalInvested) / totalInvested) * 100;
};

// Calculate CAGR (Compound Annual Growth Rate)
export const calculateCAGR = (initialValue, finalValue, years) => {
  if (initialValue <= 0 || years <= 0) return 0;
  return (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
};

// Calculate Volatility (Standard Deviation of Returns)
export const calculateVolatility = (returns) => {
  if (returns.length === 0) return 0;
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance =
    returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
  return Math.sqrt(variance);
};

// Calculate Maximum Drawdown
export const calculateMaxDrawdown = (priceHistory) => {
  if (priceHistory.length === 0) return 0;
  let maxPrice = priceHistory[0];
  let maxDrawdown = 0;

  for (let i = 1; i < priceHistory.length; i++) {
    if (priceHistory[i] > maxPrice) {
      maxPrice = priceHistory[i];
    }
    const drawdown = ((priceHistory[i] - maxPrice) / maxPrice) * 100;
    if (drawdown < maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }
  return Math.abs(maxDrawdown);
};

// Calculate Sharpe Ratio (Risk-Adjusted Return)
export const calculateSharpeRatio = (returns, riskFreeRate = 0.02) => {
  if (returns.length === 0) return 0;
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const volatility = calculateVolatility(returns);
  if (volatility === 0) return 0;
  return (avgReturn - riskFreeRate) / volatility;
};

// Calculate Beta (Market Sensitivity)
export const calculateBeta = (portfolioReturns, marketReturns) => {
  if (portfolioReturns.length === 0 || marketReturns.length === 0) return 1;

  const portfolioMean =
    portfolioReturns.reduce((a, b) => a + b, 0) / portfolioReturns.length;
  const marketMean =
    marketReturns.reduce((a, b) => a + b, 0) / marketReturns.length;

  let covariance = 0;
  let marketVariance = 0;

  for (let i = 0; i < portfolioReturns.length; i++) {
    covariance +=
      (portfolioReturns[i] - portfolioMean) * (marketReturns[i] - marketMean);
    marketVariance += Math.pow(marketReturns[i] - marketMean, 2);
  }

  covariance /= portfolioReturns.length;
  marketVariance /= marketReturns.length;

  return marketVariance === 0 ? 0 : covariance / marketVariance;
};

// Calculate Portfolio Diversification Score (0-100)
export const calculateDiversification = (holdings) => {
  if (holdings.length === 0) return 0;

  const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  if (totalValue === 0) return 0;

  // Calculate weights
  const weights = holdings.map((h) => h.currentValue / totalValue);

  // Calculate Herfindahl Index
  const hIndex = weights.reduce((sum, w) => sum + Math.pow(w, 2), 0);

  // Convert to diversification score (0-100)
  // Perfect diversification = 1/n, worst = 1
  const minHIndex = 1 / holdings.length;
  const diversificationScore = ((1 - hIndex) / (1 - minHIndex)) * 100;

  return Math.max(0, Math.min(100, diversificationScore));
};

// Calculate Sector Allocation
export const calculateSectorAllocation = (holdings) => {
  const sectorMap = {};
  const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);

  holdings.forEach((holding) => {
    const sector = holding.sector || "Other";
    if (!sectorMap[sector]) {
      sectorMap[sector] = 0;
    }
    sectorMap[sector] += holding.currentValue;
  });

  return Object.entries(sectorMap)
    .map(([sector, value]) => ({
      sector,
      value,
      percentage: totalValue > 0 ? (value / totalValue) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value);
};

// Calculate Correlation Matrix (simplified)
export const calculateCorrelationMatrix = (holdings) => {
  if (holdings.length < 2) return [];

  const correlations = [];
  for (let i = 0; i < holdings.length; i++) {
    for (let j = i + 1; j < holdings.length; j++) {
      // Calculate price change percentage for each holding
      const stock1Return = ((holdings[i].currentPrice - holdings[i].buyPrice) / holdings[i].buyPrice) * 100;
      const stock2Return = ((holdings[j].currentPrice - holdings[j].buyPrice) / holdings[j].buyPrice) * 100;
      // Simplified correlation based on similar price movements
      const correlation = stock1Return > 0 && stock2Return > 0 ? 0.7 : stock1Return < 0 && stock2Return < 0 ? 0.6 : -0.4;
      correlations.push({
        stock1: holdings[i].symbol,
        stock2: holdings[j].symbol,
        correlation: Math.max(-1, Math.min(1, correlation)),
      });
    }
  }
  return correlations;
};

// Generate Risk-Adjusted Recommendations
export const generateRecommendations = (portfolio, riskProfile) => {
  const recommendations = [];
  const totalValue = portfolio.holdings.reduce(
    (sum, h) => sum + h.currentValue,
    0,
  );

  // Risk Profile Targets
  const targets = {
    conservative: { stocks: 40, bonds: 50, cash: 10 },
    moderate: { stocks: 60, bonds: 30, cash: 10 },
    aggressive: { stocks: 80, bonds: 15, cash: 5 },
  };

  const target = targets[riskProfile] || targets.moderate;

  // Prevent division by zero
  if (totalValue === 0) {
    return recommendations;
  }

  // Calculate current allocation
  const stocksValue = portfolio.holdings
    .filter((h) => h.assetType === "stock")
    .reduce((sum, h) => sum + h.currentValue, 0);
  const bondsValue = portfolio.holdings
    .filter((h) => h.assetType === "bond")
    .reduce((sum, h) => sum + h.currentValue, 0);
  const cashValue = portfolio.holdings
    .filter((h) => h.assetType === "cash")
    .reduce((sum, h) => sum + h.currentValue, 0);

  const currentAllocation = {
    stocks: (stocksValue / totalValue) * 100,
    bonds: (bondsValue / totalValue) * 100,
    cash: (cashValue / totalValue) * 100,
  };

  // Generate recommendations
  if (currentAllocation.stocks < target.stocks) {
    recommendations.push({
      action: "INCREASE_STOCKS",
      severity: "medium",
      description: `Increase stock allocation to ${target.stocks}% (currently ${currentAllocation.stocks.toFixed(1)}%)`,
      amount: ((target.stocks - currentAllocation.stocks) * totalValue) / 100,
    });
  } else if (currentAllocation.stocks > target.stocks) {
    recommendations.push({
      action: "REDUCE_STOCKS",
      severity: "low",
      description: `Reduce stock allocation to ${target.stocks}% (currently ${currentAllocation.stocks.toFixed(1)}%)`,
      amount: ((currentAllocation.stocks - target.stocks) * totalValue) / 100,
    });
  }

  // Check volatility against risk profile
  if (portfolio.volatility > 30 && riskProfile === "conservative") {
    recommendations.push({
      action: "HIGH_VOLATILITY",
      severity: "high",
      description:
        "Portfolio volatility is high for conservative profile. Consider rebalancing.",
      currentVolatility: portfolio.volatility,
    });
  }

  // Check concentration risk
  const maxHolding = Math.max(
    ...portfolio.holdings.map((h) => (h.currentValue / totalValue) * 100),
  );
  if (maxHolding > 25) {
    recommendations.push({
      action: "CONCENTRATION_RISK",
      severity: "medium",
      description: `Largest holding represents ${maxHolding.toFixed(1)}% of portfolio. Consider diversifying.`,
    });
  }

  // Check sector concentration
  const sectorAllocation = calculateSectorAllocation(portfolio.holdings);
  const maxSectorAllocation = Math.max(
    ...sectorAllocation.map((s) => s.percentage),
  );
  if (maxSectorAllocation > 35) {
    recommendations.push({
      action: "SECTOR_CONCENTRATION",
      severity: "medium",
      description: `Largest sector represents ${maxSectorAllocation.toFixed(1)}% of portfolio.`,
    });
  }

  return recommendations;
};

// Calculate portfolio metrics summary
export const calculatePortfolioMetrics = (
  holdings,
  priceHistory = [],
  riskProfile = "moderate",
) => {
  const totalInvested = holdings.reduce((sum, h) => sum + h.totalCost, 0);
  const currentValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalReturn = calculateTotalReturn(holdings);

  // Simulate returns for calculations
  const simulatedReturns =
    priceHistory.length > 1
      ? priceHistory.map((p, i) =>
          i === 0 ? 0 : ((p - priceHistory[i - 1]) / priceHistory[i - 1]) * 100,
        )
      : [totalReturn];

  const portfolio = {
    holdings,
    totalInvested,
    currentValue,
    totalReturn,
    gains: currentValue - totalInvested,
    volatility: calculateVolatility(simulatedReturns),
    maxDrawdown: calculateMaxDrawdown(
      priceHistory.length > 0 ? priceHistory : [totalInvested, currentValue],
    ),
    diversificationScore: calculateDiversification(holdings),
    sectorAllocation: calculateSectorAllocation(holdings),
  };

  const recommendations = generateRecommendations(portfolio, riskProfile);

  return {
    ...portfolio,
    recommendations,
  };
};
