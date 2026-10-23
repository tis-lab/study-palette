// SYNTHETIC: illustrative counts for two fictional studies, not derived from
// participant data. Trimmed copies of schema/examples/SYNTHETIC.SummaryResponse-*.yaml,
// keeping only what the cohort snapshot uses, until the summary API is available.
import type { SummaryResponse } from "../api/graphql/queries/cohortSummary";

import { cohortParticipants } from "../utils/summary";

/** Trimmed from schema/examples/SYNTHETIC.SummaryResponse-t2d.yaml. */
export const t2dSummary: SummaryResponse = {
  release: "example-release",
  seed: "MONDO:0005148",
  filter: [
    "palette:measurement/FAST_GLUC_BLD"
  ],
  min_count: 10,
  research_studies: [
    {
      id: "palette:study_one",
      name: "Example Study One"
    },
    {
      id: "palette:study_two",
      name: "Example Study Two"
    }
  ],
  studies: [
    {
      research_study: "palette:study_one",
      participant_count: 480,
      demographics: [
        {
          id: "palette:demography/sex",
          summarized_slot: "sex",
          participant_count: 480,
          values: [
            {
              id: "palette:demography/sex/FEMALE",
              summarized_slot: "sex",
              sex: "FEMALE",
              participant_count: 230
            },
            {
              id: "palette:demography/sex/MALE",
              summarized_slot: "sex",
              sex: "MALE",
              participant_count: 245
            }
          ]
        },
        {
          id: "palette:demography/race",
          summarized_slot: "race",
          participant_count: 470,
          values: [
            {
              id: "palette:demography/race/WHITE",
              summarized_slot: "race",
              race: [
                "WHITE"
              ],
              participant_count: 235
            },
            {
              id: "palette:demography/race/BLACK_OR_AFRICAN_AMERICAN",
              summarized_slot: "race",
              race: [
                "BLACK_OR_AFRICAN_AMERICAN"
              ],
              participant_count: 141
            },
            {
              id: "palette:demography/race/ASIAN",
              summarized_slot: "race",
              race: [
                "ASIAN"
              ],
              participant_count: 47
            },
            {
              id: "palette:demography/race/AMERICAN_INDIAN_OR_ALASKA_NATIVE",
              summarized_slot: "race",
              race: [
                "AMERICAN_INDIAN_OR_ALASKA_NATIVE"
              ],
              participant_count: 47
            }
          ]
        },
        {
          id: "palette:demography/ethnicity",
          summarized_slot: "ethnicity",
          participant_count: 480,
          values: [
            {
              id: "palette:demography/ethnicity/HISPANIC_OR_LATINO",
              summarized_slot: "ethnicity",
              ethnicity: "HISPANIC_OR_LATINO",
              participant_count: 70
            },
            {
              id: "palette:demography/ethnicity/NOT_HISPANIC_OR_LATINO",
              summarized_slot: "ethnicity",
              ethnicity: "NOT_HISPANIC_OR_LATINO",
              participant_count: 410
            }
          ]
        }
      ]
    },
    {
      research_study: "palette:study_two",
      participant_count: 460,
      demographics: [
        {
          id: "palette:demography/sex",
          summarized_slot: "sex",
          participant_count: 460,
          values: [
            {
              id: "palette:demography/sex/FEMALE",
              summarized_slot: "sex",
              sex: "FEMALE",
              participant_count: 250
            },
            {
              id: "palette:demography/sex/MALE",
              summarized_slot: "sex",
              sex: "MALE",
              participant_count: 205
            }
          ]
        },
        {
          id: "palette:demography/race",
          summarized_slot: "race",
          participant_count: 455,
          values: [
            {
              id: "palette:demography/race/WHITE",
              summarized_slot: "race",
              race: [
                "WHITE"
              ],
              participant_count: 275
            },
            {
              id: "palette:demography/race/BLACK_OR_AFRICAN_AMERICAN",
              summarized_slot: "race",
              race: [
                "BLACK_OR_AFRICAN_AMERICAN"
              ],
              participant_count: 90
            },
            {
              id: "palette:demography/race/MIDDLE_EASTERN_OR_NORTH_AFRICAN",
              summarized_slot: "race",
              race: [
                "MIDDLE_EASTERN_OR_NORTH_AFRICAN"
              ],
              participant_count: 45
            },
            {
              id: "palette:demography/race/NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER",
              summarized_slot: "race",
              race: [
                "NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER"
              ],
              participant_count: 45
            }
          ]
        },
        {
          id: "palette:demography/ethnicity",
          summarized_slot: "ethnicity",
          participant_count: 460,
          values: [
            {
              id: "palette:demography/ethnicity/HISPANIC_OR_LATINO",
              summarized_slot: "ethnicity",
              ethnicity: "HISPANIC_OR_LATINO",
              participant_count: 70
            },
            {
              id: "palette:demography/ethnicity/NOT_HISPANIC_OR_LATINO",
              summarized_slot: "ethnicity",
              ethnicity: "NOT_HISPANIC_OR_LATINO",
              participant_count: 390
            }
          ]
        }
      ]
    }
  ]
};

/** Trimmed from schema/examples/SYNTHETIC.SummaryResponse-t2d-female.yaml. */
export const t2dFemaleSummary: SummaryResponse = {
  release: "example-release",
  seed: "MONDO:0005148",
  filter: [
    "palette:measurement/FAST_GLUC_BLD",
    "palette:demography/sex/FEMALE"
  ],
  min_count: 10,
  research_studies: [
    {
      id: "palette:study_one",
      name: "Example Study One"
    },
    {
      id: "palette:study_two",
      name: "Example Study Two"
    }
  ],
  studies: [
    {
      research_study: "palette:study_one",
      participant_count: 230,
      demographics: [
        {
          id: "palette:demography/sex",
          summarized_slot: "sex",
          participant_count: 230,
          values: [
            {
              id: "palette:demography/sex/FEMALE",
              summarized_slot: "sex",
              sex: "FEMALE",
              participant_count: 230
            }
          ]
        },
        {
          id: "palette:demography/race",
          summarized_slot: "race",
          participant_count: 227,
          values: [
            {
              id: "palette:demography/race/WHITE",
              summarized_slot: "race",
              race: [
                "WHITE"
              ],
              participant_count: 115
            },
            {
              id: "palette:demography/race/BLACK_OR_AFRICAN_AMERICAN",
              summarized_slot: "race",
              race: [
                "BLACK_OR_AFRICAN_AMERICAN"
              ],
              participant_count: 70
            },
            {
              id: "palette:demography/race/ASIAN",
              summarized_slot: "race",
              race: [
                "ASIAN"
              ],
              participant_count: 22
            },
            {
              id: "palette:demography/race/AMERICAN_INDIAN_OR_ALASKA_NATIVE",
              summarized_slot: "race",
              race: [
                "AMERICAN_INDIAN_OR_ALASKA_NATIVE"
              ],
              participant_count: 20
            }
          ]
        }
      ]
    },
    {
      research_study: "palette:study_two",
      participant_count: 250,
      demographics: [
        {
          id: "palette:demography/sex",
          summarized_slot: "sex",
          participant_count: 250,
          values: [
            {
              id: "palette:demography/sex/FEMALE",
              summarized_slot: "sex",
              sex: "FEMALE",
              participant_count: 250
            }
          ]
        },
        {
          id: "palette:demography/race",
          summarized_slot: "race",
          participant_count: 246,
          values: [
            {
              id: "palette:demography/race/WHITE",
              summarized_slot: "race",
              race: [
                "WHITE"
              ],
              participant_count: 150
            },
            {
              id: "palette:demography/race/BLACK_OR_AFRICAN_AMERICAN",
              summarized_slot: "race",
              race: [
                "BLACK_OR_AFRICAN_AMERICAN"
              ],
              participant_count: 50
            },
            {
              id: "palette:demography/race/MIDDLE_EASTERN_OR_NORTH_AFRICAN",
              summarized_slot: "race",
              race: [
                "MIDDLE_EASTERN_OR_NORTH_AFRICAN"
              ],
              participant_count: 22
            },
            {
              id: "palette:demography/race/NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER",
              summarized_slot: "race",
              race: [
                "NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER"
              ],
              participant_count: 24
            }
          ]
        }
      ]
    }
  ]
};

// Placeholder until the summary response includes available participants: the
// broadest example's count times a random 10–20, picked once per page load.
export const AVAILABLE_PARTICIPANTS_PLACEHOLDER =
  cohortParticipants(t2dSummary) * (10 + Math.floor(Math.random() * 11));
