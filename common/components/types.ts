export type ListItem<Id, Extra> = {
  index: number;
  id: Id;
  title?: string;
  subtitle?: string;
  extra?: Extra;
};

export type SectionListSection<Item> = {
  title: string;
  data: Item[];
};
