<?php include 'modals/newPhotoModal.php' ?>

<nav class='navbar sticky-top navbar-expand-md navbar-dark bg-dark'>
    
    <a class='navbar-brand' href="index.php">
        <img src="images/logo.png" alt="Logo" width='40px'>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <div class="navbar-nav mt-3 mt-md-0">
            <a class="nav-item nav-link active" href="index.php">Home</a>
            <a class="nav-item nav-link" href="#">Following</a>
            <a class="nav-item nav-link" href="#">Trending</a>
            <a class="nav-item nav-link" href="#">@username</a>
        </div>
        
        <form id='navbar-search-bar' class="form mx-auto mt-3 mt-md-0">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search...">
                <div class="input-group-append">
                    <button class="search-btn pink-hover btn btn-default" type="submit">
                        <span class="fa fa-search" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        </form>

        <button id='navbar-uploadBtn-ico' type="button" class="btn btn-light pink-hover mt-3 mt-md-0 mb-md-0 mb-2" data-toggle="modal" data-target="#navbar-new-photo-modal">
            <span class="fa fa-plus-square"></span>
        </button>
        <button id='navbar-uploadBtn-text' type="button" class="btn btn-block btn-light pink-hover mt-3 mt-md-0 mb-md-0 mb-2" data-toggle="modal" data-target="#navbar-new-photo-modal">Upload photo</button>

    </div>

</nav>