/**
 * 500 (Server Error) Response
 *
 * Usage:
 * return this.res.serverError();
 * return this.res.serverError(err);
 * return this.res.serverError(err, 'some/specific/error/view');
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `this.res.serverError()`
 * automatically.
 */

module.exports = function serverError(data, options) {

  // Get access to `this.req`, `this.res`, & `sails`
  var sails = this.req._sails;

  // Set status code
  this.res.status(500);

  // Log error to console
  if (data !== undefined) {
    sails.log.error('Sending 500 ("Server Error") response: \n', data);
  }
  else sails.log.error('Sending empty 500 ("Server Error") response');

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if (sails.config.environment === 'production') {
    data = undefined;
  }

  // If the user-agent wants JSON, always respond with JSON
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

  // If no second argument provided, try to serve the default view,
  // but fall back to sending JSON(P) if any errors occur.
  else {
    return this.res.view('500', {data: data}, function (err, html) {

      // If a view error occured, fall back to JSON(P).
      if (err) {
        //
        // Additionally:
        // If the view was missing, ignore the error but provide a verbose log.
        if (err.code === 'E_VIEW_FAILED') {
          sails.log.verbose('this.res.serverError() :: Could not locate view for error page (sending JSON instead).  Details: ', err);
        }
        // Otherwise, if this was a more serious error, log to the console with the details.
        else {
          sails.log.warn('this.res.serverError() :: When attempting to render error page view, an error occured (sending JSON instead).  Details: ', err);
        }
        return this.res.jsonx(data);
      }

      return this.res.send(html);
    });
  }

};

