# Harmonized concept terms

Every row is a concept CURIE emitted by the BDC harmonized-variable trans-specs, with the label published by the vocabulary that owns it. Labels are fetched, never written by hand: Monarch for MONDO/HP/OBA, OLS4 for other OBO ontologies, the OHDSI WebAPI for OMOP, RxNav RxClass for ATC and NDFRT, RxNav for RxCUI.

**The CURIE is the identity and the Label is what to display.** The `Via` column lists the harmonized variables a term is reached through; it is provenance only. Those names are spec filenames — they are not concepts, they do not appear in harmonized data, and nothing should key on them or show them to a user.

## Condition

77 terms.

| CURIE | Label | Vocabulary | Studies | Via |
|---|---|---|---|---|
| `MONDO:0005350` | abdominal aortic aneurysm | MONDO | 1 | `pad` |
| `MONDO:0004784` | allergic asthma | MONDO | 1 | `asthma` |
| `HP:0003193` | Allergic rhinitis | HP | 1 | `asthma` |
| `HP:0012393` | Allergy | HP | 1 | `asthma` |
| `HP:0001681` | Angina pectoris | HP | 9 | `angina`, `hist_cvd` |
| `MONDO:0003803` | aortic valve disorder | MONDO | 1 | `hist_hrtdis` |
| `MONDO:0005648` | aortic valve insufficiency | MONDO | 1 | `valv_hrtdis` |
| `MONDO:0042981` | aortic valve stenosis | MONDO | 1 | `valv_hrtdis` |
| `HP:0004420` | Arterial thrombosis | HP | 1 | `pad` |
| `MONDO:0004979` | asthma | MONDO | 10 | `asthma`, `asthma_md` |
| `HP:0002621` | Atherosclerosis | HP | 2 | `hist_cvd`, `pad` |
| `MONDO:0005311` | atherosclerosis | MONDO | 1 | `cvd` |
| `MONDO:0004981` | atrial fibrillation | MONDO | 8 | `afib` |
| `MONDO:0005310` | atrial flutter | MONDO | 1 | `afib` |
| `MONDO:0005394` | brain infarction | MONDO | 2 | `stroke` |
| `MONDO:0000745` | cardiac arrest | MONDO | 1 | `hist_cvd` |
| `MONDO:0004995` | cardiovascular disorder | MONDO | 5 | `cvd`, `hist_cvd` |
| `MONDO:0004911` | cardiovascular syphilis | MONDO | 1 | `hist_hrtdis` |
| `OMOP:4102124` | Carotid atherosclerosis | SNOMED | 4 | `carotid_plaque` |
| `HP:0001342` | Cerebral hemorrhage | HP | 1 | `stroke` |
| `MONDO:0002679` | cerebral infarction | MONDO | 1 | `stroke` |
| `MONDO:0011057` | cerebrovascular disorder | MONDO | 2 | `stroke` |
| `MONDO:0850282` | chronic asthma | MONDO | 1 | `asthma` |
| `MONDO:0005607` | chronic bronchitis | MONDO | 5 | `bronchitis`, `bronchitis_md`, `chr_bronchitis` |
| `MONDO:0005002` | chronic obstructive pulmonary disease | MONDO | 9 | `chr_bronchitis`, `copd` |
| `MONDO:0005453` | congenital heart disease | MONDO | 3 | `hist_cvd`, `hist_hrtdis` |
| `MONDO:0005009` | congestive heart failure | MONDO | 8 | `chf`, `hist_cvd`, `hist_heart_failure` +3 |
| `OMOP:4336464` | Coronary artery bypass graft | SNOMED | 8 | `hist_cor_bypg`, `hist_coronary_bypass` |
| `MONDO:0005010` | coronary artery disorder | MONDO | 8 | `chd`, `hist_cor_art_dis`, `hist_cvd` +1 |
| `HP:0002625` | Deep venous thrombosis | HP | 5 | `ven_thromb` |
| `MONDO:0005015` | diabetes mellitus | MONDO | 11 | `diabetes` |
| `MONDO:0005267` | heart disorder | MONDO | 5 | `hist_heart_disease`, `hist_hrtdis` |
| `MONDO:0005252` | heart failure | MONDO | 6 | `chf`, `hist_hrtfail`, `ven_thromb` |
| `MONDO:0002869` | heart valve disorder | MONDO | 5 | `hist_cvd`, `hist_hrtdis`, `valv_hrtdis` |
| `MONDO:1060199` | hemorrhagic stroke | MONDO | 1 | `stroke` |
| `HP:0000822` | Hypertension | HP | 10 | `hypert_trt`, `hyperten`, `hypertension` |
| `MONDO:0001302` | hypertensive heart disease | MONDO | 2 | `hist_hrtdis` |
| `HP:0025691` | Impaired fasting glucose | HP | 1 | `diabetes` |
| `HP:0040270` | Impaired glucose tolerance | HP | 1 | `diabetes` |
| `MONDO:0006803` | inferior myocardial infarction | MONDO | 1 | `hist_my_inf` |
| `HP:0004417` | Intermittent claudication | HP | 1 | `pad` |
| `MONDO:0013792` | intracerebral hemorrhage | MONDO | 4 | `stroke` |
| `MONDO:0006809` | intracranial embolism | MONDO | 2 | `stroke` |
| `HP:0002170` | Intracranial hemorrhage | HP | 2 | `stroke` |
| `HP:0002140` | Ischemic stroke | HP | 2 | `stroke` |
| `HP:0001712` | Left ventricular hypertrophy | HP | 5 | `lvh_ekg` |
| `MONDO:0000270` | lower respiratory tract disorder | MONDO | 1 | `copd` |
| `HP:0001653` | Mitral regurgitation | HP | 1 | `valv_hrtdis` |
| `HP:0001718` | Mitral stenosis | HP | 1 | `valv_hrtdis` |
| `MONDO:0003767` | mitral valve disorder | MONDO | 1 | `hist_hrtdis` |
| `MONDO:0005139` | morbid obesity | MONDO | 2 | `obesity` |
| `MONDO:0005068` | myocardial infarction | MONDO | 9 | `hist_cvd`, `hist_mi`, `hist_my_inf` |
| `MONDO:0024644` | myocardial ischemia | MONDO | 1 | `hist_hrtdis` |
| `HP:0001513` | Obesity | HP | 1 | `obesity` |
| `OMOP:433736` | Obesity | SNOMED | 2 | `obesity` |
| `MONDO:0011122` | obesity disorder | MONDO | 1 | `obesity` |
| `MONDO:0005386` | peripheral arterial disease | MONDO | 7 | `pad` |
| `MONDO:0005294` | peripheral vascular disease | MONDO | 4 | `hist_cvd`, `pad` |
| `MONDO:0006920` | prediabetes syndrome | MONDO | 2 | `diabetes` |
| `MONDO:0005279` | pulmonary embolism | MONDO | 6 | `hist_cvd`, `ven_thromb` |
| `MONDO:0004849` | pulmonary emphysema | MONDO | 4 | `emphysema` |
| `MONDO:0002771` | pulmonary fibrosis | MONDO | 1 | `pulmonary_fibrosis` |
| `MONDO:0005149` | pulmonary hypertension | MONDO | 1 | `hyperten` |
| `MONDO:0024355` | respiratory tract infectious disorder | MONDO | 1 | `asthma` |
| `MONDO:0006955` | rheumatic heart disease | MONDO | 4 | `hist_hrtdis` |
| `HP:0010535` | Sleep apnea | HP | 3 | `slp_ap` |
| `MONDO:0005296` | sleep apnea syndrome | MONDO | 1 | `slp_ap` |
| `HP:0001297` | Stroke | HP | 10 | `fam_stroke`, `stroke` |
| `MONDO:0005099` | subarachnoid hemorrhage | MONDO | 4 | `stroke` |
| `HP:0031664` | Systolic heart murmur | HP | 1 | `hist_hrtdis` |
| `MONDO:0000831` | thrombotic disease | MONDO | 2 | `blood_clots`, `ven_thromb` |
| `MONDO:0005264` | transient ischemic attack | MONDO | 6 | `stroke`, `stroke_isch_atk` |
| `MONDO:0004848` | ulcerative stomatitis | MONDO | 1 | `emphysema` |
| `MONDO:0005492` | urticaria | MONDO | 1 | `asthma` |
| `MONDO:0005399` | venous thromboembolism | MONDO | 5 | `ven_thromb` |
| `HP:0001714` | Ventricular hypertrophy | HP | 1 | `lvh_ekg` |
| `HP:0030828` | Wheezing | HP | 1 | `asthma` |

## MeasurementObservation

118 terms.

| CURIE | Label | Vocabulary | Studies | Via |
|---|---|---|---|---|
| `OMOP:2212186` | Albumin; serum, plasma or whole blood | CPT4 | 1 | `albumin_bld` |
| `OMOP:35609491` | Alcohol units consumed per week | SNOMED | 6 | `alcohol`, `alcohol_servings` |
| `OBA:2052375` | amount of cystatin-C (human) in blood | OBA | 5 | `cysc_bld` |
| `OBA:2052778` | amount of E-selectin (human) in blood | OBA | 3 | `eselectin` |
| `OBA:2060175` | amount of hemoglobin in blood | OBA | 9 | `hemo`, `labs_cbc` |
| `OBA:2060174` | amount of insulin in blood | OBA | 8 | `insulin_blood`, `insulin_in_blood` |
| `OBA:2052890` | amount of interleukin-6 (human) in blood | OBA | 3 | `il6` |
| `OBA:2052701` | amount of P-selectin (human) in blood | OBA | 2 | `pselectin` |
| `OBA:2051979` | amount of tumor necrosis factor (human) in blood | OBA | 1 | `tnfa` |
| `OBA:2051975` | amount of tumor necrosis factor receptor superfamily member 1A (human) in blood | OBA | 1 | `tnfa_r1` |
| `OBA:2052741` | amount of von Willebrand factor (human) in blood | OBA | 4 | `willeb_fac` |
| `OMOP:37396400` | Apnea Hypopnea Index | SNOMED | 3 | `apnea_hypop_index` |
| `OBA:VT2000000` | arterial blood pressure trait | OBA | 4 | `mean_art_press`, `mn_art_pres` |
| `OMOP:4263457` | Aspartate aminotransferase measurement | SNOMED | 2 | `ast_sgot` |
| `OBA:VT0002607` | basophil quantity | OBA | 4 | `basophil_ct`, `basophil_ncnc_bld` |
| `OMOP:3006315` | Basophils [#/volume] in Blood | LOINC | 1 | `basophil_ncnc_bld` |
| `OMOP:4230543` | Bilirubin, total measurement | SNOMED | 2 | `bilirubin_tot` |
| `OBA:VT0003018` | blood chloride amount | OBA | 4 | `chloride_bld` |
| `OBA:VT0000180` | blood cholesterol amount | OBA | 8 | `tot_chol_bld` |
| `OMOP:4136584` | Blood cystatin C measurement | SNOMED | 1 | `cysc_bld` |
| `OBA:VT0010513` | blood ferritin amount | OBA | 2 | `ferritin` |
| `OBA:VT0000188` | blood glucose amount | OBA | 7 | `glucose_bld` |
| `OBA:VT0000184` | blood HDL cholesterol amount | OBA | 8 | `hdl` |
| `OBA:VT0010616` | blood lactate amount | OBA | 1 | `lactate` |
| `OBA:VT0010477` | blood lactate dehydrogenase amount | OBA | 1 | `lactate_dehyd` |
| `OBA:VT0000181` | blood LDL cholesterol amount | OBA | 8 | `ldl` |
| `OBA:VT0002668` | blood potassium amount | OBA | 5 | `potassium` |
| `OBA:VT0001776` | blood sodium amount | OBA | 5 | `sodium_blood` |
| `OBA:VT0002644` | blood triglyceride amount | OBA | 8 | `triglyc_bld` |
| `OBA:VT0005265` | blood urea nitrogen amount | OBA | 4 | `bun` |
| `OBA:VT0001253` | body height | OBA | 10 | `bdy_hgt`, `body_measures` |
| `OMOP:607590` | Body height | SNOMED | 1 | `bdy_hgt` |
| `OBA:VT0001259` | body mass | OBA | 11 | `bdy_wgt`, `body_measures` |
| `OBA:2045455` | body mass to height ratio | OBA | 11 | `bmi` |
| `OBA:VT0005535` | body temperature trait | OBA | 1 | `bdy_temp` |
| `OMOP:4208414` | C-reactive protein measurement | SNOMED | 7 | `crp` |
| `OMOP:4166120` | Calcium volume | SNOMED | 2 | `cac_volume` |
| `OBA:2050108` | carotid artery thickness | OBA | 1 | `carotid_imt` |
| `OMOP:4138462` | Carotid intima media thickness | SNOMED | 4 | `carotid_imt` |
| `OMOP:36303297` | Center for Epidemiologic Studies Depression Scale-Revised total score [CESD-R] | LOINC | 6 | `cesd_score` |
| `OBA:0000061` | circulating fibrinogen levels | OBA | 6 | `fibrin` |
| `OMOP:44805650` | Conjugated bilirubin measurement | SNOMED | 1 | `bilirubin_con` |
| `OMOP:42872742` | Coronary artery calcium score | SNOMED | 5 | `cac_score` |
| `OMOP:3007081` | Creatinine [Interpretation] in Urine | LOINC | 1 | `creat_urin` |
| `OMOP:2212294` | Creatinine; blood | CPT4 | 1 | `creat_bld` |
| `OMOP:37393605` | D-dimer level | SNOMED | 4 | `d_dimer` |
| `OBA:VT0002602` | eosinophil quantity | OBA | 4 | `eosinophil_ct`, `eosinophil_ncnc_bld` |
| `OMOP:3013115` | Eosinophils [#/volume] in Blood | LOINC | 1 | `eosinophil_ncnc_bld` |
| `OBA:2045301` | erythrocyte hemoglobin content trait | OBA | 6 | `mch` |
| `OBA:VT0001586` | erythrocyte quantity | OBA | 6 | `rbc`, `rdbld_ct` |
| `OBA:0003460` | erythrocyte volume | OBA | 6 | `mcv` |
| `OMOP:37208635` | Estimated glomerular filtration rate by laboratory calculation | SNOMED | 4 | `egfr` |
| `OMOP:37311566` | Estimated intake of vegetable servings in 24 hours | SNOMED | 1 | `vege_serving` |
| `OMOP:4156660` | Fasting blood glucose measurement | SNOMED | 7 | `fast_gluc_bld`, `fasting_blood_gluc` |
| `OMOP:21493059` | Fruit servings 24 hour Estimated | LOINC | 6 | `fruit_serving` |
| `OBA:1001087` | heart rate | OBA | 10 | `hrt_rt`, `hrtrt` |
| `OBA:2045381` | hematocrit | OBA | 9 | `hemat`, `labs_cbc` |
| `OMOP:4151358` | Hematocrit determination | SNOMED | 1 | `hemat` |
| `OMOP:4184637` | Hemoglobin A1c measurement | SNOMED | 5 | `hemo_a1c` |
| `OMOP:4094758` | Hemoglobin finding | SNOMED | 1 | `hemo` |
| `OBA:1000032` | hip circumference | OBA | 7 | `hip_circ` |
| `OMOP:4111665` | Hip circumference | SNOMED | 1 | `hip_circ` |
| `OMOP:45772840` | Implantable cardiac pacemaker | SNOMED | 4 | `pacem_stat` |
| `OMOP:3004578` | Interleukin 10 [Mass/volume] in Serum or Plasma | LOINC | 1 | `il10` |
| `OMOP:3043144` | Interleukin 18 [Mass/volume] in Serum or Plasma | LOINC | 1 | `il18` |
| `OMOP:43020498` | Left carotid artery stenosis | SNOMED | 4 | `carotid_sten_left` |
| `OBA:VT0000217` | leukocyte quantity | OBA | 10 | `labs_cbc`, `lympho_ct`, `whtbld_ct` |
| `OBA:2041535` | level of coagulation factor VII in blood serum | OBA | 5 | `factor_7` |
| `OBA:2041536` | level of coagulation factor VIII in blood serum | OBA | 4 | `factor_8` |
| `OMOP:36305170` | Lipoprotein associated phospholipase A2 [Enzymatic activity/volume] in Serum or Plasma | LOINC | 2 | `lppla2_act` |
| `OMOP:3041450` | Lipoprotein associated phospholipase A2 [Mass/volume] in Serum or Plasma | LOINC | 2 | `lppla2_mass` |
| `OMOP:4209737` | Lymphocyte antigen CD40 | SNOMED | 1 | `cd40` |
| `OMOP:4284103` | Lymphocyte antigen CD54 | SNOMED | 3 | `icam` |
| `OMOP:37208689` | Lymphocyte count in blood | SNOMED | 1 | `lympho_ct` |
| `OMOP:37208690` | Lymphocyte percent count in blood | SNOMED | 4 | `lympho_pct` |
| `OBA:VT0000717` | lymphocyte quantity | OBA | 3 | `lympho_ct`, `lymphocyte_ct` |
| `OMOP:40761106` | Matrix metallopeptidase 9 [Mass/volume] in Blood | LOINC | 1 | `mmp9` |
| `OMOP:37398674` | MCH - Mean corpuscular haemoglobin | SNOMED | 1 | `mch` |
| `OMOP:37393850` | MCHC - Mean corpuscular haemoglobin concentration | SNOMED | 6 | `mchc` |
| `OBA:VT0000223` | monocyte quantity | OBA | 6 | `monocyte_ct`, `monocyte_ncnc_bld` |
| `OMOP:4189511` | N terminal pro-brain natriuretic peptide level | SNOMED | 1 | `nt_bnp` |
| `OMOP:8842` | nanogram per milliliter | UCUM | 1 | `troponin` |
| `OBA:2045303` | natriuretic peptides B level | OBA | 5 | `bnp`, `nt_bnp` |
| `OMOP:37208699` | Neutrophil count in blood | SNOMED | 1 | `neutro_ct` |
| `OMOP:37208698` | Neutrophil percent count in blood | SNOMED | 3 | `neutro_pct` |
| `OBA:VT0000222` | neutrophil quantity | OBA | 3 | `neutro_ct`, `neutrophil_ct` |
| `OBA:2045443` | oxygen concentration in blood | OBA | 4 | `spo2` |
| `OMOP:4041720` | Plasma fasting HDL cholesterol measurement | SNOMED | 3 | `hdl` |
| `OMOP:4041721` | Plasma fasting LDL cholesterol measurement | SNOMED | 2 | `ldl` |
| `OMOP:4041722` | Plasma fasting triglyceride measurement | SNOMED | 3 | `triglyc_bld` |
| `OMOP:4267147` | Platelet count | SNOMED | 9 | `labs_cbc`, `platelet_ct` |
| `OBA:VT0003179` | platelet quantity | OBA | 1 | `platelet_ct` |
| `OBA:0003277` | platelet volume | OBA | 3 | `pmv` |
| `OMOP:4274406` | PR interval - finding | SNOMED | 5 | `pr_ekg` |
| `OMOP:3011888` | Prostaglandin F2 alpha [Mass/volume] in Urine | LOINC | 2 | `isoprostane_8_epi_pgf2a` |
| `OMOP:4273021` | QRS complex - finding | SNOMED | 1 | `qrs_ekg` |
| `OBA:1001086` | QRS duration | OBA | 6 | `qrs_ekg` |
| `OMOP:4273023` | QT interval - finding | SNOMED | 6 | `pr_qrs_qt`, `qt_ekg` |
| `OMOP:4030871` | Red blood cell count | SNOMED | 1 | `rdbld_ct` |
| `OMOP:37397924` | Red blood cell distribution width | SNOMED | 3 | `rdw` |
| `OMOP:43021859` | Right carotid artery stenosis | SNOMED | 4 | `carotid_sten_right` |
| `OBA:2050062` | serum alanine aminotransferase amount | OBA | 1 | `alt_sgpt` |
| `OBA:2050068` | serum albumin amount | OBA | 3 | `albumin_bld` |
| `OBA:2050075` | serum alpha-1-antitrypsin amount | OBA | 1 | `alpha1_antitrypsin` |
| `OBA:2050096` | serum creatinine amount | OBA | 6 | `creat_bld` |
| `OMOP:4041557` | Serum fasting HDL cholesterol measurement | SNOMED | 1 | `hdl` |
| `OMOP:4042061` | Serum fasting LDL cholesterol measurement | SNOMED | 1 | `ldl` |
| `OMOP:4042590` | Serum fasting triglyceride measurement | SNOMED | 1 | `triglyc_bld` |
| `OBA:2040171` | sleep duration trait | OBA | 8 | `sleep_duration_daily` |
| `OMOP:606729` | Sodium intake | SNOMED | 6 | `sodium_intak` |
| `OMOP:4152194` | Systolic blood pressure | SNOMED | 10 | `blood_pressure` |
| `OMOP:4021291` | Troponin measurement | SNOMED | 3 | `troponin` |
| `OBA:VT0002871` | urine albumin amount | OBA | 6 | `albumin_urine` |
| `OMOP:4154347` | Urine albumin/creatinine ratio measurement | SNOMED | 4 | `albumin_creatinine` |
| `OBA:VT0010540` | urine creatinine amount | OBA | 5 | `creat_urin` |
| `OMOP:4042886` | Vegetable | SNOMED | 6 | `vege_serving` |
| `OBA:1001085` | waist circumference | OBA | 9 | `waist_circ` |
| `OMOP:4087501` | Waist/hip ratio | SNOMED | 6 | `waist_hip` |

## Procedure

8 terms.

| CURIE | Label | Vocabulary | Studies | Via |
|---|---|---|---|---|
| `OMOP:4223020` | Cardiac catheterization | SNOMED | 1 | `hist_cor_angio` |
| `OMOP:4184832` | Coronary angioplasty | SNOMED | 6 | `hist_cor_angio` |
| `OMOP:4336464` | Coronary artery bypass graft | SNOMED | 8 | `hist_cor_bypg`, `hist_coronary_bypass` |
| `OMOP:4044550` | Dilation - action | SNOMED | 1 | `hist_cor_angio` |
| `OMOP:45772840` | Implantable cardiac pacemaker | SNOMED | 4 | `pacem_stat` |
| `OMOP:1242799` | Operation on carotid artery | SNOMED | 1 | `hist_cor_angio` |
| `OMOP:4006788` | Percutaneous transluminal coronary angioplasty | SNOMED | 1 | `hist_cor_angio` |
| `OMOP:4178405` | Revascularization - action | SNOMED | 1 | `hist_cor_angio` |

## DrugExposure

98 terms.

| CURIE | Label | Vocabulary | Studies | Via |
|---|---|---|---|---|
| `ATC:C09BA` | ACE inhibitors and diuretics | ATC1-4 | 3 | `tak_aceinhib` |
| `ATC:C09A` | ACE INHIBITORS, PLAIN | ATC1-4 | 6 | `tak_aceinhib` |
| `RxCUI:149` | acebutolol | RxNorm | 1 | `med_use`, `tak_betablk` |
| `NDFRT:N0000009917` | Adrenergic alpha1-Agonists | MOA | 1 | `med_use` |
| `NDFRT:N0000009918` | Adrenergic alpha2-Agonists | MOA | 1 | `med_use` |
| `ATC:R03AK` | Adrenergics in combination with corticosteroids or other drugs, excl. anticholinergics | ATC1-4 | 1 | `tak_adrenergics` |
| `NDFRT:N0000175557` | Aldosterone Antagonist | EPC | 2 | `tak_aldorecepblk` |
| `ATC:C03DA` | Aldosterone antagonists | ATC1-4 | 1 | `tak_aldorecepblk` |
| `NDFRT:N0000175553` | alpha-Adrenergic Blocker | EPC | 1 | `med_use`, `tak_alphablk` |
| `RxCUI:17767` | amlodipine | RxNorm | 3 | `tak_calchanblk` |
| `NDFRT:N0000175562` | Angiotensin Converting Enzyme Inhibitor | EPC | 1 | `med_use`, `tak_aceinhib`, `tak_alphablk` |
| `ATC:C09DA` | Angiotensin II receptor blockers (ARBs) and diuretics | ATC1-4 | 2 | `tak_angiorecepblk` |
| `ATC:C09C` | ANGIOTENSIN II RECEPTOR BLOCKERS (ARBs), PLAIN | ATC1-4 | 6 | `tak_aceinhib`, `tak_angiorecepblk` |
| `NDFRT:N0000175980` | Anti-coagulant | EPC | 1 | `med_use` |
| `ATC:M04` | ANTIGOUT PREPARATIONS | ATC1-4 | 1 | `med_use` |
| `ATC:C02` | ANTIHYPERTENSIVES | ATC1-4 | 9 | `hypert_trt`, `med_use`, `tak_aceinhib` +2 |
| `ATC:C02L` | ANTIHYPERTENSIVES AND DIURETICS IN COMBINATION | ATC1-4 | 3 | `tak_vasodil` |
| `RxCUI:1191` | aspirin | RxNorm | 5 | `aspirin` |
| `RxCUI:1202` | atenolol | RxNorm | 1 | `med_use`, `tak_betablk` |
| `RxCUI:1436` | bepridil | RxNorm | 1 | `tak_calchanblk` |
| `ATC:C07A` | BETA BLOCKING AGENTS | ATC1-4 | 7 | `med_use`, `tak_betablk` |
| `ATC:C07D` | BETA BLOCKING AGENTS, THIAZIDES AND OTHER DIURETICS | ATC1-4 | 1 | `tak_betablk` |
| `NDFRT:N0000180292` | Bile Acid Sequestrant | EPC | 2 | `med_use`, `tak_nstat_med`, `taking_non_statin_medication` |
| `ATC:C10AC` | Bile acid sequestrants | ATC1-4 | 1 | `taking_non_statin_medication` |
| `ATC:A10B` | BLOOD GLUCOSE LOWERING DRUGS, EXCL. INSULINS | ATC1-4 | 1 | `tak_med_diab` |
| `ATC:C08` | CALCIUM CHANNEL BLOCKERS | ATC1-4 | 5 | `med_use`, `tak_calchanblk` |
| `RxCUI:1998` | captopril | RxNorm | 1 | `hypert_trt` |
| `ATC:C01A` | CARDIAC GLYCOSIDES | ATC1-4 | 1 | `med_use` |
| `NDFRT:N0000175554` | Central alpha-2 Adrenergic Agonist | EPC | 1 | `tak_cenactag` |
| `RxCUI:2404` | chlorpropamide | RxNorm | 1 | `tak_orlhypoag` |
| `RxCUI:2599` | clonidine | RxNorm | 1 | `tak_cenactag` |
| `RxCUI:2683` | colchicine | RxNorm | 1 | `med_use` |
| `RxCUI:151533` | Colestid | RxNorm | 1 | `tak_statin` |
| `RxCUI:151549` | Corgard | RxNorm | 1 | `tak_betablk` |
| `ATC:H02A` | CORTICOSTEROIDS FOR SYSTEMIC USE, PLAIN | ATC1-4 | 3 | `tak_cort_steroid_oral`, `tak_steroid` |
| `NDFRT:N0000175421` | Dihydropyridine Calcium Channel Blocker | EPC | 1 | `tak_calchanblk` |
| `RxCUI:3443` | diltiazem | RxNorm | 4 | `tak_calchanblk` |
| `ATC:C03` | DIURETICS | ATC1-4 | 8 | `hypert_trt`, `tak_alphablk`, `tak_diuret` |
| `ATC:A10` | DRUGS USED IN DIABETES | ATC1-4 | 5 | `tak_med_diab` |
| `RxCUI:4100` | estrogens | RxNorm | 1 | `med_use` |
| `RxCUI:4316` | felodipine | RxNorm | 1 | `tak_calchanblk` |
| `ATC:C10AB` | Fibrates | ATC1-4 | 2 | `tak_nstat_med`, `taking_non_statin_medication` |
| `RxCUI:2053495` | fish oil (containing omega-3 acids) | RxNorm | 1 | `tak_statin` |
| `RxCUI:4719` | gemfibrozil | RxNorm | 1 | `tak_statin` |
| `RxCUI:25789` | glimepiride | RxNorm | 1 | `tak_orlhypoag` |
| `RxCUI:4821` | glipizide | RxNorm | 1 | `tak_orlhypoag` |
| `ATC:R03BA` | Glucocorticoids | ATC1-4 | 1 | `tak_cort_steroid_resp` |
| `RxCUI:4815` | glyburide | RxNorm | 1 | `tak_orlhypoag` |
| `ATC:C10AA` | HMG CoA reductase inhibitors | ATC1-4 | 2 | `tak_nstat_med`, `tak_statin` |
| `NDFRT:N0000175589` | HMG-CoA Reductase Inhibitor | EPC | 2 | `med_use`, `tak_statin` |
| `RxCUI:5470` | hydralazine | RxNorm | 2 | `tak_vasodil` |
| `RxCUI:5487` | hydrochlorothiazide | RxNorm | 2 | `hypert_trt`, `tak_statin` |
| `RxCUI:5764` | indapamide | RxNorm | 1 | `hypert_trt` |
| `RxCUI:151890` | Inderal | RxNorm | 1 | `tak_betablk` |
| `RxCUI:33910` | isradipine | RxNorm | 1 | `tak_calchanblk` |
| `RxCUI:6185` | labetalol | RxNorm | 1 | `med_use`, `tak_betablk` |
| `ATC:C10A` | LIPID MODIFYING AGENTS, PLAIN | ATC1-4 | 7 | `med_use`, `tak_nstat_med`, `tak_statin` |
| `RxCUI:29046` | lisinopril | RxNorm | 1 | `tak_aceinhib` |
| `RxCUI:202999` | Lopid | RxNorm | 1 | `tak_statin` |
| `RxCUI:203344` | Lopressor | RxNorm | 1 | `tak_betablk` |
| `RxCUI:6472` | lovastatin | RxNorm | 1 | `tak_statin` |
| `RxCUI:316175` | lovastatin 20 MG | RxNorm | 1 | `tak_statin` |
| `RxCUI:6809` | metformin | RxNorm | 1 | `tak_orlhypoag` |
| `RxCUI:6876` | methyldopa | RxNorm | 1 | `med_use`, `tak_cenactag` |
| `RxCUI:6918` | metoprolol | RxNorm | 2 | `med_use`, `tak_betablk`, `tak_statin` |
| `RxCUI:7226` | nadolol | RxNorm | 1 | `med_use`, `tak_betablk` |
| `RxCUI:7393` | niacin | RxNorm | 1 | `tak_nstat_med`, `tak_statin` |
| `RxCUI:316343` | niacin 500 MG | RxNorm | 1 | `tak_statin` |
| `RxCUI:7396` | nicardipine | RxNorm | 1 | `tak_calchanblk` |
| `NDFRT:N0000175594` | Nicotinic Acid | EPC | 2 | `med_use`, `tak_nstat_med`, `taking_non_statin_medication` |
| `ATC:C10AD` | Nicotinic acid and derivatives | ATC1-4 | 1 | `taking_non_statin_medication` |
| `RxCUI:7417` | nifedipine | RxNorm | 1 | `tak_calchanblk` |
| `RxCUI:7435` | nisoldipine | RxNorm | 1 | `tak_calchanblk` |
| `NDFRT:N0000175415` | Nitrate Vasodilator | EPC | 1 | `med_use` |
| `RxCUI:4917` | nitroglycerin | RxNorm | 1 | `med_use` |
| `NDFRT:N0000175690` | Opioid Agonist | EPC | 1 | `med_use` |
| `ATC:C04` | PERIPHERAL VASODILATORS | ATC1-4 | 4 | `med_use`, `tak_vasodil` |
| `RxCUI:8332` | pindolol | RxNorm | 1 | `hypert_trt`, `med_use`, `tak_betablk` |
| `RxCUI:8588` | potassium | RxNorm | 1 | `med_use` |
| `NDFRT:N0000175418` | Potassium-sparing Diuretic | EPC | 3 | `med_use`, `tak_aldorecepblk`, `tak_diuret` |
| `RxCUI:203333` | Pravachol | RxNorm | 1 | `tak_statin` |
| `RxCUI:8699` | probucol | RxNorm | 1 | `tak_statin` |
| `RxCUI:8787` | propranolol | RxNorm | 1 | `med_use`, `tak_betablk` |
| `RxCUI:202908` | Proventil | RxNorm | 1 | `tak_statin` |
| `RxCUI:202582` | Questran | RxNorm | 1 | `tak_statin` |
| `RxCUI:73044` | repaglinide | RxNorm | 1 | `tak_orlhypoag` |
| `RxCUI:9260` | reserpine | RxNorm | 1 | `med_use` |
| `RxCUI:84108` | rosiglitazone | RxNorm | 1 | `tak_orlhypoag` |
| `RxCUI:9997` | spironolactone | RxNorm | 1 | `tak_aldorecepblk` |
| `RxCUI:152413` | Tenormin | RxNorm | 1 | `tak_betablk` |
| `NDFRT:N0000175419` | Thiazide Diuretic | EPC | 4 | `med_use`, `tak_diuret` |
| `RxCUI:10572` | thyroid (USP) | RxNorm | 1 | `med_use` |
| `RxCUI:10600` | timolol | RxNorm | 1 | `med_use`, `tak_betablk` |
| `RxCUI:152440` | Trandate | RxNorm | 1 | `hypert_trt` |
| `RxCUI:72610` | troglitazone | RxNorm | 1 | `tak_orlhypoag` |
| `ATC:C01D` | VASODILATORS USED IN CARDIAC DISEASES | ATC1-4 | 3 | `tak_vasodil` |
| `RxCUI:11170` | verapamil | RxNorm | 4 | `tak_calchanblk` |
| `RxCUI:196503` | Zocor | RxNorm | 1 | `tak_statin` |

## MeasurementObservationSet

11 terms.

| CURIE | Label | Vocabulary | Studies | Via |
|---|---|---|---|---|
| `OMOP:4154790` | Diastolic blood pressure | SNOMED | 10 | `blood_pressure` |
| `OMOP:3011708` | FEV1 measured/predicted | LOINC | 4 | `spirometry`, `spirometry_post_bd`, `spirometry_pre_bd` |
| `OMOP:3022891` | FEV1 Predicted | LOINC | 6 | `spirometry`, `spirometry_post_bd`, `spirometry_pre_bd` |
| `OMOP:3011505` | FEV1/FVC | LOINC | 9 | `spirometry`, `spirometry_post_bd`, `spirometry_pre_bd` |
| `OMOP:4196583` | FEV1/FVC percent | SNOMED | 4 | `spirometry`, `spirometry_post_bd`, `spirometry_pre_bd` |
| `OMOP:3024594` | FEV1/FVC Predicted | LOINC | 6 | `spirometry`, `spirometry_post_bd`, `spirometry_pre_bd` |
| `OMOP:4241837` | Forced expired volume in 1 second | SNOMED | 10 | `spirometry`, `spirometry_post_bd`, `spirometry_pre_bd` |
| `OMOP:4176265` | Forced vital capacity | SNOMED | 10 | `spirometry`, `spirometry_post_bd`, `spirometry_pre_bd` |
| `OMOP:3002094` | Forced vital capacity [Volume] Respiratory system Predicted | LOINC | 6 | `spirometry`, `spirometry_post_bd`, `spirometry_pre_bd` |
| `OMOP:3005600` | FVC measured/predicted | LOINC | 4 | `spirometry`, `spirometry_post_bd`, `spirometry_pre_bd` |
| `OMOP:4152194` | Systolic blood pressure | SNOMED | 10 | `blood_pressure` |

## Observation

4 terms.

| CURIE | Label | Vocabulary | Studies | Via |
|---|---|---|---|---|
| `OMOP:4282779` | Cigarette smoking tobacco | SNOMED | 10 | `cig_smok` |
| `OMOP:4022643` | Educational achievement | SNOMED | 1 | `edu_lvl` |
| `OMOP:4076114` | Household income | SNOMED | 9 | `fam_income` |
| `OMOP:35811013` | _unresolved_ | — | 1 | `cig_smok` |

## SdohObservation

2 terms.

| CURIE | Label | Vocabulary | Studies | Via |
|---|---|---|---|---|
| `OMOP:42528763` | Highest level of education | LOINC | 2 | `edu_lvl` |
| `OMOP:4076114` | Household income | SNOMED | 9 | `fam_income` |

## Synthetic corpus only

34 terms.

| CURIE | Label | Vocabulary | Studies | Via |
|---|---|---|---|---|
| `OMOP:4230556` | Alive | SNOMED | 0 | synthetic corpus |
| `OMOP:3036277` | Body height | LOINC | 0 | synthetic corpus |
| `OMOP:3038553` | Body mass index (BMI) [Ratio] | LOINC | 0 | synthetic corpus |
| `OMOP:3025315` | Body weight | LOINC | 0 | synthetic corpus |
| `OMOP:3007070` | Cholesterol in HDL [Mass/volume] in Serum or Plasma | LOINC | 0 | synthetic corpus |
| `OMOP:434489` | Dead | SNOMED | 0 | synthetic corpus |
| `HP:0000819` | Diabetes mellitus | HP | 0 | synthetic corpus |
| `MONDO:0001134` | essential hypertension | MONDO | 0 | synthetic corpus |
| `HP:0100735` | Hypertensive crisis | HP | 0 | synthetic corpus |
| `MONDO:0005044` | hypertensive disorder | MONDO | 0 | synthetic corpus |
| `MONDO:0006796` | hypertensive encephalopathy | MONDO | 0 | synthetic corpus |
| `MONDO:1030007` | hypertensive urgency | MONDO | 0 | synthetic corpus |
| `OMOP:3000905` | Leukocytes [#/volume] in Blood by Automated count | LOINC | 0 | synthetic corpus |
| `MONDO:0005827` | lipoatrophic diabetes | MONDO | 0 | synthetic corpus |
| `MONDO:0006846` | malignant hypertension | MONDO | 0 | synthetic corpus |
| `OMOP:38003615` | Middle Eastern or North African | Race | 0 | synthetic corpus |
| `HP:0001409` | Portal hypertension | HP | 0 | synthetic corpus |
| `MONDO:0005080` | portal hypertension | MONDO | 0 | synthetic corpus |
| `MONDO:0005081` | preeclampsia | MONDO | 0 | synthetic corpus |
| `HP:0002092` | Pulmonary arterial hypertension | HP | 0 | synthetic corpus |
| `MONDO:0015924` | pulmonary arterial hypertension | MONDO | 0 | synthetic corpus |
| `MONDO:0001105` | renal hypertension | MONDO | 0 | synthetic corpus |
| `HP:0100817` | Renovascular hypertension | HP | 0 | synthetic corpus |
| `MONDO:0006947` | renovascular hypertension | MONDO | 0 | synthetic corpus |
| `MONDO:0100078` | resistant hypertension | MONDO | 0 | synthetic corpus |
| `MONDO:0001200` | secondary hypertension | MONDO | 0 | synthetic corpus |
| `MMO:0000133` | serum high-density lipoprotein-cholesterol measurement test | MMO | 0 | synthetic corpus |
| `MONDO:0005148` | type 2 diabetes mellitus | MONDO | 0 | synthetic corpus |
| `HP:0005978` | Type II diabetes mellitus | HP | 0 | synthetic corpus |
| `OMOP:3013682` | Urea nitrogen [Mass/volume] in Serum or Plasma | LOINC | 0 | synthetic corpus |
| `MMO:0000533` | white blood cell counting method | MMO | 0 | synthetic corpus |
| `ICD10CM:I00-I99` | _unresolved_ | — | 0 | synthetic corpus |
| `ICD10CM:I20-I25` | _unresolved_ | — | 0 | synthetic corpus |
| `ICD10CM:R99` | _unresolved_ | — | 0 | synthetic corpus |

## Mappings to report upstream

These CURIEs sit in a concept slot but do not name a clinical concept — a unit or a metadata code where a condition or measurement belongs. They come through the trans-specs, so the fix is upstream at RTI.

| CURIE | Label | Domain | Slot | Via |
|---|---|---|---|---|
| `OMOP:8842` | nanogram per milliliter | Unit | observation_type | `troponin` |

## Unresolved CURIEs

No public service resolves these. ICD10CM entries are chapter ranges rather than concepts, so they are expected here.

- `ICD10CM:I00-I99`
- `ICD10CM:I20-I25`
- `ICD10CM:R99`
- `OMOP:35811013`
- `OMOP:4822126`
- `OMOP:4822160`
