function updatePhotoModal(event) {
    let user = event.data.user;
    let photoId = event.data.photoId;

    // Get photo
    getPhoto(photoId).then(function (response) {
        let photo = response.data;

        // Get photo tags
        getTags(photo.tags).then(function (tags) {
            // If current user is logged and is not the photo owner, get his vote
            if (isLogged() && getLoggedUserId() != user.id) {
                getVote(photo.id, getLoggedUserId()).then(function (response) {
                let vote = response.data.length > 0 ? response.data[0] : null;

                updatePhotoModalData(photo, user, tags, vote);
                });
            }
            // Else there is not vote
            else {
                updatePhotoModalData(photo, user, tags, null);
            }
        });
    })
}


function updatePhotoModalData(photo, user, tags, vote) {
    switchPhotoModalTo(0);

    updatePhotoModalInfo(photo, user, tags, vote);

    $("#photo-modal").modal('show');

    updatePhotoModalEdit(photo, tags);
    updatePhotoModalComments(photo.public);
}


// 0: info; 1: comments; 2: photo edit
function switchPhotoModalTo(n) {
    $("#photo-modal-info").hide();
    $("#photo-modal-comments").hide();
    $("#photo-modal-edit").hide();

    $("#photo-modal-info-link > a").removeClass("active");
    $("#photo-modal-comments-link > a").removeClass("active");
    $("#photo-modal-edit-link > a").removeClass("active");

    switch (n) {
        case 0:
            $("#photo-modal-info").show();
            $("#photo-modal-info-link > a").addClass("active");
            break;

        case 1:
            $("#photo-modal-comments").show();
            $("#photo-modal-comments-link > a").addClass("active");
            break;

        default:
            $("#photo-modal-edit").show();
            $("#photo-modal-edit-link > a").addClass("active");
            break;
    }
}