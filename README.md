# document.getElementByStyle

`document.getElementByStyle` est une fonction JavaScript personnalisée qui permet de rechercher dans le DOM tous les éléments dont les styles CSS correspondent aux déclarations spécifiées.  
Elle renvoie un tableau contenant les éléments correspondants.

## ✨ Fonctionnalités

- Rechercher des éléments par une ou plusieurs déclarations CSS.
- Comparaison basée sur les styles calculés (`getComputedStyle`).
- Retourne un tableau des éléments trouvés.
- Fonctionne sur tout le document ou sur un élément parent spécifique.

---

## 📦 Installation

Aucune installation particulière n'est requise.  
Il suffit d'inclure la fonction dans votre projet JavaScript.

```html
<script src="getElementByStyle.js"></script>
```

## Utilisations

```js
document.getElementByStyle(styles);
const redElements = document.getElementByStyle("color:rgb(255, 0, 0;");
console.log(redElements);
// éléments dont la couleur calculée correspond au rouge

  const divs = document.getElementByStyle(
    "border-top-color:rgb(255, 0, 0);height:150px"
  );
  console.log(divs);
```

## Limitations

- Seules les couleurs en notation rgb sont supportés\*
- Pour les propriétés height et width ,doit prendre en compte le box-sizing et tenir compte des padding et margin par défaut que le navigateur ajoute au éléments. Par exemple, une div définit avec height:100px sera rendu avec height:110px par exemple. POur y remédier faire un reset

```css
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
```
