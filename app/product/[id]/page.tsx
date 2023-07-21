import Image from "next/image";
import { SearchParamTypes } from "@/types/SearchParamTypes";
import formatPrice from "@/util/PriceFormat";
import AddCart from "./AddCart";

export default async function Products({ searchParams }: SearchParamTypes) {
  return (
    <div className="flex-col lg:flex-row items-center justify-between gap-24 text-gray-700">
      <div className="font-medium text-gray-700">
        <Image
          src={searchParams.image}
          alt={searchParams.name}
          width={600}
          height={600}
          className="w-full"
        />
        <h1 className="text-2xl py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-gray-500">
            {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
}
