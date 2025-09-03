# Hello World + RuleBasedHello (Sepolia)

## Objectif
Ce dépôt montre :
- un contrat simple **HelloWorld** (lecture/écriture d’un message),
- un contrat **RuleBasedHello** qui impose **3 règles** pour modifier le message :
  1) **Qui** : seul l’**admin** (déployeur) peut changer le message,
  2) **Combien** : l’appel doit envoyer **≥ 0.0001 ETH**,
  3) **Quand** : l’appel ne réussit que si `block.timestamp` est **pair**.

Les deux contrats sont **déployés sur Sepolia** et **vérifiés sur Etherscan**.

---

## Prérequis
- Node.js >= 20
- MetaMask (réseau **Sepolia** activé)
- Un endpoint Sepolia (Alchemy/QuickNode)
- 0.05–0.1 SepETH sur le compte de test

---

## Variables d’environnement
Créez un fichier **`.env`** (voir `.env.example`) :

