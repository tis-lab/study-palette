"""
Synthetic populations to estimate against.

Every association below is invented. None of these populations is derived from participant
data, and none is written to disk.
"""

import sys
from dataclasses import dataclass
from pathlib import Path

import numpy as np

SYNTHETIC = Path(__file__).resolve().parents[2] / "synthetic"


@dataclass
class Population:
    """Participants x facets matrix of value codes, with facet names and value labels."""

    name: str
    X: np.ndarray
    names: list
    labels: list

    @property
    def card(self):
        """Number of values each facet takes."""
        return [len(v) for v in self.labels]


def _assemble(name, columns):
    """Build a Population from {facet: (codes, labels)}, dropping facets with a single value."""
    columns = {k: v for k, v in columns.items() if len(np.unique(v[0])) > 1}
    X = np.stack([c for c, _ in columns.values()], axis=1).astype(np.int8)
    return Population(name, X, list(columns), [lab for _, lab in columns.values()])


YES_NO = ["no", "yes"]


def toy(n=20000, seed=7):
    """
    Build a small clinical population with known structure.

    Two three-way effects are built in: hypertension is more common in young men than young
    women but more common in old women than old men, and asthma flips from boys to adult women.
    """
    rng = np.random.default_rng(seed)
    u = lambda: rng.random(n)  # noqa: E731
    female = u() < 0.55
    age = rng.choice(3, n, p=[0.3, 0.4, 0.3])
    young, old = age == 0, age == 2
    obese = u() < np.where(young, 0.18, 0.32)
    smoker = u() < np.where(female, 0.16, 0.26)
    t2d = u() < np.array([0.02, 0.08, 0.18])[age] * np.where(obese, 2.5, 0.7)
    htn_rate = np.array([[0.15, 0.06], [0.32, 0.28], [0.50, 0.62]])[age, female.astype(int)]
    htn = u() < htn_rate * np.where(obese, 1.3, 1.0)
    metformin = u() < np.where(t2d, 0.7, 0.01)
    statin = u() < 1 - 0.95 * (1 - 0.55 * t2d) * (1 - 0.35 * htn) * (1 - 0.2 * old)
    asthma = u() < np.where(young, np.where(female, 0.07, 0.11), np.where(female, 0.10, 0.06))
    copd = u() < np.where(smoker, np.where(old, 0.25, 0.07), 0.02)
    albuterol = u() < 1 - (1 - np.where(asthma, 0.75, 0.01)) * (1 - 0.6 * copd)
    return _assemble("toy", {
        "sex": (female, ["male", "female"]),
        "age": (age, ["young", "middle", "old"]),
        **{k: (v, YES_NO) for k, v in dict(
            obese=obese, smoker=smoker, t2d=t2d, hypertension=htn, metformin=metformin,
            statin=statin, asthma=asthma, copd=copd, albuterol=albuterol).items()},
    })


def corpus(size=None):
    """
    Build the synthetic corpus's two studies from its population model.

    Facets are read from the model directly rather than from dm-bip output: harmonization
    changes the shape of a record, not who has what. Measurements use the most recent value,
    as the summary schema does. `size` overrides the corpus's 500 participants per study.
    """
    sys.path.insert(0, str(SYNTHETIC))
    import population as pop  # noqa: PLC0415
    import vocab as v  # noqa: PLC0415

    if size:
        pop.STUDY_ONE.size = pop.STUDY_TWO.size = size
    _, participants = pop.build()

    def active(p, name):
        c = p.conditions.get(name)
        return bool(c) and c["status"] in (v.PRESENT, v.HISTORICAL)

    def last(p, attr):
        values = [getattr(x, attr) for x in p.visits if getattr(x, attr) is not None]
        return values[-1] if values else None

    def at_least(x, t):
        return x is not None and x >= t

    def facets(p):
        hdl, wbc = last(p, "hdl"), last(p, "wbc")
        return {
            "female": p.person.sex == v.FEMALE,
            "white": p.person.race == v.WHITE,
            "black": p.person.race == v.BLACK,
            "hispanic": p.person.ethnicity == v.HISPANIC,
            "deceased": p.person.deceased,
            "age_65_plus": p.visits[-1].age_days >= 65 * 365,
            "heart_failure": active(p, "heart_failure"),
            "family_stroke": active(p, "family_stroke"),
            "hypertension": active(p, "hypertension"),
            "t2d": active(p, "diabetes"),
            "mi": active(p, "heart_attack"),
            "ccb": p.ccb is not None,
            "high_sbp": at_least(last(p, "systolic"), 141),
            "high_dbp": at_least(last(p, "diastolic"), 91),
            "high_bmi": at_least(last(p, "bmi"), 25) or last(p, "bmi_category") == "over weight",
            "low_hdl": hdl is not None and hdl < 40,
            "high_bun": at_least(last(p, "bun"), 21),
            "abnormal_wbc": wbc is not None and not 4.5 <= wbc <= 11.0,
            "high_glucose": at_least(last(p, "glucose"), 126),
            "high_hba1c": at_least(last(p, "hba1c"), 6.5),
        }

    out = []
    for study in (pop.STUDY_ONE, pop.STUDY_TWO):
        rows = [facets(p) for p in participants if p.study is study]
        out.append(_assemble(study.name, {k: (np.array([r[k] for r in rows]), YES_NO) for k in rows[0]}))
    return out


# dbGaP "total consented subjects", read 2026-10-26.
HV_SIZES = {"ARIC": 15687, "CARDIA": 3622, "CHS": 5609, "COPDGene": 10719, "FHS": 15078, "HCHS": 12121,
            "JHS": 3889, "LTRC": 1601, "MESA": 8296, "SPIROMICS": 2973, "WHI": 143213}

# Approximate design facts: female fraction, age at last visit (mean, sd), race mix, lung-disease enriched.
HV_DESIGN = {
    "ARIC": (0.55, (70, 9), {"white": .73, "black": .27}, False),
    "CARDIA": (0.55, (50, 4), {"white": .5, "black": .5}, False),
    "CHS": (0.58, (78, 6), {"white": .84, "black": .16}, False),
    "COPDGene": (0.46, (62, 9), {"white": .67, "black": .33}, True),
    "FHS": (0.54, (60, 15), {"white": 1.0}, False),
    "HCHS": (0.60, (46, 14), {"hispanic": 1.0}, False),
    "JHS": (0.63, (60, 12), {"black": 1.0}, False),
    "LTRC": (0.50, (64, 10), {"white": .9, "black": .1}, True),
    "MESA": (0.53, (66, 10), {"white": .38, "black": .28, "hispanic": .22, "asian": .12}, False),
    "SPIROMICS": (0.48, (63, 9), {"white": .78, "black": .22}, True),
    "WHI": (1.0, (68, 7), {"white": .83, "black": .09, "hispanic": .04, "asian": .04}, False),
}

HV_DOMAINS = {
    "cardiometabolic": "hyperten hypert diabet obes chd my_inf angina cvd hrt stroke pad chf cac carotid bmi "
                       "wgt waist hip gluc a1c insulin chol ldl hdl triglyc blood_pressure mn_art lvh bnp statin "
                       "aceinhib betablk calchan diuret angiorecep vasodil med_diab orlhypoag alphablk aspirin "
                       "cor_bypg afib valv pacem qt pr_qrs ven_thromb",
    "lung": "copd asthma emphys bronch spiro fev smok cig lung steroid oxygen slp_ap",
    "inflammation": "crp il6 il10 tnf icam fibrin whtbld neutro eselectin d_dimer cd40 mmp9 factor_8 willeb "
                    "lppla2 isoprost",
    "renal": "creat egfr cysc albumin urin sodium potassium chloride bun kidney",
    "blood": "hemo hemat mch mcv rdbld platelet lympho monocyte eosino basophil",
    "social": "edu income sdoh alcohol fruit vege sleep cesd depress",
}
HV_PREVALENCE = {
    "hyperten": .40, "diabet": .14, "obes": .33, "copd": .15, "asthma": .10, "chd": .09, "my_inf": .06,
    "stroke": .05, "afib": .07, "chf": .05, "hrtfail": .05, "angina": .06, "cvd": .12, "emphys": .08,
    "bronch": .08, "pad": .04, "statin": .25, "aspirin": .30, "med_diab": .10, "insulin": .04,
    "hypert_trt": .35, "diuret": .15, "aceinhib": .15, "betablk": .12, "calchan": .10,
}
HV_INDICATION = {
    "med_diab": "diabet", "insulin": "diabet", "orlhypoag": "diabet", "aceinhib": "hyperten",
    "betablk": "hyperten", "calchan": "hyperten", "diuret": "hyperten", "angiorecep": "hyperten",
    "alphablk": "hyperten", "hypert_trt": "hyperten", "cort_steroid": "copd",
}
HV_MEASURED = ("MeasurementObservation", "MeasurementObservationSet")
HV_FACET_CLASSES = ("Condition", "DrugExposure", "Procedure", "Observation", "SdohObservation", *HV_MEASURED)


def _first_match(table, name, default):
    return next((v for k, v in table.items() if k in name), default)


def hv_variables(specs, study):
    """(spec name, BDCHM class) for each of a study's harmonized variables that would be a facet."""
    out = []
    for f in sorted((Path(specs) / f"{study}-ingest").glob("*.yaml")):
        lines = f.read_text().splitlines()
        i = next((i for i, line in enumerate(lines) if "class_derivations:" in line), None)
        cls = lines[i + 1].strip(" :#") if i is not None and i + 1 < len(lines) else ""
        if cls in HV_FACET_CLASSES:
            out.append((f.stem, cls))
    return out


def hv(study, specs, seed=5):
    """
    Build a population with one study's harmonized variables, at its dbGaP size.

    Real: which variables the study has (from its transformation specs), their BDCHM class, and
    the study's size and broad design. Invented: every prevalence and association. Age, sex and
    social position drive a handful of latent domains, and a general-health factor couples all of
    them, so facets are correlated beyond pairs. Men's cardiometabolic risk rises earlier and
    women's later. Medications follow their indication. Measurements are binned 20/60/20.
    """
    rng = np.random.default_rng(seed)
    n = HV_SIZES[study]
    female_frac, (age_mu, age_sd), races, lung_enriched = HV_DESIGN[study]
    female = rng.random(n) < female_frac
    age = np.clip(rng.normal(age_mu, age_sd, n), 20, 95)
    race = rng.choice(len(races), n, p=list(races.values()))
    black = race == list(races).index("black") if "black" in races else np.zeros(n, bool)
    social = rng.normal(0, 1, n) - 0.4 * black
    a = (age - 60) / 10
    z = {
        "cardiometabolic": 0.45 * a + 0.35 * ~female - 0.25 * ~female * np.maximum(a, 0) + 0.3 * black
        - 0.25 * social,
        "lung": 0.2 * a - 0.35 * social + (1.2 if lung_enriched else 0),
        "inflammation": 0.2 * a + 0.2 * female - 0.2 * social,
        "renal": 0.4 * a + 0.2 * black,
        "blood": 0.1 * a - 0.3 * female,
        "social": social,
        "other": 0.2 * a,
    }
    general_health = rng.normal(0, 1, n)
    for d in z:
        z[d] = z[d] + rng.normal(0, 0.8, n) + 0.4 * general_health
    z["inflammation"] += 0.5 * z["cardiometabolic"]
    z["renal"] += 0.4 * z["cardiometabolic"]

    columns = {
        "sex": (female, ["male", "female"]),
        "race": (race, list(races)),
        "age_band": (np.digitize(age, [45, 65, 75]), ["<45", "45-64", "65-74", "75+"]),
    }
    indicated = {}
    for name, cls in hv_variables(specs, study):
        domain = next((d for d, keys in HV_DOMAINS.items() if any(k in name for k in keys.split())), "other")
        liability = z[domain] + rng.normal(0, 0.9, n)
        indication = _first_match(HV_INDICATION, name, None)
        if indication in indicated:
            liability = liability + 2.5 * indicated[indication]
        if cls in HV_MEASURED:
            columns[name] = (np.digitize(liability, np.quantile(liability, [0.2, 0.8])), ["low", "normal", "high"])
            continue
        prevalence = _first_match(HV_PREVALENCE, name, 0.10 if cls == "DrugExposure" else 0.08)
        if lung_enriched and domain == "lung":
            prevalence = min(prevalence * 3, 0.6)
        present = liability > np.quantile(liability, 1 - prevalence)
        indicated[name.removeprefix("hist_")] = present
        columns[name] = (present, YES_NO)
    return _assemble(study, columns)
