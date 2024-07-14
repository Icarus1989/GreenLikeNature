# Green Like Nature - Vegetarian Recipe App

Questa é una Web App creata per il completamento del Corso React.js di Start2Impact.

## Progetto:

React.js / Food

## Descrizione

### Intro - Green Like Nature

Quest'App é stata creata sfruttando al massimo le conoscenze apprese attraverso il Corso di React.js di Start2Impact e, partendo da queste, imparando anche ad utilizzare il framework Next.js, che amplia le possibilità fornite da React.js soprattutto dopo la recente aggiunta dei Server Components, che l'ecosistema Next.js integra permettendo di effettuare delle richieste da Server in modo molto elegante e relativamente semplice. Capita questa struttura ho potuto dare vita a ciò che avevo immaginato: una Web App di ricette vegane come richiesto che permettesse di ottenere delle indicazioni utili alla quotidianità delle persone.

L'idea originale era ottenere dei risultati basati sulla stagionalità annuale dei vari prodotti ma, viste le differenti aree climatiche del pianeta e a causa di molti altri fattori, non sono ancora state realizzate delle API o resi disponibili dei dati, affidabili o meno, da nessun Paese o società.

Quindi ho deciso di fornire indicazioni basandomi sull'effettivo prezzo dei prodotti, una sorta di segnalazione di convenienza di un prodotto ortofrutticolo basato su una raccolta dati fornita dai produttori europei negli anni precedenti: una sorta di "stagionalità economica".

### Dati combinati Spoonacular + EU Agrifood

Osservando, analizzando e utilizzando i dati forniti dall'Unione Europea (link Agrifood), accessibili solo attraverso delle richieste autenticate da Server, ho potuto ricavare i prezzi di ogni settimana per ogni prodotto ortofrutticolo coltivato nell'Unione negli scorsi due anni e fornire così indicazioni su quali prodotti acquistare con relativa varietà. Nello specifico: se un prodotto ha avuto il suo prezzo più basso nella settimana corrispondente di uno degli scorsi due anni, verrà indicato come suggerimento nella pagina di Ricerca con relativa varietà e, grazie ai dati di Spoonacular, verrano suggerite delle ricette contenenti tale prodotto. Per quanto con qualche piccolo errore, dovuto anche alla parzialità dei dati di qualche prodotto, confrontando tali suggerimenti con i reali prezzi in due negozi di ortofrutta negli scorsi mesi, ho potuto effettivamente osservare la correttezza delle indicazioni ottenute.
Putroppo i dati degli anni precedenti al 2022 non erano utilizzabili in quando molto lacunosi, parziali o totalmente assenti in alcuni casi, rendendo però possibile un miglioramento futuro dell'App con il progredire dell'acquisizione dati e la loro disponibilità. Utilizzando questi dati si ricalcano comunque gli andamenti stagionali dei prodotti, visto che, in linea generale, quando un prodotto é di stagione il suo prezzo diminuisce.

### Internationalization

In aggiunta ho voluto rendere accessibile l'App ad un pubblico più amplio, così ho integrato la traduzione in 6 lingue diverse: menu e indicazioni tramite internationalization del Routing con i18n mentre i testi ricavati dai dati di Spoonacular tradotti invece tramite l'API di DeepL.

### Gestione dei limiti delle API gratuite

Per sfruttare al meglio i dati forniti gratuitamente dal Sponacular, l'App effettua una richiesta per 80 ricette con una prima API Key, che fungeranno da suggeriementi utilizzabili senza effettuare ulteriori richieste con relativo consumo di dati disponibili quotidianamente evitato. Per le ricerche di altre ricette, le richieste utilizzeranno una seconda API Key.
Combinando le due in questo modo credo di aver prolungato la possibilità di utilizzo quotidiano da parte del maggior numeno possibile di utenti. Per gestire un quantitativo di dati importante come quello di 80 ricette con dettagli, ho utilizzato Redux. Questo si é dimostrato molto più veloce e fluido nella gestione di una mole notevole di dati rispetto all'utilizzo di una struttura di Context e Provider creata da zero, anche se, come indicato nella documentazione, l'integrazione e l'ottimizzazione di Redux con Next.js non é ancora completa.

La tecnica della doppia API Key utilizzata sopra permette all'App di avere traduzioni per un maggior numero ricette tramite l'API di DeepL, utilizzando una chiave per ottenere le traduzioni delle ricette già presenti nei suggeriementi e un'altra per quelle non presenti.

### Attenzione alle allergie degli utenti

Creare un App di ricette senza la possibilità di escludere intolleranze e allergeni sarebbe stato rischioso visto che in tutto e per tutto l'App è disponibile per chiunque online, quindi ho ritenuto necessario integrare anche questa funzionalità permettendo alle persone di indicare cosa escludere, passando poi tali indicazioni per un filtro per escludere eventualmente alcune delle ricette suggerite e nell'url delle ricerche per Spoonacular in modo da ottenere dei nuovi dati privi di ricette contenti alimenti potenzialmente dannosi, sia che provengano da un'intolleranza o da un'allergia.

### Data percistence

Concentrandomi sulla possibilità di utilizzare l'App anche senza la disponibilità di richieste verso l'API di Spoonacular, ho voluto inserire la possibilità di salvare un massimo di 8 ricette e le impostazioni correnti, come per esempio le intolleranze segnalate, nel LocalStorage interno, tramite l'apposita API. Tutte le impostazioni cambiate nelle varie parti dell'App verranno gestite da Context e Provider interno e poi salvate nel dispositivo che si sta utilizzando.

### Error Handling

Visti gli innumerevoli Components che compongono l'App, sia Client che Server, ho deciso di far gestire gli eventuali errori a Redux, altro campo nel quale si é dimostrato inaspettatamente brillante nonostante l'integrazione con NExt.js non ancora completata. Se avviene un errore in un qualsiasi Component, sia una richiesta dati fallita a causa dell'assenza di richieste gratuite, oppure una disconnessione dalla rete, o una richiesta di dati fallita ai server dell'Unione Europea, tutti verranno indirizzati a Redux che attiverà la segnalazione dell'errore con relativo Modal con descrizione.

### Wonderful Draws and Animations

Un campo ulterione nel quale mi sono particolarmente applicato per questo progetto é stato la creazione di SVG personalizzate con relative animazioni e utilizzo di gradienti di colore inseriti come elements HTML gestiti da React.js. Capire più a fondo tutti i vari elements che compongono o possono interfacciarsi con gli elements svg trattati come Components invece che come semplici immagini ha cambiato molte prospettive e mi ha dato la possibilità di raggiungere un livello di dettagli davvero gradevole alla vista, come per esempio il fiore nella pagina principale creato da degli elements svg semplici, colorato con dei gradients provenienti da delle definizioni defs e animato tramite Anime.js.

### Menu Animation

Un dettaglio al quale ho dedicato particolare energie é stata la creazione di un menu rotante che desse la possibilità di avere un animazione circolare e senza un limite in ambedue i sensi, creando così un esempio di circular infinite scroll, per quanto leggermente limitato al passaggio da una ricetta per volta non permettendo una rotazione libera ad alta velocità. Chiaramente come ogni esempio del genere che coninvolge un "infinite", si tratta di un'illusione permessa da una costruzione accurata. Tramite lo studio della documentazione e l'utilizzo della libreria Framer-Motion e di molti dei Custom Hooks presenti ho potuto creare un'animazione che permettesse una rotazione attorno all'asse di un element circolare comandato un altro element invisibile, esteso alla zona di pressione più probabile dell'utente, che trasmette la propria velocità al primo determinando anche la direzione verso quale ruotare.
Spero che quest'esempio possa essere utile anche ad altri che preferiscono qualcosa di più leggero di una libreria basata su elementi canvas, che nella maggior parte dei casi necessitano di uno studio più approfondito e dedicato per apprendere le nozioni sufficienti per realizzare effetti visivi del genere.

## Build with:

Logica, struttura, routing e styling:

• HTML
• CSS
• JavaScript
• React.js
• Next.js

Dati da API:

• Spoonacular Food API
• EU Agrifood API

Traduzioni:

• i18Next - Menu e indicazioni
• DeepL Free API - Traduzione ricette

Salvataggio:

• LocalStorage - solo accesso per salvataggio ricette, nessun dato personale utilizzato

Animazioni:

• Framer-Motion (Elements)
• Anime.js (SVG paths)

Icone ed immagini:

• React-Icons package
• Boxy-svg - immagini personalizzate

### Traccia fornita:

Vegetarian recipe website  
Il sito web che creerai è ideato per i vegetariani. Infatti dentro il sito l’utente avrà la possibilità di cercare esclusivamente ricette vegetariane attraverso l’API di spoonacular.

(API: https://spoonacular.com/food-api/docs )[Link]

Ecco cosa dovrà includere il sito:

[x] Barra di ricerca che permetta di cercare tutte le ricette vegetariane.
[x] Ogni ricetta cercata dovrà mostrare almeno titolo e immagine di copertina.
[x] Cliccare su una ricetta porterà ad una pagina dedicata, dove verranno mostrate ulteriori informazioni.
[x] UI e UX semplice e facile da usare.
[x] Struttura dell’app organizzata e comprensibile.
[x] Design responsive.

Bonus: Utilizza queste tecnologie
Anche se il sito web che creerai non è complesso, sarebbe meglio utilizzare alcune delle tecnologie che hai studiato.

[x] React Router --> Sostituito necessariamente con Rounting di Next.js (type App routing)
[x] Axios
[x] React Hooks
[x] Redux
[x] Context

### Aggiunto inoltre:

[x] Struttura Rounting Next.js basata su App Route come da più recente implementazione
[x] Feature - Stagionalità in base a costo prodotti ortofrutticoli
[x] Struttura backend (Server Actions) per utilizzo dati per individuazione stagionalità economica prodotti
[x] Struttura backend (Server Actions) per traduzione ricette
[x] Struttura backend (Server Actions) per request iniziale a Spoonacular API per lista suggerimenti per limitare requests successive

### Da aggiungere:

### to Do:

[ ] Pulizia codice da commmenti
[x] Refactor e miglioramento posizionamento menù iniziale
[x] Test iPhone 14
[x] Test iPhone 13
[x] Test iPhone 7
[x] Test iPad Air
