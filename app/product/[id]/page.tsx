import Image from "next/image";
import { SearchParamTypes } from "@/types/SearchParamTypes";
import formatPrice from "@/util/PriceFormat";
import AddCart from "./AddCart";

export default async function Products({ searchParams }: SearchParamTypes) {
  return (
    <div className="flex flex-col lg:flex-row w-full font-medium justify-center items-center">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={600}
        height={600}
        className="w-1/2 h-full rounded-lg object-cover"
        priority={true}
      />
      <h1 className="text-2xl pt-4 pb-2">{searchParams.name}</h1>
      <p className="py-2">{searchParams.description}</p>
      <p className="py-2">{searchParams.features}</p>
      <div className="flex gap-2">
        <p className="font-bold text-primary">
          {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
        </p>
      </div>
      <AddCart {...searchParams} />
    </div>
  );
}
