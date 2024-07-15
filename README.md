<hr>
<hr>

<div align="center">
<h1><i>Green Like Nature - Vegetarian Recipe App</i></h1>
</div>

Questa é una Web App creata come progetto per il completamento del Corso **React.js** di **Start2Impact**.

## Progetto:

**React.js / Food**

<hr>
<hr>

<p align="center">
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Icarus1989/GreenLikeNature?style=flat-square">
<img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/Icarus1989/GreenLikeNature"> 
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/Icarus1989/GreenLikeNature">
<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Icarus1989/GreenLikeNature">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Icarus1989/GreenLikeNature">
</p>

<hr>
<hr>

<div id="begin"></div>

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#description">Description</a>
          <ul>
          <li><a href="#intro">Intro</a></li>
          <li><a href="#combined-data">Combined Data</a></li>
          <li><a href="#routing">Routing</a></li>
          <li><a href="#internationalization">Internationalization</a></li>
          <li><a href="#api-limits">API Limits</a></li>
          <li><a href="#allergies-and-intolerances">Allergies and intolerances</a></li>
          <li><a href="#data-percistence">Data percistence</a></li>
          <li><a href="#error-handling">Error Handling</a></li>
          <li><a href="#wonderful-draws-and-animations">Wonderful Draws and Animations</a></li>
          <li><a href="#menu-animation">Menu Animation</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#trace-summary">Trace Summary</a>
    <li><a href="#additional-features">Additional Features</a>
    <li><a href="#to-do">To-Do</a>
    <li><a href="#resources">Resources</a>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contacts">Contacts</a></li>

  </ol>
</details>

<hr>
<hr>

## About the project

### Build with:

Logica, struttura, routing e styling:

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML?retiredLocale=it)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS?retiredLocale=it)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript?retiredLocale=it)
- [React.js v.18](https://react.dev/)
- [Next.js v.14.2.3](https://nextjs.org/)

Dati da API:

- [Spoonacular Food API](https://spoonacular.com/food-api)
- [EU Agrifood API](https://agridata.ec.europa.eu/)

Richieste HTTP:

- [Axios](https://axios-http.com/)

Traduzioni:

- [i18Next](https://www.i18next.com/) - Menu e indicazioni
- [DeepL Free API](https://www.deepl.com/it/) - Traduzione ricette

Salvataggio:

- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) - solo accesso per salvataggio ricette, nessun dato personale utilizzato

Animazioni:

- [Framer-Motion](https://www.framer.com/motion/) - Elements
- [Anime.js](https://animejs.com/documentation/) - SVG Paths Morphing

Icone ed immagini:

- [React-Icons package](https://react-icons.github.io/react-icons/) - Icone
- [Boxy-svg](https://boxy-svg.com/) - Immagini personalizzate

<!-- INSERIRE IMMAGINE STRUTTURA -->

<hr>
<hr>

## Description

### Intro - Green Like Nature

Quest'App é stata creata sfruttando al massimo le conoscenze apprese attraverso il Corso di React.js di Start2Impact e, partendo da queste, imparando anche ad utilizzare il framework Next.js, che amplia le possibilità fornite da React.js soprattutto dopo la recente aggiunta dei Server Components, che l'ecosistema Next.js integra permettendo di effettuare delle richieste da Server in modo molto elegante e relativamente semplice. Capita questa struttura ho potuto dare vita a ciò che avevo immaginato: una Web App di ricette vegane come richiesto che permettesse di ottenere delle indicazioni utili alla quotidianità delle persone.

L'idea originale era ottenere dei risultati basati sulla stagionalità annuale dei vari prodotti ma, viste le differenti aree climatiche del pianeta e a causa di molti altri fattori, non sono ancora state realizzate delle API o resi disponibili dei dati, affidabili o meno, da nessun Paese o società.

Quindi ho deciso di fornire indicazioni basandomi sull'effettivo prezzo dei prodotti, una sorta di segnalazione di convenienza di un prodotto ortofrutticolo basato su una raccolta dati fornita dai produttori europei negli anni precedenti: una sorta di "stagionalità economica".

<hr>

### Combined Data Spoonacular + EU Agrifood

Osservando, analizzando e utilizzando i dati forniti dall'Unione Europea (link Agrifood), accessibili solo attraverso delle richieste autenticate da Server, ho potuto ricavare i prezzi di ogni settimana per ogni prodotto ortofrutticolo coltivato nell'Unione negli scorsi due anni e fornire così indicazioni su quali prodotti acquistare con relativa varietà. Nello specifico: se un prodotto ha avuto il suo prezzo più basso nella settimana corrispondente di uno degli scorsi due anni, verrà indicato come suggerimento nella pagina di Ricerca con relativa varietà e, grazie ai dati di Spoonacular, verrano suggerite delle ricette contenenti tale prodotto. Per quanto con qualche piccolo errore, dovuto anche alla parzialità dei dati di qualche prodotto, confrontando tali suggerimenti con i reali prezzi in due negozi di ortofrutta negli scorsi mesi, ho potuto effettivamente osservare la correttezza delle indicazioni ottenute.
Putroppo i dati degli anni precedenti al 2022 non erano utilizzabili in quando molto lacunosi, parziali o totalmente assenti in alcuni casi, rendendo però possibile un miglioramento futuro dell'App con il progredire dell'acquisizione dati e la loro disponibilità. Utilizzando questi dati si ricalcano comunque gli andamenti stagionali dei prodotti, visto che, in linea generale, quando un prodotto é di stagione il suo prezzo diminuisce.

<hr>

### Routing

**Nota**:
Purtroppo non é possibile utilizzare React-Routers per il Routing di un'App creata con Next.js, anche se richiesto nella traccia originale. Sarebbe un integrazione difficile e sostanzialmente inutile, visto che il Routing per Next.js viene creato basandosi anche sulle directories del progetto all'interno della directory principale "app" ([App Routing Next.js v.14](https://nextjs.org/docs/getting-started/project-structure)) e il Routing integrato permette una serie di ottimizzazioni e personalizzazioni non trascurabili, come l'utilizzo dei Server Components come base per ogni Route e per il Layout generale dell'App. Nonostante ciò vi sono somiglianze tra le due tipologie di Routing, come l'utilizzo di elementi Link integrati dedicati.

**Struttura**:

<hr>

### Internationalization

In aggiunta ho voluto rendere accessibile l'App ad un pubblico più amplio, così ho integrato la traduzione in 6 lingue diverse: menu e indicazioni tramite internationalization del Routing con i18n mentre i testi ricavati dai dati di Spoonacular tradotti invece tramite l'API di DeepL.

<hr>

### API Limits

Per sfruttare al meglio i dati forniti gratuitamente dal Sponacular, l'App effettua una richiesta per 80 ricette con una prima API Key, che fungeranno da suggeriementi utilizzabili senza effettuare ulteriori richieste con relativo consumo di dati disponibili quotidianamente evitato. Per le ricerche di altre ricette, le richieste utilizzeranno una seconda API Key.
Combinando le due in questo modo credo di aver prolungato la possibilità di utilizzo quotidiano da parte del maggior numeno possibile di utenti. Per gestire un quantitativo di dati importante come quello di 80 ricette con dettagli, ho utilizzato Redux. Questo si é dimostrato molto più veloce e fluido nella gestione di una mole notevole di dati rispetto all'utilizzo di una struttura di Context e Provider creata da zero, anche se, come indicato nella documentazione, l'integrazione e l'ottimizzazione di Redux con Next.js non é ancora completa.

La tecnica della doppia API Key utilizzata sopra permette all'App di avere traduzioni per un maggior numero ricette tramite l'API di DeepL, utilizzando una chiave per ottenere le traduzioni delle ricette già presenti nei suggeriementi e un'altra per quelle non presenti.

<hr>

### Allergies and intolerances

Creare un App di ricette senza la possibilità di escludere intolleranze e allergeni sarebbe stato rischioso visto che in tutto e per tutto l'App è disponibile per chiunque online, quindi ho ritenuto necessario integrare anche questa funzionalità permettendo alle persone di indicare cosa escludere, passando poi tali indicazioni per un filtro per escludere eventualmente alcune delle ricette suggerite e nell'url delle ricerche per Spoonacular in modo da ottenere dei nuovi dati privi di ricette contenti alimenti potenzialmente dannosi, sia che provengano da un'intolleranza o da un'allergia.

<hr>

### Data percistence

Concentrandomi sulla possibilità di utilizzare l'App anche senza la disponibilità di richieste verso l'API di Spoonacular, ho voluto inserire la possibilità di salvare un massimo di 8 ricette e le impostazioni correnti, come per esempio le intolleranze segnalate, nel LocalStorage interno, tramite l'apposita API. Tutte le impostazioni cambiate nelle varie parti dell'App verranno gestite da Context e Provider interno e poi salvate nel dispositivo che si sta utilizzando.

<hr>

### Error Handling

Visti gli innumerevoli Components che compongono l'App, sia Client che Server, ho deciso di far gestire gli eventuali errori a Redux, altro campo nel quale si é dimostrato inaspettatamente brillante nonostante l'integrazione con NExt.js non ancora completata. Se avviene un errore in un qualsiasi Component, sia una richiesta dati fallita a causa dell'assenza di richieste gratuite, oppure una disconnessione dalla rete, o una richiesta di dati fallita ai server dell'Unione Europea, tutti verranno indirizzati a Redux che attiverà la segnalazione dell'errore con relativo Modal con descrizione.

<hr>

### Wonderful Draws and Animations

Un campo ulterione nel quale mi sono particolarmente applicato per questo progetto é stato la creazione di SVG personalizzate con relative animazioni e utilizzo di gradienti di colore inseriti come elements HTML gestiti da React.js. Capire più a fondo tutti i vari elements che compongono o possono interfacciarsi con gli elements svg trattati come Components invece che come semplici immagini ha cambiato molte prospettive e mi ha dato la possibilità di raggiungere un livello di dettagli davvero gradevole alla vista, come per esempio il fiore nella pagina principale creato da degli elements svg semplici, colorato con dei gradients provenienti da delle definizioni defs e animato tramite Anime.js.

<hr>

### Menu Animation

Un dettaglio al quale ho dedicato particolare energie é stata la creazione di un menu rotante che desse la possibilità di avere un animazione circolare e senza un limite in ambedue i sensi, creando così un esempio di circular infinite scroll, per quanto leggermente limitato al passaggio da una ricetta per volta non permettendo una rotazione libera ad alta velocità. Chiaramente come ogni esempio del genere che coninvolge un "infinite", si tratta di un'illusione permessa da una costruzione accurata. Tramite lo studio della documentazione e l'utilizzo della libreria Framer-Motion e di molti dei Custom Hooks presenti ho potuto creare un'animazione che permettesse una rotazione attorno all'asse di un element circolare comandato un altro element invisibile, esteso alla zona di pressione più probabile dell'utente, che trasmette la propria velocità al primo determinando anche la direzione verso quale ruotare.
Spero che quest'esempio possa essere utile anche ad altri che preferiscono qualcosa di più leggero di una libreria basata su elementi canvas, che nella maggior parte dei casi necessitano di uno studio più approfondito e dedicato per apprendere le nozioni sufficienti per realizzare effetti visivi del genere.

<hr>
<hr>

## Trace Summary:

Vegetarian recipe website  
Il sito web che creerai è ideato per i vegetariani. Infatti dentro il sito l’utente avrà la possibilità di cercare esclusivamente ricette vegetariane attraverso l’API di spoonacular.

[Spoonacular Docs](https://spoonacular.com/food-api/docs)

Ecco cosa dovrà includere il sito:

- [x] Barra di ricerca che permetta di cercare tutte le ricette vegetariane.
- [x] Ogni ricetta cercata dovrà mostrare almeno titolo e immagine di copertina.
- [x] Cliccare su una ricetta porterà ad una pagina dedicata, dove verranno mostrate ulteriori informazioni.
- [x] UI e UX semplice e facile da usare.
- [x] Struttura dell’app organizzata e comprensibile.
- [x] Design responsive.

Bonus: Utilizza queste tecnologie
Anche se il sito web che creerai non è complesso, sarebbe meglio utilizzare alcune delle tecnologie che hai studiato- .

- [x] React Router --> Sostituito necessariamente con Rounting di Next.js (type App Routing)
- [x] Axios
- [x] React Hooks
- [x] Redux
- [x] Context

<hr>
<hr>

## Additional Features:

- Struttura Rounting Next.js basata su App Route come da più recente implementazione
- Feature - Stagionalità in base a costo prodotti ortofrutticoli
- Struttura backend (Server Actions) per utilizzo dati per individuazione stagionalità economica prodotti
- Struttura backend (Server Actions) per traduzione ricette
- Struttura backend (Server Actions) per request iniziale a Spoonacular API per lista suggerimenti per limitare requests successive

<hr>
<hr>

## To-Do:

- [ ] Pulizia codice da commmenti
- [x] Refactor e miglioramento posizionamento menù iniziale
- [x] Test iPhone 14
- [x] Test iPhone 13
- [x] Test iPhone 7
- [x] Test iPad Air

<hr>
<hr>

## Resources

- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/)
- [Spoonacular API Documentation](https://spoonacular.com/food-api)
- [EU Agri-Food Markets API Documentation](https://agridata.ec.europa.eu/)
- [DeepL API Documentation](https://www.deepl.com/it/)
- [i18Next Documentation](https://www.i18next.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Anime.js Documentation](https://animejs.com/documentation/)
- [Axios.js Documentation](https://axios-http.com/)
- [MDN](https://developer.mozilla.org/en-US/docs/Web)

<hr>
<hr>

## Usage

### Main Page &#8962;

&#8962;

### Search Page &#128269;

&#128269;

### Single Recipe Page &#127869;

&#127869;

### Tomato Settings

&#128100;

<hr>
<hr>

## Demo

Link

<br>
<p><a href="#begin">&#9650; Back to summary</a></p>

<hr>
<hr>

## License

Distributed under MIT License.

<br>
<p><a href="#begin">&#9650; Back to summary</a></p>

<hr>
<hr>

## Contacts

Alex<br>
[GitHub](http://https://github.com/Icarus1989)<br>
[Linkedin](https://www.linkedin.com/in/alex-valente-018586156/)<br>
[Instagram](http://https://www.instagram.com/alex._.1989/)<br>

<br>
<p><a href="#begin">&#9650; Back to summary</a></p>

<hr>
<hr>
