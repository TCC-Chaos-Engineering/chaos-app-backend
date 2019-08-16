const mongoose = require('mongoose');
const Product = mongoose.model('Product');

module.exports = {

    //Listagem de produtos
    async index(req, res) {
        const { page = 1 } = req.query;
        const products = await Product.paginate({}, { page, limit: 10 });
        return res.json(products);
    },

    //Consulta de produtos
    async show(req, res) {
        const product = await Product.findById(req.params.id);
        return res.json(product);
    },

    //Criação de produtos
    async store(req, res) {
        const product = await Product.create(req.body);
        return res.json(product);
    },

    //Edição de produtos
    async update(req, res) {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // { new: true } Serve para o mongoose trazer o produto atualizado para a constante 'produtos'.
        // Se o { new:true } não for definido, o mongoose vai trazer para a constante o produto antes de ser atualizado.
        return res.json(product);
    },

    async destroy(req, res) {
        await Product.findByIdAndRemove(req.params.id);
        return res.send();
    }

};