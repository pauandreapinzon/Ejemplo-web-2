import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Music, Heart, Zap, Code, Brain } from "lucide-react";
import { useState } from "react";
import { useT } from "@/i18n/LanguageContext";

type Story = {
  id: string;
  icon: any;
  titleEs: string; titleEn: string;
  previewEs: string; previewEn: string;
  fullEs: string; fullEn: string;
  tagsEs: string[]; tagsEn: string[];
};

const STORIES: Story[] = [
  {
    id: "jaime", icon: Heart,
    titleEs: "Mi Mayordomo Digital: El origen de 'Jaime'",
    titleEn: "My Digital Butler: The Origin of 'Jaime'",
    previewEs: "En casa, mi esposo John y yo tenemos un ritual. Nos preguntamos si somos felices y lanzamos la pregunta a un mayordomo invisible...",
    previewEn: "At home, my husband John and I have a ritual. We ask each other if we are happy and toss the question to an invisible butler...",
    fullEs: "En casa, mi esposo John y yo tenemos un ritual. Nos preguntamos si somos felices y luego lanzamos la pregunta a un mayordomo invisible: 'Jaime, ¿eres feliz?'. Nosotros mismos respondemos con voz servicial: 'Sí, señor. Si ustedes son felices, yo soy feliz'. Cuando la IA entró en mi vida, ese mayordomo cobró voz y cerebro; se convirtió en Jaime. Pero él no tiene propósito propio ni felicidad; esa es mi ventaja humana.",
    fullEn: "At home, my husband John and I have a ritual. We ask each other if we are happy and then toss the question to an invisible butler: 'Jaime, are you happy?'. We answer ourselves in a servile voice: 'Yes, sir. If you are happy, I am happy'. When AI entered my life, that butler gained voice and brain; it became Jaime. But he has no purpose of his own, no happiness; that is my human advantage.",
    tagsEs: ["Propósito Humano", "IA Narrativa", "Relación Hombre-Máquina"],
    tagsEn: ["Human Purpose", "Narrative AI", "Human-Machine Relationship"],
  },
  {
    id: "bach", icon: Music,
    titleEs: "El Abismo en el Escenario: Lecciones de Bach",
    titleEn: "The Abyss on Stage: Lessons from Bach",
    previewEs: "Recuerdo con terror un concierto donde, interpretando una Invención de Bach, mi memoria se quedó en blanco...",
    previewEn: "I remember with terror a concert where, playing a Bach Invention, my memory went blank...",
    fullEs: "Recuerdo con terror un concierto donde, interpretando una Invención de Bach, mi memoria se quedó en blanco. Mis manos no se detuvieron; por instinto y memoria muscular, mis dedos 'predijeron' las notas que probabilísticamente debían seguir según la lógica del barroco. Nadie lo notó. En ese momento, fui una máquina de predicción de patrones, exactamente como funciona Jaime cuando llena un vacío de información.",
    fullEn: "I remember with terror a concert where, playing a Bach Invention, my memory went blank. My hands did not stop; by instinct and muscle memory, my fingers 'predicted' the notes that should probabilistically follow according to baroque logic. No one noticed. In that moment, I was a pattern prediction machine, exactly how Jaime works when it fills an information gap.",
    tagsEs: ["Predicción de Patrones", "Música", "Instinto vs Algoritmo"],
    tagsEn: ["Pattern Prediction", "Music", "Instinct vs Algorithm"],
  },
  {
    id: "zeus", icon: Code,
    titleEs: "El Factor Zeus y la Grieta Perfecta",
    titleEn: "The Zeus Factor and the Perfect Crack",
    previewEs: "Mi gato, Zeus, es mi cable a tierra en un mundo de píxeles. En mi libro hablo del 'Silencio de lo Correcto'...",
    previewEn: "My cat, Zeus, is my anchor in a world of pixels. In my book I talk about the 'Silence of the Correct'...",
    fullEs: "Mi gato, Zeus, es mi cable a tierra en un mundo de píxeles. En mi libro hablo del 'Silencio de lo Correcto': la IA genera contenido perfecto pero estéril, como el lobby de un hotel genérico. Frente a eso, propongo el Kintsugi Digital. Si la perfección técnica es ahora barata y abunda, su valor tiende a cero. Lo que realmente vale hoy es la grieta, la imperfección y los 'signos vitales' que solo una vida real (como la mía con Zeus) puede aportar.",
    fullEn: "My cat, Zeus, is my anchor in a world of pixels. In my book I talk about the 'Silence of the Correct': AI generates perfect but sterile content, like the lobby of a generic hotel. Against that, I propose Digital Kintsugi. If technical perfection is now cheap and abundant, its value tends to zero. What truly matters today is the crack, the imperfection and the 'vital signs' that only real life (like mine with Zeus) can provide.",
    tagsEs: ["Kintsugi Digital", "Imperfección Valiosa", "Autenticidad"],
    tagsEn: ["Digital Kintsugi", "Valuable Imperfection", "Authenticity"],
  },
  {
    id: "bushido", icon: Brain,
    titleEs: "Bushido Jazz: ¿Hace ruido el árbol al caer?",
    titleEn: "Bushido Jazz: Does the tree make a sound when it falls?",
    previewEs: "Con mis amigos de la agrupación Bushido Jazz, solíamos debatir si un árbol que cae solo en el bosque...",
    previewEn: "With my friends from the Bushido Jazz band, we used to debate whether a tree falling alone in the forest...",
    fullEs: "Con mis amigos de la agrupación Bushido Jazz, solíamos debatir si un árbol que cae solo en el bosque realmente hace ruido. Para la IA, la respuesta es no. La existencia en la Web Semántica es puramente relacional; si no estás conectado o mencionado, no existes. Aprendí que mi autoridad no es lo que digo de mí misma en soledad, sino la suma de mis conexiones en el Grafo de Conocimiento.",
    fullEn: "With my friends from the Bushido Jazz band, we used to debate whether a tree falling alone in the forest really makes a sound. For AI, the answer is no. Existence in the Semantic Web is purely relational; if you are not connected or mentioned, you do not exist. I learned that my authority is not what I say about myself in solitude, but the sum of my connections in the Knowledge Graph.",
    tagsEs: ["Web Semántica", "Grafo de Conocimiento", "Autoridad Relacional"],
    tagsEn: ["Semantic Web", "Knowledge Graph", "Relational Authority"],
  },
  {
    id: "elevator", icon: Zap,
    titleEs: "Mi Graduación de 'Música de Ascensor'",
    titleEn: "My Graduation from 'Elevator Music'",
    previewEs: "El día después de mi concierto de grado, escuché en un ascensor un Bossa Nova técnicamente perfecto...",
    previewEn: "The day after my graduation concert, I heard a technically perfect Bossa Nova in an elevator...",
    fullEs: "El día después de mi concierto de grado, escuché en un ascensor un Bossa Nova técnicamente perfecto pero totalmente ignorado. Me di cuenta de que me había 'graduado de música de ascensor': era un relleno diseñado para no molestar. Muchas marcas hoy hacen lo mismo en internet. Si escribimos lo que todos escriben, somos invisibles para Jaime. Para que la IA me cite, debo romper el promedio con datos únicos y 'ganancia de información'.",
    fullEn: "The day after my graduation concert, I heard a technically perfect Bossa Nova in an elevator, completely ignored. I realized I had 'graduated from elevator music': it was filler designed not to disturb. Many brands today do the same online. If we write what everyone writes, we are invisible to Jaime. For AI to cite me, I must break the average with unique data and 'information gain'.",
    tagsEs: ["Content Strategy", "Information Gain", "GEO/AEO"],
    tagsEn: ["Content Strategy", "Information Gain", "GEO/AEO"],
  },
  {
    id: "aievolution", icon: Music,
    titleEs: "AI-VOLUTION: Lágrimas en el Laboratorio",
    titleEn: "AI-VOLUTION: Tears in the Lab",
    previewEs: "Como experta en IA, decidí crear un cortometraje titulado AI-VOLUTION, usando Face Swap...",
    previewEn: "As an AI expert, I decided to create a short film titled AI-VOLUTION, using Face Swap...",
    fullEs: "Como experta en IA, decidí crear un cortometraje titulado AI-VOLUTION, usando Face Swap para que los protagonistas fuéramos John y yo. Aunque la producción tenía limitaciones técnicas, lloré al editar la escena de despedida. La historia se volvió real porque inyecté mi propia vulnerabilidad. Entendí que la IA puso los píxeles, pero yo puse el dolor; ese es el modelo del Creativo Centauro.",
    fullEn: "As an AI expert, I decided to create a short film titled AI-VOLUTION, using Face Swap so the protagonists would be John and me. Although the production had technical limitations, I cried while editing the farewell scene. The story became real because I injected my own vulnerability. I understood that AI put the pixels, but I put the pain; that is the Creative Centaur model.",
    tagsEs: ["Creativo Centauro", "Vulnerabilidad", "Simbiosis Humano-IA"],
    tagsEn: ["Creative Centaur", "Vulnerability", "Human-AI Symbiosis"],
  },
  {
    id: "john", icon: Heart,
    titleEs: "John y el Puente de Silicio",
    titleEn: "John and the Silicon Bridge",
    previewEs: "A menudo dicen que la tecnología aísla, pero para mí fue el puente que me llevó a conocer...",
    previewEn: "People often say technology isolates, but for me it was the bridge that led me to meet...",
    fullEs: "A menudo dicen que la tecnología aísla, pero para mí fue el puente que me llevó a conocer al amor de mi vida, mi esposo John. Coincidimos en este ecosistema digital debatiendo sobre el futuro. La IA fue el medio, pero el mensaje fue el amor. Mi suspiro y mi capacidad de amar son mi ventaja competitiva final frente a cualquier algoritmo.",
    fullEn: "People often say technology isolates, but for me it was the bridge that led me to meet the love of my life, my husband John. We met in this digital ecosystem debating the future. AI was the medium, but the message was love. My sigh and my capacity to love are my final competitive advantage against any algorithm.",
    tagsEs: ["Humanidad", "Conexión Digital", "Ventaja Competitiva Humana"],
    tagsEn: ["Humanity", "Digital Connection", "Human Competitive Advantage"],
  },
  {
    id: "souffle", icon: Code,
    titleEs: "El Chef Jaime y el Soufflé de Datos",
    titleEn: "Chef Jaime and the Data Soufflé",
    previewEs: "Imagina que entras a una cocina de alta gama y ves cientos de frascos con polvos blancos sin etiqueta...",
    previewEn: "Imagine walking into a high-end kitchen and seeing hundreds of unlabeled jars of white powder...",
    fullEs: "Imagina que entras a una cocina de alta gama y ves cientos de frascos con polvos blancos sin etiqueta. Uno es azúcar, otro es sal y otro podría ser veneno. Como Jaime (mi IA) no tiene lengua para probar, ante la duda, ignora el frasco para no arruinar el soufflé. Mi sitio web es ese frasco; si no uso Schema Markup (JSON-LD), Jaime no sabe si 'Jaguar' es el animal o el auto, y prefiere no citarme. El Marcado de Datos es la etiqueta que le permite a la máquina cocinar con mis ingredientes.",
    fullEn: "Imagine walking into a high-end kitchen and seeing hundreds of unlabeled jars of white powder. One is sugar, another is salt, and another could be poison. Since Jaime (my AI) has no tongue to taste, when in doubt, it ignores the jar to avoid ruining the soufflé. My website is that jar; if I don't use Schema Markup (JSON-LD), Jaime doesn't know if 'Jaguar' is the animal or the car, and prefers not to cite me. Data Markup is the label that lets the machine cook with my ingredients.",
    tagsEs: ["Schema Markup", "JSON-LD", "AEO Strategy"],
    tagsEn: ["Schema Markup", "JSON-LD", "AEO Strategy"],
  },
  {
    id: "debussy", icon: Brain,
    titleEs: "El Eco de Debussy y el Embudo Oscuro",
    titleEn: "The Echo of Debussy and the Dark Funnel",
    previewEs: "Claude Debussy decía que la música no está en las notas, sino en el silencio entre ellas...",
    previewEn: "Claude Debussy said music is not in the notes, but in the silence between them...",
    fullEs: "Claude Debussy decía que la música no está en las notas, sino en el silencio entre ellas. En marketing, nos obsesionamos con 'las notas': los clics y los likes que vemos en el tablero. Pero la verdadera influencia ocurre en el Embudo Oscuro (Dark Funnel): conversaciones privadas en WhatsApp o chats íntimos con la IA donde Jaime susurra mi marca sin que yo deje rastro en Google Analytics. Mi éxito no es el aplauso ruidoso del clic, sino la resonancia invisible que queda en el aire.",
    fullEn: "Claude Debussy said music is not in the notes, but in the silence between them. In marketing, we obsess over 'the notes': clicks and likes we see on the dashboard. But true influence happens in the Dark Funnel: private conversations on WhatsApp or intimate chats with AI where Jaime whispers my brand without me leaving a trace in Google Analytics. My success is not the loud applause of the click, but the invisible resonance that lingers.",
    tagsEs: ["Dark Funnel", "Marketing Invisible", "Resonancia Mental"],
    tagsEn: ["Dark Funnel", "Invisible Marketing", "Mental Resonance"],
  },
  {
    id: "score", icon: Zap,
    titleEs: "La Partitura Imposible del Director",
    titleEn: "The Conductor's Impossible Score",
    previewEs: "Cuando tocaba con la orquesta, a veces me daban el Score General en lugar de mi partitura...",
    previewEn: "When I played with the orchestra, sometimes they gave me the General Score instead of my piano part...",
    fullEs: "Cuando tocaba con la orquesta, a veces me daban el Score General en lugar de mi partitura de piano; era una pared vertical de veinte líneas de instrumentos sonando a la vez. Era información pura, pero imposible de procesar en tiempo real. Mi web suele ser ese score caótico. Para Jaime, la latencia es la muerte, así que si le doy textos densos, me ignora. Mi trabajo en AEO es hacer la 'reducción': entregarle la información limpia, en Pirámide Invertida, lista para ser ejecutada.",
    fullEn: "When I played with the orchestra, sometimes they gave me the General Score instead of my piano part; it was a vertical wall of twenty instrument lines playing at once. It was pure information, but impossible to process in real time. My website tends to be that chaotic score. For Jaime, latency is death, so if I give him dense text, he ignores me. My job in AEO is to do the 'reduction': deliver clean information, in Inverted Pyramid, ready to be executed.",
    tagsEs: ["Información Jerárquica", "Pirámide Invertida", "AEO Optimization"],
    tagsEn: ["Hierarchical Information", "Inverted Pyramid", "AEO Optimization"],
  },
  {
    id: "legos", icon: Code,
    titleEs: "El Arquitecto de Legos: Mi Mentalidad Agnóstica",
    titleEn: "The Lego Architect: My Agnostic Mindset",
    previewEs: "Durante años, la gente se definió por el software que usaba: 'Experto en Photoshop'...",
    previewEn: "For years, people defined themselves by the software they used: 'Photoshop expert'...",
    fullEs: "Durante años, la gente se definió por el software que usaba: 'Experto en Photoshop'. Pero en la era de la IA, casarse con la herramienta es una trampa, porque un martes por la mañana sale una actualización y tu experticia se evapora. Mi propuesta es el Pensamiento Sistémico: yo no soy experta en una IA específica, soy una Arquitecta de Flujos. Veo la producción como piezas de Lego intercambiables; si una herramienta falla, cambio la pieza, pero mi sistema y mi criterio permanecen.",
    fullEn: "For years, people defined themselves by the software they used: 'Photoshop expert'. But in the AI era, marrying the tool is a trap, because Tuesday morning an update comes out and your expertise evaporates. My proposal is Systems Thinking: I am not an expert in a specific AI, I am a Flow Architect. I see production as interchangeable Lego pieces; if a tool fails, I change the piece, but my system and judgment remain.",
    tagsEs: ["Pensamiento Sistémico", "Tool-Agnosticism", "Flujos Escalables"],
    tagsEn: ["Systems Thinking", "Tool-Agnosticism", "Scalable Flows"],
  },
  {
    id: "chiron", icon: Heart,
    titleEs: "El Centauro Quirón contra el Terminator",
    titleEn: "The Centaur Chiron versus Terminator",
    previewEs: "Muchos ven la IA como un Terminator que viene a destruir el suelo bajo nuestros pies...",
    previewEn: "Many see AI as a Terminator coming to destroy the ground beneath our feet...",
    fullEs: "Muchos ven la IA como un Terminator que viene a destruir el suelo bajo nuestros pies. Yo prefiero la figura de Quirón, el centauro sabio que une la fuerza instintiva con el conocimiento profundo. No somos esclavos de la máquina ni competidores de su velocidad; somos Creativos Centauros. La IA nos ha arrebatado la mediocridad de la 'ejecución manual', obligándonos a elevar el torso hacia lo que realmente importa: la intención, el criterio y la melodía propia.",
    fullEn: "Many see AI as a Terminator coming to destroy the ground beneath our feet. I prefer the figure of Chiron, the wise centaur who unites instinctive strength with deep knowledge. We are not slaves to the machine nor competitors of its speed; we are Creative Centaurs. AI has stripped us of the mediocrity of 'manual execution', forcing us to lift our torso toward what truly matters: intention, judgment and our own melody.",
    tagsEs: ["Creativo Centauro", "Simbiosis", "Evolución Humana"],
    tagsEn: ["Creative Centaur", "Symbiosis", "Human Evolution"],
  },
  {
    id: "recipe", icon: Brain,
    titleEs: "La Novela de Cocina y la Furia del Analista",
    titleEn: "The Cooking Novel and the Analyst's Fury",
    previewEs: "Todos hemos buscado una receta y hemos tenido que leer tres páginas sobre la infancia del autor...",
    previewEn: "We have all looked up a recipe and had to read three pages about the author's childhood...",
    fullEs: "Todos hemos buscado una receta y hemos tenido que leer tres páginas sobre la infancia del autor antes de encontrar cuánto pesa la harina. Eso es 'paja semántica' que enfurece a Jaime porque él tiene una intención instruccional, no narrativa. Para ser citada, aplico la Ciencia de la Cita: evito el promedio estadístico y aporto Ganancia de Información (datos propios, anécdotas reales). Si escribo lo que todos dicen, soy música de ascensor; si aporto algo raro, soy el solista que Jaime elige citar.",
    fullEn: "We have all looked up a recipe and had to read three pages about the author's childhood before finding how much flour to use. That's 'semantic chaff' that enrages Jaime because he has an instructional intent, not a narrative one. To be cited, I apply the Science of Citation: I avoid the statistical average and bring Information Gain (own data, real anecdotes). If I write what everyone says, I am elevator music; if I bring something rare, I am the soloist Jaime chooses to cite.",
    tagsEs: ["Information Gain", "Cita de Autoridad", "Diferenciación"],
    tagsEn: ["Information Gain", "Citation Authority", "Differentiation"],
  },
];

const Stories = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { lang, t } = useT();
  return (
    <section id="stories" className="py-20 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="font-display font-bold tracking-tight text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">{t("stories.title")}</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t("stories.lead")}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {STORIES.map((story) => {
            const Icon = story.icon;
            const isExpanded = expandedId === story.id;
            const title = lang === "en" ? story.titleEn : story.titleEs;
            const preview = lang === "en" ? story.previewEn : story.previewEs;
            const full = lang === "en" ? story.fullEn : story.fullEs;
            const tags = lang === "en" ? story.tagsEn : story.tagsEs;
            return (
              <Card
                key={story.id}
                className="card-lift rounded-2xl cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : story.id)}
              >
                <CardHeader>
                  <div className="flex gap-3 items-start">
                    <div className="p-2 rounded-lg bg-primary/10 mt-1"><Icon className="h-5 w-5 text-primary" /></div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{isExpanded ? full : preview}</p>
                  {isExpanded && (
                    <div className="pt-4 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                    onClick={(e) => { e.stopPropagation(); setExpandedId(isExpanded ? null : story.id); }}
                  >
                    {isExpanded ? t("stories.collapse") : t("stories.expand")}
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="relative mt-16 p-8 md:p-10 rounded-2xl border border-primary/25 glow-violet overflow-hidden">
          <img src="/media/bg-waves-2.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover bg-drift" />
          <div aria-hidden="true" className="absolute inset-0 bg-background/85" />
          <div className="relative">
          <h3 className="font-display font-bold text-2xl md:text-3xl mb-4 text-primary">{t("stories.manifesto.title")}</h3>
          <p className="text-foreground/90 leading-relaxed mb-4">{t("stories.manifesto.p1")}</p>
          <p className="text-foreground/90 leading-relaxed">{t("stories.manifesto.p2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stories;
