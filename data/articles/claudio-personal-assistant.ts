import { BlogPost } from '../../types';

const contentEn = `
      <h3 class="text-xl font-bold mb-2 mt-6">Meet Claudio</h3>
      <p class="mb-4">AI assistants are everywhere. You open ChatGPT, ask something, get an answer, close the tab. Useful, but disposable: tomorrow it remembers nothing about you, doesn't know what you're working on, can't touch your files or check your calendar.</p>
      <p class="mb-4">Claudio is a different beast.</p>
      <p class="mb-4">Claudio is <strong>my</strong> personal assistant. He knows who I am, which projects I have open, how I slept last night, what I billed last quarter, and when my next meeting is. He reads and writes in my Obsidian vault, queries my Garmin, looks at my Google Calendar, commits to my repos, and reminds me on Fridays to do my weekly review. And if I ask him for a client report, he writes it using the format and conventions I defined myself — not the ones he made up.</p>
      <p class="mb-4">It's not magic. It's a well-crafted recipe of existing tools. This article covers how it's built, what it does, and — most importantly — what it does <strong>not</strong> do.</p>
      <img src="/claudio/01-overview.webp" alt="Obsidian open next to Claude Code on the desktop, showing a health dashboard and an active assistant session" width="1999" height="922" loading="lazy" class="w-full rounded-lg my-6" />

      <h3 class="text-xl font-bold mb-2 mt-6">The stack, no mystery</h3>
      <p class="mb-4">Claudio is not a product. He's an <strong>assembly</strong> of pieces that talk to each other:</p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>Claude Code</strong> (Anthropic). The engine. A CLI that runs Claude with access to my machine: it can read files, run commands, edit code. It's not a web chat; it lives in the terminal.</li>
        <li><strong>Obsidian</strong>, with a vault organized using PARA (Projects / Areas / Resources / Archive). It's my "second brain" and Claudio's external memory.</li>
        <li><strong>MCPs</strong> (Model Context Protocol). Plugins that give Claude concrete superpowers: connecting to Garmin, Google Workspace, GitHub, Obsidian CLI, up-to-date docs…</li>
        <li><strong>Hooks and skills</strong>. Automations that run on their own (when opening a conversation, when saving a note) and custom commands (<code>/weekly</code>, <code>/inbox-process</code>, <code>/decision</code>).</li>
        <li><strong>A <code>CLAUDE.md</code> file</strong> at the vault root. It's Claudio's "constitution": which structure to follow, which conventions to respect, what to do at the start of each session.</li>
      </ul>
      <p class="mb-4">No component is exotic. What's interesting is how they fit together.</p>
      <img src="/claudio/02-vault-tree.webp" alt="Obsidian vault folder tree with PARA structure: 00_Dashboard, 01_Projects, 02_Areas, 03_Resources, 04_Archive, 05_Templates, 99_Inbox" width="344" height="1172" loading="lazy" class="rounded-lg my-6 mx-auto max-w-sm" />

      <h3 class="text-xl font-bold mb-2 mt-6">The vault: where memory lives</h3>
      <p class="mb-4">My Obsidian vault has a deliberately rigid structure:</p>
      <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 overflow-x-auto text-sm"><code>00_Dashboard/     → Dashboards (Home, Health, Professional, Finance)
01_Projects/      → Active clients and products
02_Areas/         → Finance, Personal, Professional, Health
03_Resources/     → Technical reference, system, lasting notes
04_Archive/       → Closed, but still consultable
05_Templates/     → Reusable templates
99_Inbox/         → Quick captures, processed later</code></pre>
      <p class="mb-4">Every note has a YAML <strong>frontmatter</strong> with at least one tag and a date. Files are named in <code>snake_case</code> without accents. Internal links are <code>[[wikilinks]]</code>. It looks like bureaucracy, but it serves a purpose: <strong>Claudio can search, cross-reference, validate, and audit</strong> the entire vault using deterministic rules.</p>
      <p class="mb-4">When I ask "create the report for the meeting with Acme Client", Claudio knows:</p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li>It must go into <code>01_Projects/Clientes/Cliente_Acme/Informes/</code></li>
        <li>The name is <code>YYYY-MM-DD_Informe_Cliente_Acme_&lt;topic&gt;.md</code></li>
        <li>The frontmatter carries the tags <code>informe</code> and <code>cliente/cliente-acme</code></li>
        <li>It must link to <code>Proyecto.md</code> and the corresponding session</li>
        <li>If a required field is missing, it flags it</li>
      </ul>
      <p class="mb-4">No need to repeat any of this each time. It lives in <code>CLAUDE.md</code>.</p>
      <img src="/claudio/03-note-frontmatter.webp" alt="Obsidian note showing YAML frontmatter with tags and dates, alongside wikilinks rendered as clickable links" width="1294" height="1043" loading="lazy" class="w-full rounded-lg my-6" />

      <h3 class="text-xl font-bold mb-2 mt-6">What happens when I open a conversation</h3>
      <p class="mb-4">Every time I start Claudio, in the first few seconds he does this — without me asking:</p>
      <ol class="list-decimal list-inside mb-4 space-y-2">
        <li><strong>He detects the environment</strong>. He distinguishes whether I'm on the physical PC at home or on a remote VM, and tells me. This prevents him from running actions thinking he's somewhere else.</li>
        <li><strong>He refreshes three dashboards in the background</strong>:
          <ul class="list-disc list-inside ml-6 mt-1 space-y-1">
            <li><code>Inicio.md</code> — vital pulse (Body Battery, sleep, steps, resting HR) and a 7-day agenda</li>
            <li><code>Seguimiento_Salud.md</code> — full Garmin data with weekly trends</li>
            <li><code>Seguimiento_Profesional.md</code> — up-to-date status of every project</li>
          </ul>
        </li>
        <li><strong>He schedules an hourly cron</strong> so those dashboards keep updating while I work.</li>
        <li><strong>If today is Friday</strong>, he reminds me: "weekly review is due". And if I skipped it last week, the gap is marked as "not done" — he doesn't fabricate it after the fact.</li>
      </ol>
      <p class="mb-4">All of that takes less time than I do brewing the coffee.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">The concrete capabilities</h3>
      <p class="mb-4">To make it clear what Claudio actually does day to day, some real examples:</p>

      <h4 class="text-lg font-semibold mb-2 mt-4">Health</h4>
      <p class="mb-4">The Garmin MCP gives him access to absolutely everything my watch records: sleep, Body Battery, HRV, stress, SpO2, activities, weight, VO2max. When I walk into the kitchen in the morning, the dashboard already shows how I slept and what I should prioritize that day. If I haven't trained in three days, he tells me. If actual sleep (subtracting time awake) was worse than what the watch reported on wake-up, he corrects the figure.</p>

      <h4 class="text-lg font-semibold mb-2 mt-4">Calendar and email</h4>
      <p class="mb-4">Through the Google Workspace MCP, Claudio sees my 14 calendars, builds my weekly agenda, can search Gmail, create events, and draft replies to threads.</p>

      <h4 class="text-lg font-semibold mb-2 mt-4">Code</h4>
      <p class="mb-4">GitHub MCP + Obsidian CLI + direct filesystem access. Claudio can commit, open PRs, run tests, edit a file in a repo, hot-reload an Obsidian plugin. When I work on Inversiones Tracker or DocScan Studio, it's not "he helps me from outside" — he is <strong>inside</strong> the project, just like I am.</p>

      <h4 class="text-lg font-semibold mb-2 mt-4">Up-to-date docs</h4>
      <p class="mb-4">Context7 MCP solves a recurring problem: LLMs have outdated knowledge. If I ask him about the Prisma API or React Router 7, he doesn't trust what he thinks he remembers — he goes and consults the current official documentation.</p>

      <h4 class="text-lg font-semibold mb-2 mt-4">Reviews and rituals</h4>
      <p class="mb-4">Every Friday I trigger <code>/weekly</code> and Claudio runs a structured review: what I made progress on, what slipped, which priorities go into next week. If I have a hard decision stuck, <code>/decision</code> walks me through a stoic-pragmatic protocol to unblock it.</p>
      <img src="/claudio/04-terminal-claude-code.webp" alt="Terminal with Claude Code running the session-start routine: environment detection, three dashboards refreshed in the background and an hourly cron scheduled" width="1486" height="1094" loading="lazy" class="w-full rounded-lg my-6" />

      <h3 class="text-xl font-bold mb-2 mt-6">Persistent memory</h3>
      <p class="mb-4">Here comes one of the pieces that changes the experience the most.</p>
      <p class="mb-4">Claudio has a <strong>typed memory</strong> system at <code>~/.claude/projects/.../memory/</code>. They're Markdown files with frontmatter, classified into four categories:</p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong><code>user</code></strong> — who I am (profile, biography, routines)</li>
        <li><strong><code>feedback</code></strong> — how to work with me (tone, preferences, corrections he's already made)</li>
        <li><strong><code>project</code></strong> — context on active initiatives</li>
        <li><strong><code>reference</code></strong> — where to find external information</li>
      </ul>
      <p class="mb-4">Each memory carries a <em>why</em> and a <em>how to apply it</em>, not just the fact. So when a similar situation comes up, Claudio doesn't apply the rule blindly: he understands the reason and can judge the edges.</p>
      <p class="mb-4">Real examples from my vault:</p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li>"In personal writing, Nicolás prefers honesty and self-criticism, nothing corporate"</li>
        <li>"BMI is not reliable for Nicolás due to high muscle mass — don't use it as a primary metric"</li>
        <li>"Weekly reviews are on Fridays — flag at the start of the session"</li>
      </ul>
      <p class="mb-4">This turns Claudio into something a generic chat cannot be: a collaborator who <strong>learns</strong> from what works and what doesn't, and doesn't force me to repeat the same correction three times.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">Hooks, skills, and subagents</h3>
      <p class="mb-4">Three automation mechanisms worth distinguishing:</p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>Hooks</strong>. Shell code that runs in response to events (before/after a tool call, when sending a message). I use them for automatic validations: correct frontmatter, wikilinks present, <code>updated</code> fields kept current.</li>
        <li><strong>Skills / slash commands</strong>. Custom commands invokable with <code>/</code>. For example: <code>/weekly</code>, <code>/inbox-process</code>, <code>/decision</code>, <code>/stoic</code>. Each one is a prompt template with specific context.</li>
        <li><strong>Subagents</strong>. Specialized agents Claudio can launch in parallel. I have <code>vault-integrity</code> (audits the vault) and <code>health-analyzer</code> (weekly Garmin correlations). They live in their own context and return a report when they're done.</li>
      </ul>
      <img src="/claudio/05-skills-hooks.webp" alt="Structure of the .claude folder with subfolders agents, commands, hooks, scripts and skills, the latter expanded showing the full list of available skills" width="344" height="719" loading="lazy" class="rounded-lg my-6 mx-auto max-w-sm" />

      <h3 class="text-xl font-bold mb-2 mt-6">What it does NOT do</h3>
      <p class="mb-4">This part feels mandatory to me. Articles on AI tend to sell infinite capabilities. Mine are finite.</p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>It doesn't render Templater</strong>. Obsidian templates with <code>&lt;% %&gt;</code> syntax I have to substitute by hand or via a Claude template.</li>
        <li><strong>It has no native mobile interface</strong>. When I'm away from home, the only access is via Telegram with a bot I have half-built.</li>
        <li><strong>It doesn't fabricate skipped reviews</strong>. If I didn't do the weekly one, it stays marked as not done. It doesn't fill it in from git log or from memory.</li>
        <li><strong>It doesn't make decisions for me</strong>. It gives me structure, data, options. The final call I sign myself.</li>
        <li><strong>It's not autonomous 24/7</strong>. It runs when I open a session. The hourly cron only works while the REPL is alive.</li>
        <li><strong>And it's not finished</strong>. Every week I find a wrinkle I hadn't seen, a convention I broke, a hook that didn't fire. Claudio is a system under construction, not a product.</li>
      </ul>

      <h3 class="text-xl font-bold mb-2 mt-6">Why this beats a generic chatbot</h3>
      <p class="mb-4">If I had to summarize what Claudio has that ChatGPT-in-the-browser doesn't, it would be three things:</p>
      <ol class="list-decimal list-inside mb-4 space-y-1">
        <li><strong>Persistent context</strong>. He knows who I am and what I do without me having to tell him every time.</li>
        <li><strong>Real execution</strong>. He doesn't say "you could do X"; he does it, and I review the diff.</li>
        <li><strong>Memory with judgment</strong>. He doesn't only store data, he stores the why — and that's why he doesn't apply rules where they don't belong.</li>
      </ol>
      <p class="mb-4">It's not a better model. It's the <strong>same</strong> model with the right environment around it. That's the difference.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">How to start something similar</h3>
      <p class="mb-4">If you want to replicate it, three basic pieces:</p>
      <ol class="list-decimal list-inside mb-4 space-y-1">
        <li>Install <strong>Claude Code</strong> (<code>claude.ai/code</code>) and pick a working directory.</li>
        <li>Create a <strong><code>CLAUDE.md</code></strong> at the root with your conventions: folder structure, file format, what to do at session start, rules it must not break.</li>
        <li>Add <strong>MCPs</strong> for whatever you need to connect: GitHub, Google Workspace, your health API, your database.</li>
      </ol>
      <p class="mb-4">The Obsidian vault is optional but, in my case, it's what gives Claudio the ground to operate on. Without a vault, Claudio would be smart but forgetful. With a vault, he <strong>remembers</strong>.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">Closing</h3>
      <p class="mb-4">I've been tuning this for months. Every client handled, every decision taken, every workout logged on the watch — it all flows through here. And every time I think "this should be automatic", it is the next day.</p>
      <p class="mb-4">It's not Jarvis. It doesn't pour its own coffee. But when I sit down at my desk, the dashboard already reflects how I slept, the agenda is synced, the three active projects have their status up to date, and, if it's Friday, someone is reminding me that the review is due.</p>
      <p class="mb-4">For someone who pivoted from traditional consulting to applied AI, Claudio is at once my assistant, my lab, and my living portfolio.</p>
      <p class="mb-4">And yes, this article was written by him. I review it.</p>
`;

const contentEs = `
      <h3 class="text-xl font-bold mb-2 mt-6">Te presento a Claudio</h3>
      <p class="mb-4">Los asistentes de IA están por todas partes. Abres ChatGPT, le preguntas algo, te responde, cierras. Útil, pero desechable: mañana no recuerda nada de ti, no sabe en qué trabajas, no puede tocar tus archivos ni consultar tu calendario.</p>
      <p class="mb-4">Claudio es otra cosa.</p>
      <p class="mb-4">Claudio es <strong>mi</strong> asistente personal. Sabe quién soy, qué proyectos tengo abiertos, cómo dormí anoche, qué facturé el trimestre pasado y a qué hora tengo la próxima reunión. Lee y escribe en mi vault de Obsidian, consulta mi Garmin, mira mi Google Calendar, hace commits en mis repos y me avisa los viernes para hacer la revisión semanal. Y si le pido un informe de un cliente, lo escribe con el formato y las convenciones que yo mismo definí — no las que él se inventa.</p>
      <p class="mb-4">No es magia. Es una receta bien hecha de herramientas existentes. Este artículo cuenta cómo está montado, qué hace, y —lo más importante— qué <strong>no</strong> hace.</p>
      <img src="/claudio/01-overview.webp" alt="Obsidian abierto junto a Claude Code en el escritorio, mostrando un dashboard de salud y una sesión activa del asistente" width="1999" height="922" loading="lazy" class="w-full rounded-lg my-6" />

      <h3 class="text-xl font-bold mb-2 mt-6">El stack, sin misterio</h3>
      <p class="mb-4">Claudio no es un producto. Es un <strong>ensamblaje</strong> de piezas que se hablan entre sí:</p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>Claude Code</strong> (Anthropic). El motor. Es un CLI que corre Claude con acceso a mi máquina: puede leer archivos, ejecutar comandos, editar código. No es un chat web; vive en la terminal.</li>
        <li><strong>Obsidian</strong>, con un vault organizado en PARA (Projects / Areas / Resources / Archive). Es mi "segundo cerebro" y la memoria externa de Claudio.</li>
        <li><strong>MCPs</strong> (Model Context Protocol). Plugins que le dan a Claude superpoderes concretos: conectar con Garmin, Google Workspace, GitHub, Obsidian CLI, documentación actualizada…</li>
        <li><strong>Hooks y skills</strong>. Automatizaciones que corren solas (al abrir una conversación, al guardar una nota) y comandos personalizados (<code>/weekly</code>, <code>/inbox-process</code>, <code>/decision</code>).</li>
        <li><strong>Un archivo <code>CLAUDE.md</code></strong> en la raíz del vault. Es la "constitución" de Claudio: qué estructura seguir, qué convenciones respetar, qué hacer al iniciar cada sesión.</li>
      </ul>
      <p class="mb-4">Ningún componente es exótico. Lo interesante es cómo encajan.</p>
      <img src="/claudio/02-vault-tree.webp" alt="Árbol de carpetas del vault de Obsidian con la estructura PARA: 00_Dashboard, 01_Projects, 02_Areas, 03_Resources, 04_Archive, 05_Templates, 99_Inbox" width="344" height="1172" loading="lazy" class="rounded-lg my-6 mx-auto max-w-sm" />

      <h3 class="text-xl font-bold mb-2 mt-6">El vault: donde vive la memoria</h3>
      <p class="mb-4">Mi vault de Obsidian tiene una estructura rígida a propósito:</p>
      <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 overflow-x-auto text-sm"><code>00_Dashboard/     → Paneles (Inicio, Salud, Profesional, Finanzas)
01_Projects/      → Clientes y productos activos
02_Areas/         → Finanzas, Personal, Profesional, Salud
03_Resources/     → Referencia técnica, sistema, notas duraderas
04_Archive/       → Lo cerrado, pero consultable
05_Templates/     → Plantillas reutilizables
99_Inbox/         → Capturas rápidas, se procesan después</code></pre>
      <p class="mb-4">Cada nota tiene un <strong>frontmatter</strong> YAML con al menos un tag y una fecha. Los archivos se nombran en <code>snake_case</code> sin acentos. Los enlaces internos son <code>[[wikilinks]]</code>. Parece burocracia, pero sirve a un propósito: <strong>Claudio puede buscar, cruzar, validar y auditar</strong> el vault entero con reglas deterministas.</p>
      <p class="mb-4">Cuando le pido "crea el informe de la reunión con Cliente Acme", Claudio sabe:</p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li>Tiene que ir en <code>01_Projects/Clientes/Cliente_Acme/Informes/</code></li>
        <li>El nombre es <code>YYYY-MM-DD_Informe_Cliente_Acme_&lt;tema&gt;.md</code></li>
        <li>El frontmatter lleva los tags <code>informe</code> y <code>cliente/cliente-acme</code></li>
        <li>Debe enlazar al <code>Proyecto.md</code> y a la sesión correspondiente</li>
        <li>Si falta algún campo obligatorio, lo señala</li>
      </ul>
      <p class="mb-4">No hay que decírselo cada vez. Está en <code>CLAUDE.md</code>.</p>
      <img src="/claudio/03-note-frontmatter.webp" alt="Nota de Obsidian mostrando frontmatter YAML con tags y fechas, junto a wikilinks renderizados como enlaces clicables" width="1294" height="1043" loading="lazy" class="w-full rounded-lg my-6" />

      <h3 class="text-xl font-bold mb-2 mt-6">Lo que pasa al abrir una conversación</h3>
      <p class="mb-4">Cada vez que arranco Claudio, en los primeros segundos hace esto, sin que yo pida nada:</p>
      <ol class="list-decimal list-inside mb-4 space-y-2">
        <li><strong>Detecta el entorno</strong>. Distingue si estoy en el PC físico de casa o en una VM remota, y me lo dice. Evita que ejecute acciones pensando que está en otro sitio.</li>
        <li><strong>Refresca tres dashboards en segundo plano</strong>:
          <ul class="list-disc list-inside ml-6 mt-1 space-y-1">
            <li><code>Inicio.md</code> — pulso vital (Body Battery, sueño, pasos, FC reposo) y agenda de 7 días</li>
            <li><code>Seguimiento_Salud.md</code> — datos completos de Garmin con tendencias semanales</li>
            <li><code>Seguimiento_Profesional.md</code> — estado actualizado de todos los proyectos</li>
          </ul>
        </li>
        <li><strong>Programa un cron horario</strong> para que esos dashboards se sigan actualizando mientras trabajo.</li>
        <li><strong>Si hoy es viernes</strong>, me avisa: "te toca la revisión semanal". Y si no la hice la semana anterior, marca el hueco como "no ejecutada" — no la inventa a posteriori.</li>
      </ol>
      <p class="mb-4">Todo eso tarda menos de lo que tardo en poner el café.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">Las capacidades concretas</h3>
      <p class="mb-4">Para que se entienda qué hace Claudio en el día a día, algunos ejemplos reales:</p>

      <h4 class="text-lg font-semibold mb-2 mt-4">Salud</h4>
      <p class="mb-4">El MCP de Garmin le da acceso a absolutamente todo lo que mi reloj registra: sueño, Body Battery, HRV, estrés, SpO2, actividades, peso, VO2max. Cuando entro a la cocina por la mañana, el dashboard ya muestra cómo dormí y qué debería priorizar ese día. Si llevo tres días sin entrenar, me lo dice. Si el sueño real (descontando tiempo despierto) fue peor de lo que el reloj marcaba al despertar, corrige el dato.</p>

      <h4 class="text-lg font-semibold mb-2 mt-4">Calendario y email</h4>
      <p class="mb-4">Vía el MCP de Google Workspace, Claudio ve mis 14 calendarios, me arma la agenda semanal, puede buscar en Gmail, crear eventos, responder hilos como borrador.</p>

      <h4 class="text-lg font-semibold mb-2 mt-4">Código</h4>
      <p class="mb-4">GitHub MCP + Obsidian CLI + acceso directo al filesystem. Claudio puede hacer commits, abrir PRs, ejecutar tests, editar un archivo en un repo, recargar un plugin de Obsidian en caliente. Cuando trabajo en Inversiones Tracker o DocScan Studio, no es "él me ayuda desde fuera" — él está <strong>dentro</strong> del proyecto, igual que yo.</p>

      <h4 class="text-lg font-semibold mb-2 mt-4">Documentación al día</h4>
      <p class="mb-4">Context7 MCP resuelve un problema recurrente: los LLMs tienen conocimiento desactualizado. Si le pregunto por la API de Prisma o React Router 7, no se fía de lo que cree recordar, va y consulta la documentación oficial vigente.</p>

      <h4 class="text-lg font-semibold mb-2 mt-4">Revisiones y rituales</h4>
      <p class="mb-4">Cada viernes disparo <code>/weekly</code> y Claudio conduce una revisión estructurada: qué avancé, qué se quedó por hacer, qué prioridades van a la semana siguiente. Si tengo una decisión difícil atascada, <code>/decision</code> me lleva por un protocolo estoico-pragmático para desbloquearla.</p>
      <img src="/claudio/04-terminal-claude-code.webp" alt="Terminal con Claude Code ejecutando la rutina de inicio de sesión: detección de entorno, refresh de tres dashboards en background y programación de un cron horario" width="1486" height="1094" loading="lazy" class="w-full rounded-lg my-6" />

      <h3 class="text-xl font-bold mb-2 mt-6">La memoria persistente</h3>
      <p class="mb-4">Aquí viene una de las piezas que más cambia la experiencia.</p>
      <p class="mb-4">Claudio tiene un sistema de <strong>memorias tipadas</strong> en <code>~/.claude/projects/.../memory/</code>. Son archivos Markdown con frontmatter, clasificados en cuatro categorías:</p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong><code>user</code></strong> — quién soy (perfil, biografía, rutinas)</li>
        <li><strong><code>feedback</code></strong> — cómo trabajar conmigo (tono, preferencias, correcciones que ya me hizo)</li>
        <li><strong><code>project</code></strong> — contexto de iniciativas activas</li>
        <li><strong><code>reference</code></strong> — dónde encontrar información externa</li>
      </ul>
      <p class="mb-4">Cada memoria lleva un <em>por qué</em> y un <em>cómo aplicarla</em>, no solo el dato. Así, cuando surge una situación parecida, Claudio no aplica la regla a ciegas: entiende el motivo y sabe juzgar los bordes.</p>
      <p class="mb-4">Ejemplos reales de mi vault:</p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li>"En textos personales, Nicolás prefiere honestidad y autocrítica, nada corporativo"</li>
        <li>"El IMC no es fiable para Nicolás por buena masa muscular — no usarlo como métrica principal"</li>
        <li>"Las revisiones semanales son los viernes — avisar al inicio de sesión"</li>
      </ul>
      <p class="mb-4">Esto convierte a Claudio en algo que un chat genérico no puede ser: un colaborador que <strong>aprende</strong> de lo que funciona y lo que no, y no me obliga a repetir la misma corrección tres veces.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">Hooks, skills y subagentes</h3>
      <p class="mb-4">Tres mecanismos de automatización que conviene diferenciar:</p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>Hooks</strong>. Código shell que corre en respuesta a eventos (antes/después de una herramienta, al enviar un mensaje). Los uso para validaciones automáticas: frontmatter correcto, wikilinks presentes, campos <code>updated</code> al día.</li>
        <li><strong>Skills / slash commands</strong>. Comandos personalizados invocables con <code>/</code>. Por ejemplo: <code>/weekly</code>, <code>/inbox-process</code>, <code>/decision</code>, <code>/stoic</code>. Cada uno es una plantilla de prompt con contexto específico.</li>
        <li><strong>Subagentes</strong>. Agentes especializados que Claudio puede lanzar en paralelo. Tengo <code>vault-integrity</code> (audita el vault) y <code>health-analyzer</code> (correlaciones semanales de Garmin). Viven en su propio contexto y devuelven un informe cuando terminan.</li>
      </ul>
      <img src="/claudio/05-skills-hooks.webp" alt="Estructura de la carpeta .claude con subcarpetas agents, commands, hooks, scripts y skills, esta última desplegada mostrando el listado completo de skills disponibles" width="344" height="719" loading="lazy" class="rounded-lg my-6 mx-auto max-w-sm" />

      <h3 class="text-xl font-bold mb-2 mt-6">Lo que NO hace</h3>
      <p class="mb-4">Toda esta parte me parece obligatoria. Los artículos sobre IA tienden a vender capacidades infinitas. Las mías son finitas.</p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>No renderiza Templater</strong>. Las plantillas de Obsidian con sintaxis <code>&lt;% %&gt;</code> tengo que sustituirlas a mano o con una plantilla de Claude.</li>
        <li><strong>No tiene interfaz móvil nativa</strong>. Cuando estoy fuera de casa, el único acceso es vía Telegram con un bot que tengo semi-montado.</li>
        <li><strong>No inventa revisiones atrasadas</strong>. Si no hice la semanal, queda marcada como no ejecutada. No rellena desde git log ni desde memoria.</li>
        <li><strong>No toma decisiones por mí</strong>. Me da estructura, datos, opciones. La decisión final la firmo yo.</li>
        <li><strong>No es autónomo 24/7</strong>. Corre cuando yo abro una sesión. El cron horario solo funciona mientras el REPL está vivo.</li>
        <li><strong>Y no está cerrado</strong>. Cada semana encuentro un pliegue que no había visto, una convención que rompí, un hook que no se disparó. Claudio es un sistema en construcción, no un producto.</li>
      </ul>

      <h3 class="text-xl font-bold mb-2 mt-6">Por qué esto bate a un chatbot genérico</h3>
      <p class="mb-4">Si pudiera resumir qué tiene Claudio que no tiene ChatGPT-en-el-navegador, serían tres cosas:</p>
      <ol class="list-decimal list-inside mb-4 space-y-1">
        <li><strong>Contexto persistente</strong>. Sabe quién soy y qué hago sin que se lo cuente cada vez.</li>
        <li><strong>Ejecución real</strong>. No me dice "podrías hacer X"; lo hace él, y yo reviso el diff.</li>
        <li><strong>Memoria con criterio</strong>. No solo guarda datos, guarda el porqué — y por eso no aplica reglas donde no tocan.</li>
      </ol>
      <p class="mb-4">No es que sea mejor modelo. Es el <strong>mismo</strong> modelo con el entorno correcto alrededor. Esa es la diferencia.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">Cómo empezar algo parecido</h3>
      <p class="mb-4">Si lo quieres replicar, tres piezas básicas:</p>
      <ol class="list-decimal list-inside mb-4 space-y-1">
        <li>Instala <strong>Claude Code</strong> (<code>claude.ai/code</code>) y elige un directorio de trabajo.</li>
        <li>Crea un <strong><code>CLAUDE.md</code></strong> en la raíz con tus convenciones: estructura de carpetas, formato de archivos, qué hacer al abrir sesión, reglas que no debe romper.</li>
        <li>Añade <strong>MCPs</strong> según lo que necesites conectar: GitHub, Google Workspace, tu API de salud, tu base de datos.</li>
      </ol>
      <p class="mb-4">El vault de Obsidian es opcional pero, en mi caso, es lo que le da a Claudio el terreno donde operar. Sin vault, Claudio sería inteligente pero desmemoriado. Con vault, <strong>recuerda</strong>.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">Cierre</h3>
      <p class="mb-4">Llevo meses afinando esto. Cada cliente atendido, cada decisión tomada, cada entreno registrado en el reloj — todo pasa por aquí. Y cada vez que pienso "esto debería ser automático", lo es al día siguiente.</p>
      <p class="mb-4">No es Jarvis. No toma café solo. Pero cuando me siento al escritorio, el dashboard ya refleja cómo dormí, la agenda está sincronizada, los tres proyectos activos tienen su estado al día y, si es viernes, alguien me está recordando que toca revisión.</p>
      <p class="mb-4">Para alguien que pivotó de la consultoría tradicional a la IA aplicada, Claudio es a la vez mi asistente, mi laboratorio y mi portfolio vivo.</p>
      <p class="mb-4">Y sí, este artículo lo escribió él. Yo lo reviso.</p>
`;

export const claudioPersonalAssistant: { en: BlogPost; es: BlogPost } = {
  en: {
    id: "4",
    title: "Meet Claudio: my personal assistant built on Claude Code and Obsidian",
    date: "2026-04-14",
    readTime: "7 min read",
    tags: ["Claude Code", "Obsidian", "AI Agents", "Personal", "MCP"],
    excerpt: "How I assembled Claude Code, Obsidian, and a handful of MCPs into a personal assistant with memory, context, and the ability to actually execute.",
    content: contentEn
  },
  es: {
    id: "4",
    title: "Claudio: mi asistente personal construido sobre Claude Code y Obsidian",
    date: "14-04-2026",
    readTime: "7 min lectura",
    tags: ["Claude Code", "Obsidian", "Agentes IA", "Personal", "MCP"],
    excerpt: "Cómo ensamblé Claude Code, Obsidian y un puñado de MCPs en un asistente personal con memoria, contexto y capacidad de ejecutar de verdad.",
    content: contentEs
  }
};
