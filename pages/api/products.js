import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const {method, query} = req;
    await mongooseConnect();
  const {categories, sort, phrase, ...filters} = req.query;
  let [sortField, sortOrder] = (sort || '_id-desc').split('-');

  const productsQuery = {};
  if (categories) {
    productsQuery.category = categories.split(',');
  }
  if (phrase) {
    productsQuery['$or'] = [
      {title:{$regex:phrase,$options:'i'}},
      {description:{$regex:phrase,$options:'i'}},
    ];
  }
  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach(filterName => {
      productsQuery['properties.'+filterName] = filters[filterName];
    });
  }
  console.log(productsQuery);
  res.json(await Product.find(
    productsQuery,
    null,
    {
      sort:{[sortField]:sortOrder==='asc' ? 1 : -1}
    })
  );

    if (method === 'GET') {
      if (query?.id) {
        res.json(await Product.findOne({ _id: query.id }));
      } else {
        const limit = query?.limit && parseInt(query.limit) > 0 ? parseInt(query.limit) : undefined;
        let productsQuery = Product.find();
  
        if (limit) {
          productsQuery = productsQuery.limit(limit).sort({ _id: -1 });
        }
  
        res.json(await productsQuery);
      }
    }
    if (method === 'POST') {
      const {title, description, price, images, modelURL,modelFileName ,category,} = req.body;
      const productDoc = await Product.create({
        title,description,price,images,modelURL,modelFileName,category,
      })
        res.json(productDoc);
    }
    if (method === 'PUT') {
      const {title,description,price,images,_id,modelURL,modelFileName,category} = req.body;
      await Product.updateOne({_id}, {title,description,price,images,modelURL,modelFileName,category});
      res.json(true);
  }
    if (method === 'DELETE') {
      if (req.query?.id) {
        await Product.deleteOne({_id:req.query?.id});
        res.json(true);
      }
    }
}
    