import $ from 'jquery';

// please customize these values with your own project info
var projectId = 'lwt7md5tlj3lo';
var environment = 'main';
var interval = 2000; // 2sec

/**
 * Function to check project status and display the Notiflix banner if a deployment is in progress.
 * Notiflix Documentation: https://notiflix.github.io/documentation
 *
 * @param projectId
 * @returns void
 */
function checkProjectStatus(projectId) {
    return $.ajax({
        url: 'https://status.woop.ly/api/' + projectId + '/' + environment,
        crossDomain: true,
        type: 'GET',
        contentType: 'application/json'
    }).done(function(response) {
        if(!response.available) {
            Notiflix.Loading.custom(
                'A deployment is in progress, please wait for the application to be live. This should take less than a minute.',
                {
                    customSvgUrl: 'https://www.negacarbone.earth/wp-content/uploads/2021/12/anim_shadok_01.gif',
                    svgSize: '400px',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    messageMaxLength: 300,
                    messageFontSize: '20px',

                });
        } else {
            Notiflix.Loading.remove();
        }
    });
}

setInterval(function() {
    checkProjectStatus(projectId);
}, interval);
