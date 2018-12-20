var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'https://adiedrichabcdefg.localtunnel.me' }, function(err, tunnel) {
  console.log('LT running')
});
