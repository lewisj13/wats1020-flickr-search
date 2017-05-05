// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
    // Place your code here, inside the document ready handler.
//Function for seraching Flickr

$(document).on('ready', function() {
  //Function created to request FLICKR API when serach tag is requested

        function searchImages(tags) {
      //Location of Flickr API
            var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&format=json";
              $("images").innerHTML = "<li class='search-throbber'>Searching...</li>";

    // Created Json will handed the request including the tags submited by user as well as displays and refreshes content
          $.getJSON( flickrAPI, {
            tags: tags,
            tagmode: "any",
            format: "json"
          }).done(function (data) {
            $("#images").empty();
            $("h1.search-title").first()[0].innerHTML = "Search Results for: " + tags;
            $.each(data.items, function (i, item) {

   //The information that will be displayed with images

              var newListItem = $("<li>");

              var newTitle = $("<p class='imageTitle'>").html(item.title).appendTo(newListItem);
              var newDate = $("<p class='imageDate'>").html(item.date_taken).appendTo(newListItem);
              var newDescription = $("<p class='imageDesc'>").html(item.description).appendTo(newListItem);
              var newAuthor = $("<p class='imageAuthor'>").html(item.author).appendTo(newListItem);
              var newLink = $("<a>").attr("href", item.link).text("View on Flickr").appendTo(newListItem);

  //Updated teh display with images. 20 images will be displayed
              $(newListItem).appendTo("#images");
                  if (i === 20) {
                  return false;
            }
         });
       });
      }

  //Search button will find tags when user on clicks button
  $('button.search').on('click', function(event){
    event.preventDefault();
    var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
    console.log(searchTextInput);
    searchImages(searchTextInput.value);
  });

    });  
