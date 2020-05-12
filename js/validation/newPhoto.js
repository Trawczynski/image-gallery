function loadNewPhotoValidation() {
    $("#newPhoto-form").submit(function (event) {
        event.preventDefault();
        $("#newPhoto-error").hide();

        axios.get(`http://localhost:3000/photos?userId=${getLoggedUserId()}`)
        .then(function (response) {
            if (response.status == 200) {
                if (response.data.length <= 50) {
                    let errors = 0;

                    let url = $("#newPhoto-url");
                    let title = $("#newPhoto-title");
            
                    let urlVal = url.val();
                    let titleVal = title.val().trim().replace(/\s\s+/g, ' ');
                    let descriptionVal = $("#newPhoto-description").val().trim();
                    let date = new Date().toISOString();
                    let tags = getTagsArray();
                    let publicVal = $("#newPhoto-visibility input:checked").val() == "public" ? true : false;
                    let userId = getLoggedUserId();
            
                    title.val(titleVal);
            
                    if (!($(this).hasClass("autoValidationAdded"))) {
                        addAutoValidation(url, checkUrl);
                        $(this).addClass("autoValidationAdded");
                    }
            
                    errors += checkErrors(url, checkUrl);
            
                    if (errors === 0) {
                        let photoData = {
                            "url": urlVal,
                            "title": titleVal,
                            "description": descriptionVal,
                            "date": date,
                            "upvotes": 0,
                            "downvotes": 0,
                            "tags": tags,
                            "public": publicVal,
                            "userId": userId
                        };
            
                        $.ajax({
                            url: "http://localhost:3000/photos/",
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + getToken(),
                            },
                            data: JSON.stringify(photoData),
                            success: handleNewPhoto,
                            error: handleNewPhotoError("An error occurred. Please try again.")
                        });
                    }
                }
                else {
                    handleNewPhotoError("The maximum number of photos allowed is 50 per user.")
                }
            }
        });
    });


    // Tags insertion
    $("#newPhoto-tags-input").keydown(function (event) {
        if (event.keyCode == 32 || event.keyCode == 13) {
            let tagsArray = getTagsArray();
            let tagText = $(this).val().trim();

            $(this).val("");

            // Prevent form submit
            if(event.keyCode == 13) {
                event.preventDefault();
                $(this).blur();
            }

            if (tagText !== "" && !tagsArray.includes(tagText)) {
                let tagHtml = generatePinkTag(tagText);

                $("#newPhoto-tags-container").append(tagHtml);

                // Edit a tag
                $("#newPhoto-tags-container div:last-child").click(function() {
                    let tagsInput = $("#newPhoto-tags-input");
                    let tagText = $(this).children()[0].textContent;

                    tagsInput.val(tagText);
                    $(this).remove();
                    tagsInput.focus();
                });
            }
        }
    });
}


function handleNewPhoto() {
    window.location.href = "index.php";
}

function handleNewPhotoError(msg) {
    let errorContainer = $("#newPhoto-error");

    errorContainer.text(msg);
    errorContainer.show();
}


function generatePinkTag(tagText) {
    return `
        <div class="badge badge-pink">
            <span class='newPhoto-tagContent pointer'>${tagText}</span>
            <span class='ml-2 pointer large-font' onclick='$(this).parent().remove()' aria-hidden="true">&times;</span>
        </div>`;
}


function getTagsArray() {
    return jQuery.map($(".newPhoto-tagContent"), function (element) {
        return element.textContent;
    });
}