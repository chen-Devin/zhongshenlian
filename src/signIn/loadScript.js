export default function(urlString, callBack){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = urlString;

    if (callBack) {
        script.addEventListener('load', function(e) {
            callBack();
        }, false);
    }
    document.body.appendChild(script);
};
