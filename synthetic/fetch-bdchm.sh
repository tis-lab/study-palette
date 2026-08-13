#!/usr/bin/env bash
# Fetch the pinned BDCHM schema used as the transformation target.
#
# Pinned by commit rather than by tag: git tags are mutable and can be
# retargeted, so a tag alone would let the schema change underneath us. The
# checksum then verifies the bytes, covering the case where the fetch itself
# returns something unexpected.
#
# To bump: change all three values together and re-run the pipeline.
set -euo pipefail

BDCHM_VERSION="v1.3.0"
BDCHM_COMMIT="84222624fb550e47ce7ec3f6c4a3754d80a1cd16"
BDCHM_SHA256="01af15d50ba1ce3929344a30698cf83776fc10f19902b392cc1fcf7469c10029"

REPO="RTIInternational/NHLBI-BDC-DMC-HM"
URL="https://raw.githubusercontent.com/${REPO}/${BDCHM_COMMIT}/src/bdchm/schema/bdchm.yaml"

DEST="$(cd "$(dirname "$0")" && pwd)/bdchm.yaml"
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

curl -fsSL "$URL" -o "$TMP"

ACTUAL="$(sha256sum "$TMP" | cut -d' ' -f1)"
if [ "$ACTUAL" != "$BDCHM_SHA256" ]; then
    echo "Checksum mismatch for BDCHM ${BDCHM_VERSION} (${BDCHM_COMMIT})" >&2
    echo "  expected ${BDCHM_SHA256}" >&2
    echo "  actual   ${ACTUAL}" >&2
    exit 1
fi

mv "$TMP" "$DEST"
trap - EXIT
echo "Fetched BDCHM ${BDCHM_VERSION} (${BDCHM_COMMIT:0:12}) -> ${DEST}"
