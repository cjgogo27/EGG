"""Offline catalogue, recommendation and local-link validation (stdlib only)."""
import json
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'data/resources.json').read_text(encoding='utf-8'))
picks=json.loads((ROOT/'data/track-picks.json').read_text(encoding='utf-8'))
projects=data['projects']
tracks={'信号可靠性','疾病','睡眠','认知情绪','运动想象','自然刺激解码','SSVEP'}
repos={p['repo'].lower() for p in projects}
assert len(repos)==len(projects), 'Duplicate repositories'
assert len({p['id'] for p in projects})==len(projects), 'Duplicate project ids'
for p in projects:
    for field in ['name','repo','id','description','use','caveat','category','tracks','sources','commit','pushedAt','checkedAt']:
        assert p.get(field), (p['name'],field)
    assert set(p['tracks'])<=tracks|{'全赛道'}, p['name']
    assert p['priority'] in {'P0','P1','P2'}
    assert p['licenseClass'] in {'open','restricted','unclear'}
    assert p['readiness'] in {'pretrain','task','tool','partial'}
    assert p['year'] is None or isinstance(p['year'],int)
    for url in [p['url'],*p['sources']]:
        assert urlparse(url).scheme=='https' and urlparse(url).netloc, url
assert len(picks)==7 and {p['track'] for p in picks}==tracks
for group in picks:
    assert len(group['projects'])==3
    assert len({p['repo'].lower() for p in group['projects']})==3
    for p in group['projects']:
        assert p['repo'].lower() in repos, p['repo']
        assert p['reason'] and p['caution']

class Document(HTMLParser):
    def __init__(self): super().__init__();self.ids=[];self.refs=[]
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if attrs.get('id'): self.ids.append(attrs['id'])
        for key in ['src','href']:
            if attrs.get(key): self.refs.append(attrs[key])
doc=Document();doc.feed((ROOT/'index.html').read_text(encoding='utf-8'))
assert len(doc.ids)==len(set(doc.ids)), 'Duplicate HTML ids'
for ref in doc.refs:
    if ref.startswith('#') and ref!='#': assert ref[1:] in doc.ids,ref
    elif ref.startswith('./'): assert (ROOT/ref).exists(),ref
print(json.dumps({'ok':True,'projects':len(projects),'trackRecommendations':21,'watchlist':len(data['watchlist']),'categories':dict(Counter(p['category'] for p in projects))},ensure_ascii=False,indent=2))
