// const Product = require("../controller/product");
// const shortid = required("shortid");
// const slugify = require("slugify");

// exports.createProduct = (req, res) => {
//   res.status(200).json({ file: req.file, body: req.body });

//   const { name, price, description, productPicture, category, createdBy } =
//     req.body;

//   if(req.file.lent)
//   const product = new Product({
//     name: name,
//     slug: slugify(name),
//     price,
//     description,
//     productPicrure,
//     catgeory,
//     createBy: req.user,
//   });

//   product.save().exec((error, product) => {

//     if(error) return res.status(400).json({error});
//     if(product){
//       res.status(201).json({product});
//      }

//   }
// };
