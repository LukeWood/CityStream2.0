lines = [x.split('\t') for x in open("raw/rawdb.tsv")]
mapping = {}
lines = [x[1:13] for x in lines]
for i,field in enumerate(lines[0]):
    mapping[i] = field


xps = []
for line in lines[1:]:
    d = {}
    for i, data in enumerate(line):
        d[mapping[i]] = data
    xps.append(d)

print(xps[1])
