import React, { createContext, useState, useCallback } from "react";
import { calculatePortfolioMetrics } from "../utils/portfolioCalculations";

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolios, setPortfolios] = useState([
    {
      id: "default",
      name: "My Portfolio",
      riskProfile: "moderate",
      holdings: [
        {
          id: "1",
          symbol: "AAPL",
          name: "Apple Inc.",
          quantity: 10,
          buyPrice: 150,
          currentPrice: 182,
          totalCost: 1500,
          currentValue: 1820,
          sector: "Technology",
          assetType: "stock",
          date: "2023-01-15",
        },
        {
          id: "2",
          symbol: "MSFT",
          name: "Microsoft Corporation",
          quantity: 5,
          buyPrice: 300,
          currentPrice: 378,
          totalCost: 1500,
          currentValue: 1890,
          sector: "Technology",
          assetType: "stock",
          date: "2023-02-20",
        },
        {
          id: "3",
          symbol: "JNJ",
          name: "Johnson & Johnson",
          quantity: 8,
          buyPrice: 160,
          currentPrice: 165,
          totalCost: 1280,
          currentValue: 1320,
          sector: "Healthcare",
          assetType: "stock",
          date: "2023-03-10",
        },
        {
          id: "4",
          symbol: "PG",
          name: "Procter & Gamble",
          quantity: 12,
          buyPrice: 130,
          currentPrice: 145,
          totalCost: 1560,
          currentValue: 1740,
          sector: "Consumer Staples",
          assetType: "stock",
          date: "2023-04-05",
        },
        {
          id: "5",
          symbol: "VTI",
          name: "Vanguard Total Stock Market",
          quantity: 15,
          buyPrice: 200,
          currentPrice: 228,
          totalCost: 3000,
          currentValue: 3420,
          sector: "ETF",
          assetType: "stock",
          date: "2023-05-12",
        },
      ],
    },
  ]);

  const [activePortfolioId, setActivePortfolioId] = useState("default");

  const activePortfolio = portfolios.find((p) => p.id === activePortfolioId);

  const addHolding = useCallback(
    (holding) => {
      setPortfolios((prev) =>
        prev.map((p) =>
          p.id === activePortfolioId
            ? {
                ...p,
                holdings: [
                  ...p.holdings,
                  {
                    ...holding,
                    id: Date.now().toString(),
                  },
                ],
              }
            : p,
        ),
      );
    },
    [activePortfolioId],
  );

  const updateHolding = useCallback(
    (holdingId, updates) => {
      setPortfolios((prev) =>
        prev.map((p) =>
          p.id === activePortfolioId
            ? {
                ...p,
                holdings: p.holdings.map((h) =>
                  h.id === holdingId ? { ...h, ...updates } : h,
                ),
              }
            : p,
        ),
      );
    },
    [activePortfolioId],
  );

  const removeHolding = useCallback(
    (holdingId) => {
      setPortfolios((prev) =>
        prev.map((p) =>
          p.id === activePortfolioId
            ? {
                ...p,
                holdings: p.holdings.filter((h) => h.id !== holdingId),
              }
            : p,
        ),
      );
    },
    [activePortfolioId],
  );

  const updateRiskProfile = useCallback(
    (riskProfile) => {
      setPortfolios((prev) =>
        prev.map((p) =>
          p.id === activePortfolioId ? { ...p, riskProfile } : p,
        ),
      );
    },
    [activePortfolioId],
  );

  const getPortfolioMetrics = useCallback(() => {
    if (!activePortfolio) return null;
    return calculatePortfolioMetrics(
      activePortfolio.holdings,
      [],
      activePortfolio.riskProfile,
    );
  }, [activePortfolio, calculatePortfolioMetrics]);

  const value = {
    portfolios,
    activePortfolioId,
    setActivePortfolioId,
    activePortfolio,
    addHolding,
    updateHolding,
    removeHolding,
    updateRiskProfile,
    getPortfolioMetrics,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
