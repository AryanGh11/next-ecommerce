import { authOptions } from "@/pages/api/auth/[...nextauth]";
import formatPrice from "@/util/PriceFormat";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import Image from "next/image";

export const revalidate = 0;

const fetchOrders = async () => {
  const prisma = new PrismaClient();
  const user = await getServerSession(authOptions);
  if (!user) {
    return null;
  }
  const orders = await prisma.order.findMany({
    where: { userId: user.user?.id },
    include: { products: true },
  });
  return orders;
};

export default async function Dashboard() {
  const orders = await fetchOrders();
  if (orders === null) {
    return <div>You need to be logged in to view your orders</div>;
  }
  if (orders.length === 0) {
    return (
      <div>
        <h1>No orders!</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="font-medium">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg p-8 my-12 bg-red-400 text-white"
          >
            <h2>Order reference: {order.id}</h2>
            <p>{`Time: ` + new Date(order.createdDate)}</p>
            <p className="font-medium py-2">
              Status:{" "}
              <span
                className={`${
                  order.status === "complete"
                    ? "bg-green-600"
                    : order.status === "pending"
                    ? "bg-yellow-400"
                    : "bg-red-500"
                } py-1 rounded-md px-2 mx-2 text-sm text-white`}
              >
                {order.status}
              </span>
            </p>
            <p className="font-medium">Total: {formatPrice(order.amount)}</p>
            <div className="flex gap-8">
              {order.products.map((product) => (
                <div className="py-2" key={product.id}>
                  <h2 className="py-2">{product.name}</h2>
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.image!}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="w-12 h-12 object-cover rounded-xl"
                    />
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
