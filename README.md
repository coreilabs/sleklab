# Slek Lab

Site estático em HTML, CSS e JavaScript puros. Não usa framework, npm, banco de dados ou compilação. Os arquivos entregues já estão prontos para abrir e hospedar.

## Abrir

Abra `index.html` no Chrome. Pelo Laragon, com o Apache ativo, use `http://localhost/sleklab/` (ou o host local configurado). As páginas traduzidas são `pt-br/index.html` e `en/index.html`.

## Onde editar

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Textos e metadados em espanhol da Espanha |
| `pt-br/index.html` | Textos e metadados em português brasileiro |
| `en/index.html` | Textos e metadados em inglês internacional |
| `assets/css/style.css` | Cores, fontes, layouts, responsividade e animações |
| `assets/js/catalog.js` | Todos os serviços, preços em euros, condições e adicionais |
| `assets/js/app.js` | Busca, filtros, detalhes, cálculo dos adicionais e WhatsApp |
| `assets/images/workbench.svg` | Ilustração original da bancada |
| `sleklab_logotipo_transparente.png` | Logotipo original preservado |
| `assets/images/logo.png` | Cópia reduzida do logotipo, usada no site para carregar mais rápido |
| `opengraph.webp` | Imagem de compartilhamento original preservada |
| `Slek_Lab_Catalogo.pdf` | Catálogo original em espanhol |

Em `catalog.js`, os textos entre colchetes seguem a ordem: espanhol, português brasileiro e inglês. O preço é um número em euros, sem símbolo. `price: null` significa serviço sob orçamento. A manutenção preventiva está centralizada no final do arquivo. Não altere apenas o preço base se houver totais citados nas condições do serviço: atualize também esses textos.

Ao adicionar um serviço, use um `id` único e uma categoria existente: `retro`, `nintendo` ou `maintenance`. Os seis serviços destacados são definidos em `featured`, no início de `app.js`.

## Renovação de cache após editar CSS ou JavaScript

Com o Node.js instalado, execute uma vez, na pasta do projeto:

```powershell
node tools/renew-assets.mjs
```

Esse helper renova um token hexadecimal aleatório em todas as referências locais a CSS e JS das três páginas e verifica que os arquivos existem. Node é usado apenas nesse utilitário de preparação; não é necessário no servidor ou para navegar no site. Publique juntos os HTML atualizados e os recursos modificados. A renovação não atualiza abas já abertas.

## Imagem de compartilhamento

Ao substituir a imagem ou solicitar atualização da prévia, gere um novo token, por exemplo `node -e "console.log(require('crypto').randomBytes(8).toString('hex'))"`. Atualize a versão de `opengraph.webp?v=TOKEN` em `og:image`, `og:image:secure_url` e `twitter:image` nas três páginas, mantendo as referências consistentes. Não é necessário renovar a imagem por uma alteração só de CSS/JS.

Os textos sociais seguem os orçamentos editoriais de 50 caracteres para o título e 90 para a descrição. Isso não garante o texto exibido no WhatsApp. Depois de publicar, confirme as URLs públicas e, se necessário, peça uma nova leitura no depurador de compartilhamento da plataforma. Não há garantia de atualização imediata de posts ou prévias existentes.

## WhatsApp

Número espanhol: `+34 641 241 166`. Os links usam `https://wa.me/34641241166`. O helper `whatsapp()` em `app.js` codifica a mensagem com `encodeURIComponent`. O botão do serviço inclui idioma, console, serviço, adicional selecionado, valor e país de envio opcional. Abrir o link não envia uma mensagem automaticamente.

## Publicar no GitHub Pages

1. Envie estes arquivos para a raiz do repositório `coreilabs/sleklab`, preservando as pastas.
2. Em **Settings → Pages**, escolha **Deploy from a branch**, a branch publicada (normalmente `main`) e **/ (root)**.
3. Preserve `.nojekyll`. Não há comando de build a configurar.
4. Confira `https://coreilabs.github.io/sleklab/`, `/pt-br/` e `/en/`, o catálogo, as imagens e os recursos versionados.

Canonical, idiomas alternativos, sitemap e metadados usam essa URL pública. Atualize os três HTML e `sitemap.xml` se mudar o domínio ou o nome do repositório. Não coloque um `robots.txt` desta subpasta como se fosse o arquivo da raiz de `coreilabs.github.io`.

## Fontes e créditos

- Bandeiras SVG locais: [hampusborgos/country-flags](https://github.com/hampusborgos/country-flags), arquivos `es.svg`, `br.svg` e `gb.svg`. Os nomes dos idiomas acompanham as bandeiras.
- Fontes locais: Barlow Condensed e DM Sans, distribuídas sob SIL Open Font License; licenças em `assets/fonts/`.
- Ícones SVG e ilustração da bancada: desenhados para esta interface.
- Marca, catálogo e imagem Open Graph: arquivos fornecidos pelo cliente.

O site não usa rastreadores, cookies de análise ou formulários com armazenamento. O país digitado é apenas inserido na mensagem ao abrir o WhatsApp. Links externos abrem com `noopener noreferrer`.

## Validação local

Verificado em 7 de novembro de 2026, no Google Chrome instalado (`channel: chrome`), nos três idiomas e em larguras de 320, 375, 390, 768 e 1440 pixels. Sem rolagem horizontal, erros de JavaScript ou respostas HTTP de erro para os recursos locais. Conferidos filtros, busca com e sem resultados, expansão do catálogo, adicional e total, conteúdo do link WhatsApp, menu mobile, retorno de foco ao fechar o diálogo, perguntas frequentes e preferência por movimento reduzido.

Os links relativos também foram verificados com o site servido em `/sleklab/`, assim como a abertura direta de `index.html`. Os metadados estão nos HTML originais, com URLs absolutas e a mesma versão da imagem nas três referências de compartilhamento. A publicação remota e a aparência efetiva da prévia no WhatsApp ainda precisam ser verificadas após o deploy. Nenhuma mensagem de WhatsApp foi enviada durante os testes.
