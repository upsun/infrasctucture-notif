import $ from 'jquery';

// please customize these values with your own project info
var projectId = 'abcdefg12345';
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
        // application is not available
        if(!response.available) {
            // Do whatever you want to make your visitor wait for the application to be back
            Notiflix.Loading.custom(
                'A new deployment of your application has started, please wait for the application to be back. This should take less than a minute.',
                {
                    customSvgUrl: 'https://raw.githubusercontent.com/upsun/infrasctucture-notif/main/assets/images/anim_shadok_01.gif',
                    svgSize: '400px',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    messageMaxLength: 300,
                    messageFontSize: '20px',

                });
        } else {
            // application is back
            Notiflix.Loading.remove();
        }
    });
}

// check project status every interval (default to 2sec).
setInterval(function() {
    checkProjectStatus(projectId);
}, interval);
