export default function (context) {
  if(context.isServer === 'undefined'){
    context.userAgent = navigator.userAgent;
  }else {
    context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent;
  }
}
