#!/usr/bin/env bash
# Fetch the pinned BDCHM schema used as the transformation target.
#
# Pinned rather than tracking main so the corpus is reproducible: a schema
# change upstream should be a deliberate bump here, visible in review, not
# something that silently alters what the pipeline produces.
set -euo pipefail

BDCHM_VERSION="v1.3.0"
REPO="RTIInternational/NHLBI-BDC-DMC-HM"
URL="https://raw.githubusercontent.com/${REPO}/${BDCHM_VERSION}/src/bdchm/schema/bdchm.yaml"

DEST="$(cd "$(dirname "$0")" && pwd)/bdchm.yaml"

curl -fsSL "$URL" -o "$DEST"
echo "Fetched BDCHM ${BDCHM_VERSION} -> ${DEST}"
