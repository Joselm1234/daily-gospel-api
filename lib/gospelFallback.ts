export interface GospelReading {
  date: string;
  citation: string;
  passage: string;
  source: string;
}

/**
 * Exact daily Gospels in Spanish mapped by 'YYYY-MM-DD' or 'MM-DD'.
 * Sources: Evangeli.net and official Roman Catholic Liturgical calendar (Leccionario).
 */
export const staticGospelMap: Record<string, Omit<GospelReading, "date">> = {
  // Specific coordinates for the current period (June 2026)
  "2026-06-17": {
    citation: "Mateo 6:1-6. 16-18",
    passage: "En aquel tiempo, dijo Jesús a sus discípulos: «Cuidad de no practicar vuestra justicia delante de los hombres para ser vistos por ellos; de lo contrario no tendréis recompensa de vuestro Padre celestial. Por tanto, cuando hagas limosna, no vayas tocando la trompeta por delante, como hacen los hipócritas en las sinagogas y por las calles, con el fin de ser honrados por los hombres; en verdad os digo que ya han recibido su paga. Tú, en cambio, cuando hagas limosna, que no sepa tu mano izquierda lo que hace tu derecha; así tu limosna quedará en secreto, y tu Padre, que ve en lo secreto, te recompensará. Y cuando oréis, no seáis como los hipócritas, que son amigos de orar de pie en las sinagogas y en las esquinas de las plazas, para exhibirse delante de los hombres... Tú, en cambio, cuando ores, entra en tu cuarto, cierra la puerta y ora a tu Padre, que está en lo secreto, y tu Padre, que ve en lo secreto, te recompensará. Cuando ayunéis, no pongáis cara triste, como los hipócritas... Tú, en cambio, cuando ayunes, perfúmate la cabeza y lávate la cara, para que tu ayuno sea visto, no por los hombres, sino por tu Padre que está en lo secreto; y tu Padre, que ve en lo secreto, te recompensará».",
    source: "Evangeli.net / Liturgia de las Horas"
  },
  "2026-06-18": {
    citation: "Mateo 6:7-15",
    passage: "En aquel tiempo, dijo Jesús a sus discípulos: «Al orar, no charléis mucho, como los gentiles, que se figuran que por su palabrería van a ser escuchados. No os fijéis, pues, en ellos, porque vuestro Padre sabe lo que necesitáis antes de pedírselo. Vosotros, pues, orad así: Padre nuestro que estás en los cielos, santificado sea tu Nombre; venga tu Reino; hágase tu Voluntad así en la tierra como en el cielo. Nuestro pan cotidiano dánosle hoy; y perdónanos nuestras deudas, así como nosotros hemos perdonado a nuestros deudores; y no nos dejes caer en tentación, mas líbranos del mal. Que si vosotros perdonáis a los hombres sus ofensas, os perdonará también a vosotros vuestro Padre celestial; pero si no perdonáis a los hombres, tampoco vuestro Padre perdonará vuestras ofensas».",
    source: "Evangeli.net / Liturgia de las Horas"
  },
  "2026-06-19": {
    citation: "Mateo 6:19-23",
    passage: "En aquel tiempo, dijo Jesús a sus discípulos: «No os amontonéis tesoros en la tierra, donde hay polilla y herrumbre que corroen, y ladrones que socavan y roban. Amontonaos más bien tesoros en el cielo, donde no hay polilla ni herrumbre que corroen, ni ladrones que socavan y roban. Porque donde esté tu tesoro, allí estará también tu corazón. La lámpara del cuerpo es el ojo. Si tu ojo está sano, todo tu cuerpo estará luminoso; pero si tu ojo está malo, todo tu cuerpo estará a oscuras. Y, si la luz que hay en ti es oscuridad, ¡qué oscuridad tan grande!»",
    source: "Evangeli.net / Liturgia de las Horas"
  },
  "2026-06-20": {
    citation: "Mateo 6:24-34",
    passage: "En aquel tiempo, dijo Jesús a sus discípulos: «Nadie puede servir a dos señores; porque aborrecerá a uno y amará al otro; o bien se entregará a uno y despreciará al otro. No podéis servir a Dios y al dinero. Por eso os digo: No andéis preocupados por vuestra vida, qué vais a comer; ni por vuestro cuerpo, con qué os vais a vestir. ¿No vale más la vida que el alimento, y el cuerpo que el vestido? Mirad las aves del cielo: no siembran, ni cosechan, ni recogen en graneros; y vuestro Padre celestial las alimenta. ¿No valéis vosotros más que ellas? [...] Buscad primero su Reino y su justicia, y todas esas cosas se os darán por añadidura. No os preocupéis por el mañana; porque el mañana traerá su propia preocupación».",
    source: "Evangeli.net / Liturgia de las Horas"
  },
  "2026-06-21": {
    citation: "Mateo 10:26-33",
    passage: "En aquel tiempo, dijo Jesús a sus discípulos: «No tengáis miedo a los hombres. Porque nada hay encubierto que no haya de ser descubierto, ni oculto que no haya de saberse. Lo que os digo en la oscuridad, decidlo a la luz; y lo que oís al oído, proclamadlo desde los terrados. Y no temáis a los que matan el cuerpo, pero no pueden matar el alma; temed más bien al que puede llevar a la perdición alma y cuerpo en la gehena. ¿No se venden dos pajarillos por un as? Sin embargo, ni uno solo de ellos caerá en tierra sin el consentimiento de vuestro Padre. En cuanto a vosotros, hasta los cabellos de vuestra cabeza están todos contados. No temáis, pues; vosotros valéis más que muchos pajarillos. Por todo aquel que se declare por mí ante los hombres, yo también me declararé por él ante mi Padre que está en los cielos».",
    source: "Evangeli.net / Liturgia de las Horas (XII Domingo Ordinario)"
  },
  "2026-06-22": {
    citation: "Mateo 7:1-5",
    passage: "En aquel tiempo, dijo Jesús a sus discípulos: «No juzguéis, para que no seáis juzgados. Porque con el juicio con que juzguéis seréis juzgados, y con la medida con que midáis se os medirá. ¿Cómo es que miras la brizna en el ojo de tu hermano, y no reparas en la viga que hay en tu propio ojo? ¿O cómo vas a decir a tu hermano: 'Deja que saque la brizna de tu ojo', cuando tú tienes una viga en el tuyo? Hipócrita, saca primero la viga de tu ojo, y entonces verás claro para sacar la brizna del ojo de tu hermano».",
    source: "Evangeli.net / Liturgia de las Horas"
  },
  "2026-06-23": {
    citation: "Mateo 7:6. 12-14",
    passage: "En aquel tiempo, dijo Jesús a sus discípulos: «No deis lo santo a los perros, ni echéis vuestras perlas delante de los puercos, no sea que las pisoteen con sus patas, y se vuelvan y os despedacen. Todo cuanto queráis que os hagan los hombres, hacédselo también vosotros a ellos; porque esta es la Ley y los Profetas. Entrad por la entrada estrecha; porque ancha es la entrada y espacioso el camino que lleva a la perdición, y son muchos los que entran por ella; mas ¡qué estrecha es la entrada y qué angosto el camino que lleva a la Vida!; y pocos son los que lo encuentran».",
    source: "Evangeli.net / Liturgia de las Horas"
  },
  "2026-06-24": {
    citation: "Lucas 1:57-66. 80",
    passage: "Se le cumplió a Isabel el tiempo de dar a luz, y dio a luz un hijo. Escucharon sus vecinos y parientes que el Señor le había hecho gran misericordia, y se alegraban con ella. Y ocurrió que al octavo día fueron a circuncidar al niño, y querían llamarle como su padre, Zacarías. Pero su madre, interviniendo, dijo: «No, sino que se llamará Juan». Le dijeron: «No hay nadie en tu parentela que tenga ese nombre». Y preguntaban por señas a su padre cómo quería que se le llamase. Él, pidiendo una tablilla, escribió: «Juan es su nombre». Y todos se maravillaron. Al punto se le abrió su boca y su lengua, y hablaba bendiciendo a Dios. El niño crecía y se fortalecía en espíritu; y vivió en lugares desiertos hasta el día de su manifestación a Israel.",
    source: "Evangeli.net / Liturgia de las Horas (Natividad de San Juan Bautista)"
  },
  "2026-06-25": {
    citation: "Mateo 7:21-29",
    passage: "En aquel tiempo, dijo Jesús a sus discípulos: «No todo el que me dice: 'Señor, Señor', entrará en el Reino de los Cielos, sino el que hace la voluntad de mi Padre que está en los cielos. Muchos me dirán aquel día: 'Señor, Señor, ¿no profetizamos en tu nombre...?'. Y entonces les declararé: '¡Jamás os conocí; apartaos de mí, agentes de iniquidad!'. Así pues, todo el que oiga estas palabras mías y las ponga en práctica, será como el hombre prudente que edificó su casa sobre roca: cayó la lluvia, vinieron los torrentes, soplaron los vientos y azotaron aquella casa; pero no cayó, porque estaba fundada sobre roca».",
    source: "Evangeli.net / Liturgia de las Horas"
  },
};

/**
 * Structured list of generic, inspiring, and authentic Gospels in Spanish for fallback.
 */
export const generalFallbacks: Omit<GospelReading, "date">[] = [
  {
    citation: "Juan 3:16-21",
    passage: "«Porque tanto amó Dios al mundo que dio a su Hijo único, para que todo el que crea en él no perezca, sino que tenga vida eterna. Porque Dios no envió a su Hijo al mundo para juzgar al mundo, sino para que el mundo se salve por él. El que cree en él, no es juzgado; pero el que no cree, ya está juzgado, porque no ha creído en el Nombre del Hijo único de Dios...»",
    source: "Biblia de Jerusalén (Fallback Canónico)"
  },
  {
    citation: "Mateo 5:1-12",
    passage: "Viendo la muchedumbre, subió al monte, se sentó, y sus discípulos se le acercaron. Y tomando la palabra, les enseñaba diciendo: «Bienaventurados los pobres de espíritu, porque de ellos es el Reino de los Cielos. Bienaventurados los mansos, porque ellos poseerán en herencia la tierra. Bienaventurados los que lloran, porque ellos serán consolados. Bienaventurados los que tienen hambre y sed de justicia, porque ellos serán saciados...»",
    source: "Biblia de Jerusalén (Bienaventuranzas)"
  },
  {
    citation: "Marcos 12:28-34",
    passage: "Acercándose uno de los escribas, le preguntó: «¿Cuál es el primero de todos los mandamientos?». Jesús respondió: «El primero es: Escucha, Israel: El Señor nuestro Dios es el único Señor; y amarás al Señor tu Dios con todo tu corazón, con toda tu alma, con toda tu mente y con todas tus fuerzas. El segundo es: Amarás a tu prójimo como a ti mismo. No existe otro mandamiento mayor que estos».",
    source: "Biblia de Jerusalén (Gran Mandamiento)"
  },
  {
    citation: "Juan 15:1-8",
    passage: "«Yo soy la vid verdadera, y mi Padre es el viñador. Todo sarmiento que en mí no da fruto, lo corta, y todo sarmiento que da fruto, lo limpia para que dé más fruto. Vosotros estáis ya limpios gracias a la Palabra que os he anunciado. Permaneced en mí, como yo en vosotros. Lo mismo que el sarmiento no puede dar fruto por sí mismo, si no permanece en la vid, así tampoco vosotros si no permanecéis en mí. Yo soy la vid; vosotros los sarmientos...»",
    source: "Biblia de Jerusalén (La Vid Verdadera)"
  },
  {
    citation: "Juan 14:1-6",
    passage: "«No se turbe vuestro corazón. Creéis en Dios: creed también en mí. En la casa de mi Padre hay muchas mansiones; si no, os lo habría dicho; porque voy a prepararos un lugar. Y cuando haya ido y os haya preparado un lugar, volveré y os tomaré conmigo, para que donde esté yo estéis también vosotros... Jesús le dice: 'Yo soy el Camino, la Verdad y la Vida. Nadie va al Padre sino por mí'».",
    source: "Biblia de Jerusalén (Camino, Verdad y Vida)"
  },
  {
    citation: "Mateo 11:25-30",
    passage: "En aquel tiempo, tomando Jesús la palabra, dijo: «Yo te alabo, Padre, Señor del cielo y de la tierra, porque has ocultado estas cosas a los sabios y prudentes, y las has revelado a los sencillos. Sí, Padre, porque tal ha sido tu beneplácito. Todo me ha sido entregado por mi Padre... Venid a mí todos los que estáis fatigados y sobrecargados, y yo os daré descanso. Tomad sobre vosotros mi yugo, y aprended de mí, que soy manso y humilde de corazón; y hallaréis descanso para vuestras almas. Porque mi yugo es suave y mi carga ligera».",
    source: "Biblia de Jerusalén (Alivio y Descanso)"
  }
];

export const generalProtestantFallbacks: Omit<GospelReading, "date">[] = [
  {
    citation: "Juan 3:16-21",
    passage: "Porque de tal manera amó Dios al mundo, que ha dado á su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna. Porque no envió Dios á su Hijo al mundo para que condene al mundo, mas para que el mundo sea salvo por él. El que en él cree, no es condenado; mas el que no cree, ya es condenado, porque no creyó en el nombre del unigénito Hijo de Dios...",
    source: "Reina Valera 1909 (Fallback Canónico)"
  },
  {
    citation: "Mateo 5:1-12",
    passage: "Y viendo las gentes, subió al monte; y sentándose él, se llegaron á él sus discípulos. Y abriendo su boca, les enseñaba, diciendo: Bienaventurados los pobres en espíritu: porque de ellos es el reino de los cielos. Bienaventurados los que lloran: porque ellos recibirán consolación. Bienaventurados los mansos: porque ellos heredarán la tierra. Bienaventurados los que tienen hambre y sed de justicia: porque ellos serán saciados...",
    source: "Reina Valera 1909 (Bienaventuranzas)"
  },
  {
    citation: "Marcos 12:28-34",
    passage: "Y llegándose uno de los escribas, que los había oído disputar, y sabía que les había respondido bien, le preguntó: ¿Cuál es el primer mandamiento de todos? Y Jesús le respondió: El primer mandamiento de todos es: Oye, Israel, el Señor nuestro Dios, el Señor uno es. Y amarás al Señor tu Dios de todo tu corazón, y de toda tu alma, y de toda tu mente, y de todas tus fuerzas; este es el principal mandamiento. Y el segundo es semejante á él: Amarás á tu prójimo como á ti mismo. No hay otro mandamiento mayor que éstos.",
    source: "Reina Valera 1909 (Gran Mandamiento)"
  },
  {
    citation: "Juan 15:1-8",
    passage: "Yo soy la vid verdadera, y mi Padre es el labrador. Todo pámpano que en mí no lleva fruto, le quitará: y todo aquel que lleva fruto, le limpiará, para que lleve más fruto. Ya vosotros estáis limpios por la palabra que os he hablado. Estad en mí, y yo en vosotros. Como el pámpano no puede llevar fruto de sí mismo, si no estuviere en la vid; así ni vosotros, si no estuviereis en mí. Yo soy la vid, vosotros los pámpanos: el que está en mí, y yo en él, éste lleva mucho fruto; porque sin mí nada podéis hacer.",
    source: "Reina Valera 1909 (La Vid Verdadera)"
  },
  {
    citation: "Juan 14:1-6",
    passage: "No se turbe vuestro corazón; creéis en Dios, creed también en mí. En la casa de mi Padre muchas moradas hay: de otra manera os lo hubiera dicho: voy, pues, á preparar lugar para vosotros. Y si me fuere, y os preparare lugar, vendré otra vez, y os tomaré á mí mismo: para que donde yo estoy, vosotros también estéis. Y sabéis á dónde yo voy; y sabéis el camino. Dícele Tomás: Señor, no sabemos á dónde vas: ¿cómo, pues, podemos saber el camino? Jesús le dice: Yo soy el camino, y la verdad, y la vida: nadie viene al Padre, sino por mí.",
    source: "Reina Valera 1909 (Camino, Verdad y Vida)"
  },
  {
    citation: "Mateo 11:25-30",
    passage: "En aquel tiempo, respondiendo Jesús, dijo: Te alabo, Padre, Señor del cielo y de la tierra, que hayas escondido estas cosas de los sabios y de los entendidos, y las hayas revelado á los niños. Sí, Padre, porque así agradó ante tus ojos. Todas las cosas me son entregadas de mi Padre... Venid á mí todos los que estáis trabajados y cargados, que yo os haré descansar. Llevad mi yugo sobre vosotros, y aprended de mí, que soy manso y humilde de corazón; y hallaréis descanso para vuestras almas. Porque mi yugo es suave, y ligera mi carga.",
    source: "Reina Valera 1909 (Alivio y Descanso)"
  }
];

/**
 * Returns a Gospel reading for a specified date string.
 * Supports date format validation and falls back gracefully to a deterministic reading.
 * @param dateStr Date in format YYYY-MM-DD
 * @param denomination Christian denomination: 'catholic', 'protestant', or 'orthodox'
 */
export function getGospelForDate(dateStr: string, denomination: string = "catholic"): GospelReading {
  // Simple format validation: YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  let targetDate = dateStr;
  
  if (!dateRegex.test(dateStr)) {
    // Fall back to today's date in local time or UTC
    try {
      const now = new Date();
      const offset = now.getTimezoneOffset();
      const localNow = new Date(now.getTime() - (offset * 60 * 1000));
      targetDate = localNow.toISOString().split("T")[0];
    } catch {
      targetDate = "2026-06-17"; // Safety absolute fallback
    }
  }

  // Catholic exact date matching
  if (denomination === "catholic") {
    // 1. Try to find the exact date match (e.g. "2026-06-17")
    if (staticGospelMap[targetDate]) {
      return {
        date: targetDate,
        ...staticGospelMap[targetDate]
      };
    }

    // 2. Try to find the month-day match (e.g. "06-17") to make it recurring year-over-year
    const mmDd = targetDate.slice(5); // Extracts "MM-DD" from "YYYY-MM-DD"
    const mmDdKey = Object.keys(staticGospelMap).find(key => key.endsWith(mmDd));
    if (mmDdKey && staticGospelMap[mmDdKey]) {
      return {
        date: targetDate,
        ...staticGospelMap[mmDdKey]
      };
    }
  }

  // 3. Deterministically hash the date to choose a beautiful general fallback reading
  let hash = 0;
  for (let i = 0; i < targetDate.length; i++) {
    hash = targetDate.charCodeAt(i) + ((hash << 5) - hash);
  }

  if (denomination === "protestant" || denomination === "orthodox") {
    const index = Math.abs(hash) % generalProtestantFallbacks.length;
    const fallback = generalProtestantFallbacks[index];
    const sourceSuffix = denomination === "orthodox" ? " (Orthodox Fallback)" : " (Protestant Fallback)";
    return {
      date: targetDate,
      citation: fallback.citation,
      passage: fallback.passage,
      source: `${fallback.source}${sourceSuffix}`
    };
  } else {
    const index = Math.abs(hash) % generalFallbacks.length;
    const fallback = generalFallbacks[index];
    return {
      date: targetDate,
      citation: fallback.citation,
      passage: fallback.passage,
      source: `${fallback.source} (Fallback determinista)`
    };
  }
}
