import re, json, sys
fp = r"index.html"
with open(fp, 'r', encoding='utf-8') as f:
    s = f.read()
blocks = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', s, flags=re.S|re.I)
if not blocks:
    print('No se encontraron bloques JSON-LD')
    sys.exit(0)
for i, b in enumerate(blocks, 1):
    print(f'--- Bloque {i} ---')
    try:
        # strip leading/trailing whitespace
        text = b.strip()
        # Try to load directly
        data = json.loads(text)
        print('OK: JSON válido. Tipo:', data.get('@type'))
    except Exception as e:
        print('ERROR al parsear JSON:', e)
        # try to show a snippet
        snippet = text[:400].replace('\n','\\n')
        print('Snippet:', snippet)

print('Validación completada')
