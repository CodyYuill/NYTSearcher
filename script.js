function ajaxCall(e){
    e.preventDefault();
    var searchTermInputField = $("#search").val();
    var numResults = $("#records").val();
    var optionalParams = getOptionalParams();
    console.log(optionalParams);
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=2oDGB7mIF07U8zIDILYA0xwsZS9mwz2x&q=" + searchTermInputField + optionalParams;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(response);
        appendArticles(numResults, response.response.docs);

    });
}

function appendArticles(amount, articleArr){
    clear();
    for(var i =0; i < amount;i++)
    {
        var articleLI = $("<li>")
        var articleTitle = $("<h1>").text(articleArr[i].headline.main);
        var articleAuthors = $("<p>").text(articleArr[i].byline.original);
        articleLI.append(articleTitle);
        if(articleAuthors != null)
        {
            articleLI.append(articleAuthors);
        }
        $("#top-articles").append(articleLI);
    }

}

function getOptionalParams()
{
    var optionalParams = "";
    
    var optionalStartYear = $("#start").val();
    var optionalEndYear = $("#end").val();
    console.log(optionalStartYear);

    if(optionalStartYear)
    {
        optionalParams += `&begin_date=${optionalStartYear}0101`;
    }
    if(optionalEndYear)
    {
        optionalParams += `&end_date=${optionalEndYear}0101`;
    }

    return optionalParams;
}

function clear(){
    $("#top-articles").empty();
}

$("#submit").on("click", ajaxCall);
$("#clear").on("click", clear);