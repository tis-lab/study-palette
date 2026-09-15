# Harmonized terms — cardiac, lung, hypertension, diabetes

CURIEs come from the BDC harmonized-variable trans-specs by way of BDC-VarLib. Labels are fetched from the vocabulary that owns each term (OLS for OBO ontologies, the OHDSI WebAPI for OMOP, RxClass for ATC). Nothing in the Label column was written by hand.

**Use the Label column for display.** Where a row has no label, the CURIE did not resolve and the wireframe should show the gap rather than a placeholder.

## Cardiac

44 of 44 resolved.

| Variable | CURIE | Label | Source | Matched on |
|---|---|---|---|---|
| `afib` | `MONDO:0004981` | Atrial fibrillation | monarch | synonym |
| `angina` | `HP:0001681` | Angina pectoris | monarch | priority |
| `blood_clots` | `MONDO:0000831` | Thrombotic disease | monarch | synonym |
| `bnp` | `OBA:2045303` | Natriuretic peptides B level | monarch | priority |
| `cac_score` | `OMOP:42872742` | Coronary artery calcium score | ohdsi | priority |
| `cac_volume` | `OMOP:4166120` | Calcium volume | ohdsi | priority |
| `carotid_imt` | `OBA:2050108` | Carotid artery thickness | monarch | priority |
| `carotid_plaque` | `OMOP:4102124` | Carotid atherosclerosis | ohdsi | priority |
| `carotid_sten_left` | `OMOP:43020498` | Left carotid artery stenosis | ohdsi | priority |
| `carotid_sten_right` | `OMOP:43021859` | Right carotid artery stenosis | ohdsi | priority |
| `chd` | `MONDO:0005010` | Coronary artery disorder | monarch | priority |
| `chf` | `MONDO:0005009` | Congestive heart failure | monarch | synonym |
| `crp` | `OMOP:4208414` | C-reactive protein measurement | ohdsi | priority |
| `cvd` | `MONDO:0004995` | Cardiovascular disorder | monarch | priority |
| `d_dimer` | `OMOP:37393605` | D-dimer level | ohdsi | priority |
| `hist_cor_angio` | `OMOP:1242799` | History of operation on carotid artery | ohdsi | priority |
| `hist_cor_art_dis` | `MONDO:0005010` | History of coronary artery disorder | monarch | priority |
| `hist_cor_bypg` | `OMOP:4336464` | History of coronary artery bypass graft | ohdsi | priority |
| `hist_coronary_bypass` | `OMOP:4336464` | History of coronary artery bypass graft | ohdsi | priority |
| `hist_cvd` | `MONDO:0000745` | History of cardiac arrest | monarch | priority |
| `hist_heart_disease` | `MONDO:0005267` | History of heart disorder | monarch | priority |
| `hist_heart_failure` | `MONDO:0005009` | History of congestive heart failure | monarch | priority |
| `hist_hrt_failure` | `MONDO:0005009` | History of congestive heart failure | monarch | priority |
| `hist_hrtdis` | `MONDO:0001302` | History of hypertensive heart disease | monarch | priority |
| `hist_hrtfail` | `MONDO:0005009` | History of congestive heart failure | monarch | priority |
| `hist_mi` | `MONDO:0005068` | History of myocardial infarction | monarch | priority |
| `hist_my_inf` | `MONDO:0005068` | History of myocardial infarction | monarch | priority |
| `history_cvd` | `MONDO:0005009` | Congestive heart failure | monarch | priority |
| `hrt_rt` | `OBA:1001087` | Heart rate | monarch | priority |
| `hrtrt` | `OBA:1001087` | Heart rate | monarch | priority |
| `lvh_ekg` | `HP:0001712` | Left ventricular hypertrophy | monarch | priority |
| `nt_bnp` | `OBA:2045303` | Natriuretic peptides B level | monarch | priority |
| `pacem_stat` | `OMOP:45772840` | Implantable cardiac pacemaker | ohdsi | priority |
| `pad` | `MONDO:0005386` | Peripheral arterial disease | monarch | synonym |
| `pr_ekg` | `OMOP:4274406` | PR interval - finding | ohdsi | priority |
| `pr_qrs_qt` | `OMOP:4273023` | QT interval - finding | ohdsi | priority |
| `qrs_ekg` | `OBA:1001086` | QRS duration | monarch | priority |
| `qt_ekg` | `OMOP:4273023` | QT interval - finding | ohdsi | priority |
| `spo2` | `OBA:2045443` | Oxygen concentration in blood | monarch | priority |
| `stroke` | `HP:0001297` | Stroke | monarch | label |
| `stroke_isch_atk` | `MONDO:0005264` | Transient ischemic attack | monarch | priority |
| `troponin` | `OMOP:4021291` | Troponin measurement | ohdsi | priority |
| `valv_hrtdis` | `MONDO:0002869` | Heart valve disorder | monarch | priority |
| `ven_thromb` | `MONDO:0000831` | Thrombotic disease | monarch | priority |

## Lung

14 of 14 resolved.

| Variable | CURIE | Label | Source | Matched on |
|---|---|---|---|---|
| `alpha1_antitrypsin` | `OBA:2050075` | Serum alpha-1-antitrypsin amount | monarch | priority |
| `apnea_hypop_index` | `OMOP:37396400` | Apnea Hypopnea Index | ohdsi | priority |
| `asthma` | `MONDO:0004979` | Asthma | monarch | label |
| `asthma_md` | `MONDO:0004979` | Asthma | monarch | priority |
| `bronchitis` | `MONDO:0005607` | Chronic bronchitis | monarch | priority |
| `bronchitis_md` | `MONDO:0005607` | Chronic bronchitis | monarch | priority |
| `chr_bronchitis` | `MONDO:0005607` | Chronic bronchitis | monarch | priority |
| `copd` | `MONDO:0005002` | Chronic obstructive pulmonary disease | monarch | synonym |
| `emphysema` | `MONDO:0004849` | Pulmonary emphysema | monarch | synonym |
| `pulmonary_fibrosis` | `MONDO:0002771` | Pulmonary fibrosis | monarch | label |
| `slp_ap` | `MONDO:0005296` | Sleep apnea syndrome | monarch | priority |
| `spirometry` | `OMOP:4176265` | Forced vital capacity | ohdsi | priority |
| `spirometry_post_bd` | `OMOP:4176265` | Forced vital capacity | ohdsi | priority |
| `spirometry_pre_bd` | `OMOP:4176265` | Forced vital capacity | ohdsi | priority |

## Hypertension

16 of 16 resolved.

| Variable | CURIE | Label | Source | Matched on |
|---|---|---|---|---|
| `blood_pressure` | `OMOP:4152194` | Systolic blood pressure | ohdsi | priority |
| `hypert_trt` | `ATC:C02` | Antihypertensives | rxclass | priority |
| `hyperten` | `MONDO:0005149` | Pulmonary hypertension | monarch | priority |
| `hypertension` | `HP:0000822` | Hypertension | monarch | label |
| `mean_art_press` | `OBA:VT2000000` | Arterial blood pressure trait | monarch | priority |
| `mn_art_pres` | `OBA:VT2000000` | Arterial blood pressure trait | monarch | priority |
| `tak_aceinhib` | `ATC:C02` | Antihypertensives | rxclass | priority |
| `tak_aldorecepblk` | `ATC:C03DA` | Aldosterone antagonists | rxclass | priority |
| `tak_alphablk` | `ATC:C02` | Antihypertensives | rxclass | priority |
| `tak_angiorecepblk` | `ATC:C09C` | Angiotensin ii receptor blockers (arbs), plain | rxclass | priority |
| `tak_antihypertensives` | `ATC:C02` | Antihypertensives | rxclass | priority |
| `tak_betablk` | `ATC:C07A` | Beta blocking agents | rxclass | priority |
| `tak_calchanblk` | `ATC:C08` | Calcium channel blockers | rxclass | priority |
| `tak_cenactag` | `RxCUI:2599` | Clonidine | rxnav | priority |
| `tak_diuret` | `ATC:C03` | Diuretics | rxclass | priority |
| `tak_vasodil` | `ATC:C01D` | Vasodilators used in cardiac diseases | rxclass | priority |

## Diabetes

9 of 10 resolved.

| Variable | CURIE | Label | Source | Matched on |
|---|---|---|---|---|
| `diabetes` | `MONDO:0005015` | Diabetes mellitus | monarch | synonym |
| `fast_gluc_bld` | `OMOP:4156660` | Fasting blood glucose measurement | ohdsi | priority |
| `fasting_blood_gluc` | `OMOP:4156660` | Fasting blood glucose measurement | ohdsi | priority |
| `glucose_bld` | `OBA:VT0000188` | Blood glucose amount | monarch | priority |
| `hemo_a1c` | `OMOP:4184637` | Hemoglobin A1c measurement | ohdsi | priority |
| `insulin_blood` | `OBA:2060174` | Amount of insulin in blood | monarch | priority |
| `insulin_in_blood` | `OBA:2060174` | Amount of insulin in blood | monarch | priority |
| `tak_insulin` | `_none_` | _unresolved_ | — | — |
| `tak_med_diab` | `ATC:A10` | Drugs used in diabetes | rxclass | priority |
| `tak_orlhypoag` | `RxCUI:2404` | Chlorpropamide | rxnav | priority |

## Mappings needing review

These concepts resolve to more than one term in the same vocabulary. The chosen label is a best guess and the alternative is shown beside it; a curator should decide which is correct.

| Variable | Chosen | Also maps to |
|---|---|---|
| `asthma` | `MONDO:0004979` asthma | `HP:0012393` Allergy; `MONDO:0005492` urticaria; `HP:0003193` Allergic rhinitis; `HP:0030828` Wheezing; `MONDO:0850282` chronic asthma; `MONDO:0004784` allergic asthma; `MONDO:0024355` respiratory tract infectious disorder |
| `carotid_imt` | `OBA:2050108` carotid artery thickness | `OMOP:4138462` Carotid intima media thickness |
| `chf` | `MONDO:0005009` congestive heart failure | `MONDO:0005252` heart failure |
| `chr_bronchitis` | `MONDO:0005607` chronic bronchitis | `MONDO:0005002` chronic obstructive pulmonary disease |
| `copd` | `MONDO:0005002` chronic obstructive pulmonary disease | `MONDO:0000270` lower respiratory tract disorder |
| `cvd` | `MONDO:0004995` cardiovascular disorder | `MONDO:0005311` atherosclerosis |
| `emphysema` | `MONDO:0004849` pulmonary emphysema | `MONDO:0004848` ulcerative stomatitis |
| `hist_cor_angio` | `OMOP:1242799` Operation on carotid artery | `OMOP:4184832` Coronary angioplasty; `OMOP:4044550` Dilation - action; `OMOP:4178405` Revascularization - action; `OMOP:4223020` Cardiac catheterization; `OMOP:4006788` Percutaneous transluminal coronary angioplasty |
| `hist_cvd` | `MONDO:0000745` cardiac arrest | `HP:0001681` Angina pectoris; `MONDO:0005010` coronary artery disorder; `MONDO:0005453` congenital heart disease; `MONDO:0005294` peripheral vascular disease; `MONDO:0004995` cardiovascular disorder; `MONDO:0005009` congestive heart failure; `MONDO:0005068` myocardial infarction; `HP:0002621` Atherosclerosis; `MONDO:0005279` pulmonary embolism; `MONDO:0002869` heart valve disorder |
| `hist_hrtdis` | `MONDO:0001302` hypertensive heart disease | `MONDO:0002869` heart valve disorder; `MONDO:0005267` heart disorder; `MONDO:0024644` myocardial ischemia; `MONDO:0005010` coronary artery disorder; `MONDO:0005453` congenital heart disease; `MONDO:0006955` rheumatic heart disease; `MONDO:0003803` aortic valve disorder; `MONDO:0003767` mitral valve disorder |
| `hist_hrtfail` | `MONDO:0005009` congestive heart failure | `MONDO:0005252` heart failure |
| `hist_my_inf` | `MONDO:0005068` myocardial infarction | `MONDO:0006803` inferior myocardial infarction |
| `hypert_trt` | `ATC:C02` Antihypertensives | `HP:0000822` Hypertension; `ATC:C03` Diuretics; `RxCUI:1998` captopril |
| `hyperten` | `MONDO:0005149` pulmonary hypertension | `HP:0000822` Hypertension |
| `lvh_ekg` | `HP:0001712` Left ventricular hypertrophy | `HP:0001714` Ventricular hypertrophy |
| `nt_bnp` | `OBA:2045303` natriuretic peptides B level | `OMOP:4189511` N terminal pro-brain natriuretic peptide level |
| `pad` | `MONDO:0005386` peripheral arterial disease | `MONDO:0005294` peripheral vascular disease; `HP:0004417` Intermittent claudication |
| `qrs_ekg` | `OBA:1001086` QRS duration | `OMOP:4273021` QRS complex - finding |
| `slp_ap` | `MONDO:0005296` sleep apnea syndrome | `HP:0010535` Sleep apnea |
| `spirometry` | `OMOP:4176265` Forced vital capacity | `OMOP:4241837` Forced expired volume in 1 second |
| `spirometry_post_bd` | `OMOP:4176265` Forced vital capacity | `OMOP:4241837` Forced expired volume in 1 second |
| `spirometry_pre_bd` | `OMOP:4176265` Forced vital capacity | `OMOP:4241837` Forced expired volume in 1 second |
| `stroke` | `HP:0001297` Stroke | `HP:0002140` Ischemic stroke; `MONDO:0005264` transient ischemic attack; `MONDO:0011057` cerebrovascular disorder; `MONDO:0005394` brain infarction; `HP:0002170` Intracranial hemorrhage; `MONDO:0005099` subarachnoid hemorrhage; `HP:0001342` Cerebral hemorrhage; `MONDO:0006809` intracranial embolism |
| `tak_aceinhib` | `ATC:C02` Antihypertensives | `ATC:C09A` Ace inhibitors, plain; `ATC:C09BA` Ace inhibitors and diuretics; `RxCUI:29046` lisinopril; `ATC:C09C` Angiotensin ii receptor blockers (arbs), plain |
| `tak_aldorecepblk` | `ATC:C03DA` Aldosterone antagonists | `RxCUI:9997` spironolactone |
| `tak_alphablk` | `ATC:C02` Antihypertensives | `ATC:C03` Diuretics |
| `tak_angiorecepblk` | `ATC:C09C` Angiotensin ii receptor blockers (arbs), plain | `ATC:C09DA` Angiotensin ii receptor blockers (arbs) and diuretics |
| `tak_betablk` | `ATC:C07A` Beta blocking agents | `RxCUI:151890` Inderal; `ATC:C07D` Beta blocking agents, thiazides and other diuretics; `RxCUI:8787` propranolol |
| `tak_calchanblk` | `ATC:C08` Calcium channel blockers | `RxCUI:17767` amlodipine; `RxCUI:3443` diltiazem; `RxCUI:11170` verapamil |
| `tak_cenactag` | `RxCUI:2599` clonidine | `RxCUI:6876` methyldopa |
| `tak_med_diab` | `ATC:A10` Drugs used in diabetes | `ATC:A10B` Blood glucose lowering drugs, excl. insulins |
| `tak_orlhypoag` | `RxCUI:2404` chlorpropamide | `RxCUI:6809` metformin; `RxCUI:72610` troglitazone; `RxCUI:4821` glipizide; `RxCUI:4815` glyburide; `RxCUI:84108` rosiglitazone; `RxCUI:73044` repaglinide; `RxCUI:25789` glimepiride |
| `tak_vasodil` | `ATC:C01D` Vasodilators used in cardiac diseases | `ATC:C04` Peripheral vasodilators; `ATC:C02L` Antihypertensives and diuretics in combination; `RxCUI:5470` hydralazine |
| `valv_hrtdis` | `MONDO:0002869` heart valve disorder | `MONDO:0042981` aortic valve stenosis; `MONDO:0005648` aortic valve insufficiency; `HP:0001653` Mitral regurgitation; `HP:0001718` Mitral stenosis |
| `ven_thromb` | `MONDO:0000831` thrombotic disease | `MONDO:0005279` pulmonary embolism; `HP:0002625` Deep venous thrombosis; `MONDO:0005399` venous thromboembolism; `MONDO:0005252` heart failure |
