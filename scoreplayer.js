pieces.sort((a, b) => a.name > b.name ? 1 : -1).forEach(function(piece) {
    var select = document.getElementById("select-piece");
    var option = document.createElement("option");
    option.text = piece.name;
    option.value = piece.slug;
    select.appendChild(option);
})



function onYouTubeIframeAPIReady() {
    YouTube.onIframeReady();
}


var YouTube = (function() {

    var piece;
    var player = null;

    function getCurrentPageFromTime(currentTime) {
        if(currentTime >= Math.max(...piece.pages)) {
            return piece.pages.length;
        }
        for (i = 1; i < piece.pages.length; i++) {
            if (currentTime < piece.pages[i]) {
                return i;
            }
        }
        return 1;
    }

    function setVideoTimeFromPage(page) {
        if (page <= piece.pages.length) {
            player.seekTo(piece.pages[page-1])
        }
    }

    function resize() {
        var spaceForVideo = window.innerWidth - document.getElementById("pdf-canvas").width
        var width = Math.max(spaceForVideo - 50, 300)
        var height = width / 1.64
        player.setSize(width, height)
    }

    var resizeDebouncer;
    window.addEventListener('resize', function(event){
      clearTimeout(resizeDebouncer);
      resizeDebouncer = setTimeout(function() {
           PDF.resize()
           resize()
      }, 100);
    });

    setInterval(function() {
        if(PDF.isReady() && document.getElementById("sync").checked) {
            PDF.renderPage(getCurrentPageFromTime(player.getCurrentTime()))
        }
    }, 1000)

    function init() {
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }


    return {
        'onPlayerReady': function(event) {
            event.target.playVideo();
            player.seekTo(piece.pages[0])
            PDF.init(piece['pdfUrl'])
        },
        'onIframeReady': function() {
            player = new YT.Player('video', {
                height: '390',
                width: '640',
                videoId: piece['videoId'],
                events: {
                    'onReady': YouTube.onPlayerReady
                }
            })
        },
        'setVideoTimeFromPage': function(page) {
            if(document.getElementById("sync").checked) {
                setVideoTimeFromPage(page);
            }
        },
        'init': function(currentPiece) {
            piece = currentPiece;
            init();
        },
        'resize': function() {
            resize();
        }
    }
})();

var PDF = (function() {

    var pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

    var pdfDoc = null,
        pageNum = 1,
        pageRendering = false,
        pageNumPending = null,
        canvas = document.getElementById('pdf-canvas'),
        ctx = canvas.getContext('2d');

    function renderPage(num, forceRedraw=false) {

        if(document.getElementById('page_num').textContent == num && !forceRedraw) {
            return false;
        }

        pageRendering = true;
        pdfDoc.getPage(num).then(function(page) {
            var targetHeight = window.innerHeight;
            var viewport = page.getViewport({ scale: 1, });
            var scale = targetHeight / viewport.height;
            var scaledViewport = page.getViewport({ scale: scale, });

            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;

            var renderContext = {
                canvasContext: ctx,
                viewport: scaledViewport
            };
            var renderTask = page.render(renderContext);

            renderTask.promise.then(function() {
                pageRendering = false;
                if (pageNumPending !== null) {
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
            });
            YouTube.resize();
        });
        pageNum = num;
        document.getElementById('page_num').textContent = num;

    }


    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }

    function goToPage(page) {
        if (page <= 1) {
            return;
        }
         if (page > pdfDoc.numPages) {
            return;
        }
        queueRenderPage(page);
        YouTube.setVideoTimeFromPage(page)
    }

    function onPrevPage() {
        goToPage(pageNum - 1);
    }

    function onNextPage() {
        goToPage(pageNum + 1);
    }

    function enterPage() {
        var targetNumber = parseInt(prompt("Go to page", pageNum), 10)
        YouTube.setVideoTimeFromPage(targetNumber)
    }

    document.getElementById('prev').addEventListener('click', onPrevPage);
    document.getElementById('next').addEventListener('click', onNextPage);
    document.getElementById('page_num').addEventListener('click', enterPage);

    return {
        'init': function(url) {
            pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
                pdfDoc = pdfDoc_;
                document.getElementById('page_count').textContent = pdfDoc.numPages;
                renderPage(pageNum);
            });
        },
        'isReady': function() {
            return pdfDoc != null;
        },
        'renderPage': function (page) {
            queueRenderPage(page)
        },
        'resize': function () {
            renderPage(pageNum, true)
        }
    }

})();

let urlPieces = window.location.search.substr(1).split("=");
if(urlPieces.length == 2 && urlPieces[0] == "p") {
    var piece = pieces.find(piece => piece['slug'] == urlPieces[1]);
    window.document.title = piece['name']
    document.getElementById("pdf-navigation").style.display = 'block';
    document.getElementById("select-piece").value = piece.slug;
    YouTube.init(piece)
}




