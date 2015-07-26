/**
 * 200 (OK) Response
 *
 * Usage:
 * return this.res.ok();
 * return this.res.ok(data);
 * return this.res.ok(data, 'auth/login');
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */

module.exports = function sendOK(data, options) {

  // Get access to `this.req`, `this.res`, & `sails`
  var sails = this.req._sails;

  sails.log.silly('this.res.ok() :: Sending 200 ("OK") response');

  // Set status code
  this.res.status(200);

  // If appropriate, serve data as JSON(P)
  if (this.req.wantsJSON) {
    return this.res.jsonx(data);
  }

  // If second argument is a string, we take that to mean it refers to a view.
  // If it was omitted, use an empty object (`{}`)
  options = (typeof options === 'string') ? {view: options} : options || {};

  // If a view was provided in options, serve it.
  // Otherwise try to guess an appropriate view, or if that doesn't
  // work, just send JSON.
  if (options.view) {
    return this.res.view(options.view, {data: data});
  }

  // If no second argument provided, try to serve the implied view,
  // but fall back to sending JSON(P) if no view can be inferred.
  else {
    return this.res.guessView({data: data}, function couldNotGuessView() {
      return this.res.jsonx(data);
    });
  }

};
