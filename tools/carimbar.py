#!/usr/bin/env python3
"""Carimba os arquivos do site com a versão (hash do conteúdo) no index.html,
para o navegador baixar de novo quando algo muda. Rode antes de publicar:
    python3 tools/carimbar.py
"""
import hashlib, pathlib, re
raiz = pathlib.Path(__file__).resolve().parent.parent
html = (raiz / 'index.html').read_text(encoding='utf-8')
def carimbo(caminho):
    return hashlib.sha256((raiz / caminho).read_bytes()).hexdigest()[:10]
def troca(m):
    caminho = m.group(2)
    return f'{m.group(1)}{caminho}?v={carimbo(caminho)}{m.group(3)}'
novo = re.sub(r'((?:href|src)=")(assets/[^"?]+\.(?:css|js|svg|jpg|woff2))(?:\?v=[0-9a-f]+)?(")', troca, html)
(raiz / 'index.html').write_text(novo, encoding='utf-8')
# trilha sonora: os caminhos em assets/site.js também levam a versão
js = (raiz / 'assets' / 'site.js').read_text(encoding='utf-8')
def troca_som(m):
    caminho = m.group(1)
    if not (raiz / caminho).exists():
        return f"'{caminho}'"
    return f"'{caminho}?v={carimbo(caminho)}'"
js = re.sub(r"'(assets/som/[^'?]+\.(?:mp3|m4a|ogg))(?:\?v=[0-9a-f]+)?'", troca_som, js)
(raiz / 'assets' / 'site.js').write_text(js, encoding='utf-8')
print('carimbado')
