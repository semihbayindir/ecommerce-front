import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method, query } = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (query?.id) {
      const product = await Product.findOne({ _id: query.id });

      if (!product) {
        return res.status(404).json({ message: "Ürün bulunamadı" });
      }

      return res.json(product);
    }
  }

  // Diğer HTTP yöntemlerini buraya ekleyebilirsiniz.
}
