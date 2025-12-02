import { ICategory } from "@/interface/categories.interface";
import { getCategories } from "@/services/categories";
import CategorySlider from "./CategorySlider";
import Title from "../shared/title";
import { Separator } from "@/components/ui/separator"

export default async function CategoriesSection() {
  const { data: categories }: { data: ICategory[] } = await getCategories();
  return (
    <section className="py-10 px-20">
      <div className="container mx-auto">
        <Title tittle="Categories" subTittle="Browse By Category" />
        <CategorySlider categories={categories} />
        <Separator />
      </div>
    </section>
  );
}
