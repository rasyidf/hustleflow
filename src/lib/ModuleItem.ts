interface ModuleMetadata {
  timeWeight?: number;  // Represents estimated time investment (1-10)
  complexityWeight?: number;  // Represents implementation complexity (1-10)
  estimatedHours?: number;  // Concrete hour estimation
}

export class ModuleItem {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  dependencies: string[];
  category: "module" | "service";
  subcomponents: string[];
  metadata: ModuleMetadata;

  constructor(
    id: string, 
    name: string, 
    description: string, 
    basePrice: number, 
    category: "module" | "service", 
    dependencies: Array<ModuleItem["id"]> = [],
    subcomponents: Array<ModuleItem["id"]> = [],
    metadata: ModuleMetadata = {}
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.basePrice = basePrice;
    this.category = category;
    this.dependencies = dependencies;
    this.subcomponents = subcomponents;
    this.metadata = {
      timeWeight: metadata.timeWeight ?? 1,
      complexityWeight: metadata.complexityWeight ?? 1,
      estimatedHours: metadata.estimatedHours
    };
  }

  getTotalWeight(): number {
    return (this.metadata.timeWeight ?? 1) * (this.metadata.complexityWeight ?? 1);
  }

  getAdjustedPrice(): number {
    return this.basePrice * this.getTotalWeight();
  }

  calculatePriceFromSubcomponents(allItems: ModuleItem[]): number {
    if (this.subcomponents.length === 0) {
      return this.getAdjustedPrice();
    }

    const subcomponentTotal = this.subcomponents
      .map(id => allItems.find(item => item.id === id))
      .filter(item => item !== undefined)
      .reduce((sum, item) => sum + (item?.getAdjustedPrice() ?? 0), 0);

    return Math.max(this.getAdjustedPrice(), subcomponentTotal);
  }
}
