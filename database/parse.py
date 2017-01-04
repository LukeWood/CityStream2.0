import json

lines = [x.split('\t') for x in open("raw/rawdb.tsv")]
mapping = {}
lines = [x[1:20] for x in lines]

for i,field in enumerate(lines[0]):
    mapping[i] = field

xps = []
for line in lines[1:]:
    d = {}
    for i, data in enumerate(line):
        d[mapping[i]] = data
    xps.append(d)
with open("raw/tempdb.json","w") as f:
    f.write(json.dumps(xps[:70]));

xps = [x for x in xps if "Tags" in x and x["Tags"] != ""]

for x in xps:
    x["Tags"] = [z.strip() for z in x["Tags"].lower().split(",")]

with open("raw/tempdb.json","w") as f:
    f.write(json.dumps(xps))

sets = {}

for x in xps:
    for tag in x["Tags"]:
        if(tag.replace(" ","_") == ""):
            continue
        if(tag.replace(" ","_") not in sets):
            sets[tag.replace(" ","_")] = []
        sets[tag.replace(" ","_")].append(x["ID"])

all_tags = []
for key in sets:
    all_tags.append(key)

with open("graphdata/dump.json","w") as f:
    f.write(json.dumps(sets));

#count common


tag_refs = {}

for x in all_tags:
    all_values = []
    for y in all_tags:
        if(x == y):
            continue
        common = len(set(sets[x]) & set(sets[y]))
        all_values.append((y,common))
    all_values.sort(key=lambda a:a[1])
    tag_refs[x] = [x[0] for x in all_values]

    #count common

with open("../graph/states/tag_stack_mapping.json","w") as f:
    f.write(json.dumps(tag_refs));
