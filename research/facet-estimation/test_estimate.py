import numpy as np
import pytest
from estimate import Tables, crosstab, estimate


@pytest.fixture
def population():
    """Four correlated facets with three-way structure, two binary and two with three values."""
    rng = np.random.default_rng(0)
    n = 5000
    a = rng.integers(0, 2, n)
    b = (rng.random(n) < 0.2 + 0.5 * a).astype(int)
    c = np.clip(a + b + rng.integers(-1, 2, n), 0, 2)
    d = np.where(a == b, c, rng.integers(0, 3, n))
    return np.stack([a, b, c, d], axis=1), [2, 2, 3, 3]


def true_count(X, query):
    """Count rows matching every (facet, value) in the query."""
    mask = np.ones(len(X), bool)
    for f, v in query:
        mask &= X[:, f] == v
    return int(mask.sum())


def test_crosstab_counts_every_cell():
    """A table's cells partition the participants."""
    X = np.array([[0, 1], [1, 1], [1, 0], [1, 1]])
    assert crosstab(X, [2, 2], (0, 1)).tolist() == [[0, 1], [1, 2]]


@pytest.mark.parametrize("query", [((0, 1), (1, 1)), ((0, 1), (2, 2), (3, 0)), ((1, 0), (2, 1), (3, 2))])
def test_exact_when_query_fits_in_the_tables(population, query):
    """A query no wider than the tables' order has its own table, so the estimate is exact."""
    X, card = population
    assert estimate(query, Tables(X, card, order=3)) == pytest.approx(true_count(X, query), abs=1e-6)


def test_pairs_are_close_but_not_exact_on_three_way_structure(population):
    """With only pairs, a three-facet query is estimated, not reproduced."""
    X, card = population
    query = ((0, 1), (1, 1), (2, 2))
    truth = true_count(X, query)
    e = estimate(query, Tables(X, card, order=2))
    assert e != pytest.approx(truth, abs=1)
    assert e == pytest.approx(truth, rel=0.3)


def test_noise_is_calibrated_to_the_number_of_tables(population):
    """Noise sd is sqrt(tables / (2 rho)), since one participant is in one cell of every table."""
    X, card = population
    tables = Tables(X, card, order=2, rho=0.5)
    assert tables.count == 4 + 6
    assert tables.sigma == pytest.approx(np.sqrt(10))
