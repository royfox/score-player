var pieces = [
    {
        'pages': [884,  953,  1019, 1046, 1061, 1076, 1107, 1133, 1160, 1182,
                  1204, 1226, 1248, 1277, 1304, 1314, 1341, 1367, 1405],
        'pdfUrl' : 'IMSLP06801-Beethoven_-_Symphony_No.7_Mvt.II_(ed._Unger).pdf',
        'videoId': '-4788Tmz9Zo',
        'composer': 'Beethoven',
        'title': 'Symphony No 7, 2nd Movement, Allegretto',
        'margin': -30
    },
    {
        'pages': [32,  45,  60,  79,  92,  99,  105, 114, 120, 126,
                  131, 139, 146, 159, 175, 189, 202, 214, 221, 228,
                  234, 241, 249, 265, 291, 323, 333, 346, 356, 367,
                  381, 394, 405, 415, 423, 430, 439, 452, 465, 480,
                  488, 496, 500, 505, 515, 525, 531, 536, 541, 546,
                  553, 559, 566, 572, 582, 588, 593, 598, 602],
        'pdfUrl': 'IMSLP54076-PMLP08825-Dvorak_op.088_Sinfonie_Nr.8_1.Allegro_con_brio_fs_SNKLHU_3_8.pdf',
        'videoId': 'QXAv-NGppFw',
        'composer': 'Dvorak',
        'title': 'Symphony No 8, 1st Movement, Allegro con brio',
    },
    {
        'pages': [28,  33,  35,  52,  70,  84,  100, 140, 156, 170,
                  181, 191, 205, 239, 258, 275, 296, 315, 333, 350,
                  359, 368, 378, 385, 393, 403, 413, 423, 433, 442,
                  455, 472, 489, 509, 526, 544, 561, 580, 597, 631,
                  657, 668, 679, 690, 705, 720, 756
                 ],
        'pdfUrl': 'IMSLP13080-Mahler-Symphony_No.5_I.pdf',
        'videoId': 'fEGNNuEM3Fc',
        'composer': 'Mahler',
        'title': 'Symphony No 5, 1st Movement, Trauermarsch',
        'margin': -60
    },
    {
        'pages': [3,   15,  26,  37,  50,  61,  72,  83,  94,  105,
                  117, 129, 149, 159, 168, 178, 191, 228, 242, 256,
                  267, 278, 290, 301, 312, 324, 333, 345, 357, 386,
                  392],
        'pdfUrl': 'IMSLP24899-PMLP33488-Holst-PlanetsFS1.pdf',
        'videoId': 'SjDSUbWingk',
        'composer': 'Holst',
        'title': 'The Planets, Mars',
        'margin': -20
    },
    {
        'pages': [26,  55,  83,  95,  130, 162, 165, 171, 182, 192,
                  203, 208, 219, 235, 245, 253, 276, 288, 302, 314,
                  326, 337, 345, 355, 364, 373, 382, 393, 400, 409,
                  441, 456, 479, 490, 494, 500, 504, 517, 551, 574,
                  600, 630, 656, 686, 697, 715, 721, 728, 741, 753,
                  757, 762, 764, 770, 778, 793, 807, 823, 854, 861,
                  884, 897, 912, 937, 950, 956, 965, 972, 990, 996,
                  1001, 1009, 1020, 1034, 1050, 1068, 1093, 1115, 1125, 1150,
                  1171, 1186, 1194, 1206, 1214, 1217, 1223, 1228, 1233, 1243,
                  1249, 1254, 1260, 1273, 1277, 1280, 1286, 1310, 1321, 1336,
                  1342, 1346, 1353, 1359, 1366, 1381, 1389, 1399, 1408, 1424,
                  1470],
        'pdfUrl': 'IMSLP440853-PMLP193042-janaceksinfoniettaeditionpetersfullscore.pdf',
        'videoId': 'BAmuvFglu0g',
        'composer': 'Janacek',
        'title': 'Sinfonietta',
        'margin': 0
    }
]
pieces = pieces.map(piece => {
    return {
      ...piece,
      name: piece.composer + " - " + piece.title,
      slug: slugify(piece.composer + " " + piece.title)
    };
})

// lifted from https://medium.com/@mhagemann/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1
function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}