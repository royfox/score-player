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