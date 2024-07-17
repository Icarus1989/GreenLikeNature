<hr>
<hr>

<div align="center">
<h1><i>Green Like Nature - Vegetarian Recipe App</i></h1>
</div>

**Questa é una Web App creata come progetto per il completamento del Corso _React.js_ di _Start2Impact_**.

## Progetto:

<div align="center">
  <h2>React.js / Food</h2>
	<code><img width="100" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/></code>
</div>

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
          <li><a href="#combined-data-spoonacular-+-eu-agrifood">Combined Data</a></li>
          <li><a href="#routing">Routing</a></li>
          <li><a href="#api-limits-and-/saved-route">API Limits and /saved Route</a></li>
          <li><a href="#internationalization">Internationalization</a></li>
          <li><a href="#allergies-and-intolerances">Allergies and intolerances</a></li>
          <li><a href="#data-percistence">Data percistence</a></li>
          <li><a href="#loading-state">Loading State</a></li>
          <li><a href="#error-handling">Error Handling</a></li>
          <li><a href="#wonderful-draws-and-animations">Wonderful Draws and Animations</a></li>
          <li><a href="#menu-animation">Menu Animation</a></li>
          <li><a href="#responsive-design">Responsive Design</a></li>
          <li><a href="#navigationevents">NavigationEvents</a></li>
          <li><a href="#host">Host</a></li>
          <li><a href="#conclusions">Conclusions</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#trace-summary">Trace Summary</a>
    <li><a href="#additional-features">Additional Features</a>
    <li><a href="#to-do">To-Do</a>
    <li><a href="#resources">Resources</a>
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
- [EU Agrifood API](https://agridata.ec.europa.eu/extensions/DataPortal/API_Documentation.html)

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

<hr>
<hr>

## Description

<div align="center">
  <img src="https://i.ibb.co/MVXWhkc/Untitled-1.png" alt="image-For-Presentation" width="90%" height="90%">
</div>

### Intro - Green Like Nature

Questa é un'App di ricette vegetariane creata sfruttando al massimo le conoscenze apprese attraverso il Corso di **React.js** di Start2Impact. Partendo da queste, combinandole con quelle acquisite nel Corso di **JavaScript** e **Node.js**, e dopo aver imparato ad utilizzare il framework **Next.js**, che amplia le possibilità fornite da React.js soprattutto dopo la recente aggiunta dei Server Components, ho potuto dare vita a ciò che avevo immaginato: una Web App di ricette vegetariane come richiesto che permettesse di ottenere ulteriori indicazioni **utili nella quotidianità** delle persone.

L'idea originale era ottenere dei risultati basati sulla stagionalità annuale dei vari prodotti ma, viste le differenti aree climatiche del pianeta e a causa di molti altri fattori, non sono ancora state realizzate delle API o resi disponibili publicamente dei dati, affidabili o meno, da nessun Paese o società inerenti a questo.

Molti però erano i dati disponibili riguardo al costo dei prodotti ortofrutticoli. Quindi ho deciso di fornire indicazioni basandomi sull'effettivo prezzo dei prodotti, una segnalazione di convenienza di un prodotto ortofrutticolo basato su una raccolta dati fornita dai produttori europei negli anni precedenti: una sorta di "stagionalità economica".

<hr>

### Combined Data Spoonacular + EU Agrifood

Osservando, analizzando e utilizzando i dati forniti dall'[Unione Europea](https://agridata.ec.europa.eu/), accessibili solo attraverso delle richieste autenticate da Server, ho potuto ricavare i prezzi di ogni settimana per ogni varietà di ogni prodotto ortofrutticolo coltivato nell'Unione negli scorsi due anni e fornire così indicazioni su quali prodotti acquistare con relativa varietà. Nello specifico: se un prodotto di una certa varietà ha avuto un calo del prezzo significativo in una stessa settimana di entrambi gli anni precedenti a quello attuale, verrà rilevato.

> [!NOTE]
> Per maggior praticità, a causa di alcuni dati mancanti su determinate sezioni, ho impostato che venissero indicati i prodotti che anche in solo anno avessero avuto un calo significativo, ma sarà facilmente impostabile una maggior precisione al momento della disponibilità di dati più completi con il passaggio al nuovo anno visto che, sempre analizzando i dati, si può osservare che con il passare del tempo vi é una maggiore precisione nell'inserimento dei prezzi e un inserimento e aggiornamento dati settimanale sempre più costante.

Con questi dati ottenuti il prodotto ortofrutticolo verrà indicato come suggerimento durante la stessa settimana dell'anno corrente nella pagina di Ricerca con relativa varietà e, grazie ai dati di Spoonacular, verrano suggerite delle ricette contenenti tale prodotto. Per quanto con qualche piccolo errore, penso sempre dovuto alla parzialità dei dati di qualche prodotto, confrontando tali suggerimenti con i reali prezzi in due negozi di ortofrutta negli scorsi mesi, ho potuto effettivamente osservare la correttezza delle indicazioni ottenute. Non ho confrontato il prezzo effettivo visto che non si può determinare il rincaro del negoziante e i dati ottenuti indicano i prezzi all'ingrosso ma, osservando i prezzi settimanalmente nei negozi, vi é effettivamente una corrispondenza nella segnalazione del calo del prezzo almeno nell'osservazione da gennaio ad ora.
Putroppo i dati degli anni precedenti al 2022 non erano utilizzabili in quando molto lacunosi, parziali o totalmente assenti in alcuni casi per certi prodotti, rendendo però possibile un miglioramento futuro dell'App con il progredire dell'acquisizione dati e la loro disponibilità.

<hr>

### Routing

**Struttura**:

<!-- INSERIRE GRAFICO STRUTTURA CON ROUTES E [LOCALE] - SINGLE RECIPE SAVED E NO -  -->

> [!IMPORTANT]
> Purtroppo non é possibile utilizzare React-Routers per il Routing di un'App creata con Next.js, anche se richiesto nella traccia originale. Sarebbe un integrazione difficile e sostanzialmente inutile, visto che il Routing per Next.js viene creato basandosi sulle directories del progetto all'interno della directory principale "app" ([App Routing Next.js v.14](https://nextjs.org/docs/getting-started/project-structure)) e il Routing integrato permette una serie di ottimizzazioni e personalizzazioni non trascurabili, come l'utilizzo dei Server Components come base per ogni Route e per il Layout generale dell'App. Forzare un altro tipo di routing sarebbe stato controproducente. Nonostante ciò vi sono somiglianze tra le due tipologie di Routing, come l'utilizzo di elementi Link integrati dedicati.

<hr>

### API Limits and /saved Route

Per sfruttare al meglio i dati forniti gratuitamente dal Spoonacular, l'App effettua una richiesta per 80 ricette con una prima API Key, che fungeranno da suggeriementi utilizzabili senza effettuare ulteriori richieste con relativo consumo di dati disponibili quotidianamente evitato. Potrebbe sembrare controproducente, ma una request con 80 ricette con dettagli ha un impatto minore sul numero di punti gratuiti utilizzati dall'API rispetto ad effettuare una request per ogni singola ricetta. Per le ricerche di altre ricette, le richieste utilizzeranno una seconda API Key.
Combinando le due in questo modo credo di aver prolungato la possibilità di utilizzo quotidiano da parte del maggior numeno possibile di utenti, visto che anche in caso di mancanza di suggerimenti disponibili, l'App funziona ugualmente mentre, usando solamente le ricette suggerite, non vi é alcun ulteriore consumo di dati dall'API.

Sempre per limitare le requests al minimo, ho suddiviso la fase di ricerca con text in due: al momento della digitazione, al change, verrà filtrata la lista dei suggerimenti e questi verranno proposti, all'avvio della ricerca premendo il tasto Enter, al submit, solo in questo momento avverrà una request con conseguente consumo dei dati e visualizzazione dei risultati ottenuti.

Per gestire la differenziazione tra ricette già presenti nella memoria e quelle che necessitano di una request per i dati, ho creato all'interno della Route search/id una Route interna /saved. La Route /search/saved/[id] verrà usata nel caso vi fosse l'utilizzo di dati presenti e non effetturà alcuna request a Spoonacular per visualizzare la Single Recipe Page. La Route semplice search/[id] invece farà una normale request e ottenuti i dati mostrerà la Single Recipe Page.
La struttura della Single Recipe Page é la medesima in entrambi i casi, compresa la traduzione.

Per gestire un quantitativo di dati importante come quello di 80 ricette con dettagli, ho utilizzato Redux. Questo si é dimostrato molto più veloce e fluido nella gestione di una mole notevole di dati rispetto all'utilizzo di una struttura di Context e Provider creata da zero, anche se, come indicato nella documentazione, l'integrazione e l'ottimizzazione di Redux con Next.js non é ancora completa.

La tecnica della doppia API Key utilizzata sopra permette all'App di avere traduzioni per un maggior numero ricette tramite l'API di DeepL, utilizzando una key per ottenere le traduzioni delle ricette già presenti nei suggerimenti e un'altra per quelle non presenti.

<hr>

### Internationalization

In aggiunta ho voluto rendere accessibile l'App ad un pubblico più ampio, così ho integrato la traduzione in 6 lingue diverse: menu e indicazioni tramite internationalization del Routing con i18n mentre i testi ricavati dai dati di Spoonacular tradotti invece tramite l'API di DeepL.

<hr>

### Allergies and intolerances

Creare un App di ricette senza la possibilità di escludere intolleranze e allergeni sarebbe stato rischioso visto che in tutto e per tutto l'App è disponibile per chiunque online, quindi ho ritenuto necessario integrare, almeno in modo basilare con quanto disponibile, anche questa funzionalità, permettendo alle persone di indicare cosa escludere passando poi tali indicazioni per un filtro per escludere eventualmente alcune delle ricette suggerite e dalle ricerche successive per Spoonacular, salvando gli allergeni nel context e inserendoli nell'url, sia come ingrediente da escludere con parametro excludeIngredients per le allergie, sia che come intolerances in quello apposito, in modo da ottenere dei nuovi dati privi di ricette contenti alimenti potenzialmente dannosi.

<hr>

### Data percistence

Concentrandomi sulla possibilità di utilizzare l'App anche senza la disponibilità di richieste verso l'API di Spoonacular, ho voluto inserire la possibilità di salvare nel LocalStorage interno un massimo di 8 ricette e le impostazioni correnti, come per esempio le intolleranze segnalate, tramite l'apposita API. Tutte le impostazioni cambiate nelle varie parti dell'App verranno gestite da Context e Provider interno e poi salvate nel dispositivo che si sta utilizzando.

<hr>

### Loading State

Ogni Route ha una schermata di caricamento dedicata e durante la ricerca dalla Searchbar vi é uno spinner che compare per indicare l'effettivo caricamento.

> [!NOTE]
> A volte le schermate di caricamento non compaiono. Dopo vari test e controlli penso che questo avvenga perché la velocità di caricamento delle Route, prerenderizzare e ottimizzate da Next, sia abbastanza alta da essere al tempo invece necessario per il concludersi del rendering della pagina di caricamento.

<hr>

### Error Handling

Visti gli innumerevoli Components che compongono l'App, sia Client che Server, ho deciso di far gestire gli eventuali errori a Redux, altro campo nel quale si é dimostrato inaspettatamente brillante. Se avviene un errore in un qualsiasi Component, sia una richiesta dati fallita a causa dell'assenza di richieste gratuite, oppure una disconnessione dalla rete, o una richiesta di dati fallita ai server dell'Unione Europea, tutti verranno indirizzati a Redux che attiverà la segnalazione dell'errore con relativo Modal con descrizione.

<hr>

### Wonderful Draws and Animations

Un campo ulterione nel quale mi sono particolarmente applicato per questo progetto é stato la creazione di SVG personalizzate con relative animazioni e utilizzo di gradienti di colore inseriti come Components gestiti da React.js. Capire più a fondo tutti i vari elements che compongono o possono interfacciarsi con gli svg trattati come Components invece che come semplici immagini ha cambiato molte prospettive e mi ha dato la possibilità di raggiungere un livello di dettagli davvero gradevole alla vista, come per esempio il fiore che sboccia nella pagina principale creato da degli elements svg semplici, colorato con dei gradients provenienti da delle definizioni defs e animato tramite Anime.js per il morphing del path.

<hr>

### Menu Animation

Un dettaglio al quale ho dedicato particolare attenzione é stata la creazione di un menu rotante che desse la possibilità di avere un animazione circolare e senza un limite in ambedue i sensi, creando così un esempio di circular infinite scroll, per quanto leggermente limitato al passaggio da una ricetta per volta non permettendo una rotazione libera ad alta velocità. Chiaramente come ogni esempio del genere che coninvolge un "infinite", si tratta di un'illusione permessa da una costruzione accurata. Tramite lo studio della documentazione di Framer-Motion e l'utilizzo della libreria e di molti dei Custom Hooks presenti, ho potuto creare un'animazione che permettesse una rotazione attorno all'asse di un element circolare comandato un altro element invisibile, esteso alla zona di pressione più probabile dell'utente, che trasmette la propria velocità al primo determinando così anche la direzione verso quale ruotare.

<hr>

### Responsive Design

Adattare l'App alla varietà più vasta possibile di dispositivi non é stata un'impresa semplice con questo progetto, visto il design e le animazioni che ho scelto di inserire, ma credo di aver trovato soluzioni ottimali per avere un design responsive per la maggior parte dei dispositivi reali più comuni, considerando anche entrambi gli orientamenti del display disponibili.
Questo si basa su CSS, ma per il risultato ottenuto chiaramente é stato necessario anche l'utilizzo della parte di logica dei Components.
Ho cercato di mantere l'intera App con un tema e delle animazioni che richiamassero la natura, non andando ad interferire o ostacolare il funzionamento e l'utilizzo.
Non ho voluto inserire in questo momento una versione utilizzabile per gli Smart Watch, ma sto testando alcune soluzioni per eventuali aggiornamenti futuri.

> [!IMPORTANT]
> A causa della complessità della struttura della Main Page, ho dovuto inserire quello che considero una leggera forzatura: quando in un dispositivo (in genere mobile), avviene un passaggio di orientamento da portrait a landscape e viceversa, avviene un ricaricamento dell'Object window al resize, limitato alla sola route principale e non esteso a Search, Single Recipe o Settings. Questo serve a ridimensionare e riposizionare correttamente di elementi circolari. Purtroppo, nonostante ne abbia provate molte, non ho trovato una soluzione più leggera o meno forzata applicabile. Questo non va comunque a intaccare i dati o eseguire un nuove richieste, in quanto inseriti nella cache.

<hr>

### NavigationEvents

Questo particolare Component agisce tra i cambi di Route / Page.
Come descritto precedentemente, al momento dell'inserimento di un allergene nella Settings Page i suggerimenti vengono filtrati in modo da escludere le ricette contenenti l'allergia o intolleranza inserita; nel momento in cui i suggerimenti calassero in modo eccessivo sarebbe avvenuta una nuova request. Il problema che sopraggiunse fu quello del numero di request eccessive che sarebbero sopraggiunte all'inserimento di due o tre allergeni, andando ad usurare la disponibilità delle request all'API di Spoonacular rapidamente. Effettuando il controllo sul numero di suggerimenti solo all'uscita dalla pagina, attraverso il Component NavigationEvents, ho potuto condensare tutto in unica request, con tutti i conseguenti vantaggi.

Si é rivelato in seguito molto utile anche per limitare il reload della pagina, al cambio di orientamento del display, solo per la Main Page. Questa feature si basa su un EventListener "resize" sull'Object window, quindi limitarne l'utilizzo ad una sola page é stato un allegerimento non indifferente per le prestazioni generali dell'App.

Un altro caso d'uso é stato il controllo delle presenza della connessione di rete al passaggio tra una page ed un'altra con comunicazione a Redux dell'eventuale mancanza di essa e conseguente attivazione del Component di errore ErrorModal.

<hr>

### Host

Ho deciso di utilizzare i servizi di Vercel per publicare l'App, visto l'utilizzo di Next.js. Semplici e veloci da usare, oltre a fornire un url per il progetto molto leggibile, a differenza di altri servizi gratuiti.

<hr>

### Conclusions

Come negli altri, anche in questo progetto ho voluto ampliare la traccia fornita. Mettendomi in difficoltà, sforzandomi di risolvere i problemi che mi si presentavano, estendendo lo studio di React ben oltre quanto richiesto, fino a trovare soluzioni o a capire perché altre non funzionavano. E come in ogni altro progetto, questo mi é servito per migliorare costantemente. Nonostante il tempo impiegato per lo svolgimento del progetto sia stato nettamente maggiore rispetto alla media, alla fine di questo Corso, sono riuscito ad ottenere delle conoscenze dettagliate e vaste, oltre che un risultato molto simile a ciò che avevo immaginato inizialmente.

<hr>
<hr>

## Usage

<!-- Inserire qui immagine con disposotivi responsive -->

### - :house: - :mag: - :bust_in_silhouette: - Navbar

La Navbar, situata nella parte inferiore dello schermo, permette la navigazione verso le tre Route principali: Main, Search e Profile.

### - :house: - Main Page

<div align="center">
  <img src="https://i.ibb.co/PZwfv96/Untitled-2.png" alt="image-iPhone" width="60%" height="60%">
</div>

<br>

La pagina principale si presenta con una barra di ricerca come da richiesta. Inserendo il testo si otterranno dapprima dei suggerimenti filtrati dalla lista iniziale e poi, avviando la ricerca, i risultati ottenuti dall'API di Spoonacular.
Oltre a questa vi é un carousel circolare ruotabile premendo e trascinando verso destra o sinistra la parte circolare, come un drag. Qui vi sono un massimo di 8 ricette selezionabili, scelte tra quelle con ingredienti segnalati come "di stagione". Questa parte é personalizzabile dal Settings, dove si potrà decidere di visualizzare al loro posto le ricette salvate. Nel caso ve ne fossero meno di 8, verranno visualizzati dei suggerimenti in varie lingue per aggiungere le ricette. Una volta scelta la ricetta basta clickare su dettagli per aprire un Modal con le prime informazioni: numero di portate, numero di ingredienti e likes ottenuti dalla ricetta. Clickando sul Modal si verrà reindirizzati alla pagina della Single Recipe.

> [!TIP]
> In entrambe le barre di ricerca, il testo inserito deve essere in inglese

### - :mag: - Search Page

<div align="center">
  <img src="https://i.ibb.co/3mD37ZN/IMG-0266-portrait.png" alt="image-iPhone" width="60%" height="60%">
</div>

<br>

La prima parte della pagina contiene una barra di ricerca molto simile alla Main Page, con la differenza che i risultati vengono mostrati un po' più allargati e vi é una scroll-bar personalizzata con l'animazione di alcune foglie di fragola che crescono ad intervalli regolari, basandosi sulla lunghezza della parte scorrevole della pagina, in modo da indicare più chiaramente la parte nella quale ci si trova. Si può chiudere la parte dei risultati clickando sul tasto a forma di fragola.
La seconda parte della pagina di ricerca sfrutta a pieno i dati resi disponibili dall'Unione Europea: ottenuti tali dati lato server, verranno gestiti in modo da restituire i prodotti ortofrutticoli più convenienti, verranno selezionate delle ricette contenenti tali ingredienti e proposte come sezioni scorrevoli orizzontalmente. Nel caso non fossero presenti ricette con uno o alcuni degli ingredienti suggeriti, queste sezioni verranno sostituite da tasti per la ricerca rapida che reindirizzeranno immediatamente ad una ricerca con l'ingrediente selezionato.
Nella parte inferiore della pagina vi sarà una sezione con le ricette recenti consultate.
Nel caso in cui l'immagine di una ricetta non fosse disponibile per qualsiasi motivo, verrà visualizzata un'immagine di default, sia per i suggerimenti che per i risultati delle ricerche.

### - :fork_and_knife: - Single Recipe Page

<div align="center">
  <img src="https://i.ibb.co/VV26V8m/IMG-0268-portrait.png" alt="image-iPhone" width="60%" height="60%">
</div>

<br>

Ho cercato di creare la pagina della Ricetta Singola come una scheda interattiva che fosse realmente utile da utilizzare per la preparazione della ricetta.
Nella prima parte vi é un'immagine di copertina con titolo, subito sotto dei tasti per tornare rapidamente alla Search Page o Salvare la ricetta tra le preferite. A seguire delle informazioni basilari ma esposte chiaramente con un'indicazione se il piatto proposto é vegetariano o vegano.
Subito sotto una presentazione descrittiva della ricetta.
La parte sottostante ho voluto crearla come una lista spuntabile personalizzata per gli ingredienti, in modo che si possa fare un recap del necessario prima di cominciare.
Proseguendo si incontrano tutti gli steps per eseguire la ricetta: al loro interno vi sono degli elenchi per gli strumenti necessari per eseguire il passaggio, gli ingredienti e una descrizione testuale. Ongi step é spuntabile al completamento.
Commpletando tutti gli ingredienti e gli steps, oppure premendo l'apposito tasto a fine pagina, la ricetta cambierà stato e visualizzazione diventanto Completata. Verrà quindi memorizzato il completamento nel LocalStorage del dispositivo.
Nel caso si volesse rifare la ricetta e azzerare tutti i passaggi e gli ingredienti, basterà premere il tasto di reset situato a fianco del precedente per il completamento.

> [!IMPORTANT]
> Alcune ricette presentano dei dati non disposti nello schema della maggior parte delle altre, per esempio avendo saltuariamente string uniche di testo o markup HTML invece che array andando così ad agire negativamente sulla visualizzazione degli elenchi presenti nella pagina. Dalle varie prove sembrano circa un 5% delle ricette presenti nei dati Spoonacular. Ho provato a gestire questo fatto nel miglior modo possibile, gli errori proposti comunque vengono gestiti e non vanno ad interferire col funzionamento della pagina o dell'App in generale, almeno dalle prove effettuate.

### - :bust_in_silhouette: - Tomato Settings

<div align="center">
  <img src="https://i.ibb.co/Btzf2F8/IMG-0267-portrait.png" alt="image-iPhone" width="60%" height="60%">
</div>

<br>

La Settings page é composta da varie parti utili alla personalizzazione dell'esperienza sull'App.
Vi é la possibilità di:

- cambiare le ricette visualizzare nella Main da quelle stagionali a quelle salvate.

- gestire le ricette salvate per poter eliminare quelle non più desiderate singolarmente o totalmente.

- indicare allergie e delle intolleranze nell'apposita sezione, dove, tramite un input testuale e menu di options contente le intolleranze si potrà segnalare cosa escludere. Nel caso in cui venisse inserita nel campo testuale un'allergia già presente nella lista delle intolleranze, questa verrà salvata correttamente come intolleranza. Queste verrano poi presentate in una lista modificabile. Il campo testuale può essere inserito nella propria lingua, verrà salvato in inglese nel Context e poi ripresentato nella pagina nella lingua selezionata.

- cambiare la lingua dell'App, sia come menù e campi testuali del layout, sia come testi provenienti dai dati Spoonacular.

> [!NOTE]
> Il cambiamento della lingua causa un ricaricamento, vista la modifica della Route.

Ogni sezione della pagina viene presentata con l'animazione di un pomodoro che cresce, che si attiverà in automatico nel caso della prima sezione visibile e nel caso di interazione nelle altre.

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

- [x] README ricontrollare testo da Usage in giù
- [ ] README inserire immagini (poche)
- [ ] Pulizia codice da commmenti
- [ ] Eliminare file e cose non necessarie
- [ ] Aggiungere url Vercel al README.md prima della consegna
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

## Demo

Link

<!-- Inserire Link -->

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
