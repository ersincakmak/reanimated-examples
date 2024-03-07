export type LisItemType = {
  title: string;
  category: string;
  price: string;
  icon: string;
};

export type SectionItem = {
  title: string;
  data: LisItemType[];
};
