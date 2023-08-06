import { ProductModel } from '../../models/product';

const productModel = new ProductModel();

describe('Product Model', () => {
  it('should create a product', async () => {
    const result = await productModel.createProduct({
        name: 'Nike Club',
        price: 85,
        category: 'Men Shorts',
        description: 'Pull on these comfy woven shorts and find your flow. They are made with cotton canvas for durable comfort, finished with a heavy wash to add soft texture and a bit of nostalgia to your look. A soft elastic waistband with an external drawcord helps you find the right fit so you can stay comfortable from sun up til sun down.',
      });
    expect(result.name).toEqual('Nike Club');
  });

  it('should update a product', async () => {
    const product = await productModel.getProductById(2);

    const result = await productModel.updateProduct({
        id: product.id,
        name: 'Nike Club',
        price: 85,
        category: 'Men Shorts',
        description: 'Pull on these comfy woven shorts and find your flow. They are made with cotton canvas for durable comfort, finished with a heavy wash to add soft texture and a bit of nostalgia to your look. A soft elastic waistband with an external drawcord helps you find the right fit so you can stay comfortable from sun up til sun down.',
      });
    expect(result.name).toEqual('Nike Club');
  });

  it('should return a list of products', async () => {
    const result = await productModel.getProducts();
    expect(result.length).toEqual(6);
  });

  it('should return the correct product by id', async () => {
    const product = await productModel.getProductById(2);
    expect(product.name).toEqual('Nike Club');
  });

  it('should delete the product', async () => {
    await productModel.deleteProduct(7);
    const productsCurrent = await productModel.getProducts();

    expect(productsCurrent.length).toEqual(5);
  });
});
