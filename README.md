# Paola Assis — Portfolio (Vanilla)

Portfólio pessoal em HTML, CSS e JavaScript puro (ES modules), sem framework. Migrado do projeto original em Angular, mantendo a mesma estrutura de conteúdo e seções.

## Stack

- **HTML5** — single page, seções âncora (`#about`, `#work`, `#process`, `#experience`, `#contact`)
- **CSS3** puro — custom properties para tokens de design, sem pré-processador
- **JavaScript vanilla** (ES modules) — i18n, scroll-reveal, carousel de projetos, formulário de contato
- **Vite** — usado apenas como dev server e para bundle/minificação do build final (o output é HTML/CSS/JS puro, sem runtime de framework)
- **GSAP** — animação de entrada do hero e scroll-reveal (via `IntersectionObserver`)

## Rodando localmente

```bash
npm install
npm run dev        # dev server com hot reload
npm run build      # build de produção em dist/
npm run preview    # serve o build de dist/ localmente
npm run deploy     # build + publica em GitHub Pages (gh-pages)
```

## Estrutura

```
index.html                   # todas as seções, conteúdo padrão em pt-BR com atributos data-i18n
css/
  tokens.css                 # design tokens (cores, tipografia, spacing, easing)
  base.css                   # reset, tipografia global, utilitários
  layout.css                 # breakpoints responsivos
  components.css             # nav, hero, about, services, work, process, experience, contact, footer
  animations.css             # keyframes
js/
  main.js                    # entry point
  data/portfolio.data.js     # todo o conteúdo/traduções (pt/en) e metadados de projetos/experiência
  modules/
    i18n.js                  # troca de idioma, persiste em localStorage
    scroll-reveal.js         # reveal on scroll via IntersectionObserver + GSAP
    nav.js                   # menu mobile, scroll spy, lang toggle
    hero.js                  # intro animation (GSAP) + marquee de skills
    projects.js              # carousel/showcase das galerias de projeto
    experience.js            # timeline de experiência e certificações
    contact-form.js          # monta a mensagem e abre o WhatsApp com o texto pré-preenchido
public/
  assets/                    # imagens, CV, galerias de projeto (copiado para a raiz do build)
```

## i18n

Todo o conteúdo (pt/en) vive em `js/data/portfolio.data.js`. Elementos no HTML usam `data-i18n="secao.campo"` (suporta índices de array, ex.: `services.items.0.ttl`). A troca de idioma persiste em `localStorage` e atualiza `<html lang>`.

## Formulário de contato

Ao enviar, `contact-form.js` monta uma mensagem de texto com os campos preenchidos (nome, email, telefone, tipo de projeto, mensagem) e abre `https://wa.me/<numero>?text=...` em uma nova aba, com o texto já pronto para envio no WhatsApp. Não há backend nem serviço de email envolvido — o número de destino está em `WHATSAPP_NUMBER` no topo de `js/modules/contact-form.js`.

## Pendências de conteúdo

Seis das nove descrições de projeto em `work.cards` (dentro de `portfolio.data.js`) ainda têm placeholders genéricos, marcados com `// TODO: Paola completar descrição real...` — precisam do texto definitivo antes de publicar (kynds, schneider, wondr, bigshot, english, switch).

## Deploy

Publicado no GitHub Pages via domínio customizado (`CNAME` em `public/`). `npm run deploy` builda e publica a pasta `dist/` na branch `gh-pages`.
