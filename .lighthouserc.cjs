module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:4321/",
        "http://localhost:4321/looplogic/",
        "http://localhost:4321/hydrovault/",
      ],
      numberOfRuns: 3,
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      assertions: {
        // accessibility and SEO are deterministic — hard fail
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
        // performance can vary in CI — warn only
        "categories:performance": ["warn", { minScore: 0.85 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
      },
    },
  },
};
