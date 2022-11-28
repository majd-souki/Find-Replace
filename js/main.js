histcount = 1;

myStorage = window.localStorage;
if (!localStorage.getItem('pref')) {
    localStorage.setItem('pref', 'light');
}

window.onload = function() {

    document.getElementById("f&r").onclick = function() {findReplace()};

    document.querySelector("#copy-text").onclick = function(){
        document.querySelector("#result").select();
        document.execCommand('copy');
    }

    function findReplace() {
        var find = document.getElementById("find").value;
        var replace = document.getElementById("replace").value;
        var result = document.getElementById("result").value;
        var count = (result.match(new RegExp(find, 'g') || []).length);

        document.getElementById("result").value = result.replace(new RegExp(find, 'g'), replace);
        document.getElementById("count").innerHTML = count + " found and replaced.";

        var d = new Date();
        var n = d.toString();

        $( "#hist-insert" ).prepend( `<h6 class="histheader"> <span style="font-size: 17px"><b>#${histcount++}</b></span> ${n}</h6><textarea id="latest" class="form-control" id="result" rows="10" name="result" disabled></textarea><br>` );
        document.getElementById("latest").value = $("#result").val();
    }

    const selectElement = document.querySelector('.d-none');

    selectElement.addEventListener('change', (event) => {
        var file = document.getElementById("files").files[0];

        var reader = new FileReader();
        reader.onload = function (e) {
            var textArea = document.getElementById("result");
            textArea.value = e.target.result;
        };
        reader.readAsText(file);
    });

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    document.getElementById("download-txt").addEventListener("click", function() {
        var text = document.getElementById("result").value;
        var filename = "file.txt";
        download(filename, text);
    }, false);

    document.getElementById("download-csv").addEventListener("click", function() {
        var text = document.getElementById("result").value;
        var filename = "file.csv";
        download(filename, text);
    }, false);

    $( ".inner-switch" ).on("click", function() {
        if( $( "body" ).hasClass( "dark" )) {
          $( "body" ).removeClass( "dark" );
          $( "section" ).removeClass( "section-dark" );
          $( "textarea" ).removeClass( "textarea-dark" );
          $( "button" ).removeClass( "btn-dark-mode" );
          $( "i" ).removeClass( "i-dark" );
          $( "label" ).removeClass( "label-dark" );
          $( ".inner-switch" ).text( "OFF" );
          localStorage.setItem('pref', 'light');
        } else {
          $( "body" ).addClass( "dark" );
          $( "section" ).addClass( "section-dark" );
          $( "textarea" ).addClass( "textarea-dark" );
          $( "button" ).addClass( "btn-dark-mode" );
          $( "i" ).addClass( "i-dark" );
          $( "label" ).addClass( "label-dark" );
          $( ".inner-switch" ).text( "ON" );
          localStorage.setItem('pref', 'dark');
        }
    });

    if (localStorage.getItem('pref') == 'dark') {
        $( ".inner-switch" ).click();
    }

};
