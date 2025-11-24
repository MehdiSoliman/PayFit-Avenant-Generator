# 📄 PayFit Avenant Generator

> Générateur d'avenants au contrat de travail CDI conforme au droit français

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/MehdiSoliman/PayFit-Avenant-Generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB.svg)](https://reactjs.org/)

## ✨ Fonctionnalités

- 📝 **Interface intuitive** - Formulaire en deux étapes pour saisir les informations
- 🔄 **Aperçu en temps réel** - Visualisation instantanée du document généré
- 📤 **Export DOCX** - Génération de documents Word professionnels et éditables
- 🎨 **Templates dynamiques** - Textes adaptés selon le type de modification
- ⚖️ **Conformité légale** - Respect du Code du Travail français

## 🚀 Types d'avenants supportés

- Modification de la rémunération
- Changement de poste / Promotion
- Modification du temps de travail
- Modification du lieu de travail
- Autres modifications personnalisées

## 🛠 Technologies utilisées

- **Frontend** : React 18 + Vite
- **Styling** : Tailwind CSS avec police SF Pro Display
- **Icons** : Lucide React
- **Document Generation** : docx library
- **Build** : Vite avec support ESM

## 📦 Installation

### Prérequis

- Node.js 18+
- npm ou yarn

### Étapes d'installation

1. Clonez le repository :
```bash
git clone https://github.com/MehdiSoliman/PayFit-Avenant-Generator.git
cd PayFit-Avenant-Generator
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez votre navigateur à l'adresse affichée (généralement http://localhost:5174)

## 🔧 Scripts disponibles

```bash
npm run dev      # Démarrer le serveur de développement
npm run build    # Construire pour la production
npm run preview  # Prévisualiser le build de production
```

## 🌐 Déploiement

### Netlify (recommandé)

Le projet est configuré pour Netlify avec `netlify.toml` :

1. **Configuration automatique** :
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Headers MIME corrects pour les modules ES6
   - Redirections SPA pour React Router

2. **Déploiement automatique** :
   - Connectez votre repository GitHub
   - Netlify utilise automatiquement `netlify.toml`
   - Pas de configuration manuelle nécessaire

### Autres plateformes

Le projet génère des fichiers statiques et peut être déployé sur :
- Vercel
- GitHub Pages
- Surge.sh
- Firebase Hosting

## 📁 Structure du projet

```
src/
├── App.jsx                 # Composant principal avec logique UI
├── amendmentTemplates.js   # Templates de texte pour chaque type d'avenant
├── docxGenerator.js        # Génération des documents DOCX
├── index.css              # Styles globaux avec SF Pro Display
└── main.jsx               # Point d'entrée React

public/
├── _redirects             # Configuration SPA routing pour Netlify
└── _headers               # Headers de sécurité HTTP

netlify.toml               # Configuration principale Netlify
```

## 🎨 Personnalisation

### Modifier les templates de texte

Editez `src/amendmentTemplates.js` pour personnaliser les textes légaux selon vos besoins.

### Changer le style

Le projet utilise Tailwind CSS. Modifiez `tailwind.config.js` pour personnaliser les couleurs et styles.

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commitez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 💡 Support

Si vous avez des questions ou rencontrez des problèmes :

- 🐛 [Signaler un bug](https://github.com/MehdiSoliman/PayFit-Avenant-Generator/issues)
- 💬 [Poser une question](https://github.com/MehdiSoliman/PayFit-Avenant-Generator/discussions)

---

⚠️ **Disclaimer** : Cet outil génère des documents à titre informatif. Consultez toujours un professionnel du droit du travail pour valider vos documents contractuels.