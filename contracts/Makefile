# Generate each side's types from the LinkML contract in ../schema.
# Nothing generated is committed: regenerate when the schema changes.
#
#   make -C contracts            generate everything
#   make -C contracts client     type-check the toy UI against the generated types

RUN ?= uv run
SCHEMA := ../schema
OUT := generated
PACKAGE := org.biodatacatalyst.contract

JSON_SCHEMAS := $(OUT)/summary.schema.json $(OUT)/terms.schema.json
TYPESCRIPT := $(OUT)/typescript/summary.ts $(OUT)/typescript/terms.ts

.PHONY: all clean client

all: $(JSON_SCHEMAS) $(TYPESCRIPT) $(OUT)/java

$(OUT)/summary.schema.json: $(SCHEMA)/summary.yaml $(SCHEMA)/terms.yaml
	mkdir -p $(@D)
	$(RUN) gen-json-schema --top-class SummaryResponse $< > $@

$(OUT)/terms.schema.json: $(SCHEMA)/terms.yaml
	mkdir -p $(@D)
	$(RUN) gen-json-schema --top-class Term $< > $@

$(OUT)/typescript/%.ts: $(SCHEMA)/%.yaml $(SCHEMA)/terms.yaml
	mkdir -p $(@D)
	$(RUN) gen-typescript $< > $@

# gen-java resolves imports by schema name, which fails on BDCHM's path import,
# so it reads a copy with the imports merged in.
$(OUT)/summary-merged.yaml: $(SCHEMA)/summary.yaml $(SCHEMA)/terms.yaml
	mkdir -p $(@D)
	$(RUN) gen-linkml --mergeimports -f yaml $< > $@

$(OUT)/java: $(OUT)/summary-merged.yaml
	rm -rf $@
	$(RUN) gen-java --template-variant records --true-enums --package $(PACKAGE) --output-directory $@ $<

client: $(TYPESCRIPT)
	npx --yes -p typescript@5 tsc --noEmit --strict --target es2022 --module esnext \
		--moduleResolution bundler --allowImportingTsExtensions --lib es2022,dom toy/client.ts

clean:
	rm -rf $(OUT)
