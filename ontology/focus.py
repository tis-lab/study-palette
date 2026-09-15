"""
The proof-of-concept scope: cardiac and lung function, hypertension, diabetes.

TOPMed is a heart, lung, blood and sleep programme, so the cardiac and
respiratory variables are where cross-study querying has to work first.
Hypertension and Type 2 diabetes are the two conditions the synthetic corpus
models in depth, which makes them the pair that can be demonstrated end to end.

Names are BDC-VarLib slot names. Several are near-duplicates of each other
(`hist_hrtfail` and `hist_heart_failure`, `hrt_rt` and `hrtrt`) because the
variable library carries both spellings; they are all listed so the wireframes
show what a user would actually encounter.
"""

FOCUS_AREAS = {
    "Cardiac": [
        "afib", "angina", "chd", "chf", "cvd", "valv_hrtdis", "stroke",
        "stroke_isch_atk", "pad", "ven_thromb", "blood_clots",
        "hist_cor_art_dis", "hist_cvd", "hist_heart_disease",
        "hist_heart_failure", "hist_hrt_failure", "hist_hrtdis",
        "hist_hrtfail", "hist_mi", "hist_my_inf", "history_cvd",
        "hist_cor_angio", "hist_cor_bypg", "hist_coronary_bypass",
        "lvh_ekg", "qrs_ekg", "qt_ekg", "pr_ekg", "pr_qrs_qt", "pacem_stat",
        "cac_score", "cac_volume", "carotid_imt", "carotid_plaque",
        "carotid_sten_left", "carotid_sten_right", "hrt_rt", "hrtrt", "spo2",
        "bnp", "nt_bnp", "troponin", "crp", "d_dimer",
    ],
    "Lung": [
        "asthma", "asthma_md", "bronchitis", "bronchitis_md", "chr_bronchitis",
        "copd", "emphysema", "pulmonary_fibrosis", "slp_ap",
        "alpha1_antitrypsin", "spirometry", "spirometry_pre_bd",
        "spirometry_post_bd", "apnea_hypop_index",
    ],
    "Hypertension": [
        "hyperten", "hypertension", "blood_pressure", "mean_art_press",
        "mn_art_pres", "hypert_trt", "tak_antihypertensives", "tak_betablk",
        "tak_aceinhib", "tak_angiorecepblk", "tak_calchanblk", "tak_diuret",
        "tak_alphablk", "tak_vasodil", "tak_aldorecepblk", "tak_cenactag",
    ],
    "Diabetes": [
        "diabetes", "hemo_a1c", "fast_gluc_bld", "fasting_blood_gluc",
        "glucose_bld", "insulin_blood", "insulin_in_blood", "tak_insulin",
        "tak_med_diab", "tak_orlhypoag",
    ],
}


def area_of(name):
    """Which focus area a VarLib slot belongs to, or None."""
    for area, names in FOCUS_AREAS.items():
        if name in names:
            return area
    return None


def all_names():
    return [name for names in FOCUS_AREAS.values() for name in names]
