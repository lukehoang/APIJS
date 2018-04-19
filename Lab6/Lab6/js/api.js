$(document).ready(function () {

    var totalPages = 0;
    var page = 1;

    //actor nav button click
    $('#btn_actor').click(function () {
        page = 1;
        $('input[type="text"]').val('');
        $("#div_message").html("");
        $('#h2_title').html("Who is your favorite Actor/Actress?");
        $('#txt_name').show();
        $('#btn_submitName').show();
        $('#txt_year').hide();
        $('#btn_submitYear').hide();
        $('#txt_movie').hide();
        $('#btn_submitMovie').hide();
        $('#pag_name').hide();
        $('#pag_movie').hide();
        $('#pag_year').hide();
    });
    //trigger actor nav button click when start the app
    $('#btn_actor').trigger('click');
    //movie nav button click
    $('#btn_movie').click(function () {
        page = 1;
        $('input[type="text"]').val('');
        $("#div_message").html("");
        $('#h2_title').html("What is your favorite movie?");
        $('#txt_name').hide();
        $('#btn_submitName').hide();
        $('#txt_year').hide();
        $('#btn_submitYear').hide();
        $('#txt_movie').show();
        $('#btn_submitMovie').show();
        $('#pag_name').hide();
        $('#pag_movie').hide();
        $('#pag_year').hide();
    });
    //best movie nav button click
    $('#btn_bestMovie').click(function () {
        page = 1;
        $('input[type="text"]').val('');
        $("#div_message").html("");
        $('#h2_title').html("What are the best movies?");
        $('#txt_name').hide();
        $('#btn_submitName').hide();
        $('#txt_year').show();
        $('#btn_submitYear').show();
        $('#txt_movie').hide();
        $('#btn_submitMovie').hide();
        $('#pag_name').hide();
        $('#pag_movie').hide();
        $('#pag_year').hide();
    });
    //Search buttons click (actor Name, movie, year)
    $('#btn_submitName').click(function () {
        if ($('#txt_name').val() == "") {
            alert('Please enter a actor/actress name');
            return;
        }
        var name = $('#txt_name').val();
        var strUrl =
            'https://api.themoviedb.org/3/search/person?api_key=5d97c6704356a49ba09c087813eb0047&language=en-US&query=' +
            name + '&page='+page+'&include_adult=false';
        $.ajax({
            url: strUrl,
            dataType: 'json',
            success: function (result) {
                totalPages = Number(result["total_pages"]);
                var resultHtml = $("<div class=\"resultDiv\">");
                for (i = 0; i < result["results"].length; i++) {

                    var image = result["results"][i]["profile_path"]
                    if (image == null) {
                        continue;
                    }
                    else {
                        image = "https://image.tmdb.org/t/p/w500/" + image;
                    }

                    resultHtml.append("<div class=\"result\" resourceId=\"" +
                        result["results"][i]["id"] + "\">" + "<img src=\"" +
                        image + "\" />" + "<p><a>" + result["results"][i][
                            "name"
                    ] + "</a></p></div>")
                }
                resultHtml.append("</div><div class='clear'><h3>Page "+page+" of "+totalPages+"</h3></div>");
                $("#div_message").html(resultHtml);
            },
            error: function (req, status, error) {
                alert("Error: " + req.responseText + " | " + status + " | " + error);
            }
        });
        $('#pag_name').show();
        $('#pag_movie').hide();
        $('#pag_year').hide();
    });

    $('#btn_nextName').click(function () {
        if (page == totalPages) {
            page = page;
        }
        else {
            page++;
        }
        $('#btn_submitName').trigger('click');
    });
    $('#btn_prevName').click(function () {
        if (page == 1) {
            page = 1;
        }
        else {
            page--;
        }
        $('#btn_submitName').trigger('click');
    });
    $('#btn_submitMovie').click(function () {
        if ($('#txt_movie').val() == "") {
            alert('Please enter a movie name');
            return;
        }
        var movie = $('#txt_movie').val();
        var strUrl =
            'https://api.themoviedb.org/3/search/movie?api_key=5d97c6704356a49ba09c087813eb0047&query=' +
            movie+'&page='+page;
        $.ajax({
            url: strUrl,
            dataType: 'json',
            success: function (result) {
                totalPages = Number(result["total_pages"]);
                var resultHtml = $("<div class=\"resultDiv\">");
                for (i = 0; i < result["results"].length; i++) {

                    var image = result["results"][i]["poster_path"]
                    if (image == null) {
                        continue;
                    }
                    else {
                        image = "https://image.tmdb.org/t/p/w500/" + image;
                    }

                    resultHtml.append("<div class=\"result\" resourceId=\"" +
                        result["results"][i]["id"] + "\">" + "<img src=\"" +
                        image + "\" />" + "<p><a>" + result["results"][i][
                            "title"
                    ] + "</a></p><p>Release Date<br>" + result["results"][i]["release_date"] + "</p></div>")
                }
                resultHtml.append("</div><div class='clear'><h3>Page " + page + " of " + totalPages + "</h3></div>");
                $("#div_message").html(resultHtml);
            },
            error: function (req, status, error) {
                alert("Error: " + req.responseText + " | " + status + " | " + error);
            }
        });
        $('#pag_name').hide();
        $('#pag_movie').show();
        $('#pag_year').hide();
    });

    $('#btn_nextMovie').click(function () {
        if (page == totalPages) {
            page = page;
        }
        else {
            page++;
        }
        $('#btn_submitMovie').trigger('click');
    });
    $('#btn_prevMovie').click(function () {
        if (page == 1) {
            page = 1;
        }
        else {
            page--;
        }
        $('#btn_submitMovie').trigger('click');
    });
    $('#btn_submitYear').click(function () {
        if ($('#txt_year').val() == "") {
            alert('Please enter a year');
            return;
        }
        var year = $('#txt_year').val();
        var strUrl =
            'https://api.themoviedb.org/3/discover/movie?api_key=5d97c6704356a49ba09c087813eb0047&language=en-US&primary_release_year=' +
            year + '&page='+page+'&sort_by=vote_average.desc';
        $.ajax({
            url: strUrl,
            dataType: 'json',
            success: function (result) {
                totalPages = Number(result["total_pages"]);
                var resultHtml = $("<div class=\"resultDiv\">");
                for (i = 0; i < result["results"].length; i++) {

                    var image = result["results"][i]["poster_path"]
                    if (image == null) {
                        continue;
                    }
                    else {
                        image = "https://image.tmdb.org/t/p/w500/" + image;
                    }

                    resultHtml.append("<div class=\"result\" resourceId=\"" +
                        result["results"][i]["id"] + "\">" + "<img src=\"" +
                        image + "\" />" + "<p><a>" + result["results"][i][
                            "title"
                    ] + "</a></p><p>"+ result["results"][i]["overview"] +"</p></div>")
                }
                resultHtml.append("</div><div class='clear'><h3>Page " + page + " of " + totalPages + "</h3></div>");
                $("#div_message").html(resultHtml);
            },
            error: function (req, status, error) {
                alert("Error: " + req.responseText + " | " + status + " | " + error);
            }
        });
        $('#pag_name').hide();
        $('#pag_movie').hide();
        $('#pag_year').show();
    });

    $('#btn_nextYear').click(function () {
        if (page == totalPages) {
            page = page;
        }
        else {
            page++;
        }
        $('#btn_submitYear').trigger('click');
    });
    $('#btn_prevYear').click(function () {
        if (page == 1) {
            page = 1;
        }
        else {
            page--;
        }
        $('#btn_submitYear').trigger('click');
    });
});