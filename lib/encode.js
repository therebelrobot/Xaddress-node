require('better-require')('csv');

const numbro = require('numbro')
const geoOptions = {
  provider: 'google',

  // Optional depending on the providers
  // httpAdapter: 'https', // Default
  // apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
  // formatter: null         // 'gpx', 'string', ...
};
const geocoder = require('node-geocoder')(geoOptions);

const countries = require('../Xaddress/countries.csv')
const states = require('../Xaddress/states.csv')

function encodeXaddress (opts) {
  return new Promise((resolve, reject) => {
    // check arguments for formatting errors
    console.log('running')
    opts.coord = opts.coord || '37.654816,-122.491559'
    let lat = opts.lat
    let lng = opts.lng
    if (!opts.lang || !opt.lat) {
      lat = opts.coord.split(',')[0].trim()
      lng = opts.coord.split(',')[1].trim()
    }

    opts.language = opts.language || 'en'

    const words = require(['../Xaddress/',opts.language,'/',opts.language,'.csv'].join(''))
    const adj = require(['../Xaddress/',opts.language,'/adj_',opts.language,'.csv'].join(''))

    const lat_lng = [numbro(lat).format('0[.][0][0][0][0]'),numbro(lng).format('0.0000')].join(',')

    console.log(countries)
    geocoder.geocode(lat_lng).then(results => {
      console.log(results)
      let firstResult = results[0]
      let state = firstResult.administrativeLevels.level1short
      let country = firstResult.countryCode
      // let locationRecord =
      if(state){
        let state_country = [state,country].join('-')
      }
      resolve()
    }).catch(reject)
    // countries = READ(countries.csv)
    // states = READ(states.csv)
    // words = READ(en.csv)
    // adj = READ(adj_en.csv)
    //
    // get latitude_longitude
    // # for example you will get latitude_longitude = -6.7184,129.5080, you only will use up to 4 digits after the dot on each.
    //
    // state_country = find_country_state(latitude_longitude)
    // # in this example you will get the record for ID-MA in states.csv
    //
    // # state_country can return a states.csv or a country.csv record, here we find out that by asking if "stateCode" column exist, if false is country.csv record
    // is_country = if state_country["stateCode"]== nil then TRUE else FALSE
    //
    //
    // combinations = state_country["combinaciones"]
    // comb_table = state_country["bounds"]
    // create_combination_table(comb_table)
    //
    // first_part = getalldigits_before_the_dot_in_latitude +","+getalldigits_before_the_dot_in_longitude
    // # in this example first_part = -6,129
    //
    // if combinations > 0
    //   word2 = search combination_table for first_part and return the equivalence number.
    //   # in this example word2 = 25
    // end
    //
    // word1 = last2digits_from_latitude + last2digits_from_longitude
    // # in this example word1 = 8480
    //
    // number = first2digit_after_the_dot_from_latitude + first2digit_after_the_dot_from_longitude
    // # in this example number = 7150
    //
    // word1_list = get_word1(word1)
    // if combinations == 0
    //   # here we have all that we need to finish
    //   # number will be the number part in the Xaddress
    //   # word1_list is the list of words available to pick for that location, yo should present them
    //   # in a way that user can select his choice.
    //   # if is_country==TRUE show state_country["countryName"] as the second line
    //   # if is_country==FALSE or state_country["stateName1"] as the second line and state_country["countryName"] as the third line
    // else
    //   word2_list = get_word2(word2)
    //   # We could use the 'S' mark on the last field to match only plural first words with plural second words.
    //   # number will be the number part in the Xaddress
    //   # you can show the Xaddres in the following form.
    //   # NUMBER,WORD2,WORD1 or WORD1,WORD2,NUMBER for english the first one makes more sense usually.
    //   # if is_country==TRUE show state_country["countryName"] as the second line
    //   # if is_country==FALSE or state_country["stateName1"] as the second line and state_country["countryName"] as the third line
    // end
  })
}


// DEF FIND_COUNTRY_STATE()
//   # There are many ways to get country and/or state from latitude & longitude, the easier is to use a geocoder api from OSM, Google, or any
//   # other map provider or service, but that might require to be online, you can in most cases find the location using just countries.csv and states.csv
//   # since they contain the boundaries for countries and states, you can check if the location is inside those boundaries, first checking
//   # for country and then for state to pinpoint the location, is possible that some locations near the edges of boundaries overlap, so if
//   # you find that case, you can popup a question to the user with the possible options to select from.
//
//   if internet = yes
//     get geolocation.api
//   else
//     use offline_geolocation.csv
//   end
//
//   Once defined the country find out his record on countries.csv
//   if countries["tipo"] == "X"
//     return countries.record
//   else
//     return states.record
//   end
//
// END
//
//
// DEF CREATE_COMBINATION_TABLE(comb_table)
//  extract initial_latitude,final_latitude, initial_longitude, final_longitude from comb_table
//
//  # in the case of Maluku comb_table will be -1.37872@134.908555*-8.345391@125.722838
//  # so initial_latitude= -8, final_latitude=-1, initial_longitude=125, final_longitude=134
//
//  counter =1
//  combination_table=[]
//  from [initial_latitude to final_latitude] do lati
//    from [initial_longitude to final_longitude] do longi
//      combination_table[counter] = [lati,longi]
//      counter = counter + 1
//    end
//  end
//
//  # In this case the result will look like  : 01 = -8,125 | 02 = -8,126 | 03 = -08,127| ... 80=-1,134
// END
//
//
// DEF GET_WORD1(word1)
//   # Column structure of en.csv is the following
//   #   0,    1       ,2   ,3
//   # word,popularity,code,type
//   # word: Actual word to be used.
//   # popularity: how popular is that word, you should be order the results from more popular to less
//   # code : the hashed result of the word
//   # type: if the third character is 'S' means the word is plural
//
//   # get all the words with code that match word1 code
//   word_list = []
//   words.each
//     if words[2]==word1
//       word_list  << words
//     end
//   end
//
//   order word_list by word_list[1]
//   return word_list
// END
//
//
// DEF GET_WORD2(word2)
//   # Column structure of adj_en.csv is the following
//   #   0,    1       ,2   ,3
//   # word,popularity,code,type
//   # word: Actual word to be used.
//   # popularity: how popular is that word, you should be order the results from more popular to less
//   # code : the hashed result of the word
//   # type: if the third character is 'S' means the word is plural
//
//   # get all the words with code that match word1 code
//   adj_list = []
//   adj.each
//     # we select the words based on the starting digits, so if word2 = 25 we sholud take all the words that START with 25, from 2500 to 2599
//     # if word2 was 8 we will select words with hashes from 8000 to 8999.
//     if adj[2][0..lenght(word2)] == word2
//       adj_list  << adj
//     end
//   end
//
//   order adj_list by adj_list[1]
//   return adj_list
// END

module.exports = encodeXaddress
