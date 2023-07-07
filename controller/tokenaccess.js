const { default: slugify } = require("slugify");
const redCap = require("../models/redcap");

module.exports = {

    async addToken(req, res) {
        const { id } = req.user;
        const { token } = req.body;
        try {
            const tokenObj = {
                redcaptoken: token, createdBy: id
            }
            const red_cap = await redCap.create(tokenObj)
            if (red_cap) {
                res.status(200).send({ red_cap })
            } else {
                res.status(400).send({ message: 'Something Went Wrong' })
            }
        }
        catch (error) {
            res.status(500).send(error)
        }
    },

    async getCategories(req, res) {
        try {
            const categories = await Category.find({})
            if (categories) {
                const categoryList = await createCategories(categories);
                res.status(200).send({ categoryList })
            } else {
                res.status(400).send({ message: 'No Record Found' })
            }
        } catch (error) {
            res.status(500).send(error)
        }
    },

    async deleteCategories(req, res) {
        const { ids } = req.body;
        const { id } = req.user;

        const deletedCategories = [];
        for (let i = 0; i < ids.length; i++) {

            const deleteCategory = await Category.findOneAndDelete({
                _id: ids[i],
                createdBy: id,
            });
            deletedCategories.push(deleteCategory);
        }

        if (deletedCategories.length == ids.length) {
            res.status(201).send({ message: "Categories removed" });
        } else {
            res.status(400).send({ message: "Something went wrong" });
        }
    },

}
