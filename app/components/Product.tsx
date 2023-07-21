import { AddCartType } from "@/types/AddCartType";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";
import Link from "next/link";

export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: AddCartType) {
  const { features } = metadata;
  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, id, description, features },
      }}
    >
      <div className="text-gray-700">
        <Image
          src={image}
          alt={name}
          width={800}
          height={800}
          className="w-full h-80 object-cover rounded-lg"
        ></Image>
        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-gray-500">
            {unit_amount && formatPrice(unit_amount)}
          </h2>
        </div>
      </div>
    </Link>
  );
}
