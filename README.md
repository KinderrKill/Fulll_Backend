# Fulll - Test technique: Backend

## Introduction

Bonjour à vous lecteur de ce repository, si vous n'êtes pas un employé de l'entreprise Fulll, une explication s'impose.

Il s'agit là d'un test technique reprenant un énoncé dicté par Fulll sur la création d'une application qui permet d'enregistrer des véhicules à des parcs automobiles.

## Énoncé

Le contenu de l'énoncé et les objectifs à réalisés resteront privés.

## Méthodologie

Il était important de structurer sur papier ses entités et les commandes avant de se lancer dans l'élaboration du pattern DDD.

Voici un exemple de liaison d'une entité avec la BDD
(BDD inexistante pour cet exercice donc les données sont enregistrées en mémoire)

- Réalisation dans `src/infra/interface' d'une interface de repository propre à notre entité.
  Vu que les informations étaient très sommaires, je me suis permis de faire une interface générique.

```typescript
export interface FleetRepository {
  findById(id: string): FleetData | null;
  findAll(): FleetData[];
  save(fleet: FleetData): void;
  deleteById(id: string): void;
}
```

- Réalisation dans `src/infra/` de l'implémentation de ce repository afin de la 'lier' à la BDD, ici fictibe.

```typescript
export class FleetRepositoryImpl implements FleetRepository {
  private inMemoryFleets: FleetData[] = [];

  findById(id: string): FleetData | null {
    const fleet = this.inMemoryFleets.find((f) => f.getId() === id);
    return fleet ? fleet : null;
  }

  findAll(): FleetData[] {
    return [...this.inMemoryFleets];
  }

  save(fleet: FleetData): void {
    const existingIndex = this.inMemoryFleets.findIndex((f) => f.getId() === fleet.getId());

    if (existingIndex !== -1) {
      this.inMemoryFleets[existingIndex] = fleet;
    } else {
      this.inMemoryFleets.push(fleet);
    }
  }

  deleteById(id: string): void {
    this.inMemoryFleets = this.inMemoryFleets.filter((f) => f.getId() !== id);
  }
}
```

- Réalisation d'un manager liant les actions effectuées (comme dans notre exercice)) notre repository et ainsi ajouter une couche de sécurité sur la validation des actions effectuées.

```typescript
export class FleetManager {
  private repository: FleetRepository;
  private fleets: FleetData[];

  constructor() {
    this.repository = new FleetRepositoryImpl();
    this.fleets = [];
  }

  public onEnable() {
    this.fleets = this.repository.findAll();
  }

  public onDisable() {
    this.fleets.filter((data) => data.isModified()).forEach((data) => this.repository.save(data));
  }
[...]
```

Ici on peux voir deux méthodes `onEnable` et `onDisable`, ce sont des méthodes qui seront appelées au lancement de l'application pour effectuer des actions appropriées.

Voici l'implémentation de ces fonctions dans `index.ts`

```typescript
let fleetManager: FleetManager | undefined;
let vehicleManager: VehicleManager | undefined;

function startApplication() {
  fleetManager = new FleetManager();
  vehicleManager = new VehicleManager();

  fleetManager.onEnable();
  vehicleManager.onEnable();

  // Start the CLI interface
  startCLI();
}

function onExit() {
  fleetManager !== undefined && fleetManager.onDisable();
  vehicleManager !== undefined && vehicleManager.onDisable();
}

startApplication();

process.on('exit', onExit);

export { fleetManager, vehicleManager };
```

Ensuite avec cette méthodologie de base j'ai pu effectuer les différentes actions demandés dans l'énoncées.

Je ne vais pas plus détaillé la méthodologie ici, vous retrouverez dans le code tout le necessaire à la compréhension des liaisons entre les classes.

# CI/CD

Un déploiement automatique de cette application a été réalisé avec la Création d'un `.github/workflows/main.yml` afin de réaliser diverses opérations une fois le code _push_ sur la branche `main' de mon repository.
Une fois le code sur github le workflow fera :

- `npm install` : Afin de récupérer les dépendances requises
- `npm run test' : Pour réaliser les tests unitaires
- `npm run build' : Pour construire l'application.

Nous aurions pu, dans un contexte externe à Github, utiliser par exemple Drone pour effectuer la compilation et les tests de notre application.

Pour le déploiement, nous aurions pu utiliser Docker pour une initialisation de la base de données et l'ensemble de notre application et dépendance si-besoin.

# Problématique rencontrée

## Mineur : Les scénarios ne concordaient plus avec mon code

J'ai construit mon code autour des scénarios, mais au fur et à mesure de l'avancée de celui-ci et de l'ajout des `throw nes Error (...)` j'ai rencontré quelques problèmes sur des étapes.
Je me suis donc permis de modifier quelques scénarios afin de correspondre au mieux à ma logique de code et gestion d'erreurs.
