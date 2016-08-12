const csv = require('csv')
const geolocation = require('node-geolocation')

function encodeXaddress (opts) {
  // check arguments for formatting errors
  let lat = opts.lat
  let lang = opts.lang
  if (!opts.lang || !opt.lat) {
    lat = opts.coord.split(',')[0].trim()
    long = opts.coord.split(',')[1].trim()
  }

  // # How is composed
  // # ---------------------------------------
  // # if the location is -25.296945,-57.566654
  // @latitud= $arg_latlong.split(",")[0].split(".")[0].strip
  // #Latitude = "-25"

  // @longitud= $arg_latlong.split(",")[1].split(".")[0].strip
  // #Longitude = "-57"

  // @mlatitud = $arg_latlong.split(",")[0].split(".")[1][0..3].ljust(4, "0")
  // #Minute from latitude = "2969"

  // @mlongitud = $arg_latlong.split(",")[1].split(".")[1][0..3].ljust(4, "0")
  // #Minute from longitude = "5666"

  // $latitud=@latitud+"."+@mlatitud
  // $longitud=@longitud+"."+@mlongitud

  // # Find the short code for this location.
  // $short_code = short_encode($latitud,$longitud)

  // # if location is -25.2969,-57.5666 $palabra = 6966
  // $palabra = @mlatitud[2..3]+@mlongitud[2..3]

  // # if location is -25.2969,-57.5666 $numero = 2956
  // $numero = @mlatitud[0..1]+@mlongitud[0..1]
  // #---------------------------------------------------------
  // # So far we have the number and first word of the xaddress
  // # we need to know the state and get the second word.
  // #---------------------------------------------------------

}

module.exports = encodeXaddress
