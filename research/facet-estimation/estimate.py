"""
Estimate the count for a combination of facet values from low-order tables.

The tables are built once from row-level data; an estimate touches only the tables.
"""

import itertools
import math

import numpy as np


def crosstab(X, card, facets):
    """Count participants in every cell of the table over `facets`."""
    idx = np.zeros(len(X), dtype=np.int64)
    for f in facets:
        idx = idx * card[f] + X[:, f]
    shape = [card[f] for f in facets]
    return np.bincount(idx, minlength=math.prod(shape)).reshape(shape).astype(float)


class Tables:
    """
    Every table of order up to `order` over a population's facets.

    Built lazily and cached, so a run only pays for the tables its queries touch. With
    `rho` set, each table carries Gaussian noise calibrated to rho-zCDP for the release of
    all of them: a participant falls in one cell of every table, so adding or removing one
    changes `count` cells by one, and sigma = sqrt(count / (2 rho)).
    """

    def __init__(self, X, card, order, rho=None, seed=0):
        """Prepare tables over `X`, a participants x facets matrix of value codes."""
        self.X, self.card, self.order = X, card, order
        self.n = len(X)
        self.count = sum(math.comb(len(card), r) for r in range(1, order + 1))
        self.sigma = math.sqrt(self.count / (2 * rho)) if rho else 0.0
        self._rng = np.random.default_rng(seed)
        self._cache = {}

    def __getitem__(self, facets):
        """Return the table over `facets`, a sorted tuple of facet indices."""
        if facets not in self._cache:
            t = crosstab(self.X, self.card, facets)
            if self.sigma:
                t = np.maximum(t + self._rng.normal(0, self.sigma, t.shape), 0)
            self._cache[facets] = t
        return self._cache[facets]


def estimate(query, tables, iters=50):
    """
    Estimate how many participants match every (facet, value) pair in `query`.

    Each table inside the query is collapsed to value-versus-rest on its facets, and
    iterative proportional fitting finds the maximum-entropy joint over the query that
    agrees with all of them. When the query has no more facets than the tables' order,
    the query's own table is among them and the estimate is exact.
    """
    facets = [f for f, _ in query]
    value = dict(query)
    k = len(query)
    targets = []
    for r in range(1, min(tables.order, k) + 1):
        for subset in itertools.combinations(facets, r):
            key = tuple(sorted(subset))
            t = tables[key]
            for axis, f in enumerate(key):
                hit = np.take(t, [value[f]], axis=axis)
                t = np.concatenate([t.sum(axis=axis, keepdims=True) - hit, hit], axis=axis)
            t = t * tables.n / max(t.sum(), 1e-9)
            positions = [facets.index(f) for f in key]
            order = np.argsort(positions)
            targets.append((tuple(sorted(positions)), np.transpose(t, order)))

    w = np.full((2,) * k, tables.n / 2**k)
    for _ in range(iters):
        for positions, t in targets:
            rest = tuple(i for i in range(k) if i not in positions)
            current = w.sum(axis=rest)
            ratio = np.divide(t, current, out=np.zeros_like(t), where=current > 0)
            w = w * ratio.reshape([2 if i in positions else 1 for i in range(k)])
    return float(w[(1,) * k])
