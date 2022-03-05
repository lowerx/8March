// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Place any jQuery/helper plugins in here.



/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */
!function(t,n,i,s){var e=function(s,e){this.elem=s,this.$elem=t(s),this.options=e,this.metadata=this.$elem.data("plugin-options"),this.$win=t(n),this.sections={},this.didScroll=!1,this.$doc=t(i),this.docHeight=this.$doc.height()};e.prototype={defaults:{navItems:"a",currentClass:"current",changeHash:!1,easing:"swing",filter:"",scrollSpeed:750,scrollThreshold:.5,begin:!1,end:!1,scrollChange:!1},init:function(){return this.config=t.extend({},this.defaults,this.options,this.metadata),this.$nav=this.$elem.find(this.config.navItems),""!==this.config.filter&&(this.$nav=this.$nav.filter(this.config.filter)),this.$nav.on("click.onePageNav",t.proxy(this.handleClick,this)),this.getPositions(),this.bindInterval(),this.$win.on("resize.onePageNav",t.proxy(this.getPositions,this)),this},adjustNav:function(t,n){t.$elem.find("."+t.config.currentClass).removeClass(t.config.currentClass),n.addClass(t.config.currentClass)},bindInterval:function(){var t,n=this;n.$win.on("scroll.onePageNav",function(){n.didScroll=!0}),n.t=setInterval(function(){t=n.$doc.height(),n.didScroll&&(n.didScroll=!1,n.scrollChange()),t!==n.docHeight&&(n.docHeight=t,n.getPositions())},250)},getHash:function(t){return t.attr("href").split("#")[1]},getPositions:function(){var n,i,s,e=this;e.$nav.each(function(){n=e.getHash(t(this)),s=t("#"+n),s.length&&(i=s.offset().top,e.sections[n]=Math.round(i))})},getSection:function(t){var n=null,i=Math.round(this.$win.height()*this.config.scrollThreshold);for(var s in this.sections)this.sections[s]-i<t&&(n=s);return n},handleClick:function(i){var s=this,e=t(i.currentTarget),o=e.parent(),a="#"+s.getHash(e);o.hasClass(s.config.currentClass)||(s.config.begin&&s.config.begin(),s.adjustNav(s,o),s.unbindInterval(),s.scrollTo(a,function(){s.config.changeHash&&(n.location.hash=a),s.bindInterval(),s.config.end&&s.config.end()})),i.preventDefault()},scrollChange:function(){var t,n=this.$win.scrollTop(),i=this.getSection(n);null!==i&&(t=this.$elem.find('a[href$="#'+i+'"]').parent(),t.hasClass(this.config.currentClass)||(this.adjustNav(this,t),this.config.scrollChange&&this.config.scrollChange(t)))},scrollTo:function(n,i){var s=t(n).offset().top;t("html, body").animate({scrollTop:s},this.config.scrollSpeed,this.config.easing,i)},unbindInterval:function(){clearInterval(this.t),this.$win.unbind("scroll.onePageNav")}},e.defaults=e.prototype.defaults,t.fn.onePageNav=function(t){return this.each(function(){new e(this,t).init()})}}(jQuery,window,document);

// Sticky-Menu

!function(t){var e={topSpacing:0,bottomSpacing:0,className:"is-sticky",wrapperClassName:"sticky-wrapper",center:!1,getWidthFrom:""},i=t(window),n=t(document),r=[],o=i.height(),s=function(){for(var e=i.scrollTop(),s=n.height(),a=s-o,c=e>a?a-e:0,p=0;p<r.length;p++){var l=r[p],d=l.stickyWrapper.offset().top,u=d-l.topSpacing-c;if(u>=e)null!==l.currentTop&&(l.stickyElement.css("position","").css("top",""),l.stickyElement.parent().removeClass(l.className),l.currentTop=null);else{var h=s-l.stickyElement.outerHeight()-l.topSpacing-l.bottomSpacing-e-c;0>h?h+=l.topSpacing:h=l.topSpacing,l.currentTop!=h&&(l.stickyElement.css("position","fixed").css("top",h),"undefined"!=typeof l.getWidthFrom&&l.stickyElement.css("width",t(l.getWidthFrom).width()),l.stickyElement.parent().addClass(l.className),l.currentTop=h)}}},a=function(){o=i.height()},c={init:function(i){var n=t.extend(e,i);return this.each(function(){var e=t(this),i=e.attr("id"),o=t("<div></div>").attr("id",i+"-sticky-wrapper").addClass(n.wrapperClassName);e.wrapAll(o),n.center&&e.parent().css({width:e.outerWidth(),marginLeft:"auto",marginRight:"auto"}),"right"==e.css("float")&&e.css({"float":"none"}).parent().css({"float":"right"});var s=e.parent();s.css("height",e.outerHeight()),r.push({topSpacing:n.topSpacing,bottomSpacing:n.bottomSpacing,stickyElement:e,currentTop:null,stickyWrapper:s,className:n.className,getWidthFrom:n.getWidthFrom})})},update:s,unstick:function(e){return this.each(function(){var e=t(this);removeIdx=-1;for(var i=0;i<r.length;i++)r[i].stickyElement.get(0)==e.get(0)&&(removeIdx=i);-1!=removeIdx&&(r.splice(removeIdx,1),e.unwrap(),e.removeAttr("style"))})}};window.addEventListener?(window.addEventListener("scroll",s,!1),window.addEventListener("resize",a,!1)):window.attachEvent&&(window.attachEvent("onscroll",s),window.attachEvent("onresize",a)),t.fn.sticky=function(e){return c[e]?c[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?void t.error("Method "+e+" does not exist on jQuery.sticky"):c.init.apply(this,arguments)},t.fn.unstick=function(e){return c[e]?c[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?void t.error("Method "+e+" does not exist on jQuery.sticky"):c.unstick.apply(this,arguments)},t(function(){setTimeout(s,0)})}(jQuery);

