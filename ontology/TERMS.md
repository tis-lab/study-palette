# Harmonized concept terms

Every row is a concept CURIE emitted by the BDC harmonized-variable trans-specs, with the label published by the vocabulary that owns it. Labels are fetched, never written by hand: Monarch for MONDO/HP/OBA, OLS4 for other OBO ontologies, the OHDSI WebAPI for OMOP, RxNav RxClass for ATC and NDFRT, RxNav for RxCUI.

**The CURIE is the identity and the Label is what to display.** The `Via` column lists the harmonized variables a term is reached through; it is provenance only. Those names are spec filenames — they are not concepts, they do not appear in harmonized data, and nothing should key on them or show them to a user.

## Condition

73 terms.

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
| `MONDO:0005068` | myocardial infarction | MONDO | 9 | `hist_cvd`, `hist_mi`, `hist_my_inf` |
| `MONDO:0024644` | myocardial ischemia | MONDO | 1 | `hist_hrtdis` |
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
| `HP:0001297` | Stroke | HP | 9 | `stroke` |
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

27 terms.

| CURIE | Label | Vocabulary | Studies | Via |
|---|---|---|---|---|
| `OBA:2060174` | amount of insulin in blood | OBA | 8 | `insulin_blood`, `insulin_in_blood` |
| `OMOP:37396400` | Apnea Hypopnea Index | SNOMED | 3 | `apnea_hypop_index` |
| `OBA:VT2000000` | arterial blood pressure trait | OBA | 4 | `mean_art_press`, `mn_art_pres` |
| `OBA:VT0000188` | blood glucose amount | OBA | 7 | `glucose_bld` |
| `OMOP:4208414` | C-reactive protein measurement | SNOMED | 7 | `crp` |
| `OMOP:4166120` | Calcium volume | SNOMED | 2 | `cac_volume` |
| `OBA:2050108` | carotid artery thickness | OBA | 1 | `carotid_imt` |
| `OMOP:4138462` | Carotid intima media thickness | SNOMED | 4 | `carotid_imt` |
| `OMOP:42872742` | Coronary artery calcium score | SNOMED | 5 | `cac_score` |
| `OMOP:37393605` | D-dimer level | SNOMED | 4 | `d_dimer` |
| `OMOP:4156660` | Fasting blood glucose measurement | SNOMED | 7 | `fast_gluc_bld`, `fasting_blood_gluc` |
| `OBA:1001087` | heart rate | OBA | 10 | `hrt_rt`, `hrtrt` |
| `OMOP:4184637` | Hemoglobin A1c measurement | SNOMED | 5 | `hemo_a1c` |
| `OMOP:45772840` | Implantable cardiac pacemaker | SNOMED | 4 | `pacem_stat` |
| `OMOP:43020498` | Left carotid artery stenosis | SNOMED | 4 | `carotid_sten_left` |
| `OMOP:4189511` | N terminal pro-brain natriuretic peptide level | SNOMED | 1 | `nt_bnp` |
| `OMOP:8842` | nanogram per milliliter | UCUM | 1 | `troponin` |
| `OBA:2045303` | natriuretic peptides B level | OBA | 5 | `bnp`, `nt_bnp` |
| `OBA:2045443` | oxygen concentration in blood | OBA | 4 | `spo2` |
| `OMOP:4274406` | PR interval - finding | SNOMED | 5 | `pr_ekg` |
| `OMOP:4273021` | QRS complex - finding | SNOMED | 1 | `qrs_ekg` |
| `OBA:1001086` | QRS duration | OBA | 6 | `qrs_ekg` |
| `OMOP:4273023` | QT interval - finding | SNOMED | 6 | `pr_qrs_qt`, `qt_ekg` |
| `OMOP:43021859` | Right carotid artery stenosis | SNOMED | 4 | `carotid_sten_right` |
| `OBA:2050075` | serum alpha-1-antitrypsin amount | OBA | 1 | `alpha1_antitrypsin` |
| `OMOP:4152194` | Systolic blood pressure | SNOMED | 10 | `blood_pressure` |
| `OMOP:4021291` | Troponin measurement | SNOMED | 3 | `troponin` |

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

60 terms.

| CURIE | Label | Vocabulary | Studies | Via |
|---|---|---|---|---|
| `ATC:C09BA` | ACE inhibitors and diuretics | ATC1-4 | 3 | `tak_aceinhib` |
| `ATC:C09A` | ACE INHIBITORS, PLAIN | ATC1-4 | 6 | `tak_aceinhib` |
| `RxCUI:149` | acebutolol | RxNorm | 1 | `tak_betablk` |
| `NDFRT:N0000175557` | Aldosterone Antagonist | EPC | 2 | `tak_aldorecepblk` |
| `ATC:C03DA` | Aldosterone antagonists | ATC1-4 | 1 | `tak_aldorecepblk` |
| `NDFRT:N0000175553` | alpha-Adrenergic Blocker | EPC | 1 | `tak_alphablk` |
| `RxCUI:17767` | amlodipine | RxNorm | 3 | `tak_calchanblk` |
| `NDFRT:N0000175562` | Angiotensin Converting Enzyme Inhibitor | EPC | 1 | `tak_aceinhib`, `tak_alphablk` |
| `ATC:C09DA` | Angiotensin II receptor blockers (ARBs) and diuretics | ATC1-4 | 2 | `tak_angiorecepblk` |
| `ATC:C09C` | ANGIOTENSIN II RECEPTOR BLOCKERS (ARBs), PLAIN | ATC1-4 | 6 | `tak_aceinhib`, `tak_angiorecepblk` |
| `ATC:C02` | ANTIHYPERTENSIVES | ATC1-4 | 9 | `hypert_trt`, `tak_aceinhib`, `tak_alphablk` +1 |
| `ATC:C02L` | ANTIHYPERTENSIVES AND DIURETICS IN COMBINATION | ATC1-4 | 3 | `tak_vasodil` |
| `RxCUI:1202` | atenolol | RxNorm | 1 | `tak_betablk` |
| `RxCUI:1436` | bepridil | RxNorm | 1 | `tak_calchanblk` |
| `ATC:C07A` | BETA BLOCKING AGENTS | ATC1-4 | 7 | `tak_betablk` |
| `ATC:C07D` | BETA BLOCKING AGENTS, THIAZIDES AND OTHER DIURETICS | ATC1-4 | 1 | `tak_betablk` |
| `ATC:A10B` | BLOOD GLUCOSE LOWERING DRUGS, EXCL. INSULINS | ATC1-4 | 1 | `tak_med_diab` |
| `ATC:C08` | CALCIUM CHANNEL BLOCKERS | ATC1-4 | 5 | `tak_calchanblk` |
| `RxCUI:1998` | captopril | RxNorm | 1 | `hypert_trt` |
| `NDFRT:N0000175554` | Central alpha-2 Adrenergic Agonist | EPC | 1 | `tak_cenactag` |
| `RxCUI:2404` | chlorpropamide | RxNorm | 1 | `tak_orlhypoag` |
| `RxCUI:2599` | clonidine | RxNorm | 1 | `tak_cenactag` |
| `RxCUI:151549` | Corgard | RxNorm | 1 | `tak_betablk` |
| `NDFRT:N0000175421` | Dihydropyridine Calcium Channel Blocker | EPC | 1 | `tak_calchanblk` |
| `RxCUI:3443` | diltiazem | RxNorm | 4 | `tak_calchanblk` |
| `ATC:C03` | DIURETICS | ATC1-4 | 8 | `hypert_trt`, `tak_alphablk`, `tak_diuret` |
| `ATC:A10` | DRUGS USED IN DIABETES | ATC1-4 | 5 | `tak_med_diab` |
| `RxCUI:4316` | felodipine | RxNorm | 1 | `tak_calchanblk` |
| `RxCUI:25789` | glimepiride | RxNorm | 1 | `tak_orlhypoag` |
| `RxCUI:4821` | glipizide | RxNorm | 1 | `tak_orlhypoag` |
| `RxCUI:4815` | glyburide | RxNorm | 1 | `tak_orlhypoag` |
| `RxCUI:5470` | hydralazine | RxNorm | 2 | `tak_vasodil` |
| `RxCUI:5487` | hydrochlorothiazide | RxNorm | 1 | `hypert_trt` |
| `RxCUI:5764` | indapamide | RxNorm | 1 | `hypert_trt` |
| `RxCUI:151890` | Inderal | RxNorm | 1 | `tak_betablk` |
| `RxCUI:33910` | isradipine | RxNorm | 1 | `tak_calchanblk` |
| `RxCUI:6185` | labetalol | RxNorm | 1 | `tak_betablk` |
| `RxCUI:29046` | lisinopril | RxNorm | 1 | `tak_aceinhib` |
| `RxCUI:203344` | Lopressor | RxNorm | 1 | `tak_betablk` |
| `RxCUI:6809` | metformin | RxNorm | 1 | `tak_orlhypoag` |
| `RxCUI:6876` | methyldopa | RxNorm | 1 | `tak_cenactag` |
| `RxCUI:6918` | metoprolol | RxNorm | 1 | `tak_betablk` |
| `RxCUI:7226` | nadolol | RxNorm | 1 | `tak_betablk` |
| `RxCUI:7396` | nicardipine | RxNorm | 1 | `tak_calchanblk` |
| `RxCUI:7417` | nifedipine | RxNorm | 1 | `tak_calchanblk` |
| `RxCUI:7435` | nisoldipine | RxNorm | 1 | `tak_calchanblk` |
| `ATC:C04` | PERIPHERAL VASODILATORS | ATC1-4 | 4 | `tak_vasodil` |
| `RxCUI:8332` | pindolol | RxNorm | 1 | `hypert_trt`, `tak_betablk` |
| `NDFRT:N0000175418` | Potassium-sparing Diuretic | EPC | 3 | `tak_aldorecepblk`, `tak_diuret` |
| `RxCUI:8787` | propranolol | RxNorm | 1 | `tak_betablk` |
| `RxCUI:73044` | repaglinide | RxNorm | 1 | `tak_orlhypoag` |
| `RxCUI:84108` | rosiglitazone | RxNorm | 1 | `tak_orlhypoag` |
| `RxCUI:9997` | spironolactone | RxNorm | 1 | `tak_aldorecepblk` |
| `RxCUI:152413` | Tenormin | RxNorm | 1 | `tak_betablk` |
| `NDFRT:N0000175419` | Thiazide Diuretic | EPC | 4 | `tak_diuret` |
| `RxCUI:10600` | timolol | RxNorm | 1 | `tak_betablk` |
| `RxCUI:152440` | Trandate | RxNorm | 1 | `hypert_trt` |
| `RxCUI:72610` | troglitazone | RxNorm | 1 | `tak_orlhypoag` |
| `ATC:C01D` | VASODILATORS USED IN CARDIAC DISEASES | ATC1-4 | 3 | `tak_vasodil` |
| `RxCUI:11170` | verapamil | RxNorm | 4 | `tak_calchanblk` |

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

## Synthetic corpus only

46 terms.

| CURIE | Label | Vocabulary | Studies | Via |
|---|---|---|---|---|
| `OMOP:4230556` | Alive | SNOMED | 0 | synthetic corpus |
| `OMOP:8657` | American Indian or Alaska Native | Race | 0 | synthetic corpus |
| `OMOP:8515` | Asian | Race | 0 | synthetic corpus |
| `OMOP:8516` | Black or African American | Race | 0 | synthetic corpus |
| `OMOP:3036277` | Body height | LOINC | 0 | synthetic corpus |
| `OMOP:3038553` | Body mass index (BMI) [Ratio] | LOINC | 0 | synthetic corpus |
| `OMOP:3025315` | Body weight | LOINC | 0 | synthetic corpus |
| `OMOP:3007070` | Cholesterol in HDL [Mass/volume] in Serum or Plasma | LOINC | 0 | synthetic corpus |
| `OMOP:434489` | Dead | SNOMED | 0 | synthetic corpus |
| `HP:0000819` | Diabetes mellitus | HP | 0 | synthetic corpus |
| `MONDO:0001134` | essential hypertension | MONDO | 0 | synthetic corpus |
| `OMOP:8532` | FEMALE | Gender | 0 | synthetic corpus |
| `OMOP:38003563` | Hispanic or Latino | Ethnicity | 0 | synthetic corpus |
| `NCBITaxon:9606` | Homo sapiens | NCBITaxon | 0 | synthetic corpus |
| `HP:0100735` | Hypertensive crisis | HP | 0 | synthetic corpus |
| `MONDO:0005044` | hypertensive disorder | MONDO | 0 | synthetic corpus |
| `MONDO:0006796` | hypertensive encephalopathy | MONDO | 0 | synthetic corpus |
| `MONDO:1030007` | hypertensive urgency | MONDO | 0 | synthetic corpus |
| `OMOP:3000905` | Leukocytes [#/volume] in Blood by Automated count | LOINC | 0 | synthetic corpus |
| `MONDO:0005827` | lipoatrophic diabetes | MONDO | 0 | synthetic corpus |
| `OMOP:8507` | MALE | Gender | 0 | synthetic corpus |
| `MONDO:0006846` | malignant hypertension | MONDO | 0 | synthetic corpus |
| `OMOP:38003615` | Middle Eastern or North African | Race | 0 | synthetic corpus |
| `OMOP:8557` | Native Hawaiian or Other Pacific Islander | Race | 0 | synthetic corpus |
| `OMOP:4321888` | Natural father | SNOMED | 0 | synthetic corpus |
| `OMOP:4277283` | Natural mother | SNOMED | 0 | synthetic corpus |
| `OMOP:38003564` | Not Hispanic or Latino | Ethnicity | 0 | synthetic corpus |
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
| `OMOP:8527` | White | Race | 0 | synthetic corpus |
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
- `OMOP:4822126`
- `OMOP:4822160`
