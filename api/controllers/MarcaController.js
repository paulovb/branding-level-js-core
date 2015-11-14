/**
 * MarcaController
 *
 * @description :: Server-side logic for managing brands
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function (req, res, next) {

    Brand.findOne({where: {slug: req.param('slug')}}, function (err, brand) {
      if (err) return next(err);
      if (!brand) return next();

      Mention.count({brand: brand.id, type: 'Positivo'}).exec(function countCB(err, positivo){

        Mention.count({brand: brand.id, type: 'Negativo'}).exec(function countCB(err, negativo){

          Mention.count({brand: brand.id, type: 'Neutro'}).exec(function countCB(err, neutro) {

            var indicador = positivo - negativo;

            res.view(
              {
                marca: brand.name,
                positivo: positivo,
                negativo: negativo,
                neutro: neutro,
                indicador: indicador
              }
            );

          });

        });

      });

    });

  },

};

